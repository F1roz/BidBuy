import { IProduct } from "./types";

export type CreateProductDto = Omit<
  IProduct,
  | "id"
  | "status"
  | "sell_price"
  | "buyer"
  | "status"
  | "sell_price"
  | "buyer"
  | "created_at"
  | "seller"
>;