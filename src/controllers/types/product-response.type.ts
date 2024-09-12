import { IItem } from "../../database/model/product.model";

export interface ProductResponse {
  message: string;
  data: IItem
}

// Add this
export interface ProductPaginatedResponse {
  message: string;
  data: {
    [key: string]: IItem[] | number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }
}