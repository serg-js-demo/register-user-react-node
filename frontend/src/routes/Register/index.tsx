import React from "react";
import RegisterForm from "./RegisterForm";
import useAuth from "hooks/useAuth";
import { Redirect } from "react-router-dom";

const Register = () => {
  const { user } = useAuth();
  if (user) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className="topMargin20 container">
      <div className="col-sm-12">
        <h3>Register new user</h3>
      </div>
      <div className="col-sm-12">
        <RegisterForm />
      </div>
    </div>
  );
};

export default React.memo(Register);
