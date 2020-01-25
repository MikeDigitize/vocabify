import React, { Fragment, useEffect } from 'react';
import { 
  isFourHundredCharactersOrLess, 
  isTwoCharactersOrMore, 
  validateAndSaveWord,
  validateAndSaveDefinition
} from '../utils/general-utils';

export default function List({ currentItems, dispatcher }) {

  useEffect(function(...args) {
    console.log('trigger synonyms retrieval');
  }, []);

  function createList() {
    return currentItems.map(function(item, index) {
      return (
        <article className="vocabify-item" key={`${item.word}${index}`}>
          <div className="delete-item-holder">
              <i 
                className="fas fa-times-circle" 
                title={`Delete ${item.word}`}
                onClick={ () => dispatcher({ 
                  type: 'on-delete-item-request',
                  state: item.word
                })}
              >
              </i>
          </div>
          <h2 
            contentEditable
            suppressContentEditableWarning
            onBlur={ evt => {

              let text = evt.currentTarget.textContent;

              if(text === item.word) {
                return;
              }

              if(isTwoCharactersOrMore(text) && isFourHundredCharactersOrLess(text)) {

                validateAndSaveWord({
                  type: 'word',
                  originalText: item.word,
                  newText: evt.currentTarget.textContent,
                  currentItems: currentItems,
                  dispatcher
                });

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

              if(text === item.definition) {
                return;
              }

              if(isTwoCharactersOrMore(text) && isFourHundredCharactersOrLess(text)) {
                
                validateAndSaveDefinition({
                  originalText: item.definition,
                  newText: text,
                  dispatcher,
                  currentItems: currentItems
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