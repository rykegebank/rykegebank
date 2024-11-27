import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors, Dimensions, Assets, Routes } from "../../constants";
import { useGeneralSettings } from "../../hooks/generalSettings";

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();

  const { settings, isLoading, error } = useGeneralSettings();

  useEffect(() => {
    if (!isLoading && !error) {
      const timer = setTimeout(() => {
        navigation.navigate(Routes.login);
      }, 3000);

      // Cleanup timeout on unmount
      return () => clearTimeout(timer);
    }
  }, [isLoading, error, navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image source={Assets.appLogo} style={{ height: Dimensions.appLogoHeight, width: Dimensions.appLogoWidth }} />
      </View>
    );
  }


  return (
    <View style={[styles.container, { backgroundColor: Colors.primaryColor }]}>
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
