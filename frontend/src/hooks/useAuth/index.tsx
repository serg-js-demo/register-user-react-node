import React, { useState, useCallback, useContext, useEffect } from "react";
import { getCurrentUser, logout as logoutRequest } from "services/AuthService";

type AuthContextType = {
  fetchCurrentUser: any;
  setToken: any;
  token: string;
  logout: any;
  loading: boolean;
  user: any;
};

const AuthContext = React.createContext<AuthContextType>({
  fetchCurrentUser: null,
  setToken: null,
  token: "",
  loading: false,
  user: null,
  logout: null,
});

const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>("");
  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      setUser(await getCurrentUser());
    } catch {}
    setLoading(false);
  }, [setLoading, setUser]);

  const logout = useCallback(async () => {
    try {
      console.log("before logout");
      await logoutRequest();
      console.log("after logout");
    } catch {
      console.log("Error on logout");
    }
    setUser(null);
    localStorage.removeItem("token");
  }, [setUser]);

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, [setToken]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetchCurrentUser();
  }, [token, fetchCurrentUser]);

  return (
    <AuthContext.Provider
      value={{
        fetchCurrentUser,
        loading,
        token,
        setToken,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
