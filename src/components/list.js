import React, { Fragment } from 'react';
import { isFourHundredCharactersOrLess, isTwoCharactersOrMore } from '../utils/general-utils';

export default function List({ items, dispatcher }) {

  function createList() {
    return items.map(function(item, index) {
      return (
        <article className="vocabify-item" key={`${item.word}${index}`}>
          <h2 
            contentEditable
            suppressContentEditableWarning
            onBlur={ evt => {
              let text = evt.currentTarget.textContent;
              if(isTwoCharactersOrMore(text) && isFourHundredCharactersOrLess(text)) {
                console.log(evt.currentTarget.textContent, item.word);
                dispatcher({ 
                  type: 'on-word-edit', 
                  state: { 
                    originalWord: item.word, 
                    newWord: evt.currentTarget.textContent 
                  }
                })
              }
              else {
                evt.currentTarget.textContent = item.word;
                dispatcher({
                  type: 'on-show-popup',
                  state: {
                    popupMessage: !isTwoCharactersOrMore(text) ? 
                      'Words saved need to be two or more characters long!' :
                      'Words saved need to be less than 400 characters long!'
                  }
                });
              }
            }}
          >
            { item.word }
          </h2>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={ evt => {
              let text = evt.currentTarget.textContent;
              if(isTwoCharactersOrMore(text) && isFourHundredCharactersOrLess(text)) {
                console.log(text, item.definition);
                dispatcher({ 
                  type: 'on-definition-edit', 
                  state: { 
                    originalDefinition: item.definition, 
                    newDefinition: text 
                  }
                });
              }
              else {
                evt.currentTarget.textContent = item.definition;
                dispatcher({
                  type: 'on-show-popup',
                  state: {
                    popupMessage: !isTwoCharactersOrMore(text) ? 
                      'Definitions saved need to be two or more characters long!' :
                      'Definitions saved need to be less than 400 characters long!'
                  }
                });
              }
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