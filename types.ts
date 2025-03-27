export type TransactionTypeKind = "PAY" | "TRANSFER" | "DEPOSIT" | "WITHDRAW";
export type AccountTypeKind = "USER" | "CASHIER" | "CASH_TOP_UP" | "ADMIN" | "SUPER_ADMIN";

export type MainStackParamList = {
  SplashScreen: undefined;
  LandingScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  MainBottomTab: undefined;
  QRScanScreen: undefined;
  ConfirmTransactionScreen: {
    receiverId: string;
    senderId: string;
    amount: number;
    date: string;
    type: TransactionTypeKind;
  };
  
  // DetailsScreen: {
  //   data: {
  //   receiverId: string;
  //   senderId: string;
  //   amount: number;
  //   date: string;
  //   type: TransactionTypeKind;
  // }};  

  DetailsScreen: { data: string };

  TopUpDetailsScreen: { data: string };
  TopUpCheckoutScreen: undefined;
  SendScreen: undefined;
  LoadScreen: undefined;
  CheckOutScreen: undefined;
  AdminTopTab: undefined;
  QRGenerateScreen: { data: string };
  EditUserScreen: { 
    id: string,
    name: string, 
    accountType: AccountTypeKind,
    balance: number, 
    };
  EmailConfirmationScreen: { email: string };
};

export type MainBottomTabParamList = {
  HomeScreen: undefined;
  TransactionHistoryScreen: undefined;
  ProfileScreen: undefined;
};

export type AdminTopTabParamList = {
  UserScreen: undefined;
  AuditLogScreen: undefined;
};

export type EmailVerificationParamList = {
  EmailConfirmationScreen: { email: string };
};
