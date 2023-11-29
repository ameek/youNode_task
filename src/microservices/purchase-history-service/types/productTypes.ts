import { Product } from "entities/product.entity";

export interface ProductResponse {
    message?: string;
    success?: {
      product: Product;
    };
    failures?: {
      message: string;
      reason: string;
    };
  }
  export interface ProductList {
    products: Product[];
    hasNextPage: boolean;
    lastCursor: string;
  }
  