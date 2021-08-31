import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, List, makeStyles } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import strings from "../../resources/strings";
import { MemoryRouter } from "react-router-dom";
import CustomInput from "./CustomInput";
import ListItemLink from "./ListItemLink";

const useStyles = makeStyles(() => ({
  empty: {
    marginTop: 16,
  },
}));

function ListView(props) {
  const classes = useStyles();
  const [itemName, setItemName] = React.useState("");
  const [editableItem, setEditableItem] = React.useState(null);

  const addItem = () => {
    if (itemName) {
      props.addItem(itemName);
      setItemName("");
    }
  };

  const editItem = (item) => {
    if (itemName) {
      props.editItem(item, itemName);
      setItemName("");
      setEditableItem(null);
    }
  };

  const switchEditMode = (item) => {
    setEditableItem(item);
    setItemName(props.primaryText(item));
  };

  return (
    <MemoryRouter>
      <Box minWidth={300} maxWidth={1} width={1 / 2}>
        {!editableItem && (
          <CustomInput
            placeholder={props.placeholderNewItem ?? strings.add}
            value={itemName}
            onChangeValue={setItemName}
            onClickButton={addItem}
          />
        )}

        {props.items?.length === 0 && (
          <div className={classes.empty}>
            {props.emptyList ?? strings.no_list}
          </div>
        )}
        <List>
          {props.items?.map((item, index) => (
            <div key={`item_${index}`}>
              {item === editableItem && (
                <CustomInput
                  placeholder={props.placeholderEditItem ?? strings.add}
                  value={itemName}
                  onChangeValue={setItemName}
                  onClickButton={() => editItem(item)}
                  icon={<Done />}
                />
              )}
              {item !== editableItem && (
                <div>
                  <ListItemLink
                    to={props.toPath ? props.toPath(item) : null}
                    primary={props.primaryText(item)}
                    secondary={
                      props.secondaryText ? props.secondaryText(item) : null
                    }
                    onDelete={() => props.deleteItem(item)}
                    onEdit={() => switchEditMode(item)}
                    onClick={
                      props.itemClick ? () => props.itemClick(item) : null
                    }
                    disabled={editableItem}
                    isFinished={
                      props.itemIsFinished ? props.itemIsFinished(item) : false
                    }
                  />
                  {index !== props.items?.length - 1 && <Divider light />}
                  {props.route && props.route(item)}
                </div>
              )}
            </div>
          ))}
        </List>
      </Box>
    </MemoryRouter>
  );
}

ListView.propTypes = {
  placeholderNewItem: PropTypes.string,
  placeholderEditItem: PropTypes.string,
  addItem: PropTypes.func.isRequired,
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  emptyList: PropTypes.string,
  toPath: PropTypes.func,
  primaryText: PropTypes.func.isRequired,
  secondaryText: PropTypes.func,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  route: PropTypes.func,
  itemClick: PropTypes.func,
  itemIsFinished: PropTypes.func,
};

export default ListView;
