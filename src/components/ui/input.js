// src/components/ui/input.js
import React from 'react';

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={`border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};
