import {
  getHighlightedText,
  __VOCABIFY_SET_SELECTED_TEXT__,
  background,
  __VOCABIFY_GET_SELECTED_TEXT__,
  __VOCABIFY_WORD__,
  __VOCABIFY_NO_WORD_SELECTED__,
  getInitialValue,
  __VOCABIFY_DEFINITION__,
  __VOCABIFY_NO_DEFINITION_SELECTED__,
  __VOCABIFY_SAVED_ITEMS__,
  __VOCABIFY_NO_SAVED_ITEMS__
} from '../utils';

/**
 *
 * Edit the word or definition directly in the popup
 *
 * Save the word and defintion into chrome storage, only if both exist
 *
 * Launch vocabify
 *
 */

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
    expect(window.getSelection.mock.calls.length).toBe(1);
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
    expect(window.getSelection.mock.calls.length).toBe(1);
    expect(result).toBe(false);

    window.getSelection = jest.fn().mockImplementation(function() {
      return {
        toString: jest.fn(function() {
          return 'a';
        })
      };
    });

    result = getHighlightedText();
    expect(window.getSelection.mock.calls.length).toBe(1);
    expect(result).toBe(false);

    window.getSelection = jest.fn().mockImplementation(function() {
      return {
        toString: jest.fn(function() {
          return 'aa';
        })
      };
    });

    result = getHighlightedText();
    expect(window.getSelection.mock.calls.length).toBe(1);
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
    expect(window.getSelection.mock.calls.length).toBe(1);
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
    expect(window.getSelection.mock.calls.length).toBe(1);
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

    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.results[0].value.data).toBe(highlighted);
    expect(result).toBe('');
  });

  it(`...onRequestForSelectedText doesn't fire the callback if it doesn't receive the ${__VOCABIFY_GET_SELECTED_TEXT__} action`, function() {
    let msg = {
      action: __VOCABIFY_SET_SELECTED_TEXT__
    };

    let callback = jest.fn();

    let result = background.onRequestForSelectedText(msg, callback);

    expect(callback.mock.calls.length).toBe(0);
    expect(result).toBe('');
  });

  it(`...onRequestForSelectedText doesn't fire the callback if the highlighted word is an empty string`, function() {
    let msg = {
      action: __VOCABIFY_GET_SELECTED_TEXT__
    };

    let callback = jest.fn();

    let result = background.onRequestForSelectedText(msg, callback);

    expect(callback.mock.calls.length).toBe(0);
    expect(result).toBe('');
  });
});

describe(`Popup tests - 
        getInitialValue is called with any word, definition and result values saved in storage (even when no results) 
        to populate the popup with upon opening.
        It gets passed the object that comes back from storage, 
        the key to access the value and a fallback to use if there were no results found`, function() {

  it(`...getInitialValue should fallback to the default message if an empty object is returned back from storage`, function() {
    let result = {};
    let wordText = getInitialValue({
      result,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(__VOCABIFY_NO_WORD_SELECTED__);

    result = {};
    let definitionText = getInitialValue({
      result,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(__VOCABIFY_NO_DEFINITION_SELECTED__);

    result = {};
    let savedItems = getInitialValue({
      result,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(__VOCABIFY_NO_SAVED_ITEMS__);
  });

  it(`...getInitialValue for the word should fallback to the default message if an empty string is returned back from storage`, function() {

    let result = {};
    result[__VOCABIFY_WORD__] = '';
    let wordText = getInitialValue({
      result,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(__VOCABIFY_NO_WORD_SELECTED__);

    result = {};
    result[__VOCABIFY_DEFINITION__] = '';
    let definitionText = getInitialValue({
      result,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(__VOCABIFY_NO_DEFINITION_SELECTED__);

    result = {};
    result[__VOCABIFY_SAVED_ITEMS__] = '';
    let savedItems = getInitialValue({
      result,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(__VOCABIFY_NO_SAVED_ITEMS__);
  });

  it(`...getInitialValue should return the saved word, defintion or results if returned back from storage`, function() {

    let result = {};
    let word = 'Some word';
    result[__VOCABIFY_WORD__] = word;
    let wordText = getInitialValue({
      result,
      key: __VOCABIFY_WORD__,
      fallback: __VOCABIFY_NO_WORD_SELECTED__
    });

    expect(wordText).toEqual(word);

    result = {};
    let definition = 'Some definition';
    result[__VOCABIFY_DEFINITION__] = definition;
    let definitionText = getInitialValue({
      result,
      key: __VOCABIFY_DEFINITION__,
      fallback: __VOCABIFY_NO_DEFINITION_SELECTED__
    });

    expect(definitionText).toEqual(definition);

    result = {};
    let items = [{ word: 'Some word', definition: 'Some definition'}];
    result[__VOCABIFY_SAVED_ITEMS__] = items;
    let savedItems = getInitialValue({
      result,
      key: __VOCABIFY_SAVED_ITEMS__,
      fallback: __VOCABIFY_NO_SAVED_ITEMS__
    });

    expect(savedItems).toEqual(items);

  });
});
