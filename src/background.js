import { backgroundUtils } from './utils/background-utils';
let { onNewSelectedText, onRequestForSelectedText } = backgroundUtils;

/**
 * Stores any highlighted text from the web page in the closure of the backgroundUtils object,
 * regardless of whether the user requests it.
 * This way the text is pre-stored and ready to send
 * via the onMessage handler below
 */
chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(onNewSelectedText);
});

/**
 * Waits for the user to request the highlighted text 
 * and sends it to the popup
 */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  onRequestForSelectedText(msg, sendResponse);
});
