import React from "react";
import "./input.css";

export const InputComponent = ({
  name,
  label,
  value,
  type,
  onChange,
  required,
  maxLength,
  message,
  checkError,
  errorMSG,
  validationMSG,
}) => {
  // console.log("!!!value", !!!value);
  console.log(
    "validationMSG",
    checkError && validationMSG
      ? "errorValidation"
      : checkError === true
      ? "successValidation"
      : ""
  );
  return (
    <div className="input-main">
      <div
        className={`input-div ${
          checkError && validationMSG
            ? "errorValidation"
            : checkError === true
            ? "successValidation"
            : ""
        }`}
        style={{ marginTop: "10px" }}
      >
        <label className="required" required={true}>
          {" "}
          {label}
        </label>{" "}
        <br />
        <input
          name={name}
          value={value}
          type={type}
          required={required}
          onChange={onChange}
          maxLength={maxLength}
          autoComplete="off"
          onScroll={"no"}
        />
        {checkError === true && (
          <span className={"err_message"} style={{ display: "block" }}>
            {validationMSG ? validationMSG : null}
          </span>
        )}
      </div>
    </div>
  );
};
