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

interface IResInfo {
  _id: string;
  contactName: string;
  contactNumber: string;
  resDate: string;
  resTime: string;
  guestNum: number;
  specReq: string;
}

interface ReservationFormProps {
  resInfo: IResInfo;
  setResInfo: React.Dispatch<React.SetStateAction<IResInfo>>;
  userId?: string;
  beforeNow: boolean;
  rsvDateTimeValidation: () => void;
  onSubmit: () => void;
  onReset: () => void;
  onDeleteRes: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  resInfo,
  setResInfo,
  beforeNow,
  rsvDateTimeValidation,
  onSubmit,
  onReset,
  onDeleteRes,
}) => {
  const sx = { py: 1 };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (beforeNow) return;
          onSubmit();
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
          color="warning"
          onClick={onReset}
        >
          Reset Form
        </Button>
      </form>

      <Card variant="soft">
        <Typography level="h2">Your Reservation</Typography>
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
            }}
            color="danger"
            onClick={() => {
              console.log(resInfo);
              onDeleteRes();
            }}
          >
            Cancel Reservation
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default ReservationForm;
