export const initialSearchState = {
  items: [],
  searchFocused: false,
  searchTerm: null,
  currentItems: []
};

export function searchReducer(state, action) {
  switch (action.type) {
    case 'on-loaded-items':
        return { 
            items: action.state.items, 
            currentItems: state.currentItems, 
            searchFocused: !state.searchFocused,
            searchTerm: state.searchTerm 
        };
    case 'on-search':
        console.log('on-search', action.state);
        return { 
            items: state.items, 
            currentItems: state.currentItems, 
            searchFocused: true,
            searchTerm: action.state.searchTerm 
        };
    default:
      throw new Error();
  }
}
