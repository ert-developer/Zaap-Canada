import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import AddPortfolioScreen from './add-portfolio-screen';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { envConfig } from '../../assets/helpers/envApi';

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

          for (const image of response.assets) {
            const imageName = `image_${Date.now()}.jpg`;
            const storageRef = storage().ref(`images/${imageName}`);
            await storageRef.putFile(image.uri);

            // Get the download URL
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
