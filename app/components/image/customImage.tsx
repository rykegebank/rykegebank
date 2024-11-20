import React from 'react';
import { Image, StyleSheet, ImageStyle, StyleProp } from 'react-native';

interface CustomImageProps {
  source: any; // or ImageSourcePropType if you know the type
  color?: string; // Not directly supported, but can be handled with overlays if necessary
  height?: number;
  width?: number;
  fit?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'; // BoxFit equivalent
  style?: StyleProp<ImageStyle>; // Allow additional styles if needed
}

function CustomImage({
  source,
  color, // This requires additional handling if needed
  height = 22,
  width = 22,
  fit = 'cover',
  style,
}: CustomImageProps) {
  return (
    <Image
      source={source}
      style={[
        styles.image,
        { height, width, resizeMode: fit },
        color ? { tintColor: color } : null, // Handle color tint if specified
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 22,
    width: 22,
    resizeMode: 'cover', // Default to cover if not specified
  },
});

export default CustomImage;
