import {
  getSelectedTextFromBackground,
  setVocabifyData,
  getVocabifyData,
  getValueOrFallbackFromStore,
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
  __VOCABIFY_NO_DEFINITION_SELECTED__,
} from './constants'

const word = document.getElementById('word');
const definition = document.getElementById('definition');

let wordText;
let definitionText;

async function popupInitialise() {
  wordText = await getVocabifyData(__VOCABIFY_WORD__);
  definitionText = await getVocabifyData(__VOCABIFY_DEFINITION__);

  wordText = getValueOrFallbackFromStore({
    response: wordText,
    key: __VOCABIFY_WORD__,
    fallback: __VOCABIFY_NO_WORD_SELECTED__
  });

  definitionText = getValueOrFallbackFromStore({
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
  let items = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);

  items = getValueOrFallbackFromStore({
    response: items,
    key: __VOCABIFY_SAVED_ITEMS__,
    fallback: []
  });

  let currentWord = await getVocabifyData(__VOCABIFY_WORD__);
  let currentDefinition = await getVocabifyData(__VOCABIFY_DEFINITION__);

  if (
    isEmptyObject(currentWord) ||
    isEmptyString(currentWord[__VOCABIFY_WORD__]) ||
    !isFourHundredCharactersOrLess(currentWord[__VOCABIFY_WORD__]) ||
    !isTwoCharactersOrMore(currentWord[__VOCABIFY_WORD__])
  ) {
    return;
  }

  if (
    isEmptyObject(currentDefinition) ||
    isEmptyString(currentDefinition[__VOCABIFY_DEFINITION__]) ||
    !isFourHundredCharactersOrLess(currentDefinition[__VOCABIFY_DEFINITION__]) ||
    !isTwoCharactersOrMore(currentDefinition[__VOCABIFY_DEFINITION__])
  ) {
    return;
  }

  let item = {
    word: currentWord[__VOCABIFY_WORD__],
    definition: currentDefinition[__VOCABIFY_DEFINITION__]
  };

  items = addToItems(item, items);
  await saveItem(__VOCABIFY_SAVED_ITEMS__, items, setVocabifyData);

  wordText = toEmptyString(wordText);
  definitionText = toEmptyString(definitionText);

  await resetPopupAfterSave(word, definition, setVocabifyData);
  
});

word.addEventListener('input', onPopupManualTextUpdate.setEditState);
definition.addEventListener('input', onPopupManualTextUpdate.setEditState);

word.addEventListener('blur', async function() {
  await onPopupManualTextUpdate.onBlur(
    word.textContent,
    __VOCABIFY_WORD__,
    word,
    __VOCABIFY_NO_WORD_SELECTED__,
    setVocabifyData
  );
});

definition.addEventListener('blur', async function() {
  await onPopupManualTextUpdate.onBlur(
    definition.textContent,
    __VOCABIFY_DEFINITION__,
    definition,
    __VOCABIFY_NO_DEFINITION_SELECTED__,
    setVocabifyData
  );
});

popupInitialise();
