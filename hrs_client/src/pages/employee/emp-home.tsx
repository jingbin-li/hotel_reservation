import { useMutation, useQuery } from "@apollo/client";
import {
  Card,
  Checkbox,
  CssBaseline,
  Sheet,
  Table,
  Typography,
} from "@mui/joy";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { defaultResInfo } from "../../common/model";
import ReservationForm from "../../components/res-form";
import { GET_ALL_RES, UPDATE_RES } from "../../graphql/queries/reservation";
import {
  IReservation,
  RESERVATION_STATUS,
} from "../../interface/reservation.interface";

function EmpHome() {
  const [resInfo, setResInfo] = useState(new Array<IReservation>());
  const { data, refetch } = useQuery<{ getAllRes: IReservation[] }>(
    GET_ALL_RES
  );
  const [currSelected, setCurrSelected] = useState(defaultResInfo);
  const [beforeNow, setBeforeNow] = useState(false);
  const rsvDateTimeValidation = useCallback(() => {
    const target = `${currSelected.resDate} ${currSelected.resTime}`;
    if (!currSelected.resDate || !currSelected.resTime) {
      setBeforeNow(false);

      return;
    }

    const isBeforeNow = dayjs(target).isBefore(dayjs());
    setBeforeNow(isBeforeNow);
  }, [currSelected]);
  useEffect(() => {
    setResInfo(data?.getAllRes || []);
    console.log(currSelected);
    console.log(data)
    const newData = data?.getAllRes.find(x => x._id === currSelected._id);
    if(newData) {
      setCurrSelected(newData);
    }
  }, [data]);

  const [updateRes] = useMutation<{
    updateRes: boolean;
  }>(UPDATE_RES, {
    onCompleted: () => {
      alert("Success");
      refetch();
    },
    onError: () => {
      alert("Error")
    }
  });

  // useEffect(() => {
  //   // 调用API获取数据
  //   fetch("/employee/reservations")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setResInfo(data);
  //     })
  //     .catch(() => {
  //       // alert("Error");
  //     });
  // }, []);

  const handleSubmit = async () => {
    updateRes({
      variables: {
        id: currSelected._id,
        ...currSelected,
        reservationStatus: RESERVATION_STATUS.PENDING
      },
    });
  };
  const handleReset = () => {
    {
      const { _id } = currSelected;
      setCurrSelected({ ...defaultResInfo, _id });
    }
  };

  const handleChangeStatus = (status: RESERVATION_STATUS) => {
    updateRes({
      variables: {
        id: currSelected._id,
        ...currSelected,
        reservationStatus: status
      },
    });
  };

  const handleDeleteSubmit = () => {};
  return (
    <Sheet sx={{ my: 2, mx: 3 }}>
      <Typography sx={{ py: 3 }} level="h1">
        Employee Management System
      </Typography>
      <CssBaseline />

      <div style={{ display: "flex" }}>
        <Card>
          <Table aria-label="basic table">
            <thead>
              <tr>
                <th style={{ width: "3%" }}></th>
                <th>Reservation ID</th>
                <th>Contact Name</th>
                <th>Contact Number</th>
                <th>Reservation Date</th>
                <th>Reservation Time</th>
                <th>Number of Guests</th>
                <th>Special Requests</th>
              </tr>
            </thead>
            <tbody>
              {resInfo.map((row) => {
                return (
                  <tr key={row._id}>
                    <th scope="row">
                      <Checkbox
                        checked={row._id === currSelected._id}
                        onChange={(e) => {
                          const isChecked = e.target.checked;

                          if (isChecked) {
                            setCurrSelected(row);
                          }
                        }}
                        sx={{ verticalAlign: "top" }}
                      />
                    </th>
                    <td className="text-container" title={row._id}>
                      {row._id}
                    </td>
                    <td>{row.contactName}</td>
                    <td>{row.contactNumber}</td>
                    <td>{row.resDate}</td>
                    <td>{row.resTime}</td>
                    <td>{row.guestNum}</td>
                    <td>{row.specReq}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>

        <Card sx={{ flex: "0 0 30%", marginLeft: 2 }}>
          <ReservationForm
            formType="emp"
            resInfo={currSelected}
            setResInfo={setCurrSelected}
            beforeNow={beforeNow}
            rsvDateTimeValidation={rsvDateTimeValidation}
            onReset={handleReset}
            onDeleteRes={handleDeleteSubmit}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
          />
        </Card>
      </div>
    </Sheet>
  );
}

export default EmpHome;
