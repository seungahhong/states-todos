import React from "react";
import { TodoItemProps } from "./types/todos";

const TodosContentItemComponent = ({
  userId,
  id,
  title,
  completed,
}: TodoItemProps) => (
  <div>
    <input type="checkbox" checked={completed} onChange={() => {}} />
    <span>UserId: {userId} | </span>
    <span>Title: {title} | </span>
    <span>ID: {id}</span>
  </div>
);

TodosContentItemComponent.defaultProps = {
  completed: false,
  title: "",
};

export default TodosContentItemComponent;
