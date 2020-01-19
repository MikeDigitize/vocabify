import { backgroundUtils } from './utils/background-utils';
import { __VOCABIFY_WORD__, __VOCABIFY_DEFINITION__ } from './utils/constants';
import { setVocabifyData } from './utils/general-utils';
let { onNewSelectedText, onRequestForSelectedText } = backgroundUtils;

/**
 * Stores any highlighted text from the web page in the closure of the backgroundUtils object,
 * regardless of whether the user requests it.
 * This way the text is pre-stored and ready to send
 * via the onMessage handler below
 * whenever the user clicks the copy word or copy definition button in the vocabify popup
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

async function onContextMenuClick(info, tab) {
  let { pageUrl, selectionText, menuItemId } = info;
  await setVocabifyData(menuItemId, selectionText);
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
    id: __VOCABIFY_WORD__,
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    title: "Save '%s' as highlighted definition",
    parentId: 'selection',
    id: __VOCABIFY_DEFINITION__,
    contexts: ['selection']
  });
  
});

chrome.contextMenus.onClicked.addListener(onContextMenuClick);
