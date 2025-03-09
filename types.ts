import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MainStackParamList = {
  SplashScreen: undefined;
  LandingScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
  MainBottomTab: undefined;
  QRScanScreen: undefined;
  ConfirmTransactionScreen: undefined;
  DetailsScreen: undefined;
  SendScreen: undefined;
  LoadScreen: undefined;
  CheckOutScreen: undefined;
  AdminTopTab: undefined;
  QRGenerateScreen: undefined;
  EditUserScreen: undefined;
  EmailConfirmationScreen: {emailadd:string};
};

export type MainBottomTabParamlist = {
  HomeScreen: undefined;
  TransactionHistoryScreen: undefined;
  ProfileScreen: undefined;
};

export type AdminTopTabParamList = {
  UserScreen: undefined;
  AuditLogScreen: undefined;
};

export type EmailVerificationParamlist = {
    EmailConfirmationScreen: { emailadd: string };
}