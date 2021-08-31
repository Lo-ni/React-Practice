import React from "react";
import strings from "../../resources/strings";
import { useDataHook } from "model-react";
import TodoList from "../../models/TodoList";
import { Route } from "react-router-dom";
import Todos from "../todos";
import ListView from "../base/ListView";

export default function Lists() {
  const [hook] = useDataHook();
  const [lists, setLists] = React.useState([]);

  const addList = (listName) => {
    setLists([...lists, new TodoList(listName, [], false)]);
  };

  const removeList = (list) => {
    setLists([...lists].filter((item) => item !== list));
  };

  const editList = (list, listName) => {
    list.setName(listName);
  };

  const getRoute = (list) => {
    return (
      <Route path={`/todos/${list.getName(hook)}`}>
        <Todos list={list} />
      </Route>
    );
  };

  return (
    <ListView
      placeholderNewItem={strings.new_todo_list}
      placeholderEditItem={strings.edit_todo_list}
      addItem={addList}
      items={lists}
      toPath={(list) => `/todos/${list.getName(hook)}`}
      primaryText={(list) => list.getName(hook)}
      secondaryText={(list) =>
        `${list.getItems(hook).length} ${strings.tasks_to_do}`
      }
      deleteItem={removeList}
      editItem={editList}
      route={getRoute}
    />
  );
}
