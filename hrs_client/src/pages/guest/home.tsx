/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from "@apollo/client";
import { Card, CssBaseline, Sheet, Typography } from "@mui/joy";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReservationForm from "../../components/res-form";
import {
  CREATE_RES,
  DELETE_RES,
  GET_RES,
} from "../../graphql/queries/reservation";
import {
  IReservation,
  RESERVATION_STATUS,
} from "../../interface/reservation.interface";
import { RootState } from "../../store/store";
import { defaultResInfo } from "../../common/model";

export default function BasicTable() {
  const [createRes, { data: createResData }] = useMutation<{
    createRes: IReservation;
  }>(CREATE_RES);

  const user = useSelector((state: RootState) => state.user).user;
  const { data, refetch } = useQuery<{ getRes: IReservation }>(GET_RES, {
    variables: {
      id: user.id,
    },
  });

  const [deleteRes] = useMutation<{
    deleteRes: boolean;
  }>(DELETE_RES, {
    onCompleted: () => {
      alert("Success");
      refetch();
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
      setResInfo(data.getRes || defaultResInfo);
    }
  }, [data]);

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
    createRes({
      variables: {
        ...resInfo,
        user_id: user.id,
        reservationStatus: RESERVATION_STATUS.PENDING,
      },
    });
  };

  const handleDeleteSubmit = () => {
    deleteRes({
      variables: {
        id: resInfo._id,
        reservationStatus: RESERVATION_STATUS.CANCELLED,
      },
    });
  };

  return (
    <div className="container">
      <CssBaseline />
      <Sheet>
        <Card>
          <Typography level="h1">Customer Reservation System</Typography>
          <ReservationForm
            formType="guest"
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
