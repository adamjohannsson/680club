// src/components/ui/textarea.js
import React from 'react';

export const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={`border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};
