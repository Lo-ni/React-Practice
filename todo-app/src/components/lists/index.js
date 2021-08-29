import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import strings from "../../resources/strings";
import { useDataHook } from "model-react";
import TodoList from "../../models/TodoList";
import CustomInput from "../base/CustomInput";

export default function Lists() {
  const [hook] = useDataHook();

  const [lists, setLists] = React.useState([]);
  const [listName, setListName] = React.useState("");

  const addList = (name) => {
    setLists([...lists, new TodoList(name)]);
  };

  return (
    <div>
      <CustomInput
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
          <ListItem key={list.getName(hook)}>
            <ListItemText
              primary={list.getName(hook)}
              secondary={`${list.getItems(hook).length} ${strings.tasks_to_do}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
