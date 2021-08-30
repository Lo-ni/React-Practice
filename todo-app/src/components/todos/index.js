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
  const [todos, setTodos] = React.useState(props.list?.items);

  const addTodo = () => {
    setTodos([...todos, new TodoItem(todoName)]);
    props.setTodos(todos);
    setTodoName("");
  };

  const removeTodo = (todo) => {
    setTodos([...todos].filter((item) => item !== todo));
    props.setTodos(todos);
  };

  return (
    <MemoryRouter>
      <div>
        <CustomInput
          placeholder={strings.new_todo}
          value={todoName}
          onChangeValue={setTodoName}
          onClickButton={addTodo}
        />

        {props.list?.items?.length === 0 && <div>{strings.no_list}</div>}
        <List>
          {props.list?.items?.length > 0 &&
            props.list?.items?.map((item) => (
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
      </div>
    </MemoryRouter>
  );
}

Todos.propTypes = {
  list: PropTypes.objectOf(TodoList),
  setTodos: PropTypes.func,
};

export default Todos;
