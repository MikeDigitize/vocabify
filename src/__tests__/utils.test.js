import {
    isEmptyObject,
    isEmptyString,
    isFourHundredCharactersOrLess,
    isTwoCharactersOrMore,
    isDefaultText,
    addToItems,
    toEmptyString,
    setPlaceholderText
  } from '../utils';

  import {
    __VOCABIFY_NO_WORD_SELECTED__,
    __VOCABIFY_NO_DEFINITION_SELECTED__
  } from '../constants';

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