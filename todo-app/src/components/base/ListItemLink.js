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
import { DeleteOutline } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  crossedOut: {
    textDecorationLine: "line-through",
  },
}));

function ListItemLink(props) {
  const { primary, secondary, to, onDelete, onClick, isFinished } = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <ListItem
      button
      onClick={() => {
        if (to && !onClick) {
          history.push(to);
        } else {
          onClick();
        }
      }}
    >
      <ListItemText
        primary={primary}
        secondary={secondary}
        className={isFinished ? classes.crossedOut : null}
      />
      {onDelete && (
        <ListItemSecondaryAction onClick={onDelete}>
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
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  isFinished: PropTypes.bool,
};

export default ListItemLink;
