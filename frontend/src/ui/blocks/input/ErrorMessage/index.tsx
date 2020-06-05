import React from "react";

const ErrorMessage: React.FC = ({ children }) => {
  return <div className="invalid-feedback">{children}</div>;
};

export default ErrorMessage;
