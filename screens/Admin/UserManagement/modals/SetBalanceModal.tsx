import React, { useState } from "react";
import type { FC } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSetBalance } from "../../../../hooks/mutation/useSetBalance";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  field: string;
  id: string;
  balance: number;
}

const SetBalanceModal: FC<ModalProps> = ({
  visible,
  onClose,
  field,
  id,
  balance,
}) => {
  const [selectedBalance, setSelectedBalance] = useState(balance.toString());
  const { mutate: setBalance } = useSetBalance();

  const handleSetBalance = () => {
    const parsed = Number.parseFloat(selectedBalance);
    if (Number.isNaN(parsed)) return;

    setBalance(
      { userId: id, balance: parsed },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Set {field} for User: {id}
          </Text>

          <TextInput
            style={styles.input}
            value={selectedBalance}
            onChangeText={setSelectedBalance}
            keyboardType="numeric"
            placeholder={`Enter New ${field}`}
            placeholderTextColor="#aaa"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSetBalance}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SetBalanceModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#204A69",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    color: "#204A69",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#204A69",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
