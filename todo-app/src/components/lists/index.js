import React from "react";
import { List } from "@material-ui/core";
import strings from "../../resources/strings";
import { useDataHook } from "model-react";
import TodoList from "../../models/TodoList";
import CustomInput from "../base/CustomInput";
import ListItemLink from "../base/ListItemLink";

export default function Lists() {
  const [hook] = useDataHook();
  const [lists, setLists] = React.useState([]);
  const [listName, setListName] = React.useState("");

  const addList = (name) => {
    setLists([...lists, new TodoList(name)]);
  };

  const removeList = (list) => {
    setLists([...lists].filter((item) => item !== list));
  };

  return (
    <div>
      <CustomInput
        placeholder={strings.new_todo_list}
        value={listName}
        onChangeValue={setListName}
        onClickButton={() => {
          addList(listName);
          setListName("");
        }}
      />

      {lists.length === 0 && <div>{strings.no_list}</div>}
      <List>
        {lists?.map((list) => (
          <ListItemLink
            key={list.getName(hook)}
            to={`/todos/${list.getName(hook)}`}
            primary={list.getName(hook)}
            secondary={`${list.getItems(hook).length} ${strings.tasks_to_do}`}
            data={list}
            deleteAction={removeList}
          />
        ))}
      </List>
    </div>
  );
}
