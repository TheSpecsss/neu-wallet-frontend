import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import type { FC } from "react";

interface UpdateRoleModalProps {
  visible: boolean;
  onClose: () => void;
  currentRole: string;
  onUpdateRole: (newRole: string) => void;
}

export const UpdateRoleModal: FC<UpdateRoleModalProps> = ({
  visible,
  onClose,
  currentRole,
  onUpdateRole,
}) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Update Role</Text>
              <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedRole}
                        onValueChange={(itemValue) => setSelectedRole(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Cashier" value="Cashier" />
                        <Picker.Item label="User" value="User" />
                        <Picker.Item label="Admin" value="Admin" />
                    </Picker>
                </View>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => {
                  onUpdateRole(selectedRole);
                  onClose();
                }}
              >
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
  pickerContainer: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    overflow: "hidden", 
    justifyContent: "center"
  },
  picker: {
    width: "100%",
    height: "150%",
    backgroundColor: "#f5f5f5",
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
