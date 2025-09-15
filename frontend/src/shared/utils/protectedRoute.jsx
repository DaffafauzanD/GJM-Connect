import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "@/core/auth/application/services/auth.service";
import { AuthRepository } from "@/core/auth/infrastructure/repositories/auth.repositories";

const authService = new AuthService(new AuthRepository());

export function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const isOk = await authService.isAuthenticated();
        if (mounted) setOk(isOk);
      } catch {
        if (mounted) setOk(false);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return null; // or a small spinner
  if (!ok) return <Navigate to="/auth/sign-in" replace />;
  return children;
}