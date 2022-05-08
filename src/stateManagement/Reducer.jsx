function reducer(state, action) {
  switch (action.type) {
    case "get-categories":
      const newStateGetAllCategories = {...state, listOfCategories: action.payload };
      return newStateGetAllCategories;
    case "add-category":
      const newCategory = action.payload;
      const newListOfCategoriesAddedCategory = [
        ...state.listOfCategories,
        newCategory,
      ];
      const newStateAddedCategory = {
        ...state,
        listOfCategories: newListOfCategoriesAddedCategory,
      };
      return newStateAddedCategory;
    case "add-task":
      const newListOfTask = action.payload.tasks;
      const newListOfCategoriesAddedNewTask = state.listOfCategories.map(
        (category) => {
          if (category.id === action.payload.id) {
            category = { ...category, tasks: newListOfTask };
          }
          return category;
        }
      );
      const newStateAddedTask = {
        ...state,
        listOfCategories: newListOfCategoriesAddedNewTask,
      };
      return newStateAddedTask;
    case "update-done":
      const newListOfUpdatedTask = action.payload.tasks;
      const newListOfCategoriesUpdatedDone = state.listOfCategories.map((category) => {
        if (category.id === action.payload.id) {
          category = { ...category, tasks: newListOfUpdatedTask };
        }
        return category;
      });
      const newStateModifiedCheckbox = {
        ...state,
        listOfCategories: newListOfCategoriesUpdatedDone,
      };
      return newStateModifiedCheckbox;
    case "update-message":
      const {tasks} = action.payload;
      const newListOfCategoriesUpdatedMessage = state.listOfCategories.map(
        (category) => {
          if (category.id === action.payload.id) {
            category = { ...category, tasks: tasks };
          }
          return category;
        }
      );
      const newStateUpdatedMessage = {
        ...state,
        listOfCategories: newListOfCategoriesUpdatedMessage,
      };
      return newStateUpdatedMessage;
    case "remove-task":
      const newListOfCategoriesWithoutDeletedTask = state.listOfCategories.map(
        (category) => {
          if (category.id === action.payload.categoryId) {
            const newListOfTasks = category.tasks.filter(
              (task) => task.id !== action.payload.id
            );
            category = { ...category, tasks: newListOfTasks };
          }
          return category;
        }
      );
      const newStateWithoutDeletedTask = {
        ...state,
        listOfCategories: newListOfCategoriesWithoutDeletedTask,
      };
      return newStateWithoutDeletedTask;
    case "remove-category":
      const newListOfCategoriesWithoutDeletedCategory =
        state.listOfCategories.filter(
          (category) => category.id !== action.payload.id
        );
      const newStateWithoutDeletedCategory = {
        ...state,
        listOfCategories: newListOfCategoriesWithoutDeletedCategory,
      };
      return newStateWithoutDeletedCategory;
  }
}

export default reducer;
