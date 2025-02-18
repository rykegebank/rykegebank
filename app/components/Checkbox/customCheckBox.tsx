import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CustomCheckBoxProps {
  selectedValues?: string[];
  list: string[];
  onChanged: (value: string) => void; // Expecting "index_status" string format
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ selectedValues = [], list, onChanged }) => {
  const handleToggle = (index: number) => {
    const item = list[index];
    const isSelected = selectedValues.includes(item);
    const status = isSelected ? "false" : "true";

    onChanged(`${index}_${status}`); // Match Flutter behavior
  };

  if (list.length === 0) {
    return null;
  }

  return (
    <View>
      {list.map((item, index) => {
        const isSelected = selectedValues.includes(item);
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleToggle(index)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 8,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#007bff",
                backgroundColor: isSelected ? "#007bff" : "transparent",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              {isSelected && (
                <Text style={{ color: "#fff", fontWeight: "bold" }}>✓</Text>
              )}
            </View>
            <Text>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomCheckBox;
