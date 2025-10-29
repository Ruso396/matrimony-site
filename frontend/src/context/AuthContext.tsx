import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axiosInstance';

interface AuthContextType {
  userName: string | null;
  setUserName: (name: string | null) => void;
  updateUserName: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);

  const updateUserName = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      if (!userId || !token) {
        setUserName(null);
        return;
      }

      const response = await axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.user && response.data.user.name) {
        setUserName(response.data.user.name);
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
      setUserName(null);
    }
  };

  useEffect(() => {
    updateUserName();
  }, []);

  return (
    <AuthContext.Provider value={{ userName, setUserName, updateUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};