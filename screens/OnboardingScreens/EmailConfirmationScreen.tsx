import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import Toast from "react-native-toast-message";
import api from "../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import { loadFont } from "../../loadFont";
import { emailLogo } from "../../loadSVG";
import { RouteProp } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Define the navigation prop type

type EmailConfirmationScreenProps = StackNavigationProp<
  MainStackParamList,
  "EmailConfirmationScreen"
>;

// Define the type for your route parameters

type EmailConfirmationParams = {
  emailadd: string;
};

// Define the props type
type Props = {
  navigation: EmailConfirmationScreenProps;
  route: RouteProp<MainStackParamList, "EmailConfirmationScreen">;
};

const EmailConfirm = ({ route, navigation }: Props) => {
  const { emailadd } = route.params;

  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [code, inputCode] = useState<string>("");
  const [email, setEmail] = useState<string>(emailadd.toString());

  const emailVerify = useMutation({
    mutationFn: async () =>
      await api({
        data: {
          operationName: "ConfirmVerification",
          query: `mutation ConfirmVerification($email: String!, $code: String!) {
                    confirmVerification(email: $email, code: $code) {
                        id
                    }
                }`,
          variables: {
            email,
            code,
          },
        },
      }),
    onSuccess: ({ data }) => {
      if (data.errors) {
        return Toast.show({
          type: "error",
          text1: data.errors[0].message,
        });
      }

      Toast.show({
        type: "success",
        text1: "Email Verified",
      });

      navigation.navigate("LoginScreen");
    },
    onError: (error) => {
      console.log(email);
      console.log(code);
      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
  });

  const resendVerification = useMutation({
    mutationFn: async () =>
      await api({
        data: {
          operationName: "ResendVerification",
          query: `mutation ResendVerification($email: String!) {
                    resendVerification(email: $email) {
                       id
                    }
                }`,
          variables: {
            email,
          },
        },
      }),
    onSuccess: ({ data }) => {
      if (data.errors) {
        return Toast.show({
          type: "error",
          text1: data.errors[0].message,
        });
      }
      Toast.show({
        type: "success",
        text1: "Resend Verification",
      });
    },

    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
  });

  // use to hide the email address
  function hiddenEmail(input: string): string {
    const atIndex = input.indexOf("@");

    if (atIndex === -1) {
      return input;
    }

    const beforeAt = input.substring(0, atIndex);
    const afterAt = input.substring(atIndex);

    // Keep the first 2 letters of the part before "@" and the letter before "@" if it exists
    const firstTwoLetters = beforeAt.substring(0, 3);
    const letterBeforeAt =
      beforeAt.length > 2
        ? beforeAt.substring(beforeAt.length - 2, beforeAt.length)
        : "";

    return `${firstTwoLetters}****${letterBeforeAt}${afterAt}`;
  }

  useEffect(() => {
    loadFont().then(() => setIsFontLoaded(true));
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify Account</Text>

      <View style={styles.subcontainer}>
        <Text style={styles.label}>
          Almost there! Check your email for a confirmation code to finish
          setting up your NEU Wallet.
        </Text>
      </View>

      <View style={styles.subroundedcontainer}>
        <SvgXml xml={emailLogo("#333")} height={wp(6)} />
        <Text style={styles.emaillabel}> {hiddenEmail(email)}</Text>
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.inputlabel}>Verification Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 6 character code"
          value={code.toUpperCase()}
          onChangeText={inputCode}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            emailVerify.mutate();
          }}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: hp(1) }}
          onPress={() => {
            resendVerification.mutate();
          }}
        >
          <Text style={styles.textPressable}>Resend Code</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.borderedButtonContainer}>
          <Text
            style={[styles.textPressable, { fontFamily: "klavika-medium" }]}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
  },
  subcontainer: {
    paddingHorizontal: wp(10),
    paddingBottom: hp(3),
    width: wp(100),
  },
  subroundedcontainer: {
    paddingHorizontal: wp(4),
    marginBottom: hp(4),
    width: wp(80),
    height: hp(6),
    borderColor: "#ccc",
    borderRadius: wp(4),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: wp(100),
    alignItems: "center",
    marginBottom: wp(5),
  },
  header: {
    fontSize: wp(6),
    fontFamily: "klavika-bold",
    textAlign: "center",
    color: "#204A69",
    marginTop: hp(8.7),
    marginBottom: hp(4.1),
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(10),
  },
  containerAmount: {
    marginTop: hp(5),
  },
  input: {
    padding: wp(4),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp(2),
    fontSize: wp(4),
    backgroundColor: "#fff",
  },
  inputlabel: {
    fontFamily: "klavika-medium",
    color: "#204A69",
    fontSize: wp(5),
    marginBottom: 5,
  },
  emaillabel: {
    fontFamily: "klavika-medium",
    color: "#333",
    fontSize: wp(4),
    justifyContent: "center",
    alignItems: "center",
  },
  textPressable: {
    color: "#333",
    fontSize: wp(3.6),
    margin: wp(2),
    textAlign: "center",
  },
  label: {
    fontFamily: "klavika-medium",
    color: "#204A69",
    fontSize: wp(5),
    marginBottom: 5,
    textAlign: "center",
  },
  warningText: {
    fontFamily: "klavika-medium-italic",
    color: "#204A69",
    fontSize: wp(4),
    textAlign: "center",
    marginTop: hp(48),
  },
  buttonContainer: {
    backgroundColor: "#043E75",
    height: wp(12),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
  },
  borderedButtonContainer: {
    borderRadius: wp(3.4),
    borderWidth: 1,
    width: wp(27),
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "klavika-medium",
  },
});
