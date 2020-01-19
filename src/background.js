import { backgroundUtils } from './utils/background-utils';
import { __VOCABIFY_SET_SELECTED_TEXT__ } from './utils/constants';
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

function onContextMenuClick(info, tab) {
  let { pageUrl, selectionText, menuItemId } = info;
  alert(`${pageUrl} and ${selectionText} and ${menuItemId}`);
}

chrome.runtime.onInstalled.addListener(function() {
  
  chrome.contextMenus.create({
    title: 'Vocabify options',
    contexts: ['selection'],
    id: 'selection'
  });

  chrome.contextMenus.create({
    title: "Save '%s' as highlighted word",
    parentId: 'selection',
    id: 'word',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    title: "Save '%s' as highlighted definition",
    parentId: 'selection',
    id: 'definition',
    contexts: ['selection']
  });
  
});

chrome.contextMenus.onClicked.addListener(onContextMenuClick);
