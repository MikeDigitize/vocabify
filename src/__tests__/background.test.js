import { backgroundUtils } from '../utils/background-utils';
import {
    __VOCABIFY_SET_SELECTED_TEXT__, 
    __VOCABIFY_GET_SELECTED_TEXT__
} from '../utils/constants';

let { onNewSelectedText, onRequestForSelectedText } = backgroundUtils;

describe(
    `backgroundUtils.js -
    the "middle man" between active tab and extension popup 
    listens for messages posted from content.js
    every time text between 2-400 characters is highlighted
    it stores this text 
    and listens for requests for it from the popup.
    This is the mechanism to copy both the word and defintion from the popup`, function() {
  
        afterEach(function() {
            let msg = {
                action: __VOCABIFY_SET_SELECTED_TEXT__,
                data: ''
            };
            onNewSelectedText(msg);
        });

  test(`...onNewSelectedText updates the highlighted text upon receipt of { action: ${__VOCABIFY_SET_SELECTED_TEXT__} and data: highlighted text }`, function() {
    
    let highlighted = 'Some text';

    let msg = {
      action: __VOCABIFY_SET_SELECTED_TEXT__,
      data: highlighted
    };

    let result = onNewSelectedText(msg);

    expect(result).toEqual(highlighted);

  });

  test(`...onNewSelectedText does not store the text if it doesn't receive the action ${__VOCABIFY_SET_SELECTED_TEXT__}`, function() {
    
    let highlighted = 'Some text';

    let msg = {
      action: __VOCABIFY_SET_SELECTED_TEXT__,
      data: highlighted
    };

    let result = onNewSelectedText(msg);

    let nextHighlighted = 'Some other text';
    msg = {
      action: __VOCABIFY_GET_SELECTED_TEXT__,
      data: nextHighlighted
    };

    result = onNewSelectedText(msg);

    expect(result).not.toEqual(nextHighlighted);
    expect(result).toEqual(highlighted);

  });

  test('...onRequestForSelectedText posts the highlighted text to popup.js upon request and then resets it to an empty string', function() {
    
    let highlighted = 'Some text';

    let msg = {
      action: __VOCABIFY_SET_SELECTED_TEXT__,
      data: highlighted
    };

    backgroundUtils.onNewSelectedText(msg);

    msg = {
      action: __VOCABIFY_GET_SELECTED_TEXT__
    };

    let callback = jest.fn(function() {
      return {
        data: highlighted
      };
    });

    let result = onRequestForSelectedText(msg, callback);

    expect(callback.mock.calls).toHaveLength(1);
    expect(callback.mock.results[0].value.data).toBe(highlighted);
    expect(result).toBe('');

  });

  test(`...onRequestForSelectedText doesn't post the highlighted text if it doesn't receive the ${__VOCABIFY_GET_SELECTED_TEXT__} action`, function() {
    
    let msg = {
      action: __VOCABIFY_SET_SELECTED_TEXT__
    };

    let callback = jest.fn();
    let sender;
    let result = onRequestForSelectedText(msg, callback);

    expect(callback.mock.calls).toHaveLength(0);
    expect(result).toBe('');

  });

  test(`...onRequestForSelectedText doesn't fire the callback if the highlighted text is an empty string`, function() {
    
    let msg = {
      action: __VOCABIFY_GET_SELECTED_TEXT__
    };

    let callback = jest.fn();
    let sender;
    let result = onRequestForSelectedText(msg, callback);

    expect(callback.mock.calls).toHaveLength(0);
    expect(result).toBe('');

  });

});