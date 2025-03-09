import { useMutation } from "@tanstack/react-query";
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import type { StackNavigationProp } from "@react-navigation/stack";
import api from "../../api/axiosInstance";
import type { MainStackParamList } from "../../types";

type RegisterScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  "RegisterScreen"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const registerMutation = useMutation({
    mutationFn: async () =>
      await api({
        data: {
          operationName: "CreateUser",
          query: `mutation CreateUser($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {
						createUser(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {
							id
						}
					}`,
          variables: {
            email,
            name,
            password,
            confirmPassword,
          },
        },
      }),
    onError(error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    },
    onSuccess({ data }) {
      if (data.errors) {
        return Toast.show({
          type: "error",
          text1: data.errors[0].message,
        });
      }

      Toast.show({
        type: "success",
        text1: "Registration Successful",
      });

      navigation.navigate("LoginScreen");
    },
  });

  return (
    <ImageBackground
      source={require("../../assets/NEUBackground.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.squarepanel}>
          <View style={styles.content}>
            <Image
              source={require("../../assets/NEUlogo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>NEU Wallet</Text>
          </View>

          <View style={styles.panelTitleContainer}>
            <Text style={styles.panelTitle}>Welcome to NEU Wallet</Text>
            <Text style={styles.panelText}>Create your wallet</Text>
          </View>

          <SafeAreaProvider>
            <SafeAreaView>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="example@neu.edu.ph"
                />
              </View>

              <Text style={styles.inputLabel}>Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setName}
                  value={name}
                />
              </View>

              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  onChangeText={setPassword}
                  value={password}
                />
              </View>

              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                />
              </View>
            </SafeAreaView>
          </SafeAreaProvider>

          <View style={styles.bottomContainer}>
            <Text style={styles.subButton}>Already have an account?</Text>
            <TouchableOpacity
              style={styles.solidButton}
              onPress={() => registerMutation.mutate()}
            >
              <Text style={styles.solidButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Toast />
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(2.5),
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    top: 0,
    marginTop: hp(-25),
    position: "absolute",
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
  squarepanel: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "rgba(5, 47, 87, 0.6)", // **Deeper blue**
    paddingHorizontal: wp(5),
    paddingVertical: hp(4),
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    alignItems: "center",
    justifyContent: "center",
    width: wp(100),
    height: hp(67),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  panelTitleContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  panelTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  panelText: {
    fontSize: 17,
    fontWeight: "regular",
    color: "#fff",
    margin: hp(1),
  },
  input: {
    height: 48,
    width: wp(68.9),
    margin: 10,
    marginTop: 6,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "gray",
  },
  inputLabel: {
    fontSize: 14,
    marginLeft: 14,
    fontWeight: "regular",
    color: "#fff",
  },
  subButton: {
    color: "#fff",
    fontSize: wp(3.4),
    marginBottom: hp(1),
  },
  solidButton: {
    backgroundColor: "#043E75", // **Darker blue for contrast**
    borderRadius: wp(2),
    paddingVertical: hp(1.5),
    width: wp(80),
    alignItems: "center",
    justifyContent: "center",
  },
  solidButtonText: {
    color: "#fff",
    fontSize: wp(4),
  },
  panelButtonContainer: {},
  inputContainer: { alignItems: "center", justifyContent: "center" },
});
