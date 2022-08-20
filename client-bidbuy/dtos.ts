import { IProduct } from "./types";

export type CreateProductDto = Omit<
  IProduct,
  "id" | "sell_price" | "buyer" | "created_at" | "seller"
>;

