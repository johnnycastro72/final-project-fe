import React, { useContext, useEffect, useState } from "react";
import { Card, Table, Button, Modal, Form, Container } from "react-bootstrap";
import { Store } from "../stateManagement/StoreProvider";
import TaskForm from "./TaskForm";

const CategoryList = () => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    let listOfCategory = fetchAllCategories().then(
      categories => {
        let action = {
          type: "get-categories",
          payload: categories
        }

        dispatch(action)
      }
    )
  }, []);

  const fetchAllCategories = async () => {
    let response = await fetch(`http://localhost:8081/api/v1`);
    let data = await response.json();
    return data;
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [modalClose, setModalClose] = useState(true);
  const [editedMessage, setEditedMessage] = useState("");
  const [editedTaskId, setEditedTaskId] = useState(0);

  const onCheckbox = (event, task) => {
    const checked = event.currentTarget.checked;
    dispatch({
      type: "update-done",
      payload: { ...task, done: checked },
    });
  };

  const onDeleteTask = (task) => {
    dispatch({
      type: "remove-task",
      payload: task,
    });
  };

  const onDeleteCategory = (category) => {
    dispatch({
      type: "remove-category",
      payload: category,
    });
  };

  const closeModal = (event, updatedMessage, saveChanges) => {
    setModalClose(true);
    setModalOpen(false);
    if (updatedMessage && saveChanges) {
      setEditedMessage(updatedMessage);
      dispatch({
        type: "update-message",
        payload: {
          event,
          updatedMessage,
          editedTaskId,
        },
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
    <div>
      {state.listOfCategories.map((actualCategory) => {
        return (
          <Container>
            <Card key={actualCategory.id}>
              <Card.Header>
                {actualCategory.title}
                <Button
                  variant="danger"
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
                            />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => onDeleteTask(actualTask)}
                            >
                              Delete
                            </Button>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Button
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
          </Container>
        );
      })}
      <Modal show={modalOpen} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
            variant="secondary"
            onClick={(event) => closeModal(event, editedMessage, 0)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(event) => closeModal(event, editedMessage, 1)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryList;
