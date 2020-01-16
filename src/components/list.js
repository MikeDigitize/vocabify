import React, { Fragment } from 'react';
import { 
  isFourHundredCharactersOrLess, 
  isTwoCharactersOrMore, 
  validateAndSaveWord,
  validateAndSaveDefinition
} from '../utils/general-utils';

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

              if(text === item.word) {
                return;
              }

              if(isTwoCharactersOrMore(text) && isFourHundredCharactersOrLess(text)) {

                validateAndSaveWord({
                  type: 'word',
                  originalText: item.word,
                  newText: evt.currentTarget.textContent,
                  currentItems: items,
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
                  currentItems: items
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
          <div className="row vocabify-item-controls">
            <div className="col divider-right">
              <h2>Delete</h2>
              <i className="fas fa-trash-alt fa-lg"></i>
            </div>
            <div className="col">
              <h2>Synonyms</h2>
              <i className="fas fa-search-plus fa-lg"></i>
            </div>
          </div>
          
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