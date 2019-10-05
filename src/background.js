let selectedText = "TEST";

chrome.runtime.onConnect.addListener(function(port) {

  port.onMessage.addListener(function(msg) {
    if (msg.action === "SET_SELECTED_TEXT") {
      selectedText = msg.data;
    }
  });

});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action === 'GET_SELECTED_TEXT') {
    sendResponse({ data: selectedText });
  }
});