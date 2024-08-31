// src/graphql/queries.ts
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
