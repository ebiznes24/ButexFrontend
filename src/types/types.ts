export enum ProductType {
  SHOES = "Shoes"
}

// Define ProductColor enum
export enum ProductColor {
  RED = "Red",
  BLUE = "Blue",
  GREEN = "Green"
}

// Define interface for ProductDTO
export interface ProductDTO {
  id: number;
  productType: ProductType;
  name: string;
  brand: string;
  price: number;
  sizes: number[];
  colors: ProductColor[];
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
  postalCodeCity: string,
}

export interface Product {
  id: number;
  productType: ProductType;
  name: string;
  brand: string;
  price: number;
  size: number;
  color: ProductColor;
  fabric: string;
}

export interface AdditionalPayment {
  name: string,
  subName: string,
  price: number,
}

export interface Backet {
  products: Product[],
  productsPrice: number,
  additionalPayments: AdditionalPayment[],
}
