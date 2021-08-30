import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

function ListItemLink(props) {
  const { primary, secondary, to, data, deleteAction } = props;
  const history = useHistory();

  return (
    <ListItem button onClick={() => history.push(to)}>
      <ListItemText primary={primary} secondary={secondary} />
      {deleteAction && data && (
        <ListItemSecondaryAction onClick={() => deleteAction(data)}>
          <IconButton edge="end">
            <DeleteOutline />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}

ListItemLink.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  data: PropTypes.any,
  deleteAction: PropTypes.func,
};

export default ListItemLink;
