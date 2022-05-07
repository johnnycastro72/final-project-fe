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
};

const Store = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export default StoreProvider;

export { Store, initialState };
