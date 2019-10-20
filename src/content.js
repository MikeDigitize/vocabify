import { getHighlightedTextFromActiveTab } from './utils';

export function getChromePort() {
  const port = chrome.runtime.connect({ name: 'vocabify' });
  return port;
}

export function listenForHighlightedText(port) {
  document.addEventListener('click', function() {
    let result = getHighlightedTextFromActiveTab();
    if(result) {
      port.postMessage(result);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const port = getChromePort();
  listenForHighlightedText(port);
});