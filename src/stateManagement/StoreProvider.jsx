import React, { createContext, useReducer } from 'react';
import reducer from "./Reducer";

const initialState = [
    {
        "id": 1,
        "title": "First Category",
        "tasks": []
    },
    {
        "id": 2,
        "title": "Second Category Edited",
        "tasks": [
            {
                "id": 5,
                "message": "First task of Second category",
                "done": false,
                "categoryId": 2
            }
        ]
    }
]

const Store = createContext(initialState);

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{ children }</Store.Provider>
  );
};

export default StoreProvider;

export { Store, initialState };