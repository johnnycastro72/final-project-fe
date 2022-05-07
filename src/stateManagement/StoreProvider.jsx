import React, { createContext, useReducer } from "react";
import reducer from "./Reducer";

const initialState = {
  task: {
    id: "",
    message: "",
    done: false,
    categoryId: ""
  },
  category: {
    id: "",
    title: ""
  },
  listOfCategories: []
/*   [
    {
      id: 1,
      title: "First Category",
      tasks: [
        {
          id: 2,
          message: "First task on first category",
          done: false,
          categoryId: 1,
        },
      ],
    },
    {
      id: 3,
      title: "Second Category",
      tasks: [
        {
          id: 4,
          message: "First task on second category",
          done: false,
          categoryId: 3,
        },
      ],
    },
  ],
 */};

const Store = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export default StoreProvider;

export { Store, initialState };
