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
      const newTask = {
        id: Math.floor(Math.random() * 100),
        message: action.payload.message,
        categoryId: action.payload.categoryId,
        done: false,
      };

      const newListOfCategoriesAddedNewTask = state.listOfCategories.map(
        (category) => {
          if (category.id === action.payload.categoryId) {
            category = { ...category, tasks: [...category.tasks, newTask] };
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
      const newListOfCategories = state.listOfCategories.map((category) => {
        category.tasks.map((task) => {
          if (task.id === action.payload.id) {
            task.done = action.payload.done;
          }
          return task;
        });
        return category;
      });
      const newStateModifiedCheckbox = {
        ...state,
        listOfCategories: newListOfCategories,
      };
      return newStateModifiedCheckbox;
    case "update-message":
      const newListOfCategoriesUpdatedMessage = state.listOfCategories.map(
        (category) => {
          category.tasks.map((task) => {
            if (task.id === action.payload.editedTaskId) {
              task.message = action.payload.updatedMessage;
            }
            return task;
          });
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
