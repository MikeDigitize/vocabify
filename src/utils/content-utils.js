import { isFourHundredCharactersOrLess, isTwoCharactersOrMore } from '../utils/general-utils';
import { __VOCABIFY_SET_SELECTED_TEXT__ } from '../utils/constants';

export function getChromePort() {
  const port = chrome.runtime.connect({ name: 'vocabify' });
  return port;
}

export function getHighlightedTextFromActiveTab() {
  let highlighted = window.getSelection().toString();
  if (!isFourHundredCharactersOrLess(highlighted) || !isTwoCharactersOrMore(highlighted)) {
    return false;
  }
  return { action: __VOCABIFY_SET_SELECTED_TEXT__, data: highlighted };
}

export function listenForHighlightedText(port) {
  document.addEventListener('click', function() {
    let result = getHighlightedTextFromActiveTab();
    if (result) {
      port.postMessage(result);
    }
  });
}
