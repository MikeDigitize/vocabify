import { __VOCABIFY_GET_SELECTED_TEXT__, __VOCABIFY_SET_SELECTED_TEXT__ } from './constants';

export const backgroundUtils = (function() {
  let selectedText = '';
  return {
    onNewSelectedText(msg) {
      if (msg.action === __VOCABIFY_SET_SELECTED_TEXT__) {
        selectedText = msg.data;
      }
      return selectedText;
    },
    onRequestForSelectedText(msg, callback) {
      if (msg.action === __VOCABIFY_GET_SELECTED_TEXT__ && selectedText !== '') {
        callback({ data: selectedText });
        selectedText = '';
      }
      return selectedText;
    }
  };
})();
