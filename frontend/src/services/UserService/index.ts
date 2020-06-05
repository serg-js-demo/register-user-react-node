import axios from "axios";

import { API_URL, authHeader } from "services";

export const getPublicContent = () => axios.get(API_URL + "public");

export const getUserBoard = () =>
  axios.get(API_URL + "private", { headers: authHeader() });
