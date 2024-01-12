import { forwardRef, useImperativeHandle, useState } from "react";

import "./Button.scss";
import { ButtonProps } from "./type";

export const Button = forwardRef((props: ButtonProps, ref) => {
  const [loading, setLoading] = useState<boolean>(false);
  useImperativeHandle(ref, () => ({
    setLoader() {
      setLoading(!loading);
    },
  }));
  return (
    <button
      className={`button ${
        props.disable ? "gray-dark" : props.style || "orange-dark"
      } ${loading ? "animation" : ""} `}
      onClick={(e) => {
        e.stopPropagation();
        !loading && !props.disable && props.onClick && props.onClick();
      }}
      disabled={props.disable || loading || false}
      type={props.type || "button"}
    >
      {/* <span className={loading ? "loader" : ""}></span> */}
      {props.icons}
      {props.title || props.children}
    </button>
  );
});
