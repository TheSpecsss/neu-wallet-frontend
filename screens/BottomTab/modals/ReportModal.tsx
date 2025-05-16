import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { widthPercentageToDP } from "react-native-responsive-screen";

type Transaction = {
	amount: number;
	type: string;
	createdAt: string;
};

type ReportModalProps = {
	isVisible: boolean;
	onClose: () => void;
	transactions: Transaction[];
	accountType: string;
	user: { name: string; id: string };
};

const ReportModal = ({
	isVisible,
	onClose,
	transactions,
	accountType,
	user,
}: ReportModalProps) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const formatDateOnly = (date: Date) => date.toISOString().split("T")[0];

	const handleConfirm = (date: Date) => {
		setSelectedDate(date);
		setDatePickerVisibility(false);
	};

	const normalizeDate = (date: Date) => {
		const normalizedDate = new Date(date);
		normalizedDate.setHours(0, 0, 0, 0);
		return normalizedDate;
	};

	const filteredTransactions = transactions.filter((t) => {
		const transactionDate = new Date(t.createdAt);
		return (
			normalizeDate(transactionDate).getTime() ===
			normalizeDate(selectedDate).getTime()
		);
	});

	const overallTransactions = filteredTransactions.length;
	const revenueAccumulated = filteredTransactions.reduce(
		(acc, curr) => acc + curr.amount,
		0,
	);

	const getFormattedReport = () => {
		if (accountType === "CASHIER") {
			return (
				<View style={styles.reportContainer}>
					<Text style={styles.reportHeader}>
						Overall Transactions: {overallTransactions}
					</Text>
					<Text style={styles.reportHeader}>
						Revenue Accumulated: Php {revenueAccumulated.toFixed(2)}
					</Text>
				</View>
			);
		}

		if (accountType === "CASH_TOP_UP") {
			const cashIn = filteredTransactions.filter((t) => t.type === "DEPOSIT");
			const cashOut = filteredTransactions.filter((t) => t.type === "WITHDRAW");

			const inTotal = cashIn.reduce((acc, curr) => acc + curr.amount, 0);
			const outTotal = cashOut.reduce((acc, curr) => acc + curr.amount, 0);

			return (
				<View style={styles.reportContainer}>
					<Text style={styles.reportHeader}>Overall TopUp:</Text>
					<Text style={styles.reportSubHeader}>
						Transactions: {cashIn.length}
					</Text>
					<Text style={styles.reportSubHeader}>
						Outgoings: Php {-inTotal.toFixed(2)}
					</Text>

					<Text style={styles.reportHeader}>Overall Cash out:</Text>
					<Text style={styles.reportSubHeader}>
						Transactions: {cashOut.length}
					</Text>
					<Text style={styles.reportSubHeader}>
						Revenue: Php {outTotal.toFixed(2)}
					</Text>
				</View>
			);
		}

		return null;
	};

	return (
		<Modal visible={isVisible} animationType="fade" transparent>
			<View style={styles.modalBackdrop}>
				<View style={styles.modalContainer}>
					<View style={styles.modalHeader}>
						<Text style={styles.modalTitle}>Transaction Report</Text>
						<TouchableOpacity onPress={onClose}>
							<Text style={styles.closeButton}>Close</Text>
						</TouchableOpacity>
					</View>

					<View style={{ marginBottom: 10 }}>
						<Text style={styles.userInfo}>Name: {user.name}</Text>
						<Text style={styles.userInfo}>ID: {user.id}</Text>
						<Text style={styles.userInfo}>
							Date: {formatDateOnly(selectedDate)}
						</Text>
					</View>

					<TouchableOpacity
						onPress={() => setDatePickerVisibility(true)}
						style={styles.datePickerButton}
					>
						<Text style={styles.datePickerText}>Select Date</Text>
					</TouchableOpacity>

					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="date"
						onConfirm={handleConfirm}
						onCancel={() => setDatePickerVisibility(false)}
						maximumDate={new Date()}
					/>

					{getFormattedReport()}
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalBackdrop: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContainer: {
		width: widthPercentageToDP(85),
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#204A69",
	},
	closeButton: {
		fontSize: 14,
		color: "#007AFF",
	},
	reportContainer: {
		marginTop: 10,
	},
	reportHeader: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#204A69",
		marginBottom: 5,
	},
	reportSubHeader: {
		fontSize: 14,
		color: "#555",
		marginBottom: 5,
	},
	userInfo: {
		fontSize: 14,
		marginBottom: 3,
		color: "#333",
	},
	datePickerButton: {
		backgroundColor: "#204A69",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginVertical: 10,
	},
	datePickerText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

export default ReportModal;
