import { gql } from "./codegen";

export const LOGIN = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      expiresAt
    }
  }
`);

export const REGISTER = gql(`
  mutation Register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {
    register(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {
      id
    }
  }
`);

export const CONFIRM_VERIFICATION = gql(`
  mutation ConfirmVerification($email: String!, $code: String!) {
    confirmVerification(email: $email, code: $code) {
      id
    }
  }  
`)

export const PAY = gql(`
  mutation Pay($cashierId: String!, $amount: Int!) {
    pay(cashierId: $cashierId, amount: $amount) {
      balance
      createdAt
      id
    }
  } 
`);
