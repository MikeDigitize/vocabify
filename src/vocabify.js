import { __VOCABIFY_SAVED_ITEMS__ } from '../src/utils/constants';
import { getVocabifyData } from '../src/utils/general-utils'; 

async function renderPage() {
  let items = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);
  items = Object.keys(items).length ? items[__VOCABIFY_SAVED_ITEMS__] : [];

  const root = document.getElementById('vocab');
  const fragment = document.createDocumentFragment();

  const dom = items.map(function(item) {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    article.classList.add('vocabify-item');

    h2.textContent = item.word;
    p.textContent = item.definition;

    article.appendChild(h2);
    article.appendChild(p);

    return article;
  });

  if (dom.length) {
    dom.forEach(function(item) {
      fragment.appendChild(item);
    });
    root.appendChild(fragment);
  } else {
    console.log('No items sorry!');
  }

  document.addEventListener(
    'visibilitychange',
    function() {
      if (!document.hidden) {
        location.reload(true);
      }
    },
    false
  );

  console.log(items);
}

renderPage();
