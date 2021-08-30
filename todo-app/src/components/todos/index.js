import React from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import strings from "../../resources/strings";
import { useDataHook } from "model-react";
import CustomInput from "../base/CustomInput";
import { DeleteOutline } from "@material-ui/icons";
import TodoList from "../../models/TodoList";
import { MemoryRouter } from "react-router-dom";
import TodoItem from "../../models/TodoItem";

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
            <ListItem key={item.getName(hook)}>
              <ListItemText primary={item.getName(hook)} />
              <ListItemSecondaryAction onClick={() => removeTodo(item)}>
                <IconButton edge="end">
                  <DeleteOutline />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </MemoryRouter>
  );
}

Todos.propTypes = {
  list: PropTypes.objectOf(TodoList).isRequired,
};

export default Todos;
