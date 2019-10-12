/**
 * 
 * Highlight a word or definition in the current tab and copy it to the popup
 * 
 * Edit the word or definition directly in the popup
 * 
 * Save the word into chrome storage
 * 
 * Launch vocabify
 * 
 */

describe(
    `The popup should be able to copy a highlighted word from the DOM. 
    It works via three scripts - 
        content.js which posts anything highlighted to a background script
        background.js which captures anything highlighted and waits for a request from the popup
        popup.js which requests the selected word, saves it to storage and shows it in the popup`, function() {

    it('should work', function() {
        expect(true).toEqual(true);
    });

});