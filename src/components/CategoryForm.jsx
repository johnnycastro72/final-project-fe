import React, { useContext, useRef, useState } from "react";
import { Store } from "../stateManagement/StoreProvider";

const CategoryForm = () => {
  const formRef = useRef(null);

  const { state, dispatch } = useContext(Store);

  const { title, setTitle } = useState("");

  return (
    <form ref={formRef}>
      <input type="text" name="title" placeholder="To-Do list" />
      <button>New list</button>
    </form>
  );
};

export default CategoryForm;
