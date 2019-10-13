import { background } from './utils';

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(background.onNewSelectedText);
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  background.onRequestForSelectedText(msg, sendResponse);
});
