import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface ProfileImageProps {
  uri?: string;
  fallbackUri?: string;
  size?: number;
}

function ProfileImage({ uri, fallbackUri = 'https://via.placeholder.com/40', size = 40 }: ProfileImageProps) {
  const [isError, setIsError] = useState(false);

  const imageUri = isError || !uri ? fallbackUri : uri;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {isError || !uri ? (
        <View style={styles.greyPlaceholder} />
      ) : (
        <Image
          source={{ uri: imageUri }}
          style={[styles.image, { width: size, height: size }]}
          onError={() => setIsError(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 20,
  },
  greyPlaceholder: {
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
});

export default ProfileImage;
