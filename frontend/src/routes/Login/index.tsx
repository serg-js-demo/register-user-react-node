import React from "react";
import LoginForm from "./LoginForm";
import { Redirect } from "react-router-dom";
import useAuth from "hooks/useAuth";

const Login = () => {
  const { user } = useAuth();
  if (user) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className="container topMargin20" >
      <div className="col-sm-12">
        <h3>Sign In</h3>
      </div>
      <div className="col-sm-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
