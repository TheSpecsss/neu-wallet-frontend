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
import Toast from "react-native-toast-message";

interface ForgotPasswordModalProps {
	visible: boolean;
	onClose: () => void;
}

const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({
	visible,
	onClose,
}) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>Forgot Password</Text>
					<Text style={styles.modalDescription}>
						Enter your email to receive a password reset link.
					</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter your email"
						placeholderTextColor="#aaa"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.cancelButton} onPress={onClose}>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.saveButton}>
							<Text style={styles.buttonText}>Send Reset Link</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ForgotPasswordModal;

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
	modalDescription: {
		fontSize: 14,
		color: "#204A69",
		marginBottom: 20,
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
