import React from "react";
import classes from "./ToastContainer.module.css";

type ToastContainerType = {
  message: string;
  visible: boolean;
  isExiting: boolean;
};

const ToastContainer = ({
  message,
  visible,
  isExiting,
}: ToastContainerType) => {
  const animationClass = isExiting
    ? classes.toastSlideDown
    : visible
    ? classes.toastSildeUp
    : "";

  if (!message) return null;

  return (
    <div className={`${classes.toastContainer} ${animationClass}`}>
      {message}
    </div>
  );
};

export default ToastContainer;
