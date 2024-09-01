import {
  Box,
  Button,
  Card,
  CssBaseline,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Sheet,
  Textarea,
  Typography,
} from "@mui/joy";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import NumericFormatAdapter from "../../components/numeric-format-adapter";
import { InfoOutlined } from "@mui/icons-material";

export default function BasicTable() {
  const sx = { py: 1 };
  const defaultResInfo = {
    contactName: "",
    contactNumber: "",
    resDate: "",
    resTime: "",
    guestNum: 0,
    specReq: "",
  };
  const [resInfo, setResInfo] = useState(defaultResInfo);
  const [beforeNow, setBeforeNow] = useState(false);

  const rsvDateTimeValidation = useCallback(() => {
    const target = `${resInfo.resDate} ${resInfo.resTime}`;
    if (!resInfo.resDate || !resInfo.resTime) {
      setBeforeNow(false);

      return;
    }

    const isBeforeNow = dayjs(target).isBefore(dayjs());
    setBeforeNow(isBeforeNow);
  }, [resInfo.resDate, resInfo.resTime]);

  useEffect(() => {
    rsvDateTimeValidation();
  }, [resInfo.resDate, resInfo.resTime, rsvDateTimeValidation]);

  return (
    <div className="container">
      <CssBaseline />
      <Sheet>
        <Card>
          <Typography level="h1">Customer Reservation System</Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              console.log(resInfo); // 打印整个表单数据
            }}
          >
            <FormControl sx={sx} required>
              <FormLabel>Customer Name:</FormLabel>
              <Input
                value={resInfo.contactName}
                onChange={(e) =>
                  setResInfo({ ...resInfo, contactName: e.target.value })
                }
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl sx={sx} required>
              <FormLabel>Contact Number:</FormLabel>
              <Input
                value={resInfo.contactNumber}
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
                value={resInfo.resDate}
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
                value={resInfo.resTime}
                onChange={(e) => {
                  setResInfo({
                    ...resInfo,
                    resTime: e.target.value,
                  });
                }}
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
                value={resInfo.guestNum}
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
                value={resInfo.specReq}
                onChange={(e) =>
                  setResInfo({ ...resInfo, specReq: e.target.value })
                }
                minRows={3}
                maxRows={5}
                placeholder="Enter any special requests"
              ></Textarea>
            </FormControl>
            <Button
              sx={{
                my: 2,
              }}
              type="submit"
              color="success"
              onClick={() => {
                rsvDateTimeValidation();
              }}
            >
              Submit Reservation
            </Button>

            <Button
              sx={{
                my: 2,
                mx: 2,
              }}
              type="submit"
              color="warning"
              onClick={() => {
                setResInfo({ ...defaultResInfo });
              }}
            >
              Reset Form
            </Button>
          </form>

          <Card variant="soft">
            <Typography level="h2">Your Reservation</Typography>
            <Box>
              <strong>Reservation ID:</strong> 123456
            </Box>
            <Box>
              <strong>Name:</strong> {resInfo.contactName}
            </Box>
            <Box>
              <strong>Contact:</strong> {resInfo.contactNumber}
            </Box>
            <Box>
              <strong>Date:</strong> {resInfo.resDate}
            </Box>
            <Box>
              <strong>Time:</strong> {resInfo.resTime}
            </Box>
            <Box>
              <strong>Guests:</strong> {resInfo.guestNum}
            </Box>
            <Box>
              <strong>Special Requests:</strong> {resInfo.specReq}
            </Box>
          </Card>
        </Card>
      </Sheet>
    </div>
  );
}
