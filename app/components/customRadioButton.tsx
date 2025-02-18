import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CustomRadioButtonProps {
    title?: string;
    selectedIndex: number;
    list: string[];
    onChanged?: (index: number) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
    title,
    selectedIndex,
    list,
    onChanged,
}) => {
    if (list.length === 0) {
        return null;
    }

    return (
        <View>
            {title && <Text>{title}</Text>}
            {list.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}
                    onPress={() => onChanged?.(index)}
                >
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: index === selectedIndex ? 'blue' : 'gray',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {index === selectedIndex && (
                            <View
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: 'blue',
                                }}
                            />
                        )}
                    </View>
                    <Text style={{ marginLeft: 8 }}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CustomRadioButton;
