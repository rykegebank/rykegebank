import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface BeneficaryCardsProps {
  name: string;
  shortName: string;
  bank: string;
  onPressTransfer: void;
}

const BeneficaryCards = ({
  name,
  shortName,
  bank,
  onPressTransfer,
}: BeneficaryCardsProps) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        elevation: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "gray" }}>Account Name</Text>
        <Text style={{ color: "gray" }}>Short Name</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{shortName}</Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "grey",
          opacity: 0.2,
          marginBottom: 10,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ color: "gray", marginBottom: 5 }}>Bank</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{bank}</Text>
        </View>
        <TouchableOpacity
          onPress={onPressTransfer}
          style={{
            backgroundColor: "#1B2B48",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="send"
            size={12}
            color="white"
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Transfer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BeneficaryCards;
