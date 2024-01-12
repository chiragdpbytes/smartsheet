import React from "react";

export type ButtonProps = {
  title?: string;
  icons?: any;
  onClick?: () => void;
  children?: any;
  disable?: boolean;
  type?: "button" | "submit" | "reset";
  style?:
    | "orange-dark"
    | "orange-light"
    | "gray-light"
    | "gray-dark"
    | "purple-dark"
    | "purple-light"
    | "default-gray"
    | "default-purple";
};
