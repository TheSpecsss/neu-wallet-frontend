import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import Toast from "react-native-toast-message";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { z } from "zod";
import { useLoginMutation } from "../../hooks/mutation/useLoginMutation";

type LoginScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  "LoginScreen"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending } = useLoginMutation();

  const handleLogin = useCallback(() => {
    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      Toast.show({
        type: "error",
        text1: validation.error.errors[0].message,
      });
      return;
    }

    login({ email, password });
  }, [email, password, login]);

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

          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <AuthLink text="Forgot Password?" />

          <AuthButton
            text="Login"
            onPress={handleLogin}
            isPending={isPending}
          />

          <AuthLink text="Don't have an account?" />

          <AuthButton
            text="Register"
            outline
            onPress={() => navigation.replace("RegisterScreen")}
          />
        </BlurView>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const InputField = ({
  label,
  ...props
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences";
}) => (
  <>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput style={styles.input} {...props} />
  </>
);

const AuthButton = ({
  text,
  onPress,
  isPending,
  outline,
}: {
  text: string;
  onPress: () => void;
  isPending?: boolean;
  outline?: boolean;
}) => (
  <TouchableOpacity
    style={[
      outline ? styles.buttonOutline : styles.button,
      isPending && styles.disabledButton,
    ]}
    onPress={onPress}
    disabled={isPending}
  >
    {isPending ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.buttonText}>{text}</Text>
    )}
  </TouchableOpacity>
);

const AuthLink = ({ text }: { text: string }) => (
  <Text style={styles.linkText}>{text}</Text>
);

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
  card: {
    width: wp(85),
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "rgba(4, 62, 117, 0.30)",
  },
  cardTitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "klavika-bold",
    marginBottom: 25,
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
  linkText: {
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
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "klavika",
  },
});
