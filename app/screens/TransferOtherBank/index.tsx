import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppBar from "../../components/GenericAppBar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants";
import OtherTransferBottomSheet from "./components/OtherTransferBottomSheet";
import BeneficaryCards from "./components/BeneficiaryCard";
import { useFetchOtherBeneficiaries } from "../../data/beneficiary/queries";
import { useGeneralSettings } from "../../hooks/useGeneralSettings";
import { useTransferToOther } from "../../data/transaction/mutation";

const TranferOtherBank = () => {
  const [show, setShow] = useState(false);
  const { data } = useFetchOtherBeneficiaries();
  const { getCurrencyOrUsername, getAuthorizationList, generalSetting } =
    useGeneralSettings();
  const currency = getCurrencyOrUsername({ isCurrency: true });
  const currencySymbol = getCurrencyOrUsername({
    isCurrency: true,
    isSymbol: true,
  });

  const authListWithLabel = getAuthorizationList();
  authListWithLabel.shift();
  const authList = authListWithLabel;
  const [selectedAuthMode, setSelectedAuthMode] = useState(authList[0]);
  const [selectedBeneficary, setSelectedBeneficiary] = useState(null);

  const transfer = useTransferToOther(selectedAuthMode);
  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title={"Transfer to other bank"}
        actions={[
          <TouchableOpacity
            key="toggle"
            onPress={() => {
              setShow(true);
            }}
            style={styles.iconContainer}
          >
            <MaterialIcons name={"add"} size={15} color={Colors.primaryColor} />
          </TouchableOpacity>,
        ]}
      />
      <FlatList
        data={data?.data ?? []}
        renderItem={({ item }) => {
          return (
            <BeneficaryCards
              name={item.account_name}
              shortName={item.short_name}
              bank={item.beneficiary_of.name}
              onPressTransfer={() => setSelectedBeneficiary(item)}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
      {!!selectedBeneficary && (
        <OtherTransferBottomSheet
          isVisible={!!selectedBeneficary}
          onClose={() => {
            setSelectedBeneficiary(null);
          }}
          onTransfer={async (amount) => {
            await transfer.mutate({
              beneficiary_id: selectedBeneficary.id,
              amount: parseFloat(amount),
              auth_mode: selectedAuthMode.toLowerCase(),
            });
            setSelectedBeneficiary(null);
          }}
          currencySymbol={currencySymbol}
          currency={currency}
          amount={""}
          limitPerTrx={parseFloat(
            selectedBeneficary.beneficiary_of.maximum_limit
          ).toFixed(2)}
          chargePerTrx={parseFloat(
            selectedBeneficary.beneficiary_of.fixed_charge
          ).toFixed(2)}
          dailyMaxLimit={parseFloat(
            selectedBeneficary.beneficiary_of.daily_maximum_limit
          ).toFixed(2)}
          monthlyLimit={parseFloat(
            selectedBeneficary.beneficiary_of.monthly_maximum_limit
          ).toFixed(2)}
          authorizationList={authList}
          selectedAuthorizationMode={selectedAuthMode}
          onSelectAuthMode={(value) => {
            setSelectedAuthMode(value);
          }}
          submitLoading={transfer.isPending}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  iconContainer: {
    width: 25,
    height: 25,
    borderRadius: 18,
    backgroundColor: Colors.colorWhite,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TranferOtherBank;
