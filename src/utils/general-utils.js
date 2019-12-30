import { 
  __VOCABIFY_NO_WORD_SELECTED__,
  __VOCABIFY_NO_DEFINITION_SELECTED__
} from '../utils/constants';


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

export async function saveItem({ key, items, callback }) {
  return await callback(key, items);
}

export function setPlaceholderText(placeholder, text) {
  placeholder.textContent = text;
}

export function toEmptyString(str) {
  str = '';
  return str;
}

export function capitaliseFirstLetter(str) {
  if(!str.length) {
    return false;
  }
  const firstLetter = str[0];
  return `${firstLetter.toUpperCase()}${str.substring(1, str.length)}`;
}

export function addFullStop(str) {
  if(!str.length) {
    return false;
  }
  const lastChar = str.charAt(str.length - 1);
  if(lastChar === '.') {
    return str;
  }
  return `${str}.`;
}
