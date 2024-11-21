import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback, } from 'react-native';
import { SvgXml } from 'react-native-svg'; // Use SvgXml for inline SVGs
import { Colors, Assets } from '../../constants'; // Adjust paths accordingly

// Type for image path, it can be a URL string or an asset path
type Uri = string;

interface CircleImageButtonProps {
  height?: number; // Optional height, defaults to 30
  width?: number; // Optional width, defaults to 30
  imagePath: Uri; // URI for the image, can be an asset or URL
  isAsset?: boolean; // Flag to determine if the image is an asset
  press?: () => void; // Optional press function for the button
  border?: number; // Optional border width, defaults to 0
  isProfile?: boolean; // Flag to determine if the image is a profile picture
}

const CircleImageButton: React.FC<CircleImageButtonProps> = ({
  height = 30,
  width = 30,
  imagePath,
  isAsset = true,
  press,
  border = 0,
  isProfile = false,
}: CircleImageButtonProps) => {
  const [imageError, setImageError] = useState(false);

  const placeholderImage = isProfile
    ? Assets.defaultAvatar
    : Assets.placeHolderImage;

  const renderImage = () => {
    if (imageError) {
      return (
        <Image
          source={placeholderImage}
          style={[styles.image, { width, height }]}
          resizeMode="cover"
        />
      );
    }

    if (imagePath.includes('<svg') || imagePath.endsWith('.svg')) {
      return <SvgXml xml={imagePath} width={width} height={height} />;
    }

    return (
      <Image
        source={isAsset ? { uri: imagePath } : { uri: imagePath }}
        style={[styles.image, { width, height }]}
        resizeMode="cover"
        onError={() => setImageError(true)}
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
};

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

export default CircleImageButton;
