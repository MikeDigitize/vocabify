import {
  getValueFromStoreResponse,
  onPopupManualTextUpdate,
  isEmptyObject,
  isEmptyString,
  isFourHundredCharactersOrLess,
  isTwoCharactersOrMore,
  addToItems,
  saveItem,
  toEmptyString,
  resetPopupAfterSave
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



describe(`Popup tests - 
        getValueFromStoreResponse is called with any word, definition and result values saved in storage (even when no results) 
        to populate the popup with upon opening.
        It gets passed the object that comes back from storage, 
        the key to access the value and a fallback to use if there were no results found`, function() {
  it(`...getValueFromStoreResponse should fallback to the default message if an empty object is returned back from storage`, function() {
    let response = {};
    let wordText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(__VOCABIFY_NO_WORD_SELECTED__);

    response = {};
    let definitionText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(__VOCABIFY_NO_DEFINITION_SELECTED__);

    response = {};
    let savedItems = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(__VOCABIFY_NO_SAVED_ITEMS__);
  });

  it(`...getValueFromStoreResponse for the word should fallback to the default message if an empty string is returned back from storage`, function() {
    let response = {};
    response[__VOCABIFY_WORD__] = '';
    let wordText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(__VOCABIFY_NO_WORD_SELECTED__);

    response = {};
    response[__VOCABIFY_DEFINITION__] = '';
    let definitionText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(__VOCABIFY_NO_DEFINITION_SELECTED__);

    response = {};
    response[__VOCABIFY_SAVED_ITEMS__] = '';
    let savedItems = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(__VOCABIFY_NO_SAVED_ITEMS__);
  });

  it(`...getValueFromStoreResponse should return the saved word, defintion or results if returned back from storage`, function() {
    let response = {};
    let word = 'Some word';
    response[__VOCABIFY_WORD__] = word;
    let wordText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(word);

    response = {};
    let definition = 'Some definition';
    response[__VOCABIFY_DEFINITION__] = definition;
    let definitionText = getValueFromStoreResponse({
      response,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(definition);

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

describe(`onPopupManualTextUpdate tests - handle the manual editing of the word and definition text.
  Should only fire if the elements have had focus first.
  Should only save the word within if it's between 2-400 characters and isn't the default text for either.
  If it is any of the above, the text content is set to the default and an empty string is saved.
  The empty string ensure it won't be saved if a user attempts to`, function() {
  it('...should not update if onFocus has not first been called before onBlur is called', async function() {
    let text = 'Word';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });

    let result = await onPopupManualTextUpdate.onBlur(text, key, p, fallback, callback);
    expect(result).toBe(false);

    onPopupManualTextUpdate.onFocus();
    result = await onPopupManualTextUpdate.onBlur(text, key, p, fallback, callback);
    expect(result).toBeTruthy();

    result = await onPopupManualTextUpdate.onBlur(text, key, p, fallback, callback);
    expect(result).toBe(false);
  });

  it('...should update if a word between 2 and 400 characters is in the text field', async function() {
    onPopupManualTextUpdate.onFocus();

    let text = 'Word';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await onPopupManualTextUpdate.onBlur(text, key, p, fallback, callback);

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.results[0].value).toBe(text);
    expect(result).toBe(text);
    expect(p.textContent).toBe('');
  });

  it('...should update with an empty string if a word less than 2 or more than 400 characters is in the text field', async function() {
    onPopupManualTextUpdate.onFocus();

    let text = '';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await onPopupManualTextUpdate.onBlur(text, key, p, fallback, callback);

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
    result = await onPopupManualTextUpdate.onBlur(text, key, p, fallback, callback);

    expect(callback.mock.calls).toHaveLength(2);
    expect(callback.mock.results[1].value).toBe('');
    expect(result).toBe('');
    expect(p.textContent).toBe(fallback);
  });

  it('...should update with an empty string if a default word is in the text field', async function() {
    onPopupManualTextUpdate.onFocus();

    let text = __VOCABIFY_NO_WORD_SELECTED__;
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await onPopupManualTextUpdate.onBlur(text, key, p, fallback, callback);

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.results[0].value).toBe('');
    expect(result).toBe('');
    expect(p.textContent).toBe(fallback);

    text = __VOCABIFY_NO_DEFINITION_SELECTED__;
    fallback = __VOCABIFY_NO_DEFINITION_SELECTED__;

    onPopupManualTextUpdate.onFocus();
    result = await onPopupManualTextUpdate.onBlur(
      text,
      key,
      p,
      __VOCABIFY_NO_DEFINITION_SELECTED__,
      callback
    );

    expect(callback.mock.calls).toHaveLength(2);
    expect(callback.mock.results[1].value).toBe('');
    expect(result).toBe('');
    expect(p.textContent).toBe(fallback);
  });
});

describe(`Save tests - save should only occur if -
    the item in storage is not an empty object (i.e. not used the popup at all)
    the item is not an empty string
    the item is not the default
    the item is not less than 2 or more than 400 characters.
    If successfully saved the word and definition should return to an empty string
    and the defaults displayed to the user`, function() {
  it(`...isEmptyObject should return true when empty and false when not`, function() {
    let obj = {};
    expect(isEmptyObject(obj)).toBeTruthy();
    obj.items = [];
    expect(isEmptyObject(obj)).toBeFalsy();
  });

  it(`...isEmptyString should return true when empty and false when not`, function() {
    let str = '';
    expect(isEmptyString(str)).toBeTruthy();
    str = 'Not empty';
    expect(isEmptyString(str)).toBeFalsy();
  });

  it('...addToItems should add an item to the array and return it', function() {
    let word = 'Word';
    let definition = 'A single distinct meaningful element of speech or writing';
    let items = [];
    let result = addToItems({ word, definition, items});
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('word', word);
    expect(result[0]).toHaveProperty('definition', definition);
  });

  it('...isFourHundredCharactersOrLess should return true if string is less than 400 or false if more', function() {
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

  it('...isTwoCharactersOrMore should return true if string is more than 2 or characters or false if less', function() {
    let str = 'aa'
    expect(isTwoCharactersOrMore(str)).toBe(true);
    str = '';
    expect(isTwoCharactersOrMore(str)).toBe(false);
  });

  it(`...saveItem should add word and definition as an object to the array and save to storage`, async function() {
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
    let result = await saveItem(key, items, callback);

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.calls[0][0]).toBe(key);
    expect(callback.mock.calls[0][1]).toBe(items);
    expect(callback.mock.results[0].value).toMatchObject(response);
    expect(result).toMatchObject(response);
  });

  it('...resetPopupAfterSave should resetPopupAfterSave the word and definition, save both and set placeholder text to default', async function() {

    let callback = jest.fn(function(key, value) {
      return value;
    });

    let word = 'Word';
    let definition = 'A single distinct meaningful element of speech or writing';

    let pWord = document.createElement('p');
    pWord.textContent = word;

    let pDefinition = document.createElement('p');
    pDefinition.textContent = definition;

    expect(toEmptyString(word)).toBe('');
    expect(toEmptyString(definition)).toBe('');

    await resetPopupAfterSave(pWord, pDefinition, callback);

    expect(callback.mock.calls).toHaveLength(2);
    expect(callback.mock.results[0].value).toBe('');
    expect(callback.mock.results[1].value).toBe('');
    expect(pWord.textContent).toBe(__VOCABIFY_NO_WORD_SELECTED__);
    expect(pDefinition.textContent).toBe(__VOCABIFY_NO_DEFINITION_SELECTED__);

  });

});
