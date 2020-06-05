import React from "react";
import { Route, RouteProps, Link } from "react-router-dom";
import useAuth from "hooks/useAuth";

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user, loading } = useAuth();
  return (
    <Route {...rest}>
      {loading ? <div>Loading...</div> : user ? children : <Link to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
