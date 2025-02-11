import React from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  Typography,
} from "@mui/joy";
import { InfoOutlined } from "@mui/icons-material";
import dayjs from "dayjs";
import NumericFormatAdapter from "./numeric-format-adapter";
import {
  IReservation,
  RESERVATION_STATUS,
} from "../interface/reservation.interface";
import ReservationStatus from "./reservation-status";

interface ReservationFormProps {
  formType: "emp" | "guest";
  resInfo: IReservation;
  setResInfo: React.Dispatch<React.SetStateAction<IReservation>>;
  userId?: string;
  beforeNow: boolean;
  rsvDateTimeValidation: () => void;
  onSubmit?: () => void;
  onReset: () => void;
  onDeleteRes: () => void;
  onChangeStatus?: (status: RESERVATION_STATUS) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  formType,
  resInfo,
  setResInfo,
  beforeNow,
  rsvDateTimeValidation,
  onSubmit,
  onReset,
  onDeleteRes,
  onChangeStatus,
}) => {
  const sx = { py: 1 };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (beforeNow) return;
          if (onSubmit) {
            onSubmit();
          }
        }}
      >
        <FormControl sx={sx} required>
          <FormLabel>Customer Name:</FormLabel>
          <Input
            value={resInfo?.contactName}
            onChange={(e) =>
              setResInfo({ ...resInfo, contactName: e.target.value })
            }
            placeholder="Enter your name"
          />
        </FormControl>
        <FormControl sx={sx} required>
          <FormLabel>Contact Number:</FormLabel>
          <Input
            value={resInfo?.contactNumber}
            slotProps={{
              input: { component: NumericFormatAdapter, maxLength: 11 },
            }}
            onChange={(e) =>
              setResInfo({ ...resInfo, contactNumber: e.target.value })
            }
            placeholder="Enter your phone number"
          />
        </FormControl>
        <FormControl sx={sx} required>
          <FormLabel>Reservation Date:</FormLabel>
          <Input
            value={resInfo?.resDate}
            type="date"
            slotProps={{
              input: {
                min: dayjs().format("YYYY-MM-DD"),
              },
            }}
            onChange={(e) =>
              setResInfo({
                ...resInfo,
                resDate: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl error={beforeNow} sx={sx} required>
          <FormLabel>Reservation Time:</FormLabel>
          <Input
            value={resInfo?.resTime}
            onChange={(e) =>
              setResInfo({
                ...resInfo,
                resTime: e.target.value,
              })
            }
            type="time"
          />
          {beforeNow && (
            <FormHelperText>
              <InfoOutlined /> {"Invalid Time!!!"}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl sx={sx} required>
          <FormLabel>Number of Guests</FormLabel>
          <Input
            value={resInfo?.guestNum}
            slotProps={{
              input: { component: NumericFormatAdapter, maxLength: 2 },
            }}
            onChange={(e) =>
              setResInfo({ ...resInfo, guestNum: Number(e.target.value) })
            }
            placeholder="Enter number of guests"
          />
        </FormControl>
        <FormControl sx={sx}>
          <FormLabel>Special Requests</FormLabel>
          <Textarea
            value={resInfo?.specReq}
            onChange={(e) =>
              setResInfo({ ...resInfo, specReq: e.target.value })
            }
            minRows={3}
            maxRows={5}
            placeholder="Enter any special requests"
          />
        </FormControl>
        <Button
          sx={{
            my: 2,
          }}
          type="submit"
          color="success"
          onClick={rsvDateTimeValidation}
        >
          Submit Reservation
        </Button>

        <Button
          sx={{
            my: 2,
            mx: 2,
          }}
          color="neutral"
          onClick={onReset}
        >
          Reset Form
        </Button>
      </form>

      <Card variant="soft">
        <Typography level="h2">
          <div className="flex">
            <span>Your Reservation</span>
            <ReservationStatus
              resStatus={resInfo.reservationStatus}
            ></ReservationStatus>
          </div>
        </Typography>
        <Box>
          <strong>Reservation ID:</strong> {resInfo?._id}
        </Box>
        <Box>
          <strong>Name:</strong> {resInfo?.contactName}
        </Box>
        <Box>
          <strong>Contact:</strong> {resInfo?.contactNumber}
        </Box>
        <Box>
          <strong>Date:</strong> {resInfo?.resDate}
        </Box>
        <Box>
          <strong>Time:</strong> {resInfo?.resTime}
        </Box>
        <Box>
          <strong>Guests:</strong> {resInfo?.guestNum}
        </Box>
        <Box>
          <strong>Special Requests:</strong> {resInfo?.specReq}
        </Box>
        <Box>
          <Button
            sx={{
              my: 2,
              mr: 2,
            }}
            color="danger"
            onClick={() => {
              if (formType === "emp" && onChangeStatus) {
                onChangeStatus(RESERVATION_STATUS.CANCELLED);
              } else {
                onDeleteRes();
              }
            }}
          >
            Cancel
          </Button>
          {formType === "emp" && (
            <>
              <Button
                sx={{
                  my: 2,
                  mr: 2,
                }}
                color="primary"
                onClick={() => {
                  if (!onChangeStatus) return;
                  onChangeStatus(RESERVATION_STATUS.PENDING);
                }}
              >
                Pending
              </Button>
              <Button
                sx={{
                  my: 2,
                  mr: 2,
                }}
                color="success"
                onClick={() => {
                  if (!onChangeStatus) return;
                  onChangeStatus(RESERVATION_STATUS.CONFIRMED);
                }}
              >
                Confirmed
              </Button>
              <Button
                sx={{
                  my: 2,
                  mr: 2,
                }}
                color="warning"
                onClick={() => {
                  if (!onChangeStatus) return;
                  onChangeStatus(RESERVATION_STATUS.COMPLETED);
                }}
              >
                Complete
              </Button>
            </>
          )}
        </Box>
      </Card>
    </>
  );
};

export default ReservationForm;
