import {
  getValueFromStoreResponse,
  manualEditHandler,
  resetPopupAfterSave
} from '../utils/popup-utils';

import { saveItem } from '../utils/general-utils';

import {
  __VOCABIFY_SET_SELECTED_TEXT__,
  __VOCABIFY_GET_SELECTED_TEXT__,
  __VOCABIFY_WORD__,
  __VOCABIFY_NO_WORD_SELECTED__,
  __VOCABIFY_DEFINITION__,
  __VOCABIFY_NO_DEFINITION_SELECTED__,
  __VOCABIFY_SAVED_ITEMS__,
  __VOCABIFY_NO_SAVED_ITEMS__
} from '../utils/constants';

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
    manualEditHandler handles the manual editing of the word and definition text.`, function() {

  test(`...manualEditHandler should not update if the element has not had focus, and update if it has`, async function() {

    let text = 'Word';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });

    // no focus has been set
    let result = await manualEditHandler.onBlur({
      text,
      key,
      element: p,
      fallback,
      callback
    });
    
    expect(result).toBe(false);

    // set focus
    manualEditHandler.onFocus();

    result = await manualEditHandler.onBlur({ text, key, element: p, fallback, callback });
    expect(result).toBeTruthy();

    // focus has not been set after updating
    result = await manualEditHandler.onBlur({ text, key, element: p, fallback, callback });
    expect(result).toBe(false);
  });

  test('...should update if a word between 2 and 400 characters is in the text field', async function() {

    manualEditHandler.onFocus();

    let text = 'Word';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await manualEditHandler.onBlur({
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

    manualEditHandler.onFocus();

    let text = '';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await manualEditHandler.onBlur({
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

    manualEditHandler.onFocus();
    result = await manualEditHandler.onBlur({ text, key, element: p, fallback, callback });

    expect(callback.mock.calls).toHaveLength(2);
    expect(callback.mock.results[1].value).toBe('');
    expect(result).toBe('');
    expect(p.textContent).toBe(fallback);

  });

  test('...should update with an empty string if a default word is in the text field', async function() {

    manualEditHandler.onFocus();

    let text = __VOCABIFY_NO_WORD_SELECTED__;
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await manualEditHandler.onBlur({
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

    manualEditHandler.onFocus();
    result = await manualEditHandler.onBlur({
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
  `The popup saves the word and definition if both meet the requirements for save.
    If successfully saved the word and definition should return to an empty string and the defaults displayed to the user`, function() {

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