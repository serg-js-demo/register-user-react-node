import React from 'react';
import InputField from 'ui/blocks/input/InputField';
import ErrorMessage from 'ui/blocks/input/ErrorMessage';
import useRegisterForm from './hooks/useRegisterForm';

const RegisterForm = () => {
    const {
      onSubmit,
      register,
      errors,
      registerError,
    } = useRegisterForm();

    return (    
      <form onSubmit={onSubmit}>
          <InputField
              placeholder="Name"
              name="Name"
              innerRef={register}
              error={errors.Name?.message}
          />
          <InputField
              placeholder="Username"
              name="Username"
              innerRef={register}
              error={errors.Username?.message}
          />
          <InputField
              type="email"
              placeholder="Email"
              name="Email"
              innerRef={register}
              error={errors.Email?.message}
          />
          <InputField
              type="password"
              placeholder="Password"
              name="Password"
              innerRef={register}
              error={errors.Password?.message}
          />
          <InputField
              type="password"
              placeholder="Confirm password"
              name="ConfirmPassword"
              innerRef={register}
              error={errors.ConfirmPassword?.message}
          />
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Register</button>
            {registerError && <ErrorMessage>{registerError}</ErrorMessage>}
          </div>
      </form>
    );
}
  
export default React.memo(RegisterForm);
