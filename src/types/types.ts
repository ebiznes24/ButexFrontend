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
  