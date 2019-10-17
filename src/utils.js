import { 
  __VOCABIFY_NO_WORD_SELECTED__,
  __VOCABIFY_WORD__,
  __VOCABIFY_DEFINITION__,
  __VOCABIFY_NO_DEFINITION_SELECTED__,
  __VOCABIFY_SAVED_ITEMS__,
  __VOCABIFY_NO_SAVED_ITEMS__,
  __VOCABIFY_SET_SELECTED_TEXT__,
  __VOCABIFY_GET_SELECTED_TEXT__
} from './constants';

export function isDefaultText(text) {
  return text === __VOCABIFY_NO_WORD_SELECTED__ || text === __VOCABIFY_NO_DEFINITION_SELECTED__;
}

export function isTwoCharactersOrMore(text) {
  return text.length >= 2;
}

export function isFourHundredCharactersOrLess(text) {
  return text.length <= 400;
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

export function isEmptyString(str) {
  return str.length === 0;
}

export function addToItems({ word, definition, items }) {
  let item = {
    word,
    definition
  };
  return items.concat(item);
}

export async function saveItem(key, items, callback) {
  return await callback(key, items);
}

export function setPlaceholderText(placeholder, text) {
  placeholder.textContent = text;
}

export function toEmptyString(str) {
  str = '';
  return str;
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
    chrome.storage.sync.get([`${key}`], function(response) {
      resolve(response);
    });
  });
}

export function getSelectedTextFromBackground() {
  return new Promise(function(resolve) {
    chrome.runtime.sendMessage({ action: __VOCABIFY_GET_SELECTED_TEXT__ }, function(response) {
      resolve(response.data);
    });
  });
}

export function getHighlightedTextFromActiveTab() {
  let highlighted = window.getSelection().toString();
  if (!isFourHundredCharactersOrLess(highlighted) || !isTwoCharactersOrMore(highlighted)) {
    return false;
  }
  return { action: __VOCABIFY_SET_SELECTED_TEXT__, data: highlighted };
}

export function getValueFromStoreResponse({response, key, fallback}) {
  if (isEmptyObject(response) || isEmptyString(response[key])) {
    response = fallback;
  } else {
    response = response[key];
  }
  return response;
}


export async function resetPopupAfterSave(word, definition, callback) {

  await callback(__VOCABIFY_WORD__, '');
  await callback(__VOCABIFY_DEFINITION__, '');

  setPlaceholderText(word, __VOCABIFY_NO_WORD_SELECTED__);
  setPlaceholderText(definition, __VOCABIFY_NO_DEFINITION_SELECTED__);

}

export const backgroundUtils = (function() {
  let selectedText = '';
  return {
    onNewSelectedText(msg) {
      if (msg.action === __VOCABIFY_SET_SELECTED_TEXT__) {
        selectedText = msg.data;
      }
      return selectedText;
    },
    onRequestForSelectedText(msg, _ignore, callback) {
      if (msg.action === __VOCABIFY_GET_SELECTED_TEXT__ && selectedText !== '') {
        callback({ data: selectedText });
        selectedText = '';
      }
      return selectedText;
    }
  } 
})();

export const onPopupManualTextUpdate = (function() {
  let isEditing = false;
  return {
    setEditState(state = true) {
      isEditing = state;
    },
    onFocus() {
      this.setEditState();
    },
    async onBlur(text, key, element, fallback, callback) {
      if (isEditing) {
        this.setEditState(false);
        if(!isDefaultText(text) && isTwoCharactersOrMore(text) && isFourHundredCharactersOrLess(text)) {
          return await callback(key, text);
        }
        else {
          element.textContent = fallback;
          return await callback(key, '');
        }
      }
      return false;
    }
  }

})();