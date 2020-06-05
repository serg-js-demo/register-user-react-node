export const authHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return { "x-access-token": token };
  } else {
    return {};
  }
};

export const API_PORT = 80; //3001;
export const AUTH_API_PORT = 80; //3000;
export const API_URL = `http://localhost:${API_PORT}/api/v1/content/`;
export const AUTH_API_URL = `http://localhost:${AUTH_API_PORT}/api/v1/user/`;