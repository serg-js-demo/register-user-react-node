import axios from "axios";
import { AUTH_API_URL, authHeader } from "services";

export const login = (username: string, password: string) =>
  axios.post(`${AUTH_API_URL}signin`, { username, password });

export const logout = () =>
  axios.get(`${AUTH_API_URL}logout`, { headers: authHeader() });

export const register = (name: string, username: string, email: string, password: string) =>
  axios.post(`${AUTH_API_URL}signup`, { name, username, email, password });

export const getCurrentUser = () =>
  axios
    .get(AUTH_API_URL + "info", { headers: authHeader() })
    .then(({ data }) => data);
