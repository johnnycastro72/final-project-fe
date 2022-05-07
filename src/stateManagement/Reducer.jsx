function reducer(state, action) {
  switch (action.type) {
    case "get-categories":
      const stateWithAllCategories = {
        ...state,
        tasks: action.payload,
      };
      return state;
    case "update-done":
      const newListofCategories = state.listOfCategories.map((cat) => {
        cat.tasks.map((task) => {
          if (task.id == action.payload.id) {
            task.done = action.payload.done;
          }
          return task;
        });
        return cat;
      });
      const newStateModifiedCheckbox = {...state, listOfCategories: newListofCategories}
      return newStateModifiedCheckbox;
  }
}

export default reducer;
