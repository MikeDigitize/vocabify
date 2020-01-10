import React, { useEffect, useReducer } from 'react';
import { __VOCABIFY_SAVED_ITEMS__ } from '../utils/constants';
import { getVocabifyData } from '../utils/general-utils';
import testData from '../test-data';
import List from './list';
import Search from './search';
import { searchReducer, initialSearchState } from '../reducers/search-reducer'; 

export default function Container() {

  const [state, dispatch] = useReducer(searchReducer, initialSearchState);

  useEffect(function() {
    async function getData() {
      let items;
      if (typeof window.chrome !== 'undefined' && typeof window.chrome.storage !== 'undefined') {
        items = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);
      }
      items = items && Object.keys(items).length ? items[__VOCABIFY_SAVED_ITEMS__] : testData;
      let updatedState = { ...state, items };
      dispatch({ type: 'on-loaded-items', state: updatedState });
    }
    getData();
  }, []);

  return (
    <div className="container text-center">
      <header className="row">
        <div className="col">
          <h1>Vocabify</h1>
          <p className="subtitle">Your vocabulary development tool</p>
          <Search dispatcher={ dispatch } />
          <small>You can edit the word or definition by clicking into the text.</small>
          <hr />
        </div>
      </header>
      <div className="row">
        <div className="col">
          <List items={ state.currentItems } />
        </div>
      </div>
    </div>
  );
}
