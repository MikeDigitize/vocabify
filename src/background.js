import {
  __VOCABIFY_SET_SELECTED_TEXT__,
  __VOCABIFY_GET_SELECTED_TEXT__
} from './utils';

let selectedText = '';

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if (msg.action === __VOCABIFY_SET_SELECTED_TEXT__) {
      selectedText = msg.data;
    }
  });
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === __VOCABIFY_GET_SELECTED_TEXT__ && selectedText !== '') {
    sendResponse({ data: selectedText });
    selectedText = '';
  }
});
