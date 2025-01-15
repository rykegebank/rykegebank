import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from "react-native";

import { Colors, Strings, Dimensions } from '../../constants';
import Home from '../../../assets/bottomNav/home.svg';
import Transfer from '../../../assets/bottomNav/transfer_solid.svg';
import Transaction from '../../../assets/bottomNav/transaction_solid.svg';
import Menu from '../../../assets/bottomNav/menu.svg';

type BottomNavProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const BottomNav: React.FC<BottomNavProps> = ({ state, navigation }) => {
  const [bottomNavIndex, setBottomNavIndex] = useState(state.index);

  const selectedColor = Colors.colorBlack;
  const unselectedColor = Colors.colorGrey;

  const iconList = [
    <Home />,
    <Transfer />,
    <Transaction />,
    <Menu />,
  ];

  const labels = [Strings.home, Strings.transfer, Strings.transaction, Strings.menu];

  useEffect(() => {
    setBottomNavIndex(state.index);
  }, [state.index]);

  const handleTabPress = (index: number) => {
    if (bottomNavIndex !== index) {
      setBottomNavIndex(index);
      navigation.navigate(state.routeNames[index]);
    }
  };

  return (
    <View style={{ flexDirection: 'row', height: Dimensions.size65, backgroundColor: Colors.colorWhite, elevation: Dimensions.size10 }}>
      <StatusBar
        backgroundColor={Colors.primaryColor}
        barStyle="light-content"/>
      {iconList.map((IconComponent, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleTabPress(index)}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={{ marginBottom: Dimensions.space5 }}>
            {React.cloneElement(IconComponent, {
              width: bottomNavIndex === index ? Dimensions.size23 : Dimensions.size20,
              height: bottomNavIndex === index ? Dimensions.size23 : Dimensions.size20,
              fill: bottomNavIndex === index ? selectedColor : unselectedColor,
            })}
          </View>
          <Text
            style={{
              color: bottomNavIndex === index ? Colors.primaryColor : unselectedColor,
              fontSize: bottomNavIndex === index ? Dimensions.fontDefault : Dimensions.fontSmall,
              marginTop: Dimensions.space5,
            }}
          >
            {labels[index]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNav;
