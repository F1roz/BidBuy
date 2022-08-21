export interface IKyc {
  id: number;
  number: number;
  user: IUser | null;
  name: string;
  address: string;
  phone: string;
  gender: string;
}

export interface IUser {
  id: number;
  kyc: IKyc | null;
  email: string;
  username: string;
  type: "admin" | "user";
  soldProducts: IProduct[] | null;
  boughtProducts: IProduct[] | null;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  status: string;
  price: number;
  sell_price: number | null;
  description: string;
  buyer: IUser | null;
  created_at: string;
  image: string;
  seller: IUser | null;
}

export interface IBid {
  id: number;
  bidPrice: number;
  productId: number | null;
  product: IProduct | null;
  bidder: IUser | null;
  bidderId: number | null;
  createdAt: string;
}

export interface IProductCategory {
  id: number;
  name: string;
}
