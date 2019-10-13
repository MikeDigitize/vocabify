import { getHighlightedText } from './utils';

const port = chrome.runtime.connect({ name: 'vocabify' });

document.addEventListener('click', function() {
  let result = getHighlightedText();
  if(result) {
    port.postMessage(result);
  }
});
