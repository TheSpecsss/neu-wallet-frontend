import React, { useCallback } from "react";
import { View, Text, Linking, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSession } from "../../context/Session";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const AdminBlockedScreen = () => {
  const { user, clearSession } = useSession();
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const signOut = useCallback(async () => {
    try {
      await clearSession();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        })
      );
      Toast.show({
        type: "success",
        text1: "Thank you for your services",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [clearSession, navigation.dispatch]);

  const handlePress = () => {
    Linking.openURL('https://www.NEUWALLET.com');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="globe-outline" size={48} color="#1E3A8A" style={styles.icon} />
        <Text style={styles.title}>We've Moved!</Text>
        <Text style={styles.subtitle}>Starting today, admin access to our mobile application is no longer available.</Text>

        <View style={styles.separator} />

        <Text style={styles.description}>
        To continue managing NEU Wallet, please visit our new admin portal
        </Text>

        <Pressable style={styles.linkBox} onPress={handlePress}>
          <Ionicons name="open-outline" size={16} color="#1E3A8A" />
          <Text style={styles.linkText}>https://www.example.com</Text>
        </Pressable>

        <Text style={styles.updateText}>
          Thank you for your understanding and continued support!
        </Text>

        <Pressable style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
          <Ionicons name="open-outline" size={18} color="white" style={{ marginLeft: 6 }} />
        </Pressable>
        

        <Text style={styles.footerText}>
        To use the app, please log out and sign in with a different account.
        </Text>
      </View>
    </View>
  );
};

export default AdminBlockedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  linkText: {
    marginLeft: 8,
    color: '#1E3A8A',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  updateText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 8,
  },
  button: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
  },
});
