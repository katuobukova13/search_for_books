import Button from "@material-ui/core/Button";
import React from "react";
import "./button.css";

const ButtonCastome = ({ onClick, buttonName, id }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      type="submit"
      id={id}
      onClick={onClick}
    >
      {buttonName}
    </Button>
  );
};

export default ButtonCastome;
