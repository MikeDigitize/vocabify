import React, { Fragment } from 'react';
import { validateEdit } from '../utils/general-utils';

export default function List({ items }) {

  function createList() {
    return items.map(function(item, index) {
      return (
        <article className="vocabify-item" key={`${item.word}${index}`}>
          <h2 
            contentEditable
            suppressContentEditableWarning
            onBlur={ e => console.log(validateEdit(e.currentTarget.textContent)) }
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
      </Fragment>
    );
  }
  else {
    return null;
  }    
  
}