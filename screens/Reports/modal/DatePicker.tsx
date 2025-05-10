import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { Feather } from "@expo/vector-icons";

interface DateRangePickerProps {
	onDateSelect: (date: Date | undefined) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
	onDateSelect,
}) => {
	const [date, setDate] = useState<Date | undefined>();
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => setDatePickerVisibility(true);
	const hideDatePicker = () => setDatePickerVisibility(false);

	const handleConfirm = (selectedDate: Date) => {
		setDate(selectedDate);
		onDateSelect(selectedDate);
		hideDatePicker();
	};

	return (
		<View>
			<TouchableOpacity onPress={showDatePicker} style={styles.button}>
				<Feather name="calendar" size={16} color="#333" style={styles.icon} />
				<Text style={styles.buttonText}>
					{date ? format(date, "PPP") : "Pick a date"}
				</Text>
			</TouchableOpacity>

			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		backgroundColor: "#fff",
	},
	buttonText: {
		fontSize: 16,
		color: "#333",
	},
	icon: {
		marginRight: 8,
	},
});
