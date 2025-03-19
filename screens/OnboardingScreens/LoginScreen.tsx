import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";

import { storeToken } from "../../api/auth";

import Toast from "react-native-toast-message";
import api from "../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { LOGIN } from "../../api/graphql/mutation";
import { print as graphqlPrint } from "graphql";

type LoginScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  "LoginScreen"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState("");

  function isEmailNotVerifiedMessage(message: string): boolean {
    // Regular expression to match the message pattern
    const regex =
      /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,} is not yet verified\. Please verify your account$/;
    return regex.test(message);
  }

  const loginMutation = useMutation({
    mutationFn: async () =>
      await api({
        data: {
          operationName: "Login",
          query: graphqlPrint(LOGIN),
          variables: {
            email,
            password,
          },
        },
      }),
    onSuccess: ({ data }) => {
      console.log(data);
      if (data.errors) {
        if (isEmailNotVerifiedMessage(data.errors[0].message.toString())) {
          navigation.navigate("EmailConfirmationScreen", {
            emailadd: email,
          });
          return Toast.show({
            type: "error",
            text1: "Email need to verify.",
          });
        } else {
          return Toast.show({
            type: "error",
            text1: data.errors[0].message,
          });
        }
      } else {
        Toast.show({
          type: "success",
          text1: "Login Successful",
        });

        const token: string = data.data.login.token;

        console.log("Login successful:", token);
        storeToken(token);

        navigation.navigate("MainBottomTab");
      }
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
  });

  return (
    <ImageBackground
      source={require("../../assets/NEUBackground.png")}
      style={styles.background}
    >
      <View style={styles.heading}>
        <Image
          source={require("../../assets/NEUlogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>NEU WALLET</Text>
      </View>

      <View style={styles.cardContainer}>
        <BlurView style={styles.card} intensity={90} tint="dark">
          <Text style={styles.cardTitle}>
            Please login to access your account
          </Text>

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.forgot}>Forgot Password?</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (!email.trim() || !password.trim()) {
                return Toast.show({
                  type: "error",
                  text1: "Email and password are required!",
                });
              }
              loginMutation.mutate();
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "klavika-light",
              fontSize: 14,
              marginTop: 20,
              margin: 10,
              color: "#FFF",
            }}
          >
            Don't have an account?
          </Text>

          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => navigation.replace("RegisterScreen")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  cardContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "klavika-bold",
    marginBottom: 25,
  },
  card: {
    width: wp(85),
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "rgba(4, 62, 117, 0.30)",
  },
  input: {
    width: "90%",
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#043E75",
    paddingLeft: 10,
  },
  inputLabel: {
    fontFamily: "klavika-medium",
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
    marginBottom: 5,
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  forgot: {
    fontFamily: "klavika-light",
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
    marginBottom: 25,
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  button: {
    backgroundColor: "#043E75",
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  buttonOutline: {
    borderColor: "#FFF",
    borderWidth: 2,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "klavika",
  },
});
