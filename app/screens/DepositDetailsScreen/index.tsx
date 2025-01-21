import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../constants";

const DepositDetailsScreen = () => {
  const { transaction } = useRoute().params || {};
  const { gateway, charge, amount, final_amount, rate, currency } = transaction;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.background}
        onPress={() => navigation.goBack()}
        activeOpacity={1}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Deposit Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.value}>{gateway.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Charge</Text>
          <Text style={styles.value}>${parseFloat(charge).toFixed(2)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payable Amount</Text>
          <Text style={styles.value}>
            ${parseFloat(final_amount).toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Conversion Rate</Text>
          <Text style={styles.value}>{`1 USD = ${parseFloat(rate).toFixed(
            2
          )} ${currency}`}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>${parseFloat(amount).toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Final Amount</Text>
          <Text style={styles.value}>
            ${parseFloat(final_amount).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
  },
  content: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    width: "85%",
    elevation: 4, // Adds shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: Colors.primaryColor,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DepositDetailsScreen;
