import { 
  filterSearchItems, 
  validateItemEdit,
  capitaliseFirstLetter,
  addFullStop, 
  updateItems
} from '../utils/general-utils';

export const initialSearchState = {
  items: [],
  searchTerm: '',
  currentItems: [],
  showPopup: false,
  popupMessage: 'Boo!'
};

export function searchReducer(state, action) {
  switch (action.type) {
    case 'on-loaded-items':
        console.log('on-search', action.state, state);
        return { 
            ...state,
            items: action.state.items,
            currentItems: action.state.items,
            showPopup: false
        };
    case 'on-search':
        console.log('on-search', action.state, state);
        return { 
            ...state,
            currentItems: filterSearchItems(action.state.searchTerm, state.items),
            searchTerm: action.state.searchTerm,
            showPopup: false 
        };
    case 'on-search-blur':
      console.log('on-search-blur', action.state, state);
      return {
        ...state,
        currentItems: action.state.searchTerm === '' ? state.items: state.currentItems,
        showPopup: false
      }
    case 'on-word-edit':
      console.log('on-word-edit', action.state, state);
      if(validateItemEdit(action.state.newWord, state.currentItems)) {
        console.log('validated word');
        return {
          ...state,
          showPopup: true,
          popupMessage: 'Success',
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
        popupMessage: 'Fail',
        showPopup: true
      }
    case 'on-definition-edit':
        console.log('on-definition-edit', action.state, state);
        if(validateItemEdit(action.state.newDefinition, state.currentItems)) {
          console.log('validated definition');
          return {
            ...state,
            showPopup: true,
            popupMessage: 'Success',
            currentItems: updateItems({
              type: 'definition',
              originalText: action.state.originalDefinition,
              newText: addFullStop(capitaliseFirstLetter(action.state.newDefinition)),
              items: state.currentItems
            })
          }
        }
        return {
          ...state,
          popupMessage: 'Fail',
          showPopup: true
        }
    case 'on-hide-popup':
      return {
        ...state,
        showPopup: false
      }
    default:
      throw new Error();
  }
}
