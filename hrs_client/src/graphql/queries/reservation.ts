import { gql } from "@apollo/client";

const parType = `
      $user_id: String!
      $contactName: String!
      $contactNumber: String!
      $resDate: String!
      $resTime: String!
      $guestNum: Float!
      $specReq: String!
    `;
const resGqlBody = `{
      user_id: $user_id
      contactName: $contactName
      contactNumber: $contactNumber
      resDate: $resDate
      resTime: $resTime
      guestNum: $guestNum
      specReq: $specReq
    }`;

const resDataBody = ` _id
    user_id
    contactName
    contactNumber
    resDate
    resTime
    guestNum
    specReq`;

export const CREATE_RES = gql`
  mutation CreateRes(
    $user_id: String!
    $contactName: String!
    $contactNumber: String!
    $resDate: String!
    $resTime: String!
    $guestNum: Float!
    $specReq: String!
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
  query GetRes($id: String!) {
    getRes(user_id: $id) {
      _id
      user_id
      contactName
      contactNumber
      resDate
      resTime
      guestNum
      specReq
    }
  }
`;
