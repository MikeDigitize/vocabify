const __VOCABIFY_WORD__ = "__VOCABIFY_WORD__";
const __VOCABIFY_DEFINITION__ = "__VOCABIFY_DEFINITION__";
const __VOCABIFY_SAVED_ITEMS__ = "__VOCABIFY_SAVED_ITEMS__";
const __VOCABIFY_NO_WORD_SELECTED__ = "Choose a word";
const __VOCABIFY_NO_DEFINITION_SELECTED__ = "Find a definiton";

function getSelectedText(placeholder) {
  return new Promise(function(resolve) {
    chrome.runtime.sendMessage({ action: "GET_SELECTED_TEXT" }, function(response) {
      placeholder.textContent = response.data;
      resolve(response.data);
    });
  });
}

document.addEventListener("DOMContentLoaded", async function() {

  const word = document.getElementById("word");
  const definition = document.getElementById("definition");

  let isEditing = false;
  let wordText = await getVocabifyData(__VOCABIFY_WORD__);

  if(!Object.keys(wordText).length || wordText[__VOCABIFY_WORD__] === "") {
    wordText = __VOCABIFY_NO_WORD_SELECTED__;
  }
  else {
    wordText = wordText[__VOCABIFY_WORD__];
  }
  
  let definitionText = await getVocabifyData(__VOCABIFY_DEFINITION__);

  if(!Object.keys(definitionText).length || definitionText[__VOCABIFY_DEFINITION__] === "") {
    definitionText = __VOCABIFY_NO_DEFINITION_SELECTED__;
  }
  else {
    definitionText = definitionText[__VOCABIFY_DEFINITION__];
  }

  word.textContent = wordText;
  definition.textContent = definitionText;

  document
    .getElementById("getWord")
    .addEventListener("click", function() {

      getSelectedText(word)
        .then(async function(data) {
          await setVocabifyData(__VOCABIFY_WORD__, data);
        });

  });

  document
    .getElementById("getDefinition")
    .addEventListener("click", function() {

      getSelectedText(definition)
        .then(async function(data) {
          await setVocabifyData(__VOCABIFY_DEFINITION__, data);
        });

    });

  document
    .getElementById("vocabify")
    .addEventListener("click", function() {
      chrome.runtime.openOptionsPage();
    });

  document
    .getElementById("save")
    .addEventListener("click", async function() {

      let items = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__); 
      
      if(!Object.keys(items).length) {
        items = [];
      }
      else {
        items = items[__VOCABIFY_SAVED_ITEMS__];
      }
      
      let currentWord = await getVocabifyData(__VOCABIFY_WORD__);
      let currentDefinition = await getVocabifyData(__VOCABIFY_DEFINITION__);
      
      let item = {
        word: currentWord[__VOCABIFY_WORD__],
        definition: currentDefinition[__VOCABIFY_DEFINITION__]
      };

      items.push(item);
      
      await setVocabifyData(__VOCABIFY_SAVED_ITEMS__, items);

      wordText = "";
      definitionText = "";
    
      await setVocabifyData(__VOCABIFY_WORD__, wordText);
      await setVocabifyData(__VOCABIFY_DEFINITION__, definitionText);
      
      word.textContent = __VOCABIFY_NO_WORD_SELECTED__;
      definition.textContent = __VOCABIFY_NO_DEFINITION_SELECTED__;

    });

    word.addEventListener('input', function() {
      isEditing = true;
    });
  
    word.addEventListener('blur', async function() {
      if(isEditing) {
        wordText = word.textContent;
        await setVocabifyData(__VOCABIFY_WORD__, wordText);
        isEditing = false;
      }
    });

    definition.addEventListener('input', function() {
      isEditing = true;
    });
  
    definition.addEventListener('blur', async function() {
      if(isEditing) {
        definitionText = definition.textContent;
        await setVocabifyData(__VOCABIFY_DEFINITION__, definitionText);
        isEditing = false;
      }
    });

});

function setVocabifyData(key, value) {
  return new Promise(function(resolve) {
    let store = {};
    store[key] = value;
    chrome.storage.sync.set(store, function() {
      resolve(value);
    });
  });
  
}

function getVocabifyData(key) {
  return new Promise(function(resolve) {
    chrome.storage.sync.get([`${key}`], function(result) {
      resolve(result);
    });
  });
  
}
