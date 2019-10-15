import {
  __VOCABIFY_WORD__,
  __VOCABIFY_DEFINITION__,
  __VOCABIFY_SAVED_ITEMS__,
  __VOCABIFY_NO_WORD_SELECTED__,
  __VOCABIFY_NO_DEFINITION_SELECTED__,
  getSelectedText,
  setVocabifyData,
  getVocabifyData,
  getValueOrFallback,
  isDefaultText,
  isFourHundredCharactersOrLess,
  isTwoCharactersOrMore,
  onManualUpdate
} from './utils';

const word = document.getElementById('word');
const definition = document.getElementById('definition');

let wordText;
let definitionText;
let isEditing = false;

function setPlaceholderText(placeholder, text) {
  placeholder.textContent = text;
}

function setEditState(state = true) {
  isEditing = state;
}

async function popupInitialise() {

  wordText = await getVocabifyData(__VOCABIFY_WORD__);
  definitionText = await getVocabifyData(__VOCABIFY_DEFINITION__);

  wordText = getValueOrFallback({ 
    response: wordText, 
    key: __VOCABIFY_WORD__, 
    fallback: __VOCABIFY_NO_WORD_SELECTED__
  });

  definitionText = getValueOrFallback({
    response: definitionText,
    key: __VOCABIFY_DEFINITION__,
    fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
  });

  setPlaceholderText(word, wordText);
  setPlaceholderText(definition, definitionText);

}

document.getElementById('getWord').addEventListener('click', function() {
  getSelectedText().then(async function(data) {
    await setVocabifyData(__VOCABIFY_WORD__, data);
    setPlaceholderText(word, data);
  });
});

document.getElementById('getDefinition').addEventListener('click', function() {
  getSelectedText().then(async function(data) {
    await setVocabifyData(__VOCABIFY_DEFINITION__, data);
    setPlaceholderText(definition, data);
  });
});

document.getElementById('vocabify').addEventListener('click', function() {
  chrome.runtime.openOptionsPage();
});

document.getElementById('save').addEventListener('click', async function() {
  
  let items = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);

  items = getValueOrFallback({
    response: items, 
    key: __VOCABIFY_SAVED_ITEMS__, 
    fallback: []
  });

  let currentWord = await getVocabifyData(__VOCABIFY_WORD__);
  let currentDefinition = await getVocabifyData(__VOCABIFY_DEFINITION__);

  if(Object.keys(currentWord).length === 0 || currentWord[__VOCABIFY_WORD__] === '') {
    return;
  }

  if(Object.keys(currentDefinition).length === 0 || currentDefinition[__VOCABIFY_DEFINITION__] === '') {
    return;
  }

  let item = {
    word: currentWord[__VOCABIFY_WORD__],
    definition: currentDefinition[__VOCABIFY_DEFINITION__]
  };

  items.push(item);

  await setVocabifyData(__VOCABIFY_SAVED_ITEMS__, items);

  wordText = '';
  definitionText = '';

  await setVocabifyData(__VOCABIFY_WORD__, wordText);
  await setVocabifyData(__VOCABIFY_DEFINITION__, definitionText);

  setPlaceholderText(word, __VOCABIFY_NO_WORD_SELECTED__);
  setPlaceholderText(definition, __VOCABIFY_NO_DEFINITION_SELECTED__);

});

word.addEventListener('input', onManualUpdate.setEditState);
definition.addEventListener('input', onManualUpdate.setEditState);

word.addEventListener('blur', async function() {
  await onManualUpdate.onBlur(word.textContent, __VOCABIFY_WORD__, word, __VOCABIFY_NO_WORD_SELECTED__, setVocabifyData);
});

definition.addEventListener('blur', async function() {
  await onManualUpdate.onBlur(definition.textContent, __VOCABIFY_DEFINITION__, definition, __VOCABIFY_NO_DEFINITION_SELECTED__, setVocabifyData);
});

popupInitialise();
