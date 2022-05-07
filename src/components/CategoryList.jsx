import React, { useContext } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { Store } from "../stateManagement/StoreProvider";
import TaskForm from "./TaskForm";

const CategoryList = () => {
  const { state, dispatch } = useContext(Store);

  const onCheckbox = (event, task) => {
    const checked = event.currentTarget.checked;
    console.log(checked);
    dispatch({
      type: "update-done",
      payload: {...task, 
      done: checked}
    })
  };
  console.log(state);
  return (
    <div>
      {state.listOfCategories.map((cat) => {
        return (
          <Card key={cat.id}>
            <Card.Header>{cat.title}</Card.Header>
            <Card.Body>
              <TaskForm />
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Task</th>
                    <th>Done</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cat.tasks.map((tas) => {
                    return (
                      <tr key={tas.id}>
                        <td style={tas.done?{textDecoration: 'line-through'}:{}}>{tas.id}</td>
                        <td style={tas.done?{textDecoration: 'line-through'}:{}}>{tas.message}</td>
                        <td>
                          <input
                            onChange={(event) => onCheckbox(event, tas)}
                            type="checkbox"
                          />
                        </td>
                        <td>
                          <Button>Delete</Button>
                        </td>
                        <td>
                          <Button>Edit</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        );
      })}
      <h1></h1>
    </div>
  );
};

export default CategoryList;
