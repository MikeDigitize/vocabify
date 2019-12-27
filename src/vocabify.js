import { __VOCABIFY_SAVED_ITEMS__ } from '../src/utils/constants';
import { getVocabifyData } from '../src/utils/general-utils'; 
import backupData from '../data';
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <h1>Hello World</h1>
  )
}

ReactDOM.render(<App />, document.getElementById('vocab'));

// async function renderPage() {

//   let items;

//   if(typeof chrome.storage !== 'undefined') {
//     items = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);
//   }
   
//   items = items && Object.keys(items).length ? items[__VOCABIFY_SAVED_ITEMS__] : backupData;

//   const root = document.getElementById('vocab');
//   const fragment = document.createDocumentFragment();

//   const dom = items.map(function(item) {
//     const article = document.createElement('article');
//     const h2 = document.createElement('h2');
//     const p = document.createElement('p');

//     article.classList.add('vocabify-item');

//     h2.textContent = item.word;
//     p.textContent = item.definition;

//     article.appendChild(h2);
//     article.appendChild(p);

//     return article;
//   });

//   if (dom.length) {
//     dom.forEach(function(item) {
//       fragment.appendChild(item);
//     });
//     root.appendChild(fragment);
//   } else {
//     console.log('No items sorry!');
//   }

//   document.addEventListener(
//     'visibilitychange',
//     function() {
//       if (!document.hidden) {
//         location.reload(true);
//       }
//     },
//     false
//   );

//   console.log(items);
// }

// renderPage();
