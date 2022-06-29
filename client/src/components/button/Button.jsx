import React from "react";
import style from "./button.module.css";

const Button = (props) => {
  const {
    btnText,
    handleClick,
    className = "",
    type = "button",
    styleCSS = {},
  } = props;
  return (
    <>
      <button
        className={`${style.btn} ${className}`}
        onClick={handleClick}
        type={type}
        style={styleCSS}>
        {btnText}
      </button>
    </>
  );
};

export default Button;
