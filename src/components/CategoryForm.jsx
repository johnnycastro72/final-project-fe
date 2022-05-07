import React, { useContext, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Store } from "../stateManagement/StoreProvider";

const CategoryForm = () => {
  const formRefCategory = useRef(null);

  const onAddCategory = (event) => {
    event.preventDefault();
    if (title) {
      dispatch({
        type: "add-category",
        payload: {
          title
        },
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
