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

  const addTodo = () => {
    let newTodos = [...props.list?.getItems(hook)];
    newTodos.push(new TodoItem(todoName));
    const newList = props.list;
    newList.setItems(newTodos);
    props.setList(newList);
    setTodoName("");
  };

  const removeTodo = (todo) => {
    const newList = props.list;
    newList.setItems(
      [...props.list?.getItems(hook)].filter((item) => item !== todo)
    );
    props.setList(newList);
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

        {props.list?.getItems(hook)?.length === 0 && (
          <div>{strings.no_list}</div>
        )}
        <List>
          {props.list?.getItems(hook)?.length > 0 &&
            props.list?.getItems(hook)?.map((item) => (
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
  setList: PropTypes.func,
};

export default Todos;
