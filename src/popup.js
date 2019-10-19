import {
  getSelectedTextFromBackground,
  setVocabifyData,
  getVocabifyData,
  getValueFromStoreResponse,
  onPopupManualTextUpdate,
  isEmptyObject,
  isEmptyString,
  isFourHundredCharactersOrLess,
  isTwoCharactersOrMore,
  addToItems,
  saveItem,
  setPlaceholderText,
  toEmptyString,
  resetPopupAfterSave
} from './utils';

import {
  __VOCABIFY_WORD__,
  __VOCABIFY_DEFINITION__,
  __VOCABIFY_SAVED_ITEMS__,
  __VOCABIFY_NO_WORD_SELECTED__,
  __VOCABIFY_NO_DEFINITION_SELECTED__
} from './constants';

const word = document.getElementById('word');
const definition = document.getElementById('definition');
const wordMessage = document.getElementById('wordMessage');
const definitionMessage = document.getElementById('definitionMessage');

let wordText;
let definitionText;

async function popupInitialise() {
  wordText = await getVocabifyData(__VOCABIFY_WORD__);
  definitionText = await getVocabifyData(__VOCABIFY_DEFINITION__);

  wordText = getValueFromStoreResponse({
    response: wordText,
    key: __VOCABIFY_WORD__,
    fallback: __VOCABIFY_NO_WORD_SELECTED__
  });

  definitionText = getValueFromStoreResponse({
    response: definitionText,
    key: __VOCABIFY_DEFINITION__,
    fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
  });

  setPlaceholderText(word, wordText);
  setPlaceholderText(definition, definitionText);
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

  let items = getValueFromStoreResponse({
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

  wordText = toEmptyString(wordText);
  definitionText = toEmptyString(definitionText);

  await resetPopupAfterSave({ word, definition, callback: setVocabifyData });
});

word.addEventListener('input', onPopupManualTextUpdate.setEditState);
definition.addEventListener('input', onPopupManualTextUpdate.setEditState);

word.addEventListener('blur', async function() {
  await onPopupManualTextUpdate.onBlur({
    text: word.textContent,
    key: __VOCABIFY_WORD__,
    element: word,
    fallback: __VOCABIFY_NO_WORD_SELECTED__,
    callback: setVocabifyData
  });
});

definition.addEventListener('blur', async function() {
  await onPopupManualTextUpdate.onBlur({
    text: definition.textContent,
    key: __VOCABIFY_DEFINITION__,
    element: definition,
    fallback: __VOCABIFY_NO_DEFINITION_SELECTED__,
    callback: setVocabifyData
  });
});

popupInitialise();
