import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Upload the images from camera & gallery
export const uploadImage = (sourceType,  handleImageResponse, fieldName) => {
  const options = {
    title: 'Select Images',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    mediaType: 'photo',
    maxWidth: 600,
    maxHeight: 600,
    quality: 0.8,
    includeBase64: false,
    saveToPhotos: true,
    cameraType: 'back',
    videoQuality: 'high',
    durationLimit: 3,
    selectionLimit: 3, // Set this to 0 for unlimited selection from the gallery
  };

  if (sourceType === 'camera') {
    launchCamera(options, response => {
      handleImageResponse(response, fieldName);
    });
  } else if (sourceType === 'gallery') {
    launchImageLibrary(options, response => {
      handleImageResponse(response);
    });
  }
};
