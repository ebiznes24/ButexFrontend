// src/services/cookieService.ts
import Cookies from 'js-cookie'

const TOKEN_KEY = 'authToken';

export const cookieService = {
  isUserLoggedIn: (): boolean => {
    return !!Cookies.get(TOKEN_KEY);
  },

  setUserToken: (token: string): void => {
    Cookies.set(TOKEN_KEY, token, { expires: 7 }); // Expires in 7 days
  },

  removeUserToken: (): void => {
    Cookies.remove(TOKEN_KEY);
  }
};
