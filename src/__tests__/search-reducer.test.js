import { filterSearchItems } from '../utils/general-utils';
import testData from '../test-data';

describe('When the user uses the search bar to filter the list of vocabulary words...', function() {

    test('...filterSearchTerms should return an empty array if the search term is an empty string', function() {

        expect(filterSearchItems('', testData)).toHaveLength(0);
        expect(filterSearchItems('', testData)).toEqual(expect.arrayContaining([]));

    });

    test('...filterSearchTerms should return an array of items which matches the start of the search term', function() {

        let searchTerm = 'a';
        let items = [{ word: 'abacus' }, { word: 'business'}];
        expect(filterSearchItems(searchTerm, items)).toMatchObject([{ word: 'abacus' }]);

        items.push({ word: 'Automation' });
        expect(filterSearchItems(searchTerm, items)).toMatchObject([{ word: 'abacus' }, { word: 'Automation' }]);
    });

    test('...filterSearchTerms should return an array of items with the keys in alphabetical order', function() {

        let searchTerm = 'a';
        let items = [{ word: 'assign' }, { word: 'business'}];
        expect(filterSearchItems(searchTerm, items)).toMatchObject([{ word: 'assign' }]);

        items.push({ word: 'Abacus' });
        expect(filterSearchItems(searchTerm, items)).toMatchObject([{ word: 'Abacus' }, { word: 'assign' }]);
    });

    test('...filterSearchTerms should return an array of items with the keys in alphabetical order', function() {

        let searchTerm = 'ab';
        let items = [{ word: 'assign' }, { word: 'business'}, { word: 'Abacus' }, { word: 'Abigail'}, { word: 'abundance' }];
        expect(filterSearchItems(searchTerm, items)).toMatchObject([{ word: 'Abacus' }, { word: 'Abigail' }, { word: 'abundance'}]);
    });



});