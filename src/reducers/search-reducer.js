export const initialSearchState = {
  items: [],
  searchFocused: false,
  searchTerm: null,
  currentItems: []
};

export function searchReducer(state, action) {
  switch (action.type) {
    case 'on-loaded-items':
        console.log('on-search', action.state, state);
        return { 
            ...state,
            items: action.state.items
        };
    case 'on-search':
        console.log('on-search', action.state, state);
        return { 
            ...state,
            searchFocused: true,
            searchTerm: action.state.searchTerm 
        };
    default:
      throw new Error();
  }
}
