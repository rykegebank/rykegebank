import React, { FC, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import { Assets, Strings, Colors, Dimensions } from '../../constants';
import { windowHeight, windowWidth } from '../../constants/dimensions';
import NoDataFound from './noDataFound';

interface NoInternetProps {
  title?: string;
  topMargin?: number;
  bottomMargin?: number;
  height?: number;
  isNoInternet?: boolean;
  press?: (isConnected: boolean) => void;
  imageHeight?: number;
}

const NoInternet: FC<NoInternetProps> = ({
  title = Strings.noDataFound,
  topMargin = 5,
  bottomMargin = 10,
  height = 0.8,
  isNoInternet = false,
  press,
  imageHeight = 0.5,
}) => {

  const checkConnectivity = useCallback(async () => {
    const connectivityState = await NetInfo.fetch();
    if (connectivityState.isConnected && press) {
      press(true);
    }
  }, [press]);

  return isNoInternet ? (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <LottieView
          source={Assets.noInternet}
          autoPlay
          loop
          style={{ height: windowHeight * imageHeight, width: windowWidth * 0.6 }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.noInternetText}>{Strings.noInternet}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={checkConnectivity}>
            <Text style={styles.retryButtonText}>{Strings.retry}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  ) : (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={[styles.noDataContainer, { height: windowHeight * height }]}>
        <NoDataFound bottomMargin={bottomMargin} topMargin={topMargin} title={title} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 6,
  },
  noInternetText: {
    color: Colors.redCancelTextColor,
    fontSize: Dimensions.fontLarge,
    fontWeight: '600',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: Colors.redCancelTextColor,
    borderRadius: 4,
  },
  retryButtonText: {
    color: Colors.colorWhite,
    fontSize: Dimensions.fontSmall,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoInternet;
