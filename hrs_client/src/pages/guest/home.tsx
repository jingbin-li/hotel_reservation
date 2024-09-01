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
import {
  CREATE_RES,
  UPDATE_RES,
  DELETE_RES,
  GET_RES,
} from "../../graphql/queries/reservation";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IReservation } from "../../interface/reservation.interface";

export default function BasicTable() {
  const sx = { py: 1 };
  const defaultResInfo = {
    _id: "",
    contactName: "",
    contactNumber: "",
    resDate: "",
    resTime: "",
    guestNum: 0,
    specReq: "",
  };
  const [createRes, { data: createResData, error: c_error }] = useMutation<{
    createRes: IReservation;
  }>(CREATE_RES);
  const [updateRes, { data: updateResData, error: u_error }] = useMutation<{
    updateRes: boolean;
  }>(UPDATE_RES);
  const [deleteRes, { data: deleteResData, error: d_error }] = useMutation<{
    deleteRes: boolean;
  }>(DELETE_RES);

  const user = useSelector((state: RootState) => state.user).user;
  const { data, error: r_erro } = useQuery<{ getRes: IReservation }>(GET_RES, {
    variables: {
      id: user.id,
    },
  });
  const [resInfo, setResInfo] = useState(defaultResInfo);
  const [beforeNow, setBeforeNow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const rsvDateTimeValidation = useCallback(() => {
    const target = `${resInfo.resDate} ${resInfo.resTime}`;
    if (!resInfo.resDate || !resInfo.resTime) {
      setBeforeNow(false);

      return;
    }

    const isBeforeNow = dayjs(target).isBefore(dayjs());
    setBeforeNow(isBeforeNow);
  }, [resInfo]);

  // useEffect(() => {
  //   rsvDateTimeValidation();
  //   if (data && !isLoaded) {
  //     console.log(123);
  //     setResInfo(data.getRes);
  //     setIsLoaded(true);
  //   }

  //   if (updateResData?.updateRes) {
  //     alert("Success");
  //   }

  //   if (deleteResData?.deleteRes) {
  //     setResInfo({ ...defaultResInfo });
  //   }

  //   if (createResData?.createRes) {
  //     setResInfo(createResData.createRes);
  //   }
  // }, [
  //   rsvDateTimeValidation,
  //   data,
  //   updateResData,
  //   isLoaded,
  //   deleteResData,
  //   defaultResInfo,
  //   createResData,
  // ]);

  useEffect(() => {
    if (data) {
      console.log(123);
      setResInfo(data.getRes);
      setIsLoaded(true);
    }
  }, [data]);

  useEffect(() => {
    if (updateResData?.updateRes) {
      alert("Success");
    }
  }, [updateResData]);

  useEffect(() => {
    if (deleteResData?.deleteRes) {
      setResInfo({
        _id: "",
        contactName: "",
        contactNumber: "",
        resDate: "",
        resTime: "",
        guestNum: 0,
        specReq: "",
      });
    }
  }, [deleteResData, defaultResInfo]);

  useEffect(() => {
    if (createResData?.createRes) {
      setResInfo({ ...createResData.createRes });
    }
  }, [createResData]);

  useEffect(() => {
    rsvDateTimeValidation();
  });

  return (
    <div className="container">
      <CssBaseline />
      <Sheet>
        <Card>
          <Typography level="h1">Customer Reservation System</Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (beforeNow) {
                return;
              }
              createRes({ variables: { ...resInfo, user_id: user.id } });
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
              <strong>Reservation ID:</strong> {resInfo._id}
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
            <Box>
              <Button
                sx={{
                  my: 2,
                }}
                onClick={() => {
                  if (!resInfo._id) {
                    return;
                  }
                  updateRes({
                    variables: {
                      ...resInfo,
                      user_id: user.id,
                      id: resInfo._id,
                    },
                  });
                }}
              >
                Update Reservation
              </Button>
              <Button
                sx={{
                  my: 2,
                  mx: 2,
                }}
                color="danger"
                onClick={() => {
                  console.log(resInfo);
                  deleteRes({
                    variables: {
                      id: resInfo._id,
                    },
                  });
                }}
              >
                Cancel Reservation
              </Button>
            </Box>
          </Card>
        </Card>
      </Sheet>
    </div>
  );
}
