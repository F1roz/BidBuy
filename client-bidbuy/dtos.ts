import { IBid, IProduct } from "./types";

export type CreateProductDto = Omit<
  IProduct,
  "id" | "sell_price" | "buyer" | "created_at" | "seller"
>;

export type CreateBidDto = Omit<
  IBid,
  "id" | "product" | "bidder" | "bidderId" | "createdAt"
>;

export type SignUpDto = {
  nid: string;
  email: string;
  username: string;
  password: string;
  password2: string;
};
