import React from "react";
import { ButtonProps } from "../../../typing";

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
   relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${
          outline
            ? "bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg"
            : "bg-yellow-600"
        }
        ${outline ? "border-0" : "border-0"}
        ${outline ? "text-white" : "text-black"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-3"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-0" : "border-0"}
  `}
    >
      {label}
    </button>
  );
};

export default Button;
