document.addEventListener("DOMContentLoaded", function() {

    const word = document.getElementById("word");
    const definition = document.getElementById("definition");

    function getSelectedText(placeholder) {
      chrome.runtime.sendMessage({ action: "GET_SELECTED_TEXT" }, function(response) {
        placeholder.textContent = response.data;
      });
    }

    document.getElementById("getWord").addEventListener("click", function() {
      getSelectedText(word);
    });

    document.getElementById("getDefinition").addEventListener("click", function() {
      getSelectedText(definition);
    });

});

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function retrieveFromLocalStorage(key) {
  return localStorage.getItem(key);
}
