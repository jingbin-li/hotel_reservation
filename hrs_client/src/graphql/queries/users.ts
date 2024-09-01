import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount(
    $name: String!
    $phoneNumber: String!
    $password: String!
  ) {
    createAccount(
      userInfo: { name: $name, phoneNumber: $phoneNumber, password: $password }
    ) {
      id
      access_token
      username
    }
  }
`;
export const LOGIN = gql`
  mutation LoginAccount($phoneNumber: String!, $password: String!) {
    login(loginData: { phoneNumber: $phoneNumber, password: $password }) {
      id
      access_token
      username
    }
  }
`;
