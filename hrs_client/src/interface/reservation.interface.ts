export interface IReservation {
  _id: string;

  user_id: string;

  user_name: string;

  contactName: string;

  contactNumber: string;

  resDate: string;

  resTime: string;

  guestNum: number;

  specReq: string;

  reservationStatus: RESERVATION_STATUS;
}

export enum RESERVATION_STATUS {
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "FAILED",
  "EMPTY",
}
