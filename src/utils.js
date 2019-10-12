export const __VOCABIFY_WORD__ = '__VOCABIFY_WORD__';
export const __VOCABIFY_DEFINITION__ = '__VOCABIFY_DEFINITION__';
export const __VOCABIFY_SAVED_ITEMS__ = '__VOCABIFY_SAVED_ITEMS__';
export const __VOCABIFY_NO_WORD_SELECTED__ = 'Choose a word';
export const __VOCABIFY_NO_DEFINITION_SELECTED__ = 'Find a definiton';
export const __VOCABIFY_SET_SELECTED_TEXT__ = 'SET_SELECTED_TEXT';
export const __VOCABIFY_GET_SELECTED_TEXT__ = 'GET_SELECTED_TEXT';

export function getSelectedText() {
  return new Promise(function(resolve) {
    chrome.runtime.sendMessage({ action: 'GET_SELECTED_TEXT' }, function(response) {
      resolve(response.data);
    });
  });
}

export function setVocabifyData(key, value) {
  return new Promise(function(resolve) {
    let store = {};
    store[key] = value;
    chrome.storage.sync.set(store, function() {
      resolve(value);
    });
  });
}

export function getVocabifyData(key) {
  return new Promise(function(resolve) {
    chrome.storage.sync.get([`${key}`], function(result) {
      resolve(result);
    });
  });
}

// console.log(chrome.runtime.getURL('popup.html'));