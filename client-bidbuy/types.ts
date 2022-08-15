export interface ISeatInfo {
  Id: number;
  StartTime: string;
  SeatNo: number;
  TicketId: number;
  TransportId: number;
  AgeClassEnum: AgeClassEnum;
  SeatClassEnum: SeatClassEnum;
  Status: string;
}

export interface AgeClassEnum {
  Id: number;
  Value: string;
}

export interface SeatClassEnum extends AgeClassEnum {}
export interface RoleClassEnum extends AgeClassEnum {}

export interface IUser {
  Id: number;
  Username: string;
  Email: string;
  Type: string;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  status: string;
  price: string;
  sell_price: null;
  description: string;
  buyer_id: null;
  created_at: string;
  image: string;
  user: User;
}

export interface User {
  id: number;
  nid: string;
  email: string;
  username: string;
  password: string;
  type: string;
  products: null;
}
