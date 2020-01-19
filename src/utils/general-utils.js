import { 
  __VOCABIFY_NO_WORD_SELECTED__,
  __VOCABIFY_NO_DEFINITION_SELECTED__,
  __VOCABIFY_SAVED_ITEMS__
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

export function updateItems({ type, originalText, newText, items }) {
  let updatedItems = items.map(function(item) {
    if(item[type] === originalText) {
      item[type] = newText;
    }
    return item;
  });
  return updatedItems;
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

export function isDuplicateWord(savedItems, word) {
  let isPresent = savedItems.some(function(item) {
    return item.word.toUpperCase() === word.toUpperCase();
  });
  return isPresent;
}

export function sortAlphabetically(items) {
  return items.sort((a, b) => a.word.localeCompare(b.word))
}

export function filterSearchItems(searchTerm, items) {
  switch(searchTerm) {
    case '':
      return [];
    default:
      let reg = new RegExp(`^${searchTerm}`, 'i');
      let matches = sortAlphabetically(items.filter(item => reg.test(item.word)));
      return matches;
  }
  
}

export async function validateAndSaveWord({
  originalText,
  newText,
  dispatcher,
  currentItems
}) {

  if(!isDuplicateWord(currentItems, newText)) {
    
    let totalItems;

    /**
     * get all the items from storage 
     */
    if (typeof window.chrome !== 'undefined' && typeof window.chrome.storage !== 'undefined') {
      totalItems = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);
      totalItems = totalItems[__VOCABIFY_SAVED_ITEMS__];
    }
    /**
     * grab them from the window if local
     */
    else {
      totalItems = window[__VOCABIFY_SAVED_ITEMS__];
    }

    currentItems = updateItems({
      type: 'word',
      originalText: originalText,
      newText: capitaliseFirstLetter(newText),
      items: currentItems
    });

    totalItems = updateItems({
      type: 'word',
      originalText: originalText,
      newText: capitaliseFirstLetter(newText),
      items: totalItems
    });

    /**
     * set items 
     */
    if (typeof window.chrome !== 'undefined' && typeof window.chrome.storage !== 'undefined') {
      await setVocabifyData(__VOCABIFY_SAVED_ITEMS__, totalItems);
    }
    else {
      window[__VOCABIFY_SAVED_ITEMS__] = totalItems;
    }

    console.log('---update word: current and total items---');
    console.log('updated current items', currentItems);
    console.log('totalItems', totalItems);
    
    dispatcher({ 
      type: 'on-word-edit', 
      state: { 
        items: currentItems,
        success: true 
      }
    });

  }
  else {
    dispatcher({ 
      type: 'on-word-edit', 
      state: { 
        success: false,
        newText 
      }
    });
  }

}

export async function validateAndSaveDefinition({
  originalText,
  newText,
  dispatcher,
  currentItems
}) {

  let totalItems;

  if (typeof window.chrome !== 'undefined' && typeof window.chrome.storage !== 'undefined') {
    totalItems = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);
    totalItems = totalItems[__VOCABIFY_SAVED_ITEMS__];
  }
  else {
    totalItems = window[__VOCABIFY_SAVED_ITEMS__];
  }

  currentItems = updateItems({
    type: 'definition',
    originalText: originalText,
    newText: addFullStop(capitaliseFirstLetter(newText)),
    items: currentItems
  });

  totalItems = updateItems({
    type: 'definition',
    originalText: originalText,
    newText: addFullStop(capitaliseFirstLetter(newText)),
    items: totalItems
  });

  if (typeof window.chrome !== 'undefined' && typeof window.chrome.storage !== 'undefined') {
    await setVocabifyData(__VOCABIFY_SAVED_ITEMS__, totalItems);
  }
  else {
    window[__VOCABIFY_SAVED_ITEMS__] = totalItems;
  }

  console.log('---update definition: current and total items---');
  console.log('updated current items', currentItems);
  console.log('totalItems', totalItems);
  
  dispatcher({ 
    type: 'on-definition-edit', 
    state: { 
      items: currentItems 
    }
  });

}

export function removeItem(word, items) {
  return items.filter(item => item.word.toUpperCase() !== word.toUpperCase());
}

export async function removeItemFromSavedData({
  wordToDelete,
  currentItems,
  dispatcher
}) {

  let totalItems;

  if (typeof window.chrome !== 'undefined' && typeof window.chrome.storage !== 'undefined') {
    totalItems = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);
    totalItems = totalItems[__VOCABIFY_SAVED_ITEMS__];
  }
  else {
    totalItems = window[__VOCABIFY_SAVED_ITEMS__];
  }

  totalItems = removeItem(wordToDelete, totalItems);
  currentItems = removeItem(wordToDelete, currentItems);

  if (typeof window.chrome !== 'undefined' && typeof window.chrome.storage !== 'undefined') {
    await setVocabifyData(__VOCABIFY_SAVED_ITEMS__, totalItems);
  }
  else {
    window[__VOCABIFY_SAVED_ITEMS__] = totalItems;
  }

  dispatcher({ type: 'on-delete-item-response', state: { delete: true, wordToDelete, currentItems } });

}