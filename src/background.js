import { backgroundUtils } from './utils';
let { onNewSelectedText, onRequestForSelectedText } = backgroundUtils;

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(onNewSelectedText);
});

chrome.runtime.onMessage.addListener(onRequestForSelectedText);
