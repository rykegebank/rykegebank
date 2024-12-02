import React from 'react';
import { Image, StyleSheet, ImageStyle, StyleProp, ImageSourcePropType } from 'react-native';

interface CustomImageProps {
  source: ImageSourcePropType;
  color?: string;
  height?: number;
  width?: number;
  fit?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  style?: StyleProp<ImageStyle>;
}

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  color,
  height = 22,
  width = 22,
  fit = 'cover',
  style,
}: CustomImageProps) => {
  return (
    <Image
      source={source}
      style={[
        styles.image,
        { height, width, resizeMode: fit },
        color ? { tintColor: color } : null,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 22,
    width: 22,
    resizeMode: 'cover',
  },
});

export default CustomImage;
