import {
    isEmptyObject,
    isEmptyString,
    isFourHundredCharactersOrLess,
    isTwoCharactersOrMore,
    isDefaultText,
    addToItems,
    toEmptyString,
    setPlaceholderText,
    capitaliseFirstLetter,
    addFullStop,
    setVocabifyData,
    getVocabifyData
  } from '../utils/general-utils';

  import {
    __VOCABIFY_NO_WORD_SELECTED__,
    __VOCABIFY_NO_DEFINITION_SELECTED__,
    __VOCABIFY_WORD__,
    __VOCABIFY_DEFINITION__
  } from '../utils/constants';

  describe(`The popup copies a word and definition from the active tab and updates the appropriate placeholder text`, function() {

      test(`... setPlaceholderText updates an element's text content`, function() {
        const p = document.createElement('p');
        const text = 'Some text';
        setPlaceholderText(p, text);
        expect(p.textContent).toBe(text);
      });

  })

  describe(
    `The popup lets you save the word and definition.
      Save should only occur if -
      the item in storage is not an empty object (i.e. not used the popup at all)
      the item is not an empty string
      the item is not the default
      the item is not less than 2 or more than 400 characters.
      If all these conditions are met the word and definition should be added to the end of the saved items array.
      After saving the word and definition plceholder text should be returned to the defaults`, function() {
  
    test(`...isEmptyObject should return true when empty and false when not`, function() {
      let obj = {};
      expect(isEmptyObject(obj)).toBeTruthy();
      obj.items = [];
      expect(isEmptyObject(obj)).toBeFalsy();
    });
  
    test(`...isEmptyString should return true when empty and false when not`, function() {
      let str = '';
      expect(isEmptyString(str)).toBeTruthy();
      str = 'Not empty';
      expect(isEmptyString(str)).toBeFalsy();
    });
  
    test(`...isDefaultText should return true if a string passed matches one of the defaults`, function() {
      expect(isDefaultText(__VOCABIFY_NO_WORD_SELECTED__)).toBe(true);
      expect(isDefaultText(__VOCABIFY_NO_DEFINITION_SELECTED__)).toBe(true);
      expect(isDefaultText('Word')).toBe(false);
      expect(isDefaultText('A definition')).toBe(false);
    });
  
    test('...isFourHundredCharactersOrLess should return true if string is less than 400 or false if more', function() {
      let str = '';
      for (let i = 0; i < 400; i++) {
        str += 'a';
      }
      expect(isFourHundredCharactersOrLess(str)).toBe(true);
      str = '';
      for (let i = 0; i < 401; i++) {
        str += 'a';
      }
      expect(isFourHundredCharactersOrLess(str)).toBe(false);
    });
  
    test('...isTwoCharactersOrMore should return true if string is more than 2 or characters or false if less', function() {
      let str = 'aa';
      expect(isTwoCharactersOrMore(str)).toBe(true);
      str = '';
      expect(isTwoCharactersOrMore(str)).toBe(false);
    });
  
    test('...addToItems should add an item to the array and return it', function() {
      let word = 'Word';
      let definition = 'A single distinct meaningful element of speech or writing';
      let items = [];
      let result = addToItems({ word, definition, items });
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('word', word);
      expect(result[0]).toHaveProperty('definition', definition);
    });

    test(`...toEmptyString should return an empty string to reset stored word and defintion values after save`, function() {
        let word = 'Word';
        let definition = 'A single distinct meaningful element of speech or writing';
        expect(toEmptyString(word)).toBe('');
        expect(toEmptyString(definition)).toBe('');
    });
  
  });

  describe(`
    The popup should capitalise the first letter of the word and description, 
    and add a full stop to the end of the description`, function() {

      test('...capitaliseFirstLetter should capitalise the first letter of a string', function() {
        expect(capitaliseFirstLetter('word')).toBe('Word');
        expect(capitaliseFirstLetter('')).toBe(false);
        expect(capitaliseFirstLetter('some text')).toBe('Some text');
      });

      test('...addFullStop should add a full stop at the end of the sentence', function() {
        expect(addFullStop('to this')).toBe('to this.');
        expect(addFullStop('to this.')).toBe('to this.');
        expect(addFullStop('')).toBe(false);
        expect(addFullStop('a')).toBe('a.');
      });

  })

  // describe(`The popup writes to and reads from Chrome's storage`, function() {

  //   test(`...getVocabifyData takes a key and returns any value saved under that key from Chrome's storage`, async function() {

  //     const storage = {};
  //     storage[__VOCABIFY_WORD__] = 'Vocabify';
  //     storage[__VOCABIFY_DEFINITION__] = '';

  //     window.chrome = {
  //       storage: {
  //         sync: {
  //           get: jest.fn(function(key) {
  //             if(storage.hasOwnProperty(key)) {
  //               return storage[key];
  //             }
  //             return {};
  //           })
  //         }
  //       }
  //     };

  //     let result = await getVocabifyData(__VOCABIFY_WORD__);
  //     expect(window.chrome.storage.sync.get.mock.calls).toHaveLength(1);
  //     expect(window.chrome.storage.sync.get.mock.calls[0][0]).toHaveProperty(__VOCABIFY_WORD__);
  //     expect(result).toBe(storage[__VOCABIFY_WORD__]);

  //     result = await getVocabifyData(__VOCABIFY_DEFINITION__);
  //     expect(window.chrome.storage.sync.get.mock.calls).toHaveLength(2);
  //     expect(window.chrome.storage.sync.get.mock.calls[1][0]).toHaveProperty(__VOCABIFY_DEFINITION__);
  //     expect(result).toBe('');

  //     result = await getVocabifyData('random-key');
  //     expect(window.chrome.storage.sync.get.mock.calls).toHaveLength(3);
  //     expect(window.chrome.storage.sync.get.mock.calls[2][0]).toHaveProperty('random-key');
  //     expect(result).toMatchObject({});

  //   });

  // });