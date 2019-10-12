import { __VOCABIFY_SET_SELECTED_TEXT__ } from './utils';

const port = chrome.runtime.connect({ name: 'vocabify' });

document.addEventListener('click', function() {
  let highlighted = window.getSelection().toString() || '';
  port.postMessage({ action: __VOCABIFY_SET_SELECTED_TEXT__, data: highlighted });
});
