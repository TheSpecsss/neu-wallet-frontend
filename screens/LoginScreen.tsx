import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { BlurView } from 'expo-blur';

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <ImageBackground 
      source={require("../assets/NEUBackground.png")} 
      style={styles.background}
    >
      <View style={styles.heading}>
        <Image 
          source={require("../assets/NEUlogo.png")} 
          style={styles.logo}
        />
        <Text style={styles.title}>NEU WALLET</Text>
      </View>
      
      <View style={styles.cardContainer}>
        <BlurView style={styles.card} 
          intensity={90} 
          tint="dark"
        >
          <Text style={styles.cardTitle}>Please login to access your account</Text>

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

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Login
            </Text>
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
    overflow: 'hidden',   
    marginTop: 20,     
  },
  cardTitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "klavika-bold",
    marginBottom: 25,
  },
  card: { 
    width: 300,  
    padding: 20,
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 8,       
    backgroundColor: "rgba(4, 62, 117, 0.30)",     
  },
  input: {
    width: "90%", 
    height: 42,  
    marginBottom: 15,
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
    marginBottom: 5,
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  forgot: {
    fontFamily: "klavika-light", 
    fontSize: 14,
    color: "#fff",
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
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "klavika",
  }
});
