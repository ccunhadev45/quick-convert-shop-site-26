
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAdminAuth = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated = user?.role === 'admin';

  const requireAuth = () => {
    if (!loading && !isAuthenticated) {
      // Redirecionar para a página de login principal, não mais para admin-login
      navigate("/login");
    }
  };

  return {
    isAuthenticated,
    loading,
    logout,
    requireAuth,
    user
  };
};
