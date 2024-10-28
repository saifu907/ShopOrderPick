import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShopOwner, setIsShopOwner] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    const shopname = sessionStorage.getItem('shopname');
    
    if (token) {
      if (username) {
        setIsLoggedIn(true);
        setIsShopOwner(false);
      } else if (shopname) {
        setIsLoggedIn(true);
        setIsShopOwner(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const loginUser = (data) => {
    sessionStorage.clear();
    if (data.existingUser) {
      sessionStorage.setItem('username', data.existingUser.username);
    } else if (data.existingShop) {
      sessionStorage.setItem('shopname', data.existingShop.username);
    }
    sessionStorage.setItem('token', data.token);
    setIsLoggedIn(true);
    setIsShopOwner(!!data.existingShop);
    toast.success('Login successful');
  };

  const logout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setIsShopOwner(false);
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isShopOwner, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
