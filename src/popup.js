const __VOCABIFY_WORD__ = '__VOCABIFY_WORD__';
const __VOCABIFY_DEFINITION__ = '__VOCABIFY_DEFINITION__'; 

function getSelectedText(placeholder) {
  return new Promise(function(resolve, reject) {
    chrome.runtime.sendMessage({ action: "GET_SELECTED_TEXT" }, function(response) {
      placeholder.textContent = response.data;
      resolve(response.data);
    });
  });      
}

document.addEventListener("DOMContentLoaded", function() {

    const word = document.getElementById("word");
    const definition = document.getElementById("definition");

    const wordText = localStorage.getItem(__VOCABIFY_WORD__) || '';
    const definitionText = localStorage.getItem(__VOCABIFY_DEFINITION__) || '';
    
    word.textContent = wordText;
    definition.textContent = definitionText;

    document.getElementById("getWord").addEventListener("click", function() {
      getSelectedText(word).then(function(data) {
        localStorage.setItem(__VOCABIFY_WORD__, data);
      });
    });

    document.getElementById("getDefinition").addEventListener("click", function() {
      getSelectedText(definition).then(function(data) {
        localStorage.setItem(__VOCABIFY_DEFINITION__, data);
      });
    });

});