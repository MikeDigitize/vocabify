import React, { useEffect, useReducer } from 'react';
import testData from '../test-data';
import List from './list';
import Search from './search';
import MessagePopup from './message-popup';
import Alert from './alert';
import { vocabifyReducer, initialSearchState } from '../reducers/vocabify-reducer'; 
import { __VOCABIFY_SAVED_ITEMS__ } from '../utils/constants';
import { getVocabifyData,inChromeExtension } from '../utils/general-utils';

export default function Container() {

  const [state, dispatch] = useReducer(vocabifyReducer, initialSearchState);

  useEffect(function() {
    async function getData() {
    
      let items;
      if (inChromeExtension()) {
        items = await getVocabifyData(__VOCABIFY_SAVED_ITEMS__);
      }
      items = items && Object.keys(items).length ? items[__VOCABIFY_SAVED_ITEMS__] : testData;
      
      /**
       * For local development
       * save items to window
       * for retrieval later
       */
      if(!inChromeExtension()) {
        window[__VOCABIFY_SAVED_ITEMS__] = items;
      }

      let updatedState = { ...state, items };
      dispatch({ type: 'on-loaded-items', state: updatedState });

    }
    getData();
  }, []);

  return (
    <div className="container text-center">
      <header className="row">
        <div className="col">
          <h1>Vocabify</h1>
          <p className="subtitle">Your vocabulary development tool</p>
          <Search dispatcher={ dispatch } />
          <small>You can edit the word or definition by clicking into the text.</small>
        </div>
      </header>
      <div className="row">
        <div className="col">
          <List currentItems={ state.currentItems } dispatcher={ dispatch } />
          <MessagePopup 
            open={ state.showPopup } 
            msg={ state.popupMessage }
            dispatcher={ dispatch }
          />
          <Alert 
            open={ state.showAlert }
            dispatcher={ dispatch }
            wordToDelete={ state.wordToDelete }
            currentItems={ state.currentItems } 
          />
        </div>
      </div>
    </div>
  );
}
