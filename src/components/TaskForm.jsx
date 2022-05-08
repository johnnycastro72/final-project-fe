import React, { useContext, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Store } from "../stateManagement/StoreProvider";

/**
 * This component returns the task form of our application.
 * <p>
 *  We can create new task with this component.
 * 
 * @author Jhonny Castro <johnny.castro@misena.edu.co>
 * @version 1.0.0 7/05/2022
 * @since 1.0.0
 */
const TaskForm = ({ catId }) => {
  const formRefTask = useRef(null);

  const onAddTask = async (event) => {
    event.preventDefault();
    if (message) {
      let taskFromForm = {
        message,
        categoryId: catId,
        done: false,
      };

      let taskSavedPromise = await fetch(
        `http://localhost:8081/api/v1/save/task`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(taskFromForm),
        }
      );

      let taskSaved = await taskSavedPromise.json();

      dispatch({
        type: "add-task",
        payload: taskSaved,
      });
      formRefTask.current.reset();
      setMessage("");
    }
  };

  const { state, dispatch } = useContext(Store);

  const [message, setMessage] = useState("");

  const addingMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Form ref={formRefTask}>
      <Form.Group className="mb-3" controlId="formTaskMessage">
        <Form.Label>Task</Form.Label>
        <Form.Control
          onChange={addingMessage}
          type="text"
          name="message"
          placeholder="Actions pendient to be done"
        ></Form.Control>
        <Form.Text className="text-muted">Please enter a task</Form.Text>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button onClick={onAddTask} variant="primary" size="lg" type="submit">
          Create new task
        </Button>
      </div>
    </Form>
  );
};

export default TaskForm;
