import React from "react";
import useAuth from "hooks/useAuth";

export interface ICurrentUser {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  roles: string[];
}

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{user.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {user.id}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {user.roles &&
          user.roles.map((role: any, index: number) => (
            <li key={index}>{role}</li>
          ))}
      </ul>
    </div>
  );
};

export default Profile;
