import React, { createContext, useReducer } from "react";
import reducer from "./Reducer";

/**
 * Context API allows us to share state with other components.
 * <p>
 * The Store it's created with a initial state and the reducer function defined.
 * 
 * @author Jhonny Castro <johnny.castro@misena.edu.co>
 * @version 1.0.0 7/05/2022
 * @since 1.0.0
 */
const initialState = {
  task: {
    id: "",
    message: "",
    done: false,
    categoryId: "",
  },
  category: {
    id: "",
    title: "",
  },
  listOfCategories: [],
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
