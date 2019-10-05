document.addEventListener('DOMContentLoaded', function() {

    const selectedText = document.getElementById('selectedText');
  
    document
      .getElementById("activateVocabify")
      .addEventListener("click", function() {
        chrome.runtime.sendMessage({ action: 'GET_SELECTED_TEXT' }, function(response) {
          console.log('popup received message!', response);
          selectedText.textContent = response.data;
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


