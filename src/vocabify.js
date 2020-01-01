import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { __VOCABIFY_SAVED_ITEMS__ } from './utils/constants';
import { getVocabifyData } from './utils/general-utils'; 
import testData from './test-data';
import List from './components/list';

export default function App() {

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
      if(typeof window.chrome !== 'undefined' && typeof window.chrome.storage !== 'undefined') {
        items = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);
      }
      items = items && Object.keys(items).length ? items[__VOCABIFY_SAVED_ITEMS__] : testData;
      setItems(items);
    }
    getData();
  }, []);

  return (
    <Fragment>
      <List items={ items } />
    </Fragment>
  )
  
}

ReactDOM.render(<App />, document.getElementById('vocab'));

// fetch('https://words.bighugelabs.com/api/2/572698ba07a9e0baa4543f8df1889d3b/advocate/json').then(function(response) { 
// 	// Convert to JSON
// 	return response.json();
// }).then(function(j) {
// 	// Yay, `j` is a JavaScript object
// 	console.log(j); 
// });
