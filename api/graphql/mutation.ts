import { G } from "react-native-svg";
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

export const TOP_UP = gql(`
  mutation TopUp($receiverId: String!, $amount: Int!) {
  topUp(receiverId: $receiverId, amount: $amount) {
    balance
    id
    updatedAt
  }
}
  `);

export const UPDATE_USER_ACCOUNT_TYPE = gql(`
  mutation UpdateUserAccountTypeByUserId($userId: String!, $accountType: String!) {
  updateUserAccountTypeByUserId(userId: $userId, accountType: $accountType) {
    accountType
    updatedAt
    name
  }
}
`);

export const WITHDRAW = gql(`mutation WithdrawBalance($topUpCashierId: String!, $amount: Int!){
  withdrawBalance(topUpCashierId: $topUpCashierId, amount: $amount) {
    balance
  }
}`);

export const SET_BALANCE = gql(`
  mutation SetBalance($userId: String!, $balance: Int!) {
  setBalance(userId: $userId, balance: $balance) {
    balance
    id
    updatedAt
  }
}`);
export const TRANSFER_BY_UID = gql(`

  mutation TransferBalanceByUserId($receiverId: String!, $amount: Int!) {

  transferBalanceByUserId(receiverId: $receiverId, amount: $amount) {
    receiverWallet {
      balance
      id

    }
    senderWallet {
      balance
      id
    }
  }
}`);
export const TRANSFER_BY_EMAIL = gql(`
  mutation TransferBalanceByUserEmail($receiverEmail: String!, $amount: Int!) {
  transferBalanceByUserEmail(receiverEmail: $receiverEmail, amount: $amount) {
    receiverWallet {
      balance
      id
    }
    senderWallet {
      balance
      id

    }
    senderWallet {
      id
      updatedAt
      balance
    }
  }
}
`);

