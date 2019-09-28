document.addEventListener(
  "DOMContentLoaded",
  function() {

    document.getElementById('activateVocabify').addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            document.getElementById('currentURL').textContent = tab.url;
            console.log(tab.url);
        });
    })
    
  },
  false
);
