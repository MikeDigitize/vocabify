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
  toEmptyString
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

const word = document.getElementById('word');
const definition = document.getElementById('definition');
const wordMessage = document.getElementById('wordMessage');
const definitionMessage = document.getElementById('definitionMessage');

async function popupInitialise() {
  let savedWord = await getVocabifyData(__VOCABIFY_WORD__);
  let savedDefinition = await getVocabifyData(__VOCABIFY_DEFINITION__);

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

document.getElementById('getWord').addEventListener('click', function() {
  getSelectedTextFromBackground().then(async function(data) {
    await setVocabifyData(__VOCABIFY_WORD__, data);
    setPlaceholderText(word, data);
  });
});

document.getElementById('getDefinition').addEventListener('click', function() {
  getSelectedTextFromBackground().then(async function(data) {
    await setVocabifyData(__VOCABIFY_DEFINITION__, data);
    setPlaceholderText(definition, data);
  });
});

document.getElementById('vocabify').addEventListener('click', function() {
  chrome.runtime.openOptionsPage();
});

document.getElementById('save').addEventListener('click', async function() {

  let currentWord = await getVocabifyData(__VOCABIFY_WORD__);
  let currentDefinition = await getVocabifyData(__VOCABIFY_DEFINITION__);

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

  let savedItems = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);

  let items = setValueFromStoreResponse({
    response: savedItems,
    key: __VOCABIFY_SAVED_ITEMS__,
    fallback: []
  });

  let updatedItems = addToItems({
    word: currentWord[__VOCABIFY_WORD__],
    definition: currentDefinition[__VOCABIFY_DEFINITION__],
    items
  });

  await saveItem({
    key: __VOCABIFY_SAVED_ITEMS__,
    items: updatedItems,
    callback: setVocabifyData
  });

  await resetPopupAfterSave({ word, definition, callback: setVocabifyData });
});

word.addEventListener('input', manualEditHandler.setEditState);
definition.addEventListener('input', manualEditHandler.setEditState);

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

popupInitialise();
