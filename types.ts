export type MainStackParamList = {
  SplashScreen: undefined;
  LandingScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  MainBottomTab: undefined;
  QRScanScreen: undefined;
  ConfirmTransactionScreen: { data: string };
  DetailsScreen: { data: string };
  SendScreen: undefined;
  LoadScreen: undefined;
  CheckOutScreen: undefined;
  AdminTopTab: undefined;
  QRGenerateScreen: { data: string };
  EditUserScreen: undefined;
  EmailConfirmationScreen: { email: string };
  QRGeneratorScreen: undefined;
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
