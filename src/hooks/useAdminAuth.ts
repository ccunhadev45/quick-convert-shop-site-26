
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("admin_authenticated");
      setIsAuthenticated(auth === "true");
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    navigate("/admin-login");
  };

  const requireAuth = () => {
    if (!loading && !isAuthenticated) {
      navigate("/admin-login");
    }
  };

  return {
    isAuthenticated,
    loading,
    logout,
    requireAuth
  };
};
