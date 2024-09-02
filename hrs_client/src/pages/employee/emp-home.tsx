import { useQuery } from "@apollo/client";
import { Checkbox, CssBaseline, Sheet, Table, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { GET_ALL_RES } from "../../graphql/queries/reservation";
import { IReservation } from "../../interface/reservation.interface";

function EmpHome() {
  const [resInfo, setResInfo] = useState(new Array<IReservation>());
  const { data } = useQuery<{ getAllRes: IReservation[] }>(GET_ALL_RES);
  const [currSelected, setCurrSelected] = useState({
    _id: "",
    contactName: "",
    contactNumber: "",
    resDate: "",
    resTime: "",
    guestNum: 0,
    specReq: "",
  });
  useEffect(() => {
    setResInfo(data?.getAllRes || []);
    console.log(data);
  }, [data]);
  return (
    <Sheet sx={{ my: 2, mx: 3 }}>
      <Typography sx={{ py: 3 }} level="h1">
        Employee Reservation System
      </Typography>
      <CssBaseline />
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "2%" }}></th>
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
                <td>{row._id}</td>
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
    </Sheet>
  );
}

export default EmpHome;
