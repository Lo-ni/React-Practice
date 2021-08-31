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
import { Done } from "@material-ui/icons";

function Todos(props) {
  const [hook] = useDataHook();
  const [todoName, setTodoName] = React.useState("");
  const [editItem, setEditItem] = React.useState(null);
  const items = [...props.list?.getItems(hook)];

  const addTodo = () => {
    if (todoName) {
      items.push(new TodoItem(todoName));
      props.list.setItems(items);
    }
    setTodoName("");
  };

  const removeTodo = (todo) => {
    props.list.setItems(items.filter((item) => item !== todo));
  };

  const finishTodo = (todo) => {
    todo.setFinished(!todo.isFinished(hook));
  };

  const editTodo = (todo) => {
    if (todoName) {
      todo.setName(todoName);
      setTodoName("");
      setEditItem(null);
    }
  };

  const editMode = (todo) => {
    setEditItem(todo);
    setTodoName(todo.getName(hook));
  };

  return (
    <MemoryRouter>
      {!editItem && (
        <CustomInput
          placeholder={strings.new_todo}
          value={todoName}
          onChangeValue={setTodoName}
          onClickButton={addTodo}
        />
      )}

      {items?.length === 0 && <div>{strings.no_list}</div>}
      <List>
        {items?.map((item) => (
          <div key={item.getName(hook)}>
            {item === editItem && (
              <CustomInput
                placeholder={strings.new_todo}
                value={todoName}
                onChangeValue={setTodoName}
                onClickButton={() => editTodo(item)}
                icon={<Done />}
              />
            )}
            {item !== editItem && (
              <ListItemLink
                primary={item.getName(hook)}
                onDelete={() => removeTodo(item)}
                onEdit={() => editMode(item)}
                onClick={() => finishTodo(item)}
                isFinished={item.isFinished(hook)}
                disabled={editItem}
              />
            )}
          </div>
        ))}
      </List>
    </MemoryRouter>
  );
}

Todos.propTypes = {
  list: PropTypes.objectOf(TodoList).isRequired,
};

export default Todos;
