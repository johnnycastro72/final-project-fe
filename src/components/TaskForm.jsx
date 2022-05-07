import React, { useContext, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Store } from "../stateManagement/StoreProvider";

const TaskForm = ({catId}) => {
  const formTask = useRef(null);

  const onAdd = (event) => {
    event.preventDefault();
    if(message) {
      dispatch({
        type: "add-task",
        payload: {
          message,
          categoryId: catId
        }
      })
    }
  };

  const { state, dispatch } = useContext(Store);

  const [message, setMessage] = useState("");

  const addingMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Form ref={formTask}>
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
      <Button onClick={onAdd} variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default TaskForm;
