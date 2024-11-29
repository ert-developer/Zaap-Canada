import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import AddPortfolioScreen from './add-portfolio-screen';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {envConfig} from '../../assets/helpers/envApi';
import {Alert} from 'react-native';

const AddPortfolioContainer = ({route}) => {
  const portfolioDetails = route.params === undefined ? null : route.params;
  const [images, setImages] = useState(route.params === undefined ? [] : portfolioDetails.images || []);
  const [updatedPortfolio, setUpdatedPortfolio] = useState(false);

  const [loading, setLoading] = useState(false); // Add this state

  const chooseImageFromGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit: 0,
    };
    setLoading(true);
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        setLoading(false);
      } else if (response.error) {
        setLoading(false);
      } else if (response.assets && response.assets.length > 0) {
        try {
          const imageUrls = [];
          const maxFileSize = 3 * 1024 * 1024;
          for (const image of response.assets) {
            console.log(image.fileSize, maxFileSize);
            if (image.fileSize > maxFileSize) {
              Alert.alert(
                'File Size Error',
                `The file ${image.fileName} exceeds the maximum size of 3 MB. Please choose a smaller file.`,
              );
              continue;
            }
            const imageName = `image_${Date.now()}.jpg`;
            const storageRef = storage().ref(`${envConfig.images}/${imageName}`);
            await storageRef.putFile(image.uri);
            const downloadURL = await storageRef.getDownloadURL();
            imageUrls.push(downloadURL);
          }

          setImages([...images, ...imageUrls]);
        } catch (error) {
          console.error('Error uploading image to Firebase:', error);
        } finally {
          setLoading(false); // Stop loading after the upload completes
        }
      }
    });
  };

  const updatePortfolioDetails = async (docId, updatedPortfolioObj) => {
    try {
      const querySnapshot = await firestore().collection(envConfig.portfolio).where('id', '==', `${docId}`).get();
      const batch = firestore().batch();
      querySnapshot.forEach(documentSnapshot => {
        const docRef = firestore().collection(envConfig.portfolio).doc(documentSnapshot.id);
        batch.update(docRef, updatedPortfolioObj);
      });
      await batch.commit();
      setUpdatedPortfolio(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onDismiss = () => {
    setUpdatedPortfolio(false);
  };

  return (
    <AddPortfolioScreen
      portfolioDetails={portfolioDetails}
      chooseImageFromGallery={chooseImageFromGallery}
      images={images}
      setImages={setImages}
      updatePortfolioDetails={updatePortfolioDetails}
      updatedPortfolio={updatedPortfolio}
      onDismiss={onDismiss}
      loading={loading}
    />
  );
};

export default AddPortfolioContainer;
