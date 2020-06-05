import React from "react";
import InputField from "ui/blocks/input/InputField";
import ErrorMessage from "ui/blocks/input/ErrorMessage";
import useLoginForm from './hooks/useLoginForm';

const LoginForm = () => {
  const { onSubmit, register, errors, loginError } = useLoginForm();

  return (
    <form onSubmit={onSubmit}>
      <InputField placeholder="Username" name="Username" innerRef={register} error={errors.Username?.message} />
      <InputField
        type="password"
        placeholder="Password"
        name="Password"
        error={errors.Password?.message}
        innerRef={register}
      />
      <div className="form-group">
        <input className="btn btn-primary" type="submit" value="Enter" />
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
      </div>
    </form>
  );
};

export default LoginForm;
