import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const CategoryList = () => {
  return (
    <ul>
      <li>
        <h1>Category 1</h1>
        <TaskForm />
        <TaskList />
      </li>
      <li>
        <h1>Category 2</h1>
        <TaskForm />
        <TaskList />
      </li>
    </ul>
  );
};

export default CategoryList;
