import React, { useEffect, useState } from 'react';
import { __VOCABIFY_SAVED_ITEMS__ } from '../utils/constants';
import { getVocabifyData } from '../utils/general-utils';
import testData from '../test-data';
import List from './list';
import Search from './search';

export default function Container() {

  const [items, setItems] = useState([]);

  useEffect(function() {
    async function getData() {
      let items;
      if (typeof window.chrome !== 'undefined' && typeof window.chrome.storage !== 'undefined') {
        items = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);
      }
      items = items && Object.keys(items).length ? items[__VOCABIFY_SAVED_ITEMS__] : testData;
      setItems(items);
    }
    getData();
  }, []);

  return (
    <div className="container text-center">
      <header className="row">
        <div className="col">
          <h1>Vocabify</h1>
          <p className="subtitle">Your vocabulary development tool</p>
          <Search />
          <hr />
        </div>
      </header>
      <div className="row">
        <div className="col">
          <List items={ items } />
        </div>
      </div>
    </div>
  );
}
