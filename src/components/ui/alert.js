// src/components/ui/alert.js
import React from 'react';

export const Alert = ({ className = '', children }) => {
  return (
    <div className={`p-4 border rounded-md ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return <p className="text-sm">{children}</p>;
};
