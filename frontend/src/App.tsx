import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "routes/Home";
import Login from "routes/Login";
import Register from "routes/Register";
import Profile from "routes/Profile";
import User from "routes/User";
import NavBar from "components/NavBar";
import { AuthProvider } from "hooks/useAuth";
import ProtectedRoute from "components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path={["/", "/home"]}>
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <ProtectedRoute exact path="/profile">
            <Profile />
          </ProtectedRoute>
          <Route path="/user">
            <User />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
