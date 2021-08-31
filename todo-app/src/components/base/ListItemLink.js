import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import {
  IconButton,
  ListItemSecondaryAction,
  makeStyles,
} from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  crossedOut: {
    textDecorationLine: "line-through",
  },
}));

function ListItemLink(props) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <ListItem
      button
      disabled={props.disabled}
      onClick={() => {
        if (props.to && !props.onClick) {
          history.push(props.to);
        } else {
          props.onClick();
        }
      }}
    >
      <ListItemText
        primary={props.primary}
        secondary={props.secondary}
        className={props.isFinished ? classes.crossedOut : null}
      />
      <ListItemSecondaryAction>
        {props.onEdit && (
          <IconButton onClick={props.onEdit}>
            <Edit />
          </IconButton>
        )}
        {props.onDelete && (
          <IconButton edge="end" onClick={props.onDelete}>
            <DeleteOutline />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

ListItemLink.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  isFinished: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default ListItemLink;
