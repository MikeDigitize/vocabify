import { getHighlightedText, __VOCABIFY_SET_SELECTED_TEXT__ } from '../utils';

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
