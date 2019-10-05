const __VOCABIFY_WORD__ = "__VOCABIFY_WORD__";
const __VOCABIFY_DEFINITION__ = "__VOCABIFY_DEFINITION__";
const __VOCABIFY_SAVED_ITEMS__ = "__VOCABIFY_SAVED_ITEMS__";

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
  const wordCount = document.getElementById("wordCount");

  let wordText = localStorage.getItem(__VOCABIFY_WORD__) || "";
  let definitionText = localStorage.getItem(__VOCABIFY_DEFINITION__) || "";
  let wordCountText;

  const savedItems = localStorage.getItem(__VOCABIFY_SAVED_ITEMS__);
  if(savedItems) {
    wordCountText = JSON.parse(savedItems).length
  }

  word.textContent = wordText;
  definition.textContent = definitionText;
  wordCount.textContent = wordCountText || 0;

  document
    .getElementById("getWord")
    .addEventListener("click", function() {

      getSelectedText(word)
        .then(function(data) {
          localStorage.setItem(__VOCABIFY_WORD__, data);
        });

  });

  document
    .getElementById("getDefinition")
    .addEventListener("click", function() {

      getSelectedText(definition)
        .then(function(data) {
          localStorage.setItem(__VOCABIFY_DEFINITION__, data);
        });

    });

  document
    .getElementById("save")
    .addEventListener("click", function() {
      let items = localStorage.getItem(__VOCABIFY_SAVED_ITEMS__);
      if(!items) {
        items = [];
      }
      else {
        items = JSON.parse(items);
      }
      let item = {
        word: localStorage.getItem(__VOCABIFY_WORD__),
        definition: localStorage.getItem(__VOCABIFY_DEFINITION__)
      };
      items.push(item)
      localStorage.setItem(__VOCABIFY_SAVED_ITEMS__, JSON.stringify(items));
      wordText = "";
      definitionText = "";
      wordCountText = items.length;
      localStorage.setItem(__VOCABIFY_WORD__, wordText);
      localStorage.setItem(__VOCABIFY_DEFINITION__, definitionText);
      word.textContent = "";
      definition.textContent = "";
      wordCount.textContent = wordCountText;
    })

});
