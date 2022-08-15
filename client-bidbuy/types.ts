

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
