import {
  __VOCABIFY_WORD__,
  __VOCABIFY_DEFINITION__,
  __VOCABIFY_SAVED_ITEMS__,
  __VOCABIFY_NO_WORD_SELECTED__,
  __VOCABIFY_NO_DEFINITION_SELECTED__,
  getSelectedText,
  setVocabifyData,
  getVocabifyData
} from './utils';

const word = document.getElementById('word');
const definition = document.getElementById('definition');

let wordText;
let definitionText;
let isEditing = false;

function setPlaceholderText(placeholder, text) {
  placeholder.textContent = text;
}

function getInitialTextValue(result, key, fallback) {
  if (!Object.keys(result).length || result[key] === '') {
    result = fallback;
  } else {
    result = result[key];
  }
  return result;
}

async function popupInitialise() {

  wordText = await getVocabifyData(__VOCABIFY_WORD__);
  definitionText = await getVocabifyData(__VOCABIFY_DEFINITION__);

  wordText = getInitialTextValue(wordText, __VOCABIFY_WORD__, __VOCABIFY_NO_WORD_SELECTED__);
  definitionText = getInitialTextValue(definitionText, __VOCABIFY_DEFINITION__, __VOCABIFY_NO_DEFINITION_SELECTED__);  

  console.log('pre', wordText, definitionText);

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

  if (!Object.keys(items).length) {
    items = [];
  } else {
    items = items[__VOCABIFY_SAVED_ITEMS__];
  }

  let currentWord = await getVocabifyData(__VOCABIFY_WORD__);
  let currentDefinition = await getVocabifyData(__VOCABIFY_DEFINITION__);

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

word.addEventListener('input', function() {
  isEditing = true;
});

word.addEventListener('blur', async function() {
  if (isEditing) {
    wordText = word.textContent;
    await setVocabifyData(__VOCABIFY_WORD__, wordText);
    isEditing = false;
  }
});

definition.addEventListener('input', function() {
  isEditing = true;
});

definition.addEventListener('blur', async function() {
  if (isEditing) {
    definitionText = definition.textContent;
    await setVocabifyData(__VOCABIFY_DEFINITION__, definitionText);
    isEditing = false;
  }
});

popupInitialise();