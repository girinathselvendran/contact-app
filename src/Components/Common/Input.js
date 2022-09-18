import React from "react";
import "./input.css";

export const InputComponent = ({
  name,
  label,
  value,
  type,
  onChange,
  maxLength,
  checkError,
  validationMSG,
}) => {
  
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
        <label className="required">{label}</label>
        <br />

        <input
          name={name}
          value={value}
          type={type}
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
