import React from "react";

const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 px-4 py-3 rounded-lg text-white ${
        disabled ? "hidden" : "block"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
