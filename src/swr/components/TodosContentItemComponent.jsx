import React from "react";

const TodosContentItemComponent = ({ 
  userId, 
  id, 
  title, 
  completed
}) => (
  <div>
    <input type="checkbox" checked={completed} onChange={() => {}} />
    <span>UserId: {userId} | </span>
    <span>Title: {title} | </span>
    <span>ID: {id}</span>
  </div>
); 

TodosContentItemComponent.defaultProps = {
  userId: 0,
  id: 0, 
  completed: false,
  title: '',
};

export default TodosContentItemComponent;