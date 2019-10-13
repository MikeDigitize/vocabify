export const __VOCABIFY_WORD__ = '__VOCABIFY_WORD__';
export const __VOCABIFY_DEFINITION__ = '__VOCABIFY_DEFINITION__';
export const __VOCABIFY_SAVED_ITEMS__ = '__VOCABIFY_SAVED_ITEMS__';
export const __VOCABIFY_NO_WORD_SELECTED__ = 'Choose a word';
export const __VOCABIFY_NO_DEFINITION_SELECTED__ = 'Find a definiton';
export const __VOCABIFY_SET_SELECTED_TEXT__ = 'SET_SELECTED_TEXT';
export const __VOCABIFY_GET_SELECTED_TEXT__ = 'GET_SELECTED_TEXT';

export function getSelectedText() {
  return new Promise(function(resolve) {
    chrome.runtime.sendMessage({ action: __VOCABIFY_GET_SELECTED_TEXT__ }, function(response) {
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

export function getHighlightedText() {
  let highlighted = window.getSelection().toString();
  if (highlighted.length > 400 || highlighted.length < 2) {
    return false;
  }
  return { action: __VOCABIFY_SET_SELECTED_TEXT__, data: highlighted };
}

export const background = (function() {
  let selectedText = '';
  return {
    onNewSelectedText(msg) {
      if (msg.action === __VOCABIFY_SET_SELECTED_TEXT__) {
        selectedText = msg.data;
      }
      return selectedText;
    },
    onRequestForSelectedText(msg, callback) {
      if (msg.action === __VOCABIFY_GET_SELECTED_TEXT__ && selectedText !== '') {
        callback({ data: selectedText });
        selectedText = '';
      }
      return selectedText;
    }
  } 
})();


