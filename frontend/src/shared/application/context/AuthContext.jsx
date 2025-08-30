import React, { createContext, useContext, useState, useCallback } from "react";
import { UserRepository } from "@/modules/users/infrastructure/repositories/UserRepository";
import { loginUserUseCase as loginUserUseCase } from "@/modules/users/application/usecases/loginUser";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async ({ username, password }) => {
    setLoading(true);
    setError(null);
    try {
      const repo = new UserRepository();
      const { access_token, user } = await loginUserUseCase(repo, { username, password });
      setUser(user);
      setAccessToken(access_token);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    // Optionally: clear cookies or call logout API
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}