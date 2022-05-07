function reducer(state, action) {
  switch (action.type) {
    case "get-categories":
      const stateWithAllCategories = {
        ...state,
        tasks: action.payload,
      };
      return state;
    case "add-task":
      const newTask = {
        id: Math.floor(Math.random() * 100),
        message: action.payload.message,
        categoryId: action.payload.categoryId,
        done: false,
      };

      const newListOfCategoriesAddedNewTask = state.listOfCategories.map(
        (cat) => {
          if (cat.id === action.payload.categoryId) {
            console.log(cat)
            console.log(action)
            //cat.tasks = [...cat.tasks, newTask];
          }
          return cat;
        }
      );
      console.log(newListOfCategoriesAddedNewTask);
      const newStateAddedTask = {
        ...state,
        listOfCategories: newListOfCategoriesAddedNewTask,
      };
      return newStateAddedTask;
    case "update-done":
      const newListOfCategories = state.listOfCategories.map((cat) => {
        cat.tasks.map((task) => {
          if (task.id == action.payload.id) {
            task.done = action.payload.done;
          }
          return task;
        });
        return cat;
      });
      const newStateModifiedCheckbox = {
        ...state,
        listOfCategories: newListOfCategories,
      };
      return newStateModifiedCheckbox;
  }
}

export default reducer;
