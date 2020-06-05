import React, { useEffect, useState } from "react";
import { getPublicContent } from "services/UserService";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    getPublicContent()
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3>{content}</h3>
    </div>
  );
};

export default React.memo(Home);
