import React from "react";
import { RESERVATION_STATUS } from "../interface/reservation.interface";

interface ReservationStatusProps {
  resStatus: RESERVATION_STATUS;
}

const ReservationStatus: React.FC<ReservationStatusProps> = ({ resStatus }) => {
  const getStatus = () => {
    switch (resStatus) {
      case RESERVATION_STATUS.PENDING:
        return {
          className: "pending",
          icon: "⏳",
          text: "Pending",
        };
      case RESERVATION_STATUS.CONFIRMED:
        return {
          className: "confirmed",
          icon: "✔️",
          text: "Confirmed",
        };
      case RESERVATION_STATUS.COMPLETED:
        return {
          className: "completed",
          icon: "✅",
          text: "Completed",
        };
      case RESERVATION_STATUS.CANCELLED:
        return {
          className: "canceled",
          icon: "❌",
          text: "Canceled",
        };
      default:
        return null;
    }
  };

  const statusInfo = getStatus();
  if (!statusInfo) {
    return <></>;
  }

  const { className, icon, text } = statusInfo;

  return (
    <div className={`status ${className}`}>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </div>
  );
};

export default ReservationStatus;
