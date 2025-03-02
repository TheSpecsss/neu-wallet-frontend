import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import { SvgXml } from "react-native-svg";

import { loadFont } from "../loadFont";
import { emailLogo } from "../loadSVG";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const QRGenerate = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [code, inputCode] = useState("");
  const [email, setEmail] = useState("placeholder@gmail.com");

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
          value={code}
          onChangeText={inputCode}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: hp(1) }}>
          <Text style={styles.textPressable}>
            resend email confirmation code
          </Text>
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

export default QRGenerate;

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
