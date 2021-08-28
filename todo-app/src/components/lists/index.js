import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import strings from "../../resources/strings";
import { useDataHook } from "model-react";
import TodoList from "../../models/TodoList";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    marginLeft: 16,
  },
  input: {
    margin: theme.spacing(1),
  },
}));

export default function Lists() {
  const classes = useStyles();
  const [hook] = useDataHook();

  const [lists, setLists] = React.useState([]);
  const [listName, setListName] = React.useState("");

  const addList = (name) => {
    setLists([...lists, new TodoList(name)]);
  };

  return (
    <div>
      <FormControl className={classes.input}>
        <InputLabel className={classes.inputLabel}>
          {strings.new_todo_list}
        </InputLabel>
        <OutlinedInput
          label={strings.new_todo_list}
          value={listName}
          onChange={(event) => setListName(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  addList(listName);
                  setListName("");
                }}
              >
                <AddCircleOutline />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <List>
        {lists.length === 0 && <div>{strings.no_list}</div>}
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
