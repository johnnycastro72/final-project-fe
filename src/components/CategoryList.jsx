import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardGroup,
  Row,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Store } from "../stateManagement/StoreProvider";
import TaskForm from "./TaskForm";

/**
 * This component manages the task categories, allows you to delete them and also 
 * manages the tasks in each category (add, edit, delete).
 * <p>
 * 
 * @author Jhonny Castro <johnny.castro@misena.edu.co>
 * @version 1.0.0 7/05/2022
 * @since 1.0.0
 */
const CategoryList = () => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    let listOfCategories = fetchAllCategories().then((categories) => {
      let action = {
        type: "get-categories",
        payload: categories,
      };
      dispatch(action);
    });
  }, []);

  const fetchAllCategories = async () => {
    let response = await fetch(`http://localhost:8081/api/v1`);
    let data = await response.json();
    return data;
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalClose, setModalClose] = useState(true);
  const [editedMessage, setEditedMessage] = useState("");
  const [editedTaskId, setEditedTaskId] = useState(0);

  const onCheckbox = async (event, task) => {
    const checked = event.currentTarget.checked;
    const newTaskUpdatedDone = { ...task, done: checked };
    let taskUpdatedDonePromise = await fetch(
      `http://localhost:8081/api/v1/update/task`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTaskUpdatedDone),
      }
    );
    let taskUpdatedDone = await taskUpdatedDonePromise.json();
    dispatch({
      type: "update-done",
      payload: taskUpdatedDone,
    });
  };

  const onDeleteTask = async (task) => {
    let response = await fetch(`http://localhost:8081/api/v1/delete/task`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.status === 200) {
      dispatch({
        type: "remove-task",
        payload: task,
      });
    }
  };

  const onDeleteCategory = async (category) => {
    let response = await fetch(`http://localhost:8081/api/v1/delete/category`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(category),
    });
    dispatch({
      type: "remove-category",
      payload: category,
    });
  };

  const closeModal = async (event, updatedMessage, saveChanges) => {
    setModalClose(true);
    setModalOpen(false);
    if (updatedMessage && saveChanges) {
      setEditedMessage(updatedMessage);
      const categoriesUpdatedTask = state.listOfCategories.map((category) => {
        const { tasks } = category;
        const categoryWithUpdatedTask = {
          ...category,
          tasks: tasks.filter((task) => task.id === editedTaskId),
        };
        return categoryWithUpdatedTask;
      });

      const categoryUpdatedTask = categoriesUpdatedTask.filter(
        (category) => category.tasks.length > 0
      );
      const [cat] = categoryUpdatedTask;
      const { tasks } = cat;
      const [oldUpdatedTask] = tasks;
      const newUpdatedTask = { ...oldUpdatedTask, message: updatedMessage };
      let taskUpdatedMessagePromise = await fetch(
        `http://localhost:8081/api/v1/update/task`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUpdatedTask),
        }
      );
      let taskUpdatedMessage = await taskUpdatedMessagePromise.json();
      dispatch({
        type: "update-message",
        payload: taskUpdatedMessage,
      });
    }
  };

  const onChangeMessage = (event) => {
    setEditedMessage(event.target.value);
  };

  const openModal = (event, task) => {
    setModalOpen(true);
    setModalClose(false);
    setEditedMessage(task.message);
    setEditedTaskId(task.id);
  };

  return (
    <CardGroup>
      <Row xs={1} md={3} className="g-4">
        {state.listOfCategories.map((actualCategory) => {
          return (
            <Card key={actualCategory.id} border="secondary">
              <Card.Header
                style={{ display: "flex", "justify-content": "space-between" }}
              >
                <h2>{actualCategory.title}</h2>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDeleteCategory(actualCategory)}
                >
                  Delete
                </Button>
              </Card.Header>
              <Card.Body>
                <TaskForm catId={actualCategory.id} />
                <Table size="sm" striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>Id</th>
                      <th style={{ textAlign: "center" }}>Task</th>
                      <th style={{ textAlign: "center" }}>Done</th>
                      <th colSpan={2}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {actualCategory.tasks.map((actualTask) => {
                      return (
                        <tr key={actualTask.id}>
                          <td
                            style={
                              actualTask.done
                                ? {
                                    textDecoration: "line-through",
                                    textAlign: "center",
                                  }
                                : { textAlign: "center" }
                            }
                          >
                            {actualTask.id}
                          </td>
                          <td
                            style={
                              actualTask.done
                                ? { textDecoration: "line-through" }
                                : {}
                            }
                          >
                            {actualTask.message}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <input
                              onChange={(event) =>
                                onCheckbox(event, actualTask)
                              }
                              type="checkbox"
                              checked={actualTask.done}
                            />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => onDeleteTask(actualTask)}
                            >
                              Delete
                            </Button>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Button
                              variant="outline-primary"
                              key={actualTask.id}
                              size="sm"
                              onClick={(event) => openModal(event, actualTask)}
                              disabled={actualTask.done}
                            >
                              Edit
                            </Button>
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
        <Modal show={modalOpen} onHide={modalClose}>
          <Modal.Header
            closeButton
            style={{
              height: "5em",
              padding: "1em",
              color: "#d8dbf6",
              backgroundColor: "blue",
              textAlign: "center",
            }}
          >
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Task message</Form.Label>
                <Form.Control
                  onChange={onChangeMessage}
                  type="text"
                  name="editedMessage"
                  defaultValue={editedMessage}
                  placeholder="Actions pendient to be done"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={(event) => closeModal(event, editedMessage, 0)}
            >
              Close
            </Button>
            <Button
              variant="outline-primary"
              onClick={(event) => closeModal(event, editedMessage, 1)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </CardGroup>
  );
};

export default CategoryList;
