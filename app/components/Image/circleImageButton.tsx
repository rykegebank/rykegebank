import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Colors, Assets } from '../../constants';

type Uri = string;

interface CircleImageButtonProps {
  height?: number;
  width?: number;
  imagePath: Uri;
  isAsset?: boolean;
  press?: () => void;
  border?: number;
  isProfile?: boolean;
}

const CircleImageButton: React.FC<CircleImageButtonProps> = ({
  height = 30,
  width = 30,
  imagePath,
  isAsset = false,
  press,
  border = 0,
  isProfile = false,
}: CircleImageButtonProps) => {
  const [imageError, setImageError] = useState(false);

  const placeholderImage = isProfile
    ? Assets.defaultAvatar
    : Assets.placeHolderImage;

  useEffect(() => {
    setImageError(false);
  }, [imagePath]);

  const renderImage = () => {

    if (!imagePath || imagePath.trim() === '') {
      return (
        <Image
          source={placeholderImage}
          style={[styles.image, { width, height }]}
          resizeMode="cover"
        />
      );
    }

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
        source={{ uri: imagePath }}
        style={[styles.image, { width, height }]}
        resizeMode="cover"
        onError={(e) => {
          setImageError(true);
        }}
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
