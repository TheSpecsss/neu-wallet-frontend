import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import type { FC } from "react";

interface SetBalanceModalProps {
  visible: boolean;
  onClose: () => void;
  currentBalance: number;
  onUpdateBalance: (newBalance: number) => void;
}

export const SetBalanceModal: FC<SetBalanceModalProps> = ({
  visible,
  onClose,
  currentBalance,
  onUpdateBalance,
}) => {
  const [balance, setBalance] = useState<string>(currentBalance.toString());

  const handleUpdate = () => {
    const newBalance = Number.parseFloat(balance);
    if (!Number.isNaN(newBalance)) {
      onUpdateBalance(newBalance);
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Set Balance</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={balance}
                onChangeText={setBalance}
                placeholder="Enter balance"
              />
              <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: "#204A69",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
