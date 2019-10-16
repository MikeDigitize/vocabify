import { getHighlightedTextFromActiveTab } from './utils';

const port = chrome.runtime.connect({ name: 'vocabify' });

document.addEventListener('click', function() {
  let result = getHighlightedTextFromActiveTab();
  if(result) {
    port.postMessage(result);
  }
});
