/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "@apollo/client";
import { InfoOutlined } from "@mui/icons-material";
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
import { useSelector } from "react-redux";
import NumericFormatAdapter from "../../components/numeric-format-adapter";
import {
  CREATE_RES,
  DELETE_RES,
  GET_RES,
} from "../../graphql/queries/reservation";
import { IReservation } from "../../interface/reservation.interface";
import { RootState } from "../../store/store";
import ReservationForm from "../../components/res-form";

export default function BasicTable() {
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
  const [deleteRes, { data: deleteResData, error: d_error }] = useMutation<{
    deleteRes: boolean;
  }>(DELETE_RES);

  const user = useSelector((state: RootState) => state.user).user;
  const { data, error: r_error } = useQuery<{ getRes: IReservation }>(GET_RES, {
    variables: {
      id: user.id,
    },
  });
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
  }, [resInfo]);

  useEffect(() => {
    if (data) {
      const defaultInfo = {
        _id: "",
        contactName: "",
        contactNumber: "",
        resDate: "",
        resTime: "",
        guestNum: 0,
        specReq: "",
      };
      setResInfo(data.getRes || defaultInfo);
    }
  }, [data]);

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

      alert("Success");
    }

    console.log(d_error);
  }, [deleteResData, d_error]);

  useEffect(() => {
    if (createResData?.createRes) {
      setResInfo({ ...createResData.createRes });
      alert("Success");
    }
  }, [createResData]);

  useEffect(() => {
    rsvDateTimeValidation();
  });

  const handleReset = () => {
    setResInfo({ ...defaultResInfo });
  };

  const handleSubmit = () => {
    createRes({ variables: { ...resInfo, user_id: user.id } });
  };

  const handleDeleteSubmit = () => {
    deleteRes({
      variables: {
        id: resInfo._id,
      },
    });
  };

  return (
    <div className="container">
      <CssBaseline />
      <Sheet>
        <Card>
          <Typography level="h1">Customer Reservation System</Typography>
          {/* <form
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
          </form> */}

          <ReservationForm
            resInfo={resInfo}
            setResInfo={setResInfo}
            beforeNow={beforeNow}
            rsvDateTimeValidation={rsvDateTimeValidation}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onDeleteRes={handleDeleteSubmit}
          />
        </Card>
      </Sheet>
    </div>
  );
}
