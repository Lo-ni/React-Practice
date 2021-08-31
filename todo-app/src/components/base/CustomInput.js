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
import { Add } from "@material-ui/icons";
import strings from "../../resources/strings";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    marginLeft: 16,
  },
  input: {
    margin: theme.spacing(2),
  },
}));

function CustomInput(props) {
  const classes = useStyles();

  return (
    <FormControl className={classes.input}>
      <InputLabel className={classes.inputLabel}>
        {props.placeholder ?? strings.add}
      </InputLabel>
      <OutlinedInput
        label={props.placeholder ?? strings.add}
        value={props.value}
        onChange={(event) => props.onChangeValue(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={props.onClickButton}>
              {props.icon ?? <Add />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

CustomInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onClickButton: PropTypes.func,
  icon: PropTypes.object,
};

export default CustomInput;
