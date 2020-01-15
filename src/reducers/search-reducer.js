import { 
  filterSearchItems, 
  capitaliseFirstLetter,
  addFullStop, 
  updateItems,
  isDuplicateWord
} from '../utils/general-utils';

export const initialSearchState = {
  items: [],
  searchTerm: '',
  currentItems: [],
  showPopup: false,
  popupMessage: ''
};

export function searchReducer(state, action) {

  switch (action.type) {

    case 'on-loaded-items':

        return { 
            ...state,
            items: action.state.items,
            currentItems: action.state.items,
            showPopup: false
        };

    case 'on-search':

        return { 
            ...state,
            currentItems: filterSearchItems(action.state.searchTerm, state.items),
            searchTerm: action.state.searchTerm,
            showPopup: false 
        };

    case 'on-search-blur':

      return {
        ...state,
        currentItems: action.state.searchTerm === '' ? state.items: state.currentItems,
        showPopup: false
      }

    case 'on-word-edit':
      
      if(!isDuplicateWord(state.currentItems, action.state.newWord)) {
        
        return {
          ...state,
          showPopup: true,
          popupMessage: 'Word updated',
          currentItems: updateItems({
            type: 'word',
            originalText: action.state.originalWord,
            newText: capitaliseFirstLetter(action.state.newWord),
            items: state.currentItems
          })
        }
      }
      return {
        ...state,
        popupMessage: `${capitaliseFirstLetter(action.state.newWord)} already exists in Vocabify, save cancelled!`,
        showPopup: true
      }

    case 'on-definition-edit':
      
      return {
        ...state,
        showPopup: true,
        popupMessage: 'Definition updated',
        currentItems: updateItems({
          type: 'definition',
          originalText: action.state.originalDefinition,
          newText: addFullStop(capitaliseFirstLetter(action.state.newDefinition)),
          items: state.currentItems
        })
      }

    case 'on-hide-popup':

      return {
        ...state,
        showPopup: false
      }

    case 'on-show-popup':

      return {
        ...state,
        showPopup: true,
        popupMessage: action.state.popupMessage
      }

    default:
      throw new Error('No case statement matched in reducer!');

  }

}