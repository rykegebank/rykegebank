import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors, Dimensions, Assets, Routes } from "../../constants";
import { useGeneralSettings } from "../../hooks/useGeneralSettings";
import { useLanguage } from "../../hooks/useLanguage";
import { removeAccessToken } from "../../logic/token";

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const { locale, isLtr, isLoading: isLanguageLoading } = useLanguage();
  const { settings, isLoading: isSettingsLoading, error } = useGeneralSettings();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    removeAccessToken();

    if (!isLanguageLoading && !isSettingsLoading && !error) {
      setIsReady(true);
    }
  }, [isLanguageLoading, isSettingsLoading, error]);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        navigation.navigate(Routes.login);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isReady, navigation]);

  if (isLanguageLoading || isSettingsLoading) {
    return (
      <View style={styles.container}>
        <Image
          source={Assets.appLogo}
          style={{
            height: Dimensions.appLogoHeight,
            width: Dimensions.appLogoWidth,
          }}
        />
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
