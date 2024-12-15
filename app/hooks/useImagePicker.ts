import { useState, useCallback } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const useImagePicker = () => {
  const [imageUri, setImageUri] = useState(null);
  const [error, setError] = useState(null);

  const pickImageFromGallery = useCallback(() => {
    const options = {
      mediaType: 'photo', 
      includeBase64: false,
      maxWidth: 800,
      maxHeight: 800,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
        setError(null); 
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        setError(response.errorMessage); 
        setImageUri(null); 
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri); 
        setError(null); 
      }
    });
  }, []);

  const takePhoto = useCallback(() => {
    const options = {
      mediaType: 'photo', 
      includeBase64: false,
      maxWidth: 800,
      maxHeight: 800,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User canceled camera');
        setError(null); 
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        setError(response.errorMessage); 
        setImageUri(null);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri); 
        setError(null); 
      }
    });
  }, []);

  return {
    imageUri,
    error,
    pickImageFromGallery,
    takePhoto,
    clearImage: () => setImageUri(null), 
  };
};

export default useImagePicker;
