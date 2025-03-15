import { gql } from "./codegen";

export const LOGIN = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`);

export const REGISTER = gql(`mutation Register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {
  register(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {
    id
  }
}`);
