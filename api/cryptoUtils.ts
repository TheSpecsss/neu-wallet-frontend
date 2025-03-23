import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.EXPO_PUBLIC_QR_KEY || "not found";

// Function to encrypt a string
export const encryptString = (text: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return ciphertext;
};

// Function to decrypt a string
export const decryptString = (ciphertext: string): string | undefined => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    return undefined;
  }
};
