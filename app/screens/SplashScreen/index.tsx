import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors, Dimensions, Assets, Routes } from "../../constants";
import { AppDispatch } from "../../store";
import { fetchGeneralSettings } from "../../hooks/generalSettings";

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGeneralSettings());
    const timer = setTimeout(() => {
      navigation.navigate(Routes.login);
    }, 3000);

    // Cleanup timeout on unmount
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors.primaryColor },
        // { backgroundColor: noInternet ? MyColor.colorWhite : MyColor.primaryColor },
      ]}
    >
      <Image
        source={Assets.appLogo}
        style={{
          height: Dimensions.appLogoHeight,
          width: Dimensions.appLogoWidth,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
