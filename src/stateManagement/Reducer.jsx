function reducer(state, action) {
  switch (action.type) {
    case "get-categories":
    case "add-category":
      const newCategory = {
        id: Math.floor(Math.random() * 100),
        title: action.payload.title,
        tasks: []
      }
      const newListOfCategoriesAddedCategory = [...state.listOfCategories, newCategory]
      const newStateAddedCategory = {...state, listOfCategories: newListOfCategoriesAddedCategory}
      return newStateAddedCategory
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
            cat = { ...cat, tasks: [...cat.tasks, newTask] };
          }
          return cat;
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
      console.log(action.payload)
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
      const newListOfCategoriesWithoutDeletedCategory = state.listOfCategories.filter(
        (category) => category.id !== action.payload.id);
      const newStateWithoutDeletedCategory = {
        ...state,
        listOfCategories: newListOfCategoriesWithoutDeletedCategory,
      };
      return newStateWithoutDeletedCategory;
  }
}

export default reducer;
