document.addEventListener(
  "DOMContentLoaded",
  function() {
    
    const VOCABIFY_CURRENT_URL = "__VOCABIFY_CURRENT_URL__";
    const VOCABIFY_UNKNOWN_URL = "unknown";

    const currentURLdisplay = document.getElementById("currentURLdisplay");
    const currentURLtext = retrieveFromLocalStorage(VOCABIFY_CURRENT_URL) || VOCABIFY_UNKNOWN_URL;

    currentURLdisplay.textContent = currentURLtext;

    document
      .getElementById("activateVocabify")
      .addEventListener("click", function() {
        chrome.tabs.getSelected(null, function(tab) {
          saveToLocalStorage(VOCABIFY_CURRENT_URL, tab.url);
          currentURLdisplay.textContent = tab.url;
        });
        // chrome.tabs.executeScript({
        //   code: 'document.body.style.backgroundColor="red"'
        // });
        // chrome.tabs.executeScript({
        //   file: 'content.js'
        // });
      });
  },
  false
);

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function retrieveFromLocalStorage(key) {
  return localStorage.getItem(key);
}
