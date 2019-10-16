import { getHighlightedTextFromActiveTab } from '../utils';
import { __VOCABIFY_SET_SELECTED_TEXT__ } from '../constants';

describe(`
    content.js -
    listens for clicks in the active tab
    gets the highlighted text after each click
    if the highlighted text is longer than two and less than four hundred characters it posts a message to background.js
    with { action: __VOCABIFY_SET_SELECTED_TEXT__, data: whatever is highlighted }
    note: JSDOM does not support window.getSelection so it needs to be mocked`, function() {
    const MOCKED_GET_SELECTION_RESPONSE = 'Some highlighted text';
  
    afterEach(function() {
      jest.clearAllMocks();
    });
  
    it('...getHighlightedTextFromActiveTab should return an object with an action and data property when a string is captured between 2-400 characters', function() {
      window.getSelection = jest.fn().mockImplementation(function() {
        return {
          toString: jest.fn(function() {
            return MOCKED_GET_SELECTION_RESPONSE;
          })
        };
      });
  
      let result = getHighlightedTextFromActiveTab();
      expect(window.getSelection.mock.calls).toHaveLength(1);
      expect(result.data).toBe(MOCKED_GET_SELECTION_RESPONSE);
      expect(result.action).toBe(__VOCABIFY_SET_SELECTED_TEXT__);
    });
  
    it('...getHighlightedTextFromActiveTab should return false if the highlighted text is less than 2 characters', function() {
      window.getSelection = jest.fn().mockImplementation(function() {
        return {
          toString: jest.fn(function() {
            return '';
          })
        };
      });
  
      let result = getHighlightedTextFromActiveTab();
      expect(window.getSelection.mock.calls).toHaveLength(1);
      expect(result).toBe(false);
  
      window.getSelection = jest.fn().mockImplementation(function() {
        return {
          toString: jest.fn(function() {
            return 'a';
          })
        };
      });
  
      result = getHighlightedTextFromActiveTab();
      expect(window.getSelection.mock.calls).toHaveLength(1);
      expect(result).toBe(false);
  
      window.getSelection = jest.fn().mockImplementation(function() {
        return {
          toString: jest.fn(function() {
            return 'aa';
          })
        };
      });
  
      result = getHighlightedTextFromActiveTab();
      expect(window.getSelection.mock.calls).toHaveLength(1);
      expect(result.data).toBe('aa');
    });
  
    it('...getHighlightedTextFromActiveTab should return false if the highlighted text is over 400 characters', function() {
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
  
      let result = getHighlightedTextFromActiveTab();
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
  
      result = getHighlightedTextFromActiveTab();
      expect(window.getSelection.mock.calls).toHaveLength(1);
      expect(result.data).toBe(highlighted);
    });
  });