import React from "react";
import { List } from "@material-ui/core";
import strings from "../../resources/strings";
import { useDataHook } from "model-react";
import TodoList from "../../models/TodoList";
import CustomInput from "../base/CustomInput";
import ListItemLink from "../base/ListItemLink";
import { Route, MemoryRouter } from "react-router-dom";
import Todos from "../todos";

export default function Lists() {
  const [hook] = useDataHook();
  const [lists, setLists] = React.useState([]);
  const [listName, setListName] = React.useState("");

  const addList = () => {
    setLists([...lists, new TodoList(listName, [])]);
    setListName("");
  };

  const removeList = (list) => {
    setLists([...lists].filter((item) => item !== list));
  };

  return (
    <MemoryRouter>
      <div>
        <CustomInput
          placeholder={strings.new_todo_list}
          value={listName}
          onChangeValue={setListName}
          onClickButton={addList}
        />

        {lists.length === 0 && <div>{strings.no_list}</div>}
        <List>
          {lists?.map((list) => (
            <div key={list.getName(hook)}>
              <ListItemLink
                to={`/todos/${list.getName(hook)}`}
                primary={list.getName(hook)}
                secondary={`${list.getItems(hook).length} ${
                  strings.tasks_to_do
                }`}
                onDelete={() => removeList(list)}
              />
              <Route path={`/todos/${list.getName(hook)}`}>
                <Todos list={list} />
              </Route>
            </div>
          ))}
        </List>
      </div>
    </MemoryRouter>
  );
}
