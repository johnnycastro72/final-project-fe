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

  const onDeleteTask = (task) => {
    dispatch({
      type: "remove-task",
      payload: task
    })
  }

  const onDeleteCategory = (category) => {
    dispatch({
      type: "remove-category",
      payload: category
    })
  }

  console.log(state);
  return (
    <div>
      {state.listOfCategories.map((actualCategory) => {
        return (
          <Card key={actualCategory.id}>
            <Card.Header>{actualCategory.title} <Button variant="danger" size="sm" onClick={() => onDeleteCategory(actualCategory)}>Delete</Button></Card.Header>
            <Card.Body>
              <TaskForm catId={actualCategory.id} />
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
                  {actualCategory.tasks.map((actualTask) => {
                    return (
                      <tr key={actualTask.id}>
                        <td style={actualTask.done?{textDecoration: 'line-through'}:{}}>{actualTask.id}</td>
                        <td style={actualTask.done?{textDecoration: 'line-through'}:{}}>{actualTask.message}</td>
                        <td>
                          <input
                            onChange={(event) => onCheckbox(event, actualTask)}
                            type="checkbox"
                          />
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => onDeleteTask(actualTask)}>Delete</Button>
                        </td>
                        <td>
                          {actualCategory.done?<Button size="sm">Edit</Button>:<Button size="sm" disabled>Edit</Button>}
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
