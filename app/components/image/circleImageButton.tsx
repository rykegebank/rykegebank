import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SvgXml } from 'react-native-svg'; // Use SvgXml for inline SVGs
import { Colors, Assets } from '../../constants'; // Adjust paths accordingly

interface CircleImageButtonProps {
  height?: number;
  width?: number;
  imagePath: string;
  isAsset?: boolean;
  press?: () => void;
  border?: number;
  isProfile?: boolean;
}

export default function CircleImageButton({
  height = 30,
  width = 30,
  imagePath,
  isAsset = true,
  press,
  border = 0,
  isProfile = false,
}: CircleImageButtonProps) {
  const [imageError, setImageError] = useState(false);

  const placeholderImage = isProfile
    ? Assets.defaultAvatar
    : Assets.placeHolderImage;

  // Check if the imagePath is SVG content or a file path
  const renderImage = () => {
    // If image fails to load, use placeholderImage
    if (imageError) {
      return (
        <Image
          source={placeholderImage}
          style={[styles.image, { width, height }]}
          resizeMode="cover"
        />
      );
    }

    // Check if imagePath is SVG content (starts with <svg) or ends with .svg
    if (imagePath.includes('<svg') || imagePath.endsWith('.svg')) {
      // If it's inline SVG (string content) or a file path ending with .svg
      return <SvgXml xml={imagePath} width={width} height={height} />;
    }

    // Fallback to normal image handling for other image formats (PNG/JPEG)
    return (
      <Image
        source={isAsset ? { uri: imagePath } : { uri: imagePath }}
        style={[styles.image, { width, height }]}
        resizeMode="cover"
        onError={() => setImageError(true)} // Handle image load error
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={press}>
      <View
        style={[
          styles.container,
          {
            borderWidth: border > 0 ? 1 : 0,
            borderColor: border > 0 ? Colors.borderColor : 'transparent',
            width,
            height,
          },
        ]}
      >
        {renderImage()}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
