
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("user_data");
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (email: string, password: string) => {
    // Credenciais de demo
    const credentials = {
      'admin@demo.com': { password: 'admin123', role: 'admin' as const },
      'user@demo.com': { password: 'user123', role: 'user' as const }
    };

    const userCred = credentials[email as keyof typeof credentials];
    
    if (userCred && userCred.password === password) {
      const userData: User = {
        id: userCred.role === 'admin' ? '1' : '2',
        name: userCred.role === 'admin' ? 'Administrador' : 'Usuário Demo',
        email,
        role: userCred.role,
        avatar: undefined,
        createdAt: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem("user_data", JSON.stringify(userData));
      
      // Redirecionar para dashboard específico
      if (userData.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      
      return { success: true };
    }
    
    return { success: false, error: 'Credenciais inválidas' };
  };

  const register = (name: string, email: string, password: string) => {
    // Verificar se usuário já existe
    const existingUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
    if (existingUsers.some((u: any) => u.email === email)) {
      return { success: false, error: 'E-mail já cadastrado' };
    }

    const userData: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
      avatar: undefined,
      createdAt: new Date().toISOString()
    };

    // Salvar na lista de usuários registrados
    existingUsers.push(userData);
    localStorage.setItem("registered_users", JSON.stringify(existingUsers));
    
    setUser(userData);
    localStorage.setItem("user_data", JSON.stringify(userData));
    
    navigate("/dashboard");
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("user_data");
    setUser(null);
    navigate("/");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user_data", JSON.stringify(updatedUser));
      
      // Atualizar também na lista de usuários registrados se necessário
      const registeredUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
      const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex] = updatedUser;
        localStorage.setItem("registered_users", JSON.stringify(registeredUsers));
      }
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile
  };
};
