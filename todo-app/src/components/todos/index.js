import React from "react";
import PropTypes from "prop-types";
import strings from "../../resources/strings";
import { useDataHook } from "model-react";
import TodoList from "../../models/TodoList";
import TodoItem from "../../models/TodoItem";
import ListView from "../base/ListView";

function Todos(props) {
  const [hook] = useDataHook();
  const todos = [...props.list?.getItems(hook)];

  const addTodo = (todoName) => {
    todos.push(new TodoItem(todoName));
    props.list.setItems(todos);
  };

  const removeTodo = (todo) => {
    props.list.setItems(todos.filter((item) => item !== todo));
  };

  const finishTodo = (todo) => {
    todo.setFinished(!todo.isFinished(hook));
  };

  const editTodo = (todo, todoName) => {
    todo.setName(todoName);
  };

  return (
    <ListView
      placeholderNewItem={strings.new_todo}
      placeholderEditItem={strings.edit_todo}
      addItem={addTodo}
      items={todos}
      primaryText={(todo) => todo.getName(hook)}
      deleteItem={removeTodo}
      editItem={editTodo}
      itemClick={finishTodo}
      itemIsFinished={(item) => item.isFinished(hook)}
    />
  );
}

Todos.propTypes = {
  list: PropTypes.objectOf(TodoList).isRequired,
};

export default Todos;
