import React, { useRef } from "react";
import { Form,Button } from "react-bootstrap"
import { Store } from "../stateManagement/StoreProvider";

const TaskForm = () => {
  const formTask = useRef(null);

  return (
    <Form ref={formTask}>
      <Form.Group className="mb-3" controlId="formTaskMessage">
        <Form.Label>Task</Form.Label>
        <Form.Control type="text" placeholder="Actions pendient to be done"></Form.Control>
        <Form.Text className="text-muted">Please enter a task</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">Create</Button>
    </Form>
  );
};

export default TaskForm;
