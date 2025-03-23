import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import type { MainStackParamList } from "../../types";
import { SvgXml } from "react-native-svg";
import { loadFont } from "../../loadFont";
import { emailLogo } from "../../loadSVG";
import type { RouteProp } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { hiddenEmail } from "../../utils/hideEmail";
import { useConfirmVerificationMutation } from "../../hooks/mutation/useConfirmVerificationMutation";
import { useResendVerificationMutation } from "../../hooks/mutation/useResendVerificationMutation";

type Props = {
  route: RouteProp<MainStackParamList, "EmailConfirmationScreen">;
};

const EmailConfirm = ({ route }: Props) => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [code, setCode] = useState("");

  const email = useMemo(() => route.params.email, [route.params.email]);

  const { mutate: confirmVerification } = useConfirmVerificationMutation();
  const { mutate: resendVerification } = useResendVerificationMutation();

  const handleConfirmVerification = useCallback(() => {
    confirmVerification({ email, code });
  }, [email, code, confirmVerification]);

  const handleResendVerification = useCallback(() => {
    resendVerification({ email });
  }, [email, resendVerification]);

  useEffect(() => {
    loadFont().then(() => setIsFontLoaded(true));
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify Account</Text>

      <View style={styles.subContainer}>
        <Text style={styles.label}>
          Almost there! Check your email for a confirmation code to finish
          setting up your NEU Wallet.
        </Text>
      </View>

      <View style={styles.subRoundedContainer}>
        <SvgXml xml={emailLogo("#333")} height={wp(6)} />
        <Text style={styles.emailLabel}>{hiddenEmail(email)}</Text>
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.inputLabel}>Verification Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 6-character code"
          value={code}
          onChangeText={(text) => setCode(text.toUpperCase())}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleConfirmVerification}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendVerification}
        >
          <Text style={styles.textPressable}>Resend Code</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.borderedButtonContainer}>
          <Text style={[styles.textPressable, styles.boldText]}>Log out</Text>
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
    backgroundColor: "#F5F5F5",
  },
  subContainer: {
    paddingHorizontal: wp(10),
    paddingBottom: hp(3),
    width: "100%",
  },
  subRoundedContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(4),
    marginBottom: hp(4),
    width: wp(80),
    height: hp(6),
    borderColor: "#ccc",
    borderRadius: wp(4),
    borderWidth: 1,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
  input: {
    padding: wp(4),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp(2),
    fontSize: wp(4),
    backgroundColor: "#fff",
  },
  inputLabel: {
    fontFamily: "klavika-medium",
    color: "#204A69",
    fontSize: wp(5),
    marginBottom: 5,
  },
  emailLabel: {
    fontFamily: "klavika-medium",
    color: "#333",
    fontSize: wp(4),
    textAlign: "center",
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
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#043E75",
    height: wp(12),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
  },
  resendButton: {
    marginTop: hp(1),
  },
  borderedButtonContainer: {
    borderRadius: wp(3.4),
    borderWidth: 1,
    width: wp(27),
  },
  boldText: {
    fontFamily: "klavika-medium",
  },
  buttonText: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "klavika-medium",
  },
});
