export const __VOCABIFY_WORD__ = '__VOCABIFY_WORD__';
export const __VOCABIFY_DEFINITION__ = '__VOCABIFY_DEFINITION__';
export const __VOCABIFY_SAVED_ITEMS__ = '__VOCABIFY_SAVED_ITEMS__';
export const __VOCABIFY_NO_WORD_SELECTED__ = 'Choose a word';
export const __VOCABIFY_NO_DEFINITION_SELECTED__ = 'Find a definiton';
export const __VOCABIFY_NO_SAVED_ITEMS__ = 'Find a definiton';
export const __VOCABIFY_SET_SELECTED_TEXT__ = 'SET_SELECTED_TEXT';
export const __VOCABIFY_GET_SELECTED_TEXT__ = 'GET_SELECTED_TEXT';

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

export function addToItems(item, items) {
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

export async function reset(wordElement, definitionElement, callback) {

  await callback(__VOCABIFY_WORD__, '');
  await callback(__VOCABIFY_DEFINITION__, '');

  setPlaceholderText(wordElement, __VOCABIFY_NO_WORD_SELECTED__);
  setPlaceholderText(definitionElement, __VOCABIFY_NO_DEFINITION_SELECTED__);

}

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
    chrome.storage.sync.get([`${key}`], function(response) {
      resolve(response);
    });
  });
}

export function getHighlightedText() {
  let highlighted = window.getSelection().toString();
  if (!isFourHundredCharactersOrLess(highlighted) || !isTwoCharactersOrMore(highlighted)) {
    return false;
  }
  return { action: __VOCABIFY_SET_SELECTED_TEXT__, data: highlighted };
}

export function getValueOrFallback({response, key, fallback}) {
  if (!Object.keys(response).length || response[key] === '') {
    response = fallback;
  } else {
    response = response[key];
  }
  return response;
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

export const onManualUpdate = (function() {
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