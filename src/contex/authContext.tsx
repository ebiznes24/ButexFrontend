import React, { createContext, useState, useContext, useEffect } from 'react';
import { cookieService } from '../services/cookieService'; // Adjust the path as necessary

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(cookieService.isUserLoggedIn());

  const login = () => {
    cookieService.setUserToken('dummy-auth-token'); // Replace with actual token
    setIsLoggedIn(true);
  };

  const logout = () => {
    cookieService.removeUserToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(cookieService.isUserLoggedIn());
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
