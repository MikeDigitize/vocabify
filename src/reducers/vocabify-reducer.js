import { 
  filterSearchItems, 
  capitaliseFirstLetter,
  removeItem
} from '../utils/general-utils';

export const initialSearchState = {
  items: [],
  searchTerm: '',
  currentItems: [],
  showPopup: false,
  showAlert: false,
  popupMessage: '',
  wordToDelete: ''
};

export function vocabifyReducer(state, action) {

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
      
      if(action.state.success) {
        
        return {
          ...state,
          showPopup: true,
          popupMessage: 'Word updated',
          currentItems: action.state.items
        }
      }
      else {
        return {
          ...state,
          popupMessage: `${capitaliseFirstLetter(action.state.newText)} already exists in Vocabify, save cancelled!`,
          showPopup: true
        }
      }
      

    case 'on-definition-edit':
      
      return {
        ...state,
        showPopup: true,
        popupMessage: 'Definition updated',
        currentItems: action.state.items
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
    
    case 'on-delete-item-request':

      return {
        ...state,
        showAlert: true,
        wordToDelete: action.state
      }

    case 'on-delete-item-response':

      if(action.state.delete) {
        return {
          ...state,
          currentItems: removeItem(action.state.wordToDelete, state.currentItems),
          items: removeItem(action.state.wordToDelete, state.items),
          showAlert: false,
          wordToDelete: '',
          showPopup: true,
          popupMessage: `${action.state.wordToDelete} has been deleted`
        }
      }
      else {
        return {
          ...state,
          showAlert: false,
          wordToDelete: ''
        }
      }
      
    default:
      throw new Error('No case statement matched in reducer!');

  }

}