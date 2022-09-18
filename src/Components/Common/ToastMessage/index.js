import React from "react";
import "./ToastMessage.css";

export const ToastMessage = ({ message, showToast }) => {
  //   const showToast = () => {
  //     var x = document.getElementById("snackbar");
  //     x.className = "show";
  //     setTimeout(function () {
  //       x.className = x.className.replace("show", "");
  //     }, 3000);
  //   };

  return (
    <div id="snackbar" className={showToast ? "show" : ""}>
      {message ? message : "Some text some message.."}
    </div>
  );
};
