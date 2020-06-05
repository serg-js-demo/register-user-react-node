import React, { useEffect, useState } from "react";
import { getUserBoard } from "services/UserService";

const User = () => {
  
    const [ content, setContent ] = useState();
    
    useEffect(() => {
        getUserBoard().then((response) => {
            setContent(response.data);
        }).catch((error) => {
            setContent((error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString());
        });
    }, []);  
  
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </div>
    );
  
}

export default User;