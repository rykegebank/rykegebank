import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Dimensions, Colors } from '../../constants';

interface LoadingIndicatorProps {
  isLoading: boolean;
  message?: string;
  showOverlay?: boolean;
  isVerticallyCentered?: boolean;
  noBackground?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  isLoading,
  message,
  showOverlay = true,
  isVerticallyCentered = true,
  noBackground = true,
}) => {
  if (!isLoading) {
    return null; // If not loading, render nothing
  }

  const content = noBackground ? (
    <View
      style={[
        styles.centeredContainer,
        isVerticallyCentered ? styles.center : styles.start,
      ]}
    >
      <ActivityIndicator size="large" color={styles.primaryColor.color} />
      {message && message.trim() !== '' && (
        <Text style={styles.messageText}>{message}</Text>
      )}
    </View>
  ) : (
    <View style={styles.boxContainer}>
      <ActivityIndicator size="large" color={styles.primaryColor.color} />
      {message && (
        <Text style={styles.messageTextBox}>{message}</Text>
      )}
    </View>
  );

  return (
    <View
      style={[
        styles.overlay,
        showOverlay ? styles.overlayVisible : styles.overlayHidden,
      ]}
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayVisible: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white overlay
  },
  overlayHidden: {
    backgroundColor: 'transparent',
  },
  centeredContainer: {
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  start: {
    justifyContent: 'flex-start',
  },
  boxContainer: {
    width: Dimensions.windowWidth * 0.4,
    height: Dimensions.windowHeight * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
  },
  primaryColor: {
    color: Colors.primaryColor, // Replace with your primary color
  },
  messageText: {
    padding: 10,
    fontSize:  Dimensions.fontLarge,
    textAlign: 'center',
  },
  messageTextBox: {
    padding: 10,
    fontSize: Dimensions.fontLarge,
    textAlign: 'center',
    color: '#000000', // Text color for box
  },
});

export default LoadingIndicator;
