var port = chrome.runtime.connect({ name: 'vocabify' });

document.addEventListener('click', function() {
  let highlighted = window.getSelection().toString() || "";
  console.log(highlighted);
  port.postMessage({ action: 'SET_SELECTED_TEXT', data: highlighted });
});