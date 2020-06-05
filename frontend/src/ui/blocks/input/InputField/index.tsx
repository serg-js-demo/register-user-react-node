import React from "react";
import ErrorMessage from "ui/blocks/input/ErrorMessage";

type Props = {
  name: string;
  error?: any;
  placeholder?: string;
  type?: string;
  innerRef: any;
};

const Input: React.FC<Props> = ({
  error,
  name,
  placeholder,
  type,
  innerRef,
}) => {
  return (
    <div className="form-group">
      <input
        className="form-control"
        type={type || "text"}
        placeholder={placeholder}
        name={name}
        ref={innerRef}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default React.memo(Input);
