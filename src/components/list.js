import React, { Fragment, useState } from 'react';
import MessagePopup from './message-popup';
import { validateEdit } from '../utils/general-utils';

export default function List({ items }) {

  const [popupVisibility, setVisibility] = useState(false);

  function createList() {
    return items.map(function(item, index) {
      return (
        <article className="vocabify-item" key={`${item.word}${index}`}>
          <h2 
            contentEditable
            suppressContentEditableWarning
            onBlur={ e => {
              console.log(validateEdit(e.currentTarget.textContent));
              setVisibility(!popupVisibility);
            } }
          >
            { item.word }
          </h2>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={ e => console.log(validateEdit(e.currentTarget.textContent)) }
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
          onToggle={ () => setVisibility(!popupVisibility) }
          msg={ "I love snacks" }
        />
      </Fragment>
    );
  }
  else {
    return null;
  }    
  
}