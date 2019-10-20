import { 
  getHighlightedTextFromActiveTab,
  listenForHighlightedText, 
  getChromePort 
} from '../utils/content-utils';
import { __VOCABIFY_SET_SELECTED_TEXT__ } from '../utils/constants';

describe(`
    content.js -
    opens a port to communicate with the background.js
    listens for clicks in the active tab
    gets the highlighted text after each click
    if the highlighted text is longer than two and less than four hundred characters 
    it posts a message via the open port to background.js
    with { action: __VOCABIFY_SET_SELECTED_TEXT__, data: whatever is highlighted }
    note: JSDOM does not support window.getSelection so it needs to be mocked`, function() {

    const MOCKED_GET_SELECTION_RESPONSE = 'Some highlighted text';
  
    afterEach(function() {
      jest.clearAllMocks();
    });

    test('...getChromePort should open up a Chrome port to pass data between DOM and extension and return the connection object', function() {

      window.chrome = {
        runtime: {
          connect: jest.fn(function(connection) {})
        }
      };
  
      getChromePort();
      expect(window.chrome.runtime.connect.mock.calls).toHaveLength(1);
      expect(window.chrome.runtime.connect.mock.calls[0][0]).toHaveProperty('name', 'vocabify');
     
    });
  
    test('...listenForHighlightedText should send the highlighted text over the Chrome port when the text is of correct length', function() {
  
      window.chrome = {
        runtime: {
          connect: jest.fn(function(connection) {
            return {
              postMessage: jest.fn(function(result) {
                return result;
              })
            }
          })
        }
      };
  
      window.getSelection = jest.fn().mockImplementation(function() {
        return {
          toString: jest.fn(function() {
            return MOCKED_GET_SELECTION_RESPONSE;
          })
        };
      });
  
      const port = getChromePort();
  
      listenForHighlightedText(port);
      
      const event = new Event('click');
      document.dispatchEvent(event);
  
      expect(port.postMessage.mock.calls).toHaveLength(1);
      expect(port.postMessage.mock.calls[0][0]).toHaveProperty('action', __VOCABIFY_SET_SELECTED_TEXT__);
      expect(port.postMessage.mock.calls[0][0]).toHaveProperty('data', MOCKED_GET_SELECTION_RESPONSE);
  
    });
  
    test('...getHighlightedTextFromActiveTab should return an object with an action and data property when a string is captured between 2-400 characters', function() {
      
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
  
    test('...getHighlightedTextFromActiveTab should return false if the highlighted text is less than 2 characters', function() {
      
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
  
    test('...getHighlightedTextFromActiveTab should return false if the highlighted text is over 400 characters', function() {
      
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