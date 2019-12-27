import { __VOCABIFY_SAVED_ITEMS__ } from '../src/utils/constants';
import { getVocabifyData } from '../src/utils/general-utils'; 
import backupData from '../data';
import React, { useState, useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';

function App() {

  document.addEventListener(
    'visibilitychange',
    function() {
      if (!document.hidden) {
        location.reload(true);
      }
    },
    false
  );

  const [items, setItems] = useState([]);
  
  useEffect(function() {
    async function getData() {
      let items;
      if(typeof chrome.storage !== 'undefined') {
        items = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);
      }
      items = items && Object.keys(items).length ? items[__VOCABIFY_SAVED_ITEMS__] : backupData;
      setItems(items);
    }
    getData();
  }, []);

  function createList() {
    return items.map(function(item, index) {
      return (
        <article className="vocabify-item" key={`${item.word}${index}`}>
          <h2>{ item.word }</h2>
          <p>{ item.definition }</p>
        </article>
      )
    });
  }

  let list = createList();

  if(list.length) {
    return (
      <Fragment>
        { list }
      </Fragment>
    );
  }
  else {
    return null;
  }    
  
}

ReactDOM.render(<App />, document.getElementById('vocab'));
