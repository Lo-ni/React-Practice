import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import strings from "../../resources/strings";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    marginLeft: 16,
  },
  input: {
    margin: theme.spacing(1),
  },
}));

function CustomInput(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.input}>
      <InputLabel className={classes.inputLabel}>
        {strings.new_todo_list}
      </InputLabel>
      <OutlinedInput
        label={strings.new_todo_list}
        value={props.value}
        onChange={(event) => props.onChangeValue(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={props.onClickButton}>
              <AddCircleOutline />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

CustomInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onClickButton: PropTypes.func,
};

export default CustomInput;
