import React, { Fragment, useState } from 'react';
import MessagePopup from './message-popup';

export default function List({ items, dispatcher }) {

  const [popupVisibility, setPopupVisibility] = useState(false);

  function createList() {
    return items.map(function(item, index) {
      return (
        <article className="vocabify-item" key={`${item.word}${index}`}>
          <h2 
            contentEditable
            suppressContentEditableWarning
            onBlur={ evt => {
              console.log(evt.currentTarget.textContent, item.word);
              dispatcher({ type: 'on-word-edit', state: { originalWord: item.word, newWord: evt.currentTarget.textContent }})
              setPopupVisibility(!popupVisibility);
            }}
          >
            { item.word }
          </h2>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={ evt => {
              console.log(evt.currentTarget.textContent, item.word);
              dispatcher({ type: 'on-definition-edit', state: { originalDefinition: item.definition, newDefinition: evt.currentTarget.textContent }});
              setPopupVisibility(!popupVisibility);
            }}
          >
            { item.definition }
          </p>
        </article>
      )
    });
  }

  let list = createList();

  if(list.length) {
    return (
      <Fragment>
        { list }
        <MessagePopup 
          open={ popupVisibility } 
          onToggle={ () => setPopupVisibility(!popupVisibility) }
          msg={ "I love snacks" }
        />
      </Fragment>
    );
  }
  else {
    return null;
  }    
  
}