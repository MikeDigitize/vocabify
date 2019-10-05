document.addEventListener('DOMContentLoaded', function() {

    const selectedWord = document.getElementById('selectedWord');
  
    document
      .getElementById("activateVocabify")
      .addEventListener("click", function() {
        chrome.runtime.sendMessage({ action: 'GET_SELECTED_TEXT' }, function(response) {
          console.log('popup received message!', response);
          if(response.action === 'SET_SELECTED_TEXT') {
            selectedWord.textContent = response.data;
          }
        });
        
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


