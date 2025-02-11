import { RESERVATION_STATUS } from "../interface/reservation.interface";

export const defaultResInfo = {
  _id: "",
  user_id: "",
  user_name: "",
  contactName: "",
  contactNumber: "",
  resDate: "",
  resTime: "",
  guestNum: 0,
  specReq: "",
  reservationStatus: RESERVATION_STATUS.EMPTY,
};
