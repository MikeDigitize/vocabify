import {
  setVocabifyData,
  getVocabifyData,
  isEmptyObject,
  isEmptyString,
  isFourHundredCharactersOrLess,
  isTwoCharactersOrMore,
  addToItems,
  saveItem,
  setPlaceholderText,
  capitaliseFirstLetter,
  addFullStop,
  isDuplicateWord
} from './utils/general-utils';

import {
  getSelectedTextFromBackground,
  setValueFromStoreResponse,
  manualEditHandler,
  resetPopupAfterSave
} from './utils/popup-utils';

import {
  __VOCABIFY_WORD__,
  __VOCABIFY_DEFINITION__,
  __VOCABIFY_SAVED_ITEMS__,
  __VOCABIFY_NO_WORD_SELECTED__,
  __VOCABIFY_NO_DEFINITION_SELECTED__
} from './utils/constants';

/**
 * The HTML Elements in the popup  
 */
const word = document.getElementById('word'); // the word the user will select
const definition = document.getElementById('definition'); // the definition
const wordMessage = document.getElementById('wordMessage'); // the message that sits above the word and used to instruct / inform of errors
const definitionMessage = document.getElementById('definitionMessage'); // the message above the defintion used to instruct / inform of errors

/**
 * Kick things off...
 */
async function popupInitialise() {

  /**
   * Vocabify will store any word / definition added to the popup
   * So if you close the popup / shut the browser down the word / defintion will persist
   */ 
  let savedWord = await getVocabifyData(__VOCABIFY_WORD__);
  let savedDefinition = await getVocabifyData(__VOCABIFY_DEFINITION__);

  /**
   * Decide what to show as current word / definition
   * Either from storage or the default fallback i.e. Choose a Word / Definition
   */
  let currentWord = setValueFromStoreResponse({
    response: savedWord,
    key: __VOCABIFY_WORD__,
    fallback: __VOCABIFY_NO_WORD_SELECTED__
  });

  let currentDefinition = setValueFromStoreResponse({
    response: savedDefinition,
    key: __VOCABIFY_DEFINITION__,
    fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
  });

  setPlaceholderText(word, currentWord);
  setPlaceholderText(definition, currentDefinition);
}

/**
 * Retrives the higlighted word from the browser
 * Capitalises the first letter
 * Stores the word in Chrome storage
 * Displays it in the popup
 */
document.getElementById('getWord').addEventListener('click', function() {
  getSelectedTextFromBackground().then(async function(data) {
    let response = capitaliseFirstLetter(data);
    await setVocabifyData(__VOCABIFY_WORD__, response);
    setPlaceholderText(word, response);
  });
});

/**
 * Retrives the higlighted definition from the browser
 * Capitalises the first letter and adds a full stop to the end
 * Stores the word in Chrome storage
 * Displays it in the popup
 */
document.getElementById('getDefinition').addEventListener('click', function() {
  getSelectedTextFromBackground().then(async function(data) {
    let response = addFullStop(capitaliseFirstLetter(data));
    await setVocabifyData(__VOCABIFY_DEFINITION__, response);
    setPlaceholderText(definition, response);
  });
});

// opens the Vocabify page with all stored words in a new tab
document.getElementById('vocabify').addEventListener('click', function() {
  chrome.runtime.openOptionsPage();
});

/**
 * Saves the word and definition to Vocabify
 * if it passes some basic validation...
 */
document.getElementById('save').addEventListener('click', async function() {

  // retrives word and definition
  let currentWord = await getVocabifyData(__VOCABIFY_WORD__);
  let currentDefinition = await getVocabifyData(__VOCABIFY_DEFINITION__);

  // handles all the validation and error messaging for the word
  if (
    isEmptyObject(currentWord) ||
    isEmptyString(currentWord[__VOCABIFY_WORD__]) ||
    !isFourHundredCharactersOrLess(currentWord[__VOCABIFY_WORD__]) ||
    !isTwoCharactersOrMore(currentWord[__VOCABIFY_WORD__])
  ) {
    if (!definitionMessage.classList.contains('animated')) {
      setPlaceholderText(wordMessage, 'Be sure to choose a word first before saving');
      wordMessage.classList.add('animated', 'pulse');

      setTimeout(function() {
        setPlaceholderText(wordMessage, __VOCABIFY_NO_WORD_SELECTED__);
        wordMessage.classList.remove('animated', 'pulse');
      }, 2500);
    }

    return;
  }

  // handles all the validation and error messaging for the definition
  if (
    isEmptyObject(currentDefinition) ||
    isEmptyString(currentDefinition[__VOCABIFY_DEFINITION__]) ||
    !isFourHundredCharactersOrLess(currentDefinition[__VOCABIFY_DEFINITION__]) ||
    !isTwoCharactersOrMore(currentDefinition[__VOCABIFY_DEFINITION__])
  ) {
    if (!definitionMessage.classList.contains('animated')) {
      setPlaceholderText(definitionMessage, 'Be sure to choose a definition first before saving');
      definitionMessage.classList.add('animated', 'pulse');

      setTimeout(function() {
        setPlaceholderText(definitionMessage, __VOCABIFY_NO_DEFINITION_SELECTED__);
        definitionMessage.classList.remove('animated', 'pulse');        
      }, 2500);
    }

    return;
  }

  // the word and definition are ok, now to get the stored words / definitions
  let savedItems = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);

  // fallback to an empty array if no saved items exist
  let items = setValueFromStoreResponse({
    response: savedItems,
    key: __VOCABIFY_SAVED_ITEMS__,
    fallback: []
  });

  // if the word is already present in saved items inform the user and exit
  if(isDuplicateWord(items, currentWord[__VOCABIFY_WORD__])) {
    return false;
  }

  // if the word is not present, add it to the saved items
  let updatedItems = addToItems({
    word: currentWord[__VOCABIFY_WORD__],
    definition: currentDefinition[__VOCABIFY_DEFINITION__],
    items
  });

  // save the items in Chrome storage
  await saveItem({
    key: __VOCABIFY_SAVED_ITEMS__,
    items: updatedItems,
    callback: setVocabifyData
  });

  // reset the popup to default state upon successful save
  await resetPopupAfterSave({ word, definition, callback: setVocabifyData });
});

word.addEventListener('input', manualEditHandler.setEditState);
definition.addEventListener('input', manualEditHandler.setEditState);

/**
 * Allow manual editing of the word and definition
 * And save when the user blurs out of the text 
 * TODO: This is an unintuitive function signature, and needs refactoring to simplify
 */
word.addEventListener('blur', async function() {
  await manualEditHandler.onBlur({
    text: word.textContent,
    key: __VOCABIFY_WORD__,
    element: word,
    fallback: __VOCABIFY_NO_WORD_SELECTED__,
    callback: setVocabifyData
  });
});

definition.addEventListener('blur', async function() {
  await manualEditHandler.onBlur({
    text: definition.textContent,
    key: __VOCABIFY_DEFINITION__,
    element: definition,
    fallback: __VOCABIFY_NO_DEFINITION_SELECTED__,
    callback: setVocabifyData
  });
});

// hold onto your butts
popupInitialise();