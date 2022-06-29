import React from "react";
import PropTypes from "prop-types";
import style from "./inputElement.module.css";

const TEXT = "TEXT";
const NUMBER = "NUMBER";
const EMAIL = "EMAIL";
const PASSWORD = "PASSWORD";
const DATE = "DATE";

const InputElement = (props) => {
  const {
    type,
    name,
    value,
    placeholder = "",
    required = false,
    handleChange,
    className = "",
    styleCSS = {},
  } = props;
  const inputType = type.trim().toUpperCase();

  switch (inputType) {
    case TEXT:
      return (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={` ${style.inputElem} ${className}`}
          style={styleCSS}
          required={required}></input>
      );
    case NUMBER:
      return (
        <input
          type="number"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${style.inputElem} ${className}`}
          style={styleCSS}
          required={required}></input>
      );
    case EMAIL:
      return (
        <input
          type="email"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={` ${style.inputElem} ${className}`}
          style={styleCSS}
          required={required}></input>
      );
    case PASSWORD:
      return (
        <input
          type="password"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={` ${style.inputElem} ${className}`}
          style={styleCSS}
          required={required}></input>
      );
    case DATE:
      return (
        <input
          type="date"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={` ${style.inputElem} ${className}`}
          style={styleCSS}
          required={required}></input>
      );
    default:
      return null;
  }
};

InputElement.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  styleCSS: PropTypes.object,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export default InputElement;
