import { gql } from "@apollo/client";

export const CREATE_RES = gql`
  mutation CreateRes(
    $user_id: String!
    $contactName: String!
    $contactNumber: String!
    $resDate: String!
    $resTime: String!
    $guestNum: Float!
    $specReq: String!
    $reservationStatus: Float!
  ) {
    createRes(
      reservationDto: {
        user_id: $user_id
        contactName: $contactName
        contactNumber: $contactNumber
        resDate: $resDate
        resTime: $resTime
        guestNum: $guestNum
        specReq: $specReq
        reservationStatus: $reservationStatus
      }
    ) {
      _id
      user_id
      contactName
      contactNumber
      resDate
      resTime
      guestNum
      specReq
      reservationStatus
    }
  }
`;

export const UPDATE_RES = gql`
  mutation UpdateRes(
    $id: String!
    $user_id: String!
    $contactName: String!
    $contactNumber: String!
    $resDate: String!
    $resTime: String!
    $guestNum: Float!
    $specReq: String!
    $reservationStatus: Float!
  ) {
    updateRes(
      id: $id
      reservationDto: {
        user_id: $user_id
        contactName: $contactName
        contactNumber: $contactNumber
        resDate: $resDate
        resTime: $resTime
        guestNum: $guestNum
        specReq: $specReq
        reservationStatus: $reservationStatus
      }
    )
  }
`;

export const DELETE_RES = gql`
  mutation DeleteRes($id: String!) {
    deleteRes(id: $id)
  }
`;

export const GET_RES = gql`
  query GetRes {
    getRes {
      _id
      user_id
      user_name
      contactName
      contactNumber
      resDate
      resTime
      guestNum
      specReq
      reservationStatus
    }
  }
`;
export const GET_ALL_RES = gql`
  query GetAllRes {
    getAllRes {
      _id
      user_id
      user_name
      contactName
      contactNumber
      resDate
      resTime
      guestNum
      specReq
    }
  }
`;
