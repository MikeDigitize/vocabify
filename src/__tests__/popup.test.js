import {
  getValueFromStoreResponse,
  onPopupManualTextUpdate,
  isEmptyObject,
  isEmptyString,
  isFourHundredCharactersOrLess,
  isTwoCharactersOrMore,
  isDefaultText,
  addToItems,
  saveItem,
  toEmptyString,
  resetPopupAfterSave,
  setPlaceholderText
} from '../utils';

import {
  __VOCABIFY_SET_SELECTED_TEXT__,
  __VOCABIFY_GET_SELECTED_TEXT__,
  __VOCABIFY_WORD__,
  __VOCABIFY_NO_WORD_SELECTED__,
  __VOCABIFY_DEFINITION__,
  __VOCABIFY_NO_DEFINITION_SELECTED__,
  __VOCABIFY_SAVED_ITEMS__,
  __VOCABIFY_NO_SAVED_ITEMS__
} from '../constants';

describe(
  `When the popup loads, it will check storage for a word or defintion to populate the popup.
    Chrome extension popups do not persist state in HTML - which is why state needs storing 
    and why the check needs to be done every time it's opened.
    Responses from the store are passed to getValueFromStoreResponse to handle all possible responses -
    Nothing has been saved.
    An empty string is saved.
    A string which meets the acceptance criteria is saved.`, function() {

  test(`...getValueFromStoreResponse should fallback to the default if an empty object is returned back from storage`, function() {
    
    // word
    let response = {};
    let wordText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(__VOCABIFY_NO_WORD_SELECTED__);

    // definition
    response = {};
    let definitionText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(__VOCABIFY_NO_DEFINITION_SELECTED__);

    // saved items
    response = {};
    let savedItems = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(__VOCABIFY_NO_SAVED_ITEMS__);
  });

  test(`...getValueFromStoreResponse for the word should fallback to the default message if an empty string is returned back from storage`, function() {
    
    // word
    let response = {};
    response[__VOCABIFY_WORD__] = '';
    let wordText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(__VOCABIFY_NO_WORD_SELECTED__);

    // definition
    response = {};
    response[__VOCABIFY_DEFINITION__] = '';
    let definitionText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(__VOCABIFY_NO_DEFINITION_SELECTED__);

    // saved items 
    response = {};
    response[__VOCABIFY_SAVED_ITEMS__] = '';
    let savedItems = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(__VOCABIFY_NO_SAVED_ITEMS__);
  });

  test(`...getValueFromStoreResponse should return the saved word, defintion or results if returned back from storage`, function() {

    // word
    let response = {};
    let word = 'Some word';
    response[__VOCABIFY_WORD__] = word;
    let wordText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(word);

    // definition
    response = {};
    let definition = 'Some definition';
    response[__VOCABIFY_DEFINITION__] = definition;
    let definitionText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(definition);

    // saved items
    response = {};
    let items = [{ word: 'Some word', definition: 'Some definition' }];
    response[__VOCABIFY_SAVED_ITEMS__] = items;
    let savedItems = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(items);
  });
});

describe(
  `The popup allows you to manually edit the word or definition.
    onPopupManualTextUpdate handles the manual editing of the word and definition text.`, function() {

  test(`...onPopupManualTextUpdate should not update if the element has not had focus, and update if it has`, async function() {

    let text = 'Word';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });

    // no focus has been set
    let result = await onPopupManualTextUpdate.onBlur({
      text,
      key,
      element: p,
      fallback,
      callback
    });
    
    expect(result).toBe(false);

    // set focus
    onPopupManualTextUpdate.onFocus();

    result = await onPopupManualTextUpdate.onBlur({ text, key, element: p, fallback, callback });
    expect(result).toBeTruthy();

    // focus has not been set after updating
    result = await onPopupManualTextUpdate.onBlur({ text, key, element: p, fallback, callback });
    expect(result).toBe(false);
  });

  test('...should update if a word between 2 and 400 characters is in the text field', async function() {

    onPopupManualTextUpdate.onFocus();

    let text = 'Word';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await onPopupManualTextUpdate.onBlur({
      text,
      key,
      element: p,
      fallback,
      callback
    });

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.results[0].value).toBe(text);
    expect(result).toBe(text);
    expect(p.textContent).toBe('');

  });

  test('...should update with an empty string if a word less than 2 or more than 400 characters is in the text field', async function() {

    onPopupManualTextUpdate.onFocus();

    let text = '';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await onPopupManualTextUpdate.onBlur({
      text,
      key,
      element: p,
      fallback,
      callback
    });

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.results[0].value).toBe('');
    expect(result).toBe(text);
    expect(p.textContent).toBe(fallback);

    text = '';
    for (let i = 0; i < 401; i++) {
      text += 'a';
    }

    fallback = __VOCABIFY_NO_DEFINITION_SELECTED__;

    onPopupManualTextUpdate.onFocus();
    result = await onPopupManualTextUpdate.onBlur({ text, key, element: p, fallback, callback });

    expect(callback.mock.calls).toHaveLength(2);
    expect(callback.mock.results[1].value).toBe('');
    expect(result).toBe('');
    expect(p.textContent).toBe(fallback);

  });

  test('...should update with an empty string if a default word is in the text field', async function() {

    onPopupManualTextUpdate.onFocus();

    let text = __VOCABIFY_NO_WORD_SELECTED__;
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await onPopupManualTextUpdate.onBlur({
      text,
      key,
      element: p,
      fallback,
      callback
    });

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.results[0].value).toBe('');
    expect(result).toBe('');
    expect(p.textContent).toBe(fallback);

    text = __VOCABIFY_NO_DEFINITION_SELECTED__;
    fallback = __VOCABIFY_NO_DEFINITION_SELECTED__;

    onPopupManualTextUpdate.onFocus();
    result = await onPopupManualTextUpdate.onBlur({
      text,
      key,
      element: p,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__,
      callback
    });

    expect(callback.mock.calls).toHaveLength(2);
    expect(callback.mock.results[1].value).toBe('');
    expect(result).toBe('');
    expect(p.textContent).toBe(fallback);

  });
});

describe(
  `The popup lets you save the word and definition.
    Save should only occur if -
    the item in storage is not an empty object (i.e. not used the popup at all)
    the item is not an empty string
    the item is not the default
    the item is not less than 2 or more than 400 characters.
    If successfully saved the word and definition should return to an empty string
    and the defaults displayed to the user`, function() {

  test(`...isEmptyObject should return true when empty and false when not`, function() {
    let obj = {};
    expect(isEmptyObject(obj)).toBeTruthy();
    obj.items = [];
    expect(isEmptyObject(obj)).toBeFalsy();
  });

  test(`...isEmptyString should return true when empty and false when not`, function() {
    let str = '';
    expect(isEmptyString(str)).toBeTruthy();
    str = 'Not empty';
    expect(isEmptyString(str)).toBeFalsy();
  });

  test(`...isDefaultText should return true if a string passed matches one of the defaults`, function() {
    expect(isDefaultText(__VOCABIFY_NO_WORD_SELECTED__)).toBe(true);
    expect(isDefaultText(__VOCABIFY_NO_DEFINITION_SELECTED__)).toBe(true);
    expect(isDefaultText(__VOCABIFY_WORD__)).toBe(false);
    expect(isDefaultText(__VOCABIFY_DEFINITION__)).toBe(false);
  });

  test('...isFourHundredCharactersOrLess should return true if string is less than 400 or false if more', function() {
    let str = '';
    for (let i = 0; i < 400; i++) {
      str += 'a';
    }
    expect(isFourHundredCharactersOrLess(str)).toBe(true);
    str = '';
    for (let i = 0; i < 401; i++) {
      str += 'a';
    }
    expect(isFourHundredCharactersOrLess(str)).toBe(false);
  });

  test('...isTwoCharactersOrMore should return true if string is more than 2 or characters or false if less', function() {
    let str = 'aa';
    expect(isTwoCharactersOrMore(str)).toBe(true);
    str = '';
    expect(isTwoCharactersOrMore(str)).toBe(false);
  });

  test('...addToItems should add an item to the array and return it', function() {
    let word = 'Word';
    let definition = 'A single distinct meaningful element of speech or writing';
    let items = [];
    let result = addToItems({ word, definition, items });
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('word', word);
    expect(result[0]).toHaveProperty('definition', definition);
  });

  test(`...saveItem should add word and definition as an object to the array and save to storage`, async function() {

    let key = __VOCABIFY_SAVED_ITEMS__;
    let items = [
      { word: 'Word', definition: 'A single distinct meaningful element of speech or writing' }
    ];

    let response = {};
    response[key] = items;

    let callback = jest.fn(function(key, value) {
      let obj = {};
      obj[key] = value;
      return obj;
    });
    
    let result = await saveItem({ key, items, callback });

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.calls[0][0]).toBe(key);
    expect(callback.mock.calls[0][1]).toBe(items);
    expect(callback.mock.results[0].value).toMatchObject(response);
    expect(result).toMatchObject(response);

  });

  test('...resetPopupAfterSave should reset the word and definition, save both as empty strings and set placeholder text to default', async function() {
    
    let callback = jest.fn(function(key, value) {
      return value;
    });

    let word = 'Word';
    let definition = 'A single distinct meaningful element of speech or writing';

    let pWord = document.createElement('p');
    pWord.textContent = word;

    let pDefinition = document.createElement('p');
    pDefinition.textContent = definition;

    await resetPopupAfterSave({ word: pWord, definition: pDefinition, callback });

    expect(callback.mock.calls).toHaveLength(2);
    expect(callback.mock.results[0].value).toBe('');
    expect(callback.mock.results[1].value).toBe('');
    expect(pWord.textContent).toBe(__VOCABIFY_NO_WORD_SELECTED__);
    expect(pDefinition.textContent).toBe(__VOCABIFY_NO_DEFINITION_SELECTED__);

  });
});