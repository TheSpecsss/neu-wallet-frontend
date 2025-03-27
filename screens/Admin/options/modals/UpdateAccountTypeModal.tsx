import React, { useState } from "react";
import type { FC } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import type { AccountTypeKind } from "../../../../types";
import DropDownPicker from "react-native-dropdown-picker";
import { useUpdateUserAccountType } from "../../../../hooks/mutation/useUpdateUserAccountTypeByUserId";

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  field: string;
  id: string;
  accountType: AccountTypeKind;
}

const UpdateAccountTypeModal: FC<ModalProps> = ({
  visible,
  onClose,
  field,
  id,
  accountType,
}) => {
  const [selectedAccountType, setSelectedAccountType] = useState<AccountTypeKind>(accountType);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "USER", value: "USER" },
    { label: "CASHIER", value: "CASHIER" },
    { label: "CASH TOP-UP", value: "CASH_TOP_UP" },
    { label: "ADMIN", value: "ADMIN" },
    { label: "SUPER ADMIN", value: "SUPER_ADMIN" },
  ]);

  const { mutate: update } = useUpdateUserAccountType();

  const handleUpdate = () => {
    update(
      { userId: id, accountType: selectedAccountType },  
      { onSuccess: () => {
          onClose();
        }
      }
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Update {field} for User: {id}
          </Text>

          <DropDownPicker
            open={open}
            value={selectedAccountType}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedAccountType}
            setItems={setItems}
            placeholder="Select role"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleUpdate}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateAccountTypeModal;

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
  dropdown: {
    width: "100%",
    borderColor: "#204A69",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  dropdownContainer: {
    width: "100%",
    borderColor: "#204A69",
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
    fontFamily: "klavika-bold",
  },
});
