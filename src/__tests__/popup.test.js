import {
  getHighlightedText,
  __VOCABIFY_SET_SELECTED_TEXT__,
  background,
  __VOCABIFY_GET_SELECTED_TEXT__
} from '../utils';

/**
 *
 * Edit the word or definition directly in the popup
 *
 * Save the word into chrome storage
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
