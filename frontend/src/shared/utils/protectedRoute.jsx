import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthService } from "@/core/application/services/auth.service";
import { AuthRepository } from "@/core/infrastructure/repositories/auth.repositories";

const authService = new AuthService(new AuthRepository());

export function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await authService.isAuthenticated(); // pakai await
        setIsAuthenticated(isAuth);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // sementara loading
  }

  return children;
}