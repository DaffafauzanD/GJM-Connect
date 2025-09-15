import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { UserRepository } from "@/modules/users/infrastructure/repositories/UserRepository";
import { loginUserUseCase } from "@/modules/users/application/usecases/loginUser";
import { logoutUserUseCase } from "@/modules/users/application/usecases/logoutUser";
import { apiService } from "@/core/auth/infrastructure/api/api.service";
import { User } from "@/modules/users/domain/entities/user";

const AuthContext = createContext();

const userRepository = new UserRepository();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Restore session (cookie-based)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiService.get("/api/v1/auth/profile");
        const profile = res?.user ?? res?.profile ?? res;
        if (profile && mounted) setUser(new User(profile));
      } catch {
        // not logged in; ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError("");
    try {
      const result = await loginUserUseCase(userRepository, credentials);
      setUser(result.user);
      setAccessToken(result.access_token || "");
      return { success: true, user: result.user };
    } catch (e) {
      const message = e?.message || "Invalid username or password.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError("");
    try {
      await logoutUserUseCase(userRepository)
      setUser(null);
      setAccessToken("");
      return { success: true };
    } catch (e) {
      const message = e?.message || "Logout failed.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ user, accessToken, loading, error, login, logout }),
    [user, accessToken, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}