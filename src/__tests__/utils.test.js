import {
    isEmptyObject,
    isEmptyString,
    isFourHundredCharactersOrLess,
    isTwoCharactersOrMore,
    isDefaultText,
    addToItems,
    updateItems,
    toEmptyString,
    setPlaceholderText,
    capitaliseFirstLetter,
    addFullStop,
    isDuplicateWord
  } from '../utils/general-utils';

  import {
    __VOCABIFY_NO_WORD_SELECTED__,
    __VOCABIFY_NO_DEFINITION_SELECTED__,
    __VOCABIFY_WORD__,
    __VOCABIFY_DEFINITION__
  } from '../utils/constants';

  import testData from '../test-data';

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

    test('...updateItems should update the word of an item in the array', function() {
      let word = 'Word';
      let definition = 'A single distinct meaningful element of speech or writing';
      let items = [{ word, definition }];
      let newText = 'Wordy';
      let result = updateItems({ type: 'word', originalText: word, newText, items });
      expect(result[0]).toHaveProperty('word', newText);
      expect(result[0]).toHaveProperty('definition', definition);
    });

    test('...updateItems should update the definition of an item in the array', function() {
      let word = 'Word';
      let definition = 'A single distinct meaningful element of speech or writing';
      let items = [{ word, definition }];
      let newText = 'A new definition';
      let result = updateItems({ type: 'definition', originalText: definition, newText, items });
      expect(result[0]).toHaveProperty('word', word);
      expect(result[0]).toHaveProperty('definition', newText);
    });

    test('...updateItems should not make any changes if the original text cannot be found', function() {
      let word = 'Word';
      let definition = 'A single distinct meaningful element of speech or writing';
      let wrongDefinition = 'Wrong definition';
      let items = [{ word, definition }];
      let newText = 'A new definition';
      let result = updateItems({ type: 'definition', originalText: wrongDefinition, newText, items });
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

});

describe(`The popup should prevent duplicate words being stored`, function() {

  test('...isDuplicateWord should return true if the word is already present in storage', function() {

    let storage = [{
      word: 'Testing',
      definition: 'The act of testing'
    }, {
      word: 'Test',
      definition: 'A test word'
    }];

    expect(isDuplicateWord(storage, 'Test')).toBe(true);

  });

  test('...isDuplicateWord should return false if the word is not present in storage', function() {
    expect(isDuplicateWord(testData, 'Test')).toBe(false);
  });

});