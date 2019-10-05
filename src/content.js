/**
 * https://tech.trustpilot.com/what-i-learned-from-making-a-chrome-extension-51f366ad141
 */
console.log("Vocabify init!");

var port = chrome.runtime.connect({ name: 'vocabify' });

document.addEventListener('click', function() {
  let highlighted = window.getSelection().toString() || "";
  port.postMessage({ action: 'SET_SELECTED_TEXT', data: highlighted });
});