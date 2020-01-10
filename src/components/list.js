import React, { Fragment } from 'react';

export default function List({ items, dispatcher }) {

  function createList() {
    return items.map(function(item, index) {
      return (
        <article className="vocabify-item" key={`${item.word}${index}`}>
          <h2 
            contentEditable
            suppressContentEditableWarning
            onBlur={ evt => {
              console.log(evt.currentTarget.textContent, item.word);
              dispatcher({ 
                type: 'on-word-edit', 
                state: { 
                  originalWord: item.word, 
                  newWord: evt.currentTarget.textContent 
                }
              })
            }}
          >
            { item.word }
          </h2>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={ evt => {
              console.log(evt.currentTarget.textContent, item.definition);
              dispatcher({ 
                type: 'on-definition-edit', 
                state: { 
                  originalDefinition: item.definition, 
                  newDefinition: evt.currentTarget.textContent 
                }
              });
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
      </Fragment>
    );
  }
  else {
    return null;
  }    
  
}