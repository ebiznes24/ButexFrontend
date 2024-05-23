import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserData } from '../types/types';

// Tworzenie kontekstu
const UserDataContext = createContext<{
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}>({
  userData: null,
  setUserData: () => null
});

// Provider kontekstu
export const UserDataProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

  const [userData, setUserData] = useState<UserData | null>(null);

  // Pobranie danych z localStorage po załadowaniu komponentu
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData: UserData = JSON.parse(storedData);
      setUserData(parsedData);
    }
  }, []);

  // Zapis danych do localStorage po każdej zmianie
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Hook do używania danych z kontekstu
export const useUserData = () => useContext(UserDataContext);