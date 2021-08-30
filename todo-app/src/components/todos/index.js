import React from "react";
import PropTypes from "prop-types";
import { List } from "@material-ui/core";
import strings from "../../resources/strings";
import { useDataHook } from "model-react";
import CustomInput from "../base/CustomInput";
import TodoList from "../../models/TodoList";
import { MemoryRouter } from "react-router-dom";
import TodoItem from "../../models/TodoItem";
import ListItemLink from "../base/ListItemLink";

function Todos(props) {
  const [hook] = useDataHook();
  const [todoName, setTodoName] = React.useState("");
  const items = [...props.list?.getItems(hook)];

  const addTodo = () => {
    items.push(new TodoItem(todoName));
    props.list.setItems(items);
    setTodoName("");
  };

  const removeTodo = (todo) => {
    props.list.setItems(items.filter((item) => item !== todo));
  };

  const finishTodo = (todo) => {
    todo.setFinished(!todo.isFinished(hook));
  };

  return (
    <MemoryRouter>
      <CustomInput
        placeholder={strings.new_todo}
        value={todoName}
        onChangeValue={setTodoName}
        onClickButton={addTodo}
      />

      {items?.length === 0 && <div>{strings.no_list}</div>}
      <List>
        {items?.length > 0 &&
          items?.map((item) => (
            <ListItemLink
              key={item.getName(hook)}
              primary={item.getName(hook)}
              onDelete={() => removeTodo(item)}
              onClick={() => finishTodo(item)}
              isFinished={item.isFinished(hook)}
            />
          ))}
      </List>
    </MemoryRouter>
  );
}

Todos.propTypes = {
  list: PropTypes.objectOf(TodoList).isRequired,
};

export default Todos;
