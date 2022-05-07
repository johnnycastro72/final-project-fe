import React, { useRef } from "react";
import { Store } from "../stateManagement/StoreProvider";

const TaskForm = () => {
  const formTask = useRef(null);

  return (
    <form ref={formTask}>
      <input type="text" name="message" placeholder="Actions pending to be done" />
      <button>Create</button>
    </form>
  );
};

export default TaskForm;
