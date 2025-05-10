import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { useSession } from "../../context/Session";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { backLogo } from "../../loadSVG";
import { SvgXml } from "react-native-svg";
import { useGetRecentTransactions } from "../../hooks/query/useGetRecentTransactionsQuery";

type Props = { navigation: StackNavigationProp<MainStackParamList> };

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const TopUpCashierReportScreen = ({ navigation }: Props) => {
	const { user } = useSession();
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const {
		data: transactionsData,
		isLoading,
		error,
	} = useGetRecentTransactions({
		page: 1,
		perPage: 10,
	});

	const transactions =
		transactionsData?.data?.getRecentTransactionsByUserId?.transactions || [];

	const handleConfirm = (date: Date) => {
		const today = new Date();
		const isToday = formatDate(date) === formatDate(today);

		if (isToday) {
			setSelectedDate(null); // Reset to null if the selected date is today
		} else {
			setSelectedDate(date);
		}

		setDatePickerVisibility(false);
	};

	const todayDate = formatDate(new Date());
	const filteredTransactions = selectedDate
		? transactions.filter(
				(t) => formatDate(new Date(t.createdAt)) === formatDate(selectedDate),
			)
		: transactions.filter(
				(t) => formatDate(new Date(t.createdAt)) === todayDate,
			);

	// Calculate Total Top Up (Deposit + Transfer)
	const totalTopUp = filteredTransactions
		.filter((t) => t.type === "DEPOSIT" || t.type === "TRANSFER")
		.reduce((acc, t) => acc + t.amount, 0);

	// Calculate Total Cash Outs (Withdraw)
	const totalCashOuts = filteredTransactions
		.filter((t) => t.type === "WITHDRAW")
		.reduce((acc, t) => acc + t.amount, 0);

	// Calculate Net Cash Flow
	const netCashFlow = totalTopUp - totalCashOuts;

	// Count Transactions
	const totalTopUpTransactions = filteredTransactions.filter(
		(t) => t.type === "DEPOSIT" || t.type === "TRANSFER",
	).length;
	const totalCashOutTransactions = filteredTransactions.filter(
		(t) => t.type === "WITHDRAW",
	).length;
	const allTransactions = totalTopUpTransactions + totalCashOutTransactions;

	const dynamicHeader = selectedDate
		? `${format(selectedDate, "MMMM d, yyyy")} Transactions`
		: "Daily Transactions";

	const getTransactionLabel = (type: string) => {
		switch (type) {
			case "DEPOSIT":
				return "Top Up";
			case "WITHDRAW":
				return "Cash Out";
			case "TRANSFER":
				return "Top Up";
			default:
				return "Unknown";
		}
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#000" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>
					Failed to load transactions. Please try again later.
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.summaryContainer}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<SvgXml
						xml={backLogo}
						style={{ width: wp(7), height: hp(7) }}
						fill="black"
					/>
				</TouchableOpacity>

				<Text style={styles.header}>Daily Finance Report</Text>
				<View style={styles.headerCard}>
					<TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
						<Text style={{ fontSize: wp(2), color: "#fff" }}>
							{selectedDate ? formatDate(selectedDate) : "Pick a Date"}
						</Text>
					</TouchableOpacity>
				</View>
				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					mode="date"
					onConfirm={handleConfirm}
					onCancel={() => setDatePickerVisibility(false)}
				/>
			</View>

			<View style={styles.summaryContainer}>
				<View style={styles.summaryCard}>
					<Text style={styles.label}>Net Cash Flow</Text>
					<Text style={styles.value}>₱{netCashFlow.toFixed(2)}</Text>
					<Text style={styles.cardSub}>
						All Transactions: {allTransactions}
					</Text>
				</View>
				<View style={styles.summaryCard}>
					<Text style={styles.label}>Total Cash Outs</Text>
					<Text style={styles.value}>₱{totalCashOuts.toFixed(2)}</Text>
					<Text style={styles.cardSub}>
						Transactions: {totalCashOutTransactions}
					</Text>
				</View>
				<View style={styles.summaryCard}>
					<Text style={styles.label}>Total Top Up</Text>
					<Text style={styles.value}>₱{totalTopUp.toFixed(2)}</Text>
					<Text style={styles.cardSub}>
						Transactions: {totalTopUpTransactions}
					</Text>
				</View>
			</View>

			<Text style={styles.subHeader}>{dynamicHeader}</Text>
			<View style={styles.tableHeader}>
				<Text style={styles.tableHeaderText}>Time</Text>
				<Text style={styles.tableHeaderText}>Ref Id</Text>
				<Text style={styles.tableHeaderText}>Transaction Type</Text>
				<Text style={styles.tableHeaderText}>Status</Text>
				<Text style={styles.tableHeaderText}>Amount</Text>
			</View>

			{filteredTransactions.length === 0 ? (
				<Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>
					No transactions found for this date.
				</Text>
			) : (
				<FlatList
					data={filteredTransactions}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.tableRow}>
							<Text style={styles.cell}>
								{new Date(item.createdAt).toLocaleTimeString()}
							</Text>
							<Text style={styles.cell}>{item.id}</Text>
							<Text style={styles.cell}>{getTransactionLabel(item.type)}</Text>
							<Text style={styles.cell}>Success</Text>
							<Text style={styles.cell}>₱ {item.amount.toFixed(2)}</Text>
						</View>
					)}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		paddingTop: hp(8),
		backgroundColor: "#fff",
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "red",
		fontSize: wp(4),
	},
	headerCard: {
		width: wp(20),
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#204A69",
		color: "#fff",
		padding: wp(1),
		marginBottom: hp(3.5),
		borderRadius: wp(1),
		elevation: 3,
		shadowRadius: 4,
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
	},
	header: {
		fontSize: wp(6),
		fontWeight: "bold",
		marginBottom: hp(4),
	},
	subHeader: {
		fontSize: wp(5),
		fontWeight: "600",
		marginTop: hp(5),
		marginBottom: 8,
		color: "#204A69",
	},
	summaryContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	summaryCard: {
		width: wp(30),
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#204A69",
		padding: wp(5),
		marginBottom: hp(0.2),
		borderRadius: wp(2),
		elevation: 3,
		shadowRadius: 4,
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
	},
	label: {
		fontSize: wp(2.7),
		color: "#fff",
	},
	value: {
		fontSize: wp(3),
		fontWeight: "bold",
		marginTop: hp(1),
		color: "#fff",
	},
	tableHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: hp(0.2),
		borderColor: "#204A69",
		paddingBottom: hp(1),
		marginBottom: hp(1),
		marginTop: hp(1),
	},
	tableHeaderText: {
		fontWeight: "600",
		fontSize: wp(3),
		flex: 1,
		textAlign: "center",
		color: "#204A69",
	},
	tableRow: {
		flexDirection: "row",
		paddingVertical: hp(1.8),
		borderBottomWidth: wp(0.5),
		borderColor: "#204A6980",
	},
	cell: {
		flex: 1,
		textAlign: "center",
		fontSize: wp(3),
		color: "#204A69",
	},
	cardSub: {
		fontSize: wp(2),
		color: "#999",
	},
});

export default TopUpCashierReportScreen;
