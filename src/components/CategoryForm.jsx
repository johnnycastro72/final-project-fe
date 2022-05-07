import React, { useContext, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Store } from "../stateManagement/StoreProvider";

const CategoryForm = () => {
  const formRefCategory = useRef(null);

  const onAddCategory = async (event) => {
    event.preventDefault();
    if (title) {
      let categoryFromForm = {
        title,
      }

      let categorySavedPromise = await fetch(`http://localhost:8081/api/v1/save/category`,{
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(categoryFromForm)
      });

      let categorySavedNullTasks = await categorySavedPromise.json();
      let categorySaved = { ...categorySavedNullTasks, tasks: [] }

      dispatch({
        type: "add-category",
        payload: categorySaved
      });
      formRefCategory.current.reset();
      setTitle("");
    }
  };

  const { state, dispatch } = useContext(Store);

  const [ title, setTitle ] = useState("");

  const addingTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Form ref={formRefCategory}>
      <Form.Group className="mb-3" controlId="formCategoryTitle">
        <Form.Label>Task Category</Form.Label>
        <Form.Control
          onChange={addingTitle}
          type="text"
          name="title"
          placeholder="To-Do list"
        ></Form.Control>
        <Form.Text className="text-muted">Please enter a category list name</Form.Text>
        <div className="d-grid gap-2">
        <Button onClick={onAddCategory} variant="primary" size="lg" type="submit">
          Create new category
        </Button>
      </div>
      </Form.Group>
    </Form>
  );
};

export default CategoryForm;
