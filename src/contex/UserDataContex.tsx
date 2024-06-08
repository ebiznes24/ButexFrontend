import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserData, ShopingBusketProduct, AdditionalPayment, AddressDetails } from '../types/types';

// Creating context
const UserDataContext = createContext<{
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  addProduct: (product: ShopingBusketProduct) => void;
  removeProduct: (productId: number) => void;
  clearBasket: () => void;
  getAllProducts: () => ShopingBusketProduct[];
}>({
  userData: null,
  setUserData: () => null,
  addProduct: () => {},
  removeProduct: () => {},
  clearBasket: () => {},
  getAllProducts: () => []
});

// Context provider
export const UserDataProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData: UserData = JSON.parse(storedData);
      setUserData(parsedData);
    }
  }, []);

  // Save data to localStorage on each change
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  // Function to add product to the basket
  const addProduct = (product: ShopingBusketProduct) => {
    setUserData((prevState) => {
      if (!prevState) return { shopingBasket: { products: [product] }, additionalPayment: [], userInfo: {} as AddressDetails };
      
      return {
        ...prevState,
        shopingBasket: {
          products: [...prevState.shopingBasket.products, product],
        },
      };
    });
  };

  // Function to remove product from the basket by id
  const removeProduct = (productId: number) => {
    setUserData((prevState) => {
      console.log(prevState);
      if (!prevState) return prevState;

      return {
        ...prevState,
        shopingBasket: {
          products: prevState.shopingBasket.products.filter(product => product.id !== productId),
        },
      };
    });
  };

  // Function to clear all products from the basket
  const clearBasket = () => {
    setUserData((prevState) => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        shopingBasket: {
          products: [],
        },
      };
    });
  };

  // Function to get all products from the basket
  const getAllProducts = () => {
    return userData ? userData.shopingBasket.products : [];
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData, addProduct, removeProduct, clearBasket, getAllProducts }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Hook to use the context data
export const useUserData = () => useContext(UserDataContext);
