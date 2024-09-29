// src/components/ui/button.js
import React from 'react';

export const Button = ({ children, onClick, className }) => {
  return (
    <button className={`p-2 bg-blue-500 text-white rounded ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
