import { 
    isDefaultText, 
    isTwoCharactersOrMore, 
    isFourHundredCharactersOrLess,
    isEmptyObject,
    isEmptyString,
    setPlaceholderText 
} from './general-utils';

import {
    __VOCABIFY_GET_SELECTED_TEXT__,
    __VOCABIFY_SET_SELECTED_TEXT__,
    __VOCABIFY_WORD__,
    __VOCABIFY_DEFINITION__,
    __VOCABIFY_NO_WORD_SELECTED__,
    __VOCABIFY_NO_DEFINITION_SELECTED__
} from './constants';


export function getSelectedTextFromBackground() {
  return new Promise(function(resolve) {
    chrome.runtime.sendMessage({ action: __VOCABIFY_GET_SELECTED_TEXT__ }, function(response) {
      resolve(response.data);
    });
  });
}

export function setValueFromStoreResponse({ response, key, fallback }) {
  if (isEmptyObject(response) || isEmptyString(response[key])) {
    response = fallback;
  } else {
    response = response[key];
  }
  return response;
}

export async function resetPopupAfterSave({ word, definition, callback }) {
  await callback(__VOCABIFY_WORD__, '');
  await callback(__VOCABIFY_DEFINITION__, '');

  setPlaceholderText(word, __VOCABIFY_NO_WORD_SELECTED__);
  setPlaceholderText(definition, __VOCABIFY_NO_DEFINITION_SELECTED__);
}

export const manualEditHandler = (function() {
  let isEditing = false;
  return {
    setEditState(state = true) {
      isEditing = state;
    },
    onFocus() {
      this.setEditState();
    },
    async onBlur({ text, key, element, fallback, callback }) {
      if (isEditing) {
        this.setEditState(false);
        if (
          !isDefaultText(text) &&
          isTwoCharactersOrMore(text) &&
          isFourHundredCharactersOrLess(text)
        ) {
          return await callback(key, text);
        } else {
          element.textContent = fallback;
          return await callback(key, '');
        }
      }
      return false;
    }
  };
})();
