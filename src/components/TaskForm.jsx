import React, { useRef } from "react";
import { Store } from "../stateManagement/StoreProvider";

const TaskForm = () => {
  const formTask = useRef(null);

  return (
    <form ref={formTask}>
      <input type="text" name="message" placeholder="To-Do list" />
      <button>Create</button>
    </form>
  );
};

export default TaskForm;
