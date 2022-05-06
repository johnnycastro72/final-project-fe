function reducer(state, action) {
  switch (action.type) {
    case "get-categories":
      const stateWithAllCategories = {
        ...state,
        tasks: action.payload,
      };
  }
}

export default reducer;
