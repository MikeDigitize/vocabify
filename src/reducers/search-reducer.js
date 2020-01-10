import { filterSearchItems } from '../utils/general-utils';

export const initialSearchState = {
  items: [],
  searchTerm: '',
  currentItems: []
};

export function searchReducer(state, action) {
  switch (action.type) {
    case 'on-loaded-items':
        console.log('on-search', action.state, state);
        return { 
            ...state,
            items: action.state.items,
            currentItems: action.state.items
        };
    case 'on-search':
        console.log('on-search', action.state, state);
        return { 
            ...state,
            currentItems: filterSearchItems(action.state.searchTerm, state.items),
            searchTerm: action.state.searchTerm 
        };
    case 'on-search-blur':
      console.log('on-search-blur', action.state, state);
      return {
        ...state,
        currentItems: action.state.searchTerm === '' ? state.items: state.currentItems
      }
    default:
      throw new Error();
  }
}
