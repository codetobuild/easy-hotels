import React from "react";
import style from "./label.module.css";

const INPUT = "INPUT";
const Label = (props) => {
  const {
    type,
    labelText = "",
    htmlFor = "",
    className = "",
    styleCSS = {},
  } = props;
  const inputType = type.trim().toUpperCase();

  switch (inputType) {
    case INPUT:
      return (
        <label
          htmlFor={htmlFor}
          className={`${style.inputLabel} ${className}`}
          style={styleCSS}>
          {labelText}
        </label>
      );
    default:
      return null;
  }
};

export default Label;
