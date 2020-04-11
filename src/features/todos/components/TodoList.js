import React from "react";
import TodoItem from "./TodoItem";
import TodoEdit from "./TodoEdit";

const TodoList = props => {
  return (
    <ul className="list-group">
      {props.todos &&
        props.todos.map((t, i) =>
          t.editMode ? (
            <TodoEdit
              key={t.name}
              todo={t}
              toggleEditMode={() => props.toggleEditMode(i)}
              editTodo={todo => props.editTodo(todo, i)}
            />
          ) : (
            <TodoItem
              key={t.name}
              todo={t}
              deleteTodo={() => props.deleteTodo(i)}
              editTodo={todo => props.editTodo(todo, i)}
              toggleEditMode={() => props.toggleEditMode(i)}
            />
          )
        )}
    </ul>
  );
};

export default TodoList;
