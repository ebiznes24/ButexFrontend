
export interface Product {
  id: number;
  productType: string;
  name: string;
  brand: string;
  price: number;
  sizes: number[];
  colors: string[];
  fabric: string;
}

export interface AddressDetails {
  firstName: string,
  lastName: string,
  email: string,
  city: string,
  houseNumber: string,
  street: string | undefined,
  postalCode: string,
  phoneNumber: string,
  service: string,
}

export interface AdditionalPayment {
  name: string,
  subName: string,
  price: number,
}

export interface ShopingBusketProduct {
  id: number;
  productType: string;
  name: string;
  brand: string;
  price: number;
  sizes: number;
  colors: string;
  fabric: string;
}

export interface ShoppingBasket {
  products: ShopingBusketProduct[]
}

export interface UserData {
  shopingBasket: ShoppingBasket,
  additionalPayment: AdditionalPayment[],
  userInfo: AddressDetails,
}

export interface Backet {
  products: Product[],
  productsPrice: number,
  additionalPayments: AdditionalPayment[],
}
