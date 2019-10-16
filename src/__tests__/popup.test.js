import {
  getHighlightedText,
  __VOCABIFY_SET_SELECTED_TEXT__,
  background,
  __VOCABIFY_GET_SELECTED_TEXT__,
  __VOCABIFY_WORD__,
  __VOCABIFY_NO_WORD_SELECTED__,
  getValueOrFallback,
  __VOCABIFY_DEFINITION__,
  __VOCABIFY_NO_DEFINITION_SELECTED__,
  __VOCABIFY_SAVED_ITEMS__,
  __VOCABIFY_NO_SAVED_ITEMS__,
  onManualUpdate,
  isEmptyObject,
  isEmptyString,
  isFourHundredCharactersOrLess,
  isTwoCharactersOrMore,
  addToItems,
  saveItem,
  toEmptyString,
  reset
} from '../utils';

describe('getHighlightedText tests - note: JSDOM does not support window.getSelection', function() {
  const MOCKED_GET_SELECTION_RESPONSE = 'Some highlighted text';

  afterEach(function() {
    jest.clearAllMocks();
  });

  it('...should return an object with an action and data property when a string is captured between 2-400 characters', function() {
    window.getSelection = jest.fn().mockImplementation(function() {
      return {
        toString: jest.fn(function() {
          return MOCKED_GET_SELECTION_RESPONSE;
        })
      };
    });

    let result = getHighlightedText();
    expect(window.getSelection.mock.calls).toHaveLength(1);
    expect(result.data).toBe(MOCKED_GET_SELECTION_RESPONSE);
    expect(result.action).toBe(__VOCABIFY_SET_SELECTED_TEXT__);
  });

  it('...should return false if the highlighted text is less than 2 characters', function() {
    window.getSelection = jest.fn().mockImplementation(function() {
      return {
        toString: jest.fn(function() {
          return '';
        })
      };
    });

    let result = getHighlightedText();
    expect(window.getSelection.mock.calls).toHaveLength(1);
    expect(result).toBe(false);

    window.getSelection = jest.fn().mockImplementation(function() {
      return {
        toString: jest.fn(function() {
          return 'a';
        })
      };
    });

    result = getHighlightedText();
    expect(window.getSelection.mock.calls).toHaveLength(1);
    expect(result).toBe(false);

    window.getSelection = jest.fn().mockImplementation(function() {
      return {
        toString: jest.fn(function() {
          return 'aa';
        })
      };
    });

    result = getHighlightedText();
    expect(window.getSelection.mock.calls).toHaveLength(1);
    expect(result.data).toBe('aa');
  });

  it('...should return false if the highlighted text is over 400 characters', function() {
    let highlighted = '';
    for (let i = 0; i < 401; i++) {
      highlighted += 'a';
    }

    window.getSelection = jest.fn().mockImplementation(function() {
      return {
        toString: jest.fn(function() {
          return highlighted;
        })
      };
    });

    let result = getHighlightedText();
    expect(window.getSelection.mock.calls).toHaveLength(1);
    expect(result).toBe(false);

    highlighted = '';
    for (let i = 0; i < 400; i++) {
      highlighted += 'a';
    }

    window.getSelection = jest.fn().mockImplementation(function() {
      return {
        toString: jest.fn(function() {
          return highlighted;
        })
      };
    });

    result = getHighlightedText();
    expect(window.getSelection.mock.calls).toHaveLength(1);
    expect(result.data).toBe(highlighted);
  });
});

describe(`background is the middleman - 
    a util that listens for updates to highlighted text from the browser through onNewSelectedText 
    and listens for requests for highlighted texts from the popup through onRequestForSelectedText`, function() {
  afterEach(function() {
    let msg = {
      action: __VOCABIFY_SET_SELECTED_TEXT__,
      data: ''
    };

    background.onNewSelectedText(msg);
  });

  it(`...onNewSelectedText updates the highlighted text when passed the action ${__VOCABIFY_SET_SELECTED_TEXT__} and highlight data`, function() {
    let highlighted = 'Some text';

    let msg = {
      action: __VOCABIFY_SET_SELECTED_TEXT__,
      data: highlighted
    };

    let result = background.onNewSelectedText(msg);

    expect(result).toEqual(highlighted);
  });

  it(`...onNewSelectedText does not update if it doesn't receive the action ${__VOCABIFY_SET_SELECTED_TEXT__}`, function() {
    let highlighted = 'Some text';

    let msg = {
      action: __VOCABIFY_SET_SELECTED_TEXT__,
      data: highlighted
    };

    let result = background.onNewSelectedText(msg);

    let nextHighlighted = 'Some other text';
    msg = {
      action: __VOCABIFY_GET_SELECTED_TEXT__,
      data: nextHighlighted
    };

    result = background.onNewSelectedText(msg);

    expect(result).not.toEqual(nextHighlighted);
    expect(result).toEqual(highlighted);
  });

  it('...onRequestForSelectedText fires the callback with the highlighted word and resets the highlighted word to an empty string', function() {
    let highlighted = 'Some text';

    let msg = {
      action: __VOCABIFY_SET_SELECTED_TEXT__,
      data: highlighted
    };

    background.onNewSelectedText(msg);

    msg = {
      action: __VOCABIFY_GET_SELECTED_TEXT__
    };

    let callback = jest.fn(function() {
      return {
        data: highlighted
      };
    });

    let result = background.onRequestForSelectedText(msg, callback);

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.results[0].value.data).toBe(highlighted);
    expect(result).toBe('');
  });

  it(`...onRequestForSelectedText doesn't fire the callback if it doesn't receive the ${__VOCABIFY_GET_SELECTED_TEXT__} action`, function() {
    let msg = {
      action: __VOCABIFY_SET_SELECTED_TEXT__
    };

    let callback = jest.fn();

    let result = background.onRequestForSelectedText(msg, callback);

    expect(callback.mock.calls).toHaveLength(0);
    expect(result).toBe('');
  });

  it(`...onRequestForSelectedText doesn't fire the callback if the highlighted word is an empty string`, function() {
    let msg = {
      action: __VOCABIFY_GET_SELECTED_TEXT__
    };

    let callback = jest.fn();

    let result = background.onRequestForSelectedText(msg, callback);

    expect(callback.mock.calls).toHaveLength(0);
    expect(result).toBe('');
  });
});

describe(`Popup tests - 
        getValueOrFallback is called with any word, definition and result values saved in storage (even when no results) 
        to populate the popup with upon opening.
        It gets passed the object that comes back from storage, 
        the key to access the value and a fallback to use if there were no results found`, function() {
  it(`...getValueOrFallback should fallback to the default message if an empty object is returned back from storage`, function() {
    let response = {};
    let wordText = getValueOrFallback({
      response,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(__VOCABIFY_NO_WORD_SELECTED__);

    response = {};
    let definitionText = getValueOrFallback({
      response,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(__VOCABIFY_NO_DEFINITION_SELECTED__);

    response = {};
    let savedItems = getValueOrFallback({
      response,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(__VOCABIFY_NO_SAVED_ITEMS__);
  });

  it(`...getValueOrFallback for the word should fallback to the default message if an empty string is returned back from storage`, function() {
    let response = {};
    response[__VOCABIFY_WORD__] = '';
    let wordText = getValueOrFallback({
      response,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(__VOCABIFY_NO_WORD_SELECTED__);

    response = {};
    response[__VOCABIFY_DEFINITION__] = '';
    let definitionText = getValueOrFallback({
      response,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(__VOCABIFY_NO_DEFINITION_SELECTED__);

    response = {};
    response[__VOCABIFY_SAVED_ITEMS__] = '';
    let savedItems = getValueOrFallback({
      response,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(__VOCABIFY_NO_SAVED_ITEMS__);
  });

  it(`...getValueOrFallback should return the saved word, defintion or results if returned back from storage`, function() {
    let response = {};
    let word = 'Some word';
    response[__VOCABIFY_WORD__] = word;
    let wordText = getValueOrFallback({
      response,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(word);

    response = {};
    let definition = 'Some definition';
    response[__VOCABIFY_DEFINITION__] = definition;
    let definitionText = getValueOrFallback({
      response,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(definition);

    response = {};
    let items = [{ word: 'Some word', definition: 'Some definition' }];
    response[__VOCABIFY_SAVED_ITEMS__] = items;
    let savedItems = getValueOrFallback({
      response,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(items);
  });
});

describe(`onManualUpdate tests - handle the manual editing of the word and definition text.
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

    let result = await onManualUpdate.onBlur(text, key, p, fallback, callback);
    expect(result).toBe(false);

    onManualUpdate.onFocus();
    result = await onManualUpdate.onBlur(text, key, p, fallback, callback);
    expect(result).toBeTruthy();

    result = await onManualUpdate.onBlur(text, key, p, fallback, callback);
    expect(result).toBe(false);
  });

  it('...should update if a word between 2 and 400 characters is in the text field', async function() {
    onManualUpdate.onFocus();

    let text = 'Word';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await onManualUpdate.onBlur(text, key, p, fallback, callback);

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.results[0].value).toBe(text);
    expect(result).toBe(text);
    expect(p.textContent).toBe('');
  });

  it('...should update with an empty string if a word less than 2 or more than 400 characters is in the text field', async function() {
    onManualUpdate.onFocus();

    let text = '';
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await onManualUpdate.onBlur(text, key, p, fallback, callback);

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.results[0].value).toBe('');
    expect(result).toBe(text);
    expect(p.textContent).toBe(fallback);

    text = '';
    for (let i = 0; i < 401; i++) {
      text += 'a';
    }

    fallback = __VOCABIFY_NO_DEFINITION_SELECTED__;

    onManualUpdate.onFocus();
    result = await onManualUpdate.onBlur(text, key, p, fallback, callback);

    expect(callback.mock.calls).toHaveLength(2);
    expect(callback.mock.results[1].value).toBe('');
    expect(result).toBe('');
    expect(p.textContent).toBe(fallback);
  });

  it('...should update with an empty string if a default word is in the text field', async function() {
    onManualUpdate.onFocus();

    let text = __VOCABIFY_NO_WORD_SELECTED__;
    let key = __VOCABIFY_WORD__;
    let p = document.createElement('p');
    let fallback = __VOCABIFY_NO_WORD_SELECTED__;
    let callback = jest.fn(function(key, value) {
      return value;
    });
    let result = await onManualUpdate.onBlur(text, key, p, fallback, callback);

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.results[0].value).toBe('');
    expect(result).toBe('');
    expect(p.textContent).toBe(fallback);

    text = __VOCABIFY_NO_DEFINITION_SELECTED__;
    fallback = __VOCABIFY_NO_DEFINITION_SELECTED__;

    onManualUpdate.onFocus();
    result = await onManualUpdate.onBlur(
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
    let item = {
      word: 'Word',
      definition: 'A single distinct meaningful element of speech or writing'
    };
    let items = [];
    expect(addToItems(item, items)).toMatchObject([item]);
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

  it('...reset should reset the word and definition, save both and set placeholder text to default', async function() {

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

    await reset(pWord, pDefinition, callback);

    expect(callback.mock.calls).toHaveLength(2);
    expect(callback.mock.results[0].value).toBe('');
    expect(callback.mock.results[1].value).toBe('');
    expect(pWord.textContent).toBe(__VOCABIFY_NO_WORD_SELECTED__);
    expect(pDefinition.textContent).toBe(__VOCABIFY_NO_DEFINITION_SELECTED__);

  });

});
