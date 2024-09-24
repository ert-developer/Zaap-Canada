import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View, Linking, SafeAreaView, Image, Alert, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../atoms/header/headerComponent';
import TextInputWithLabelComponent from '../../organisms/textInputWithLabel/textInputWithLabel-component';
import CustomText from '../../atoms/text/textComponent';
import addPortfolioStyles from './add-portfolio-styles';
// import {NewExclamationSVG, SmallExclamationSVG} from '../../assets/svgImage/providerProfile';
import {PortfolioGallerySVG, PortfolioLinkSVG} from '../../assets/svgImage/portfolio/portfolio';
import ExternalLinkPopup from '../../molecules/portfoliolinkmodal/externallinkpopup';
import PortfolioAddPopup from '../../molecules/portfoliolinkmodal/addportfoliomodal';
import PortfolioUpdatePopup from '../../molecules/portfoliolinkmodal/updatee';
import {postCollectionDetails} from '../../common/collection';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import TextAreaInputComponent from '../../atoms/textAreaInput/textAreaInput-component';
import {envConfig} from '../../assets/helpers/envApi';

const AddPortfolioScreen = ({
  chooseImageFromGallery,
  images,
  setImages,
  portfolioDetails,
  updatePortfolioDetails,
  loading,
}) => {
  const user = useSelector(state => state.Auth.user);
  const navigation = useNavigation();
  const styles = addPortfolioStyles();

  const [openExternalLinkPopup, setExternalLinkPopup] = useState(false);
  const [externalLinks, setExternalLinks] = useState(portfolioDetails?.Link || []);
  const [title, setTitle] = useState(portfolioDetails ? portfolioDetails.title : '');
  const [portfolioDescription, setPortfolioDescription] = useState(
    portfolioDetails ? portfolioDetails.description : '',
  );
  const [portfolioAdded, setPortFolioAdded] = useState(false);
  const [portfolioUpdated, setPortfolioUpdated] = useState(false); // State for update popup

  // Validation states
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [imageError, setImageError] = useState('');

  const onPressPortfolioLink = async link => {
    const correctedLink =
      link.startsWith('http://') || link.startsWith('https://') ? link : `https://${link.toLowerCase()}`;

    try {
      const supported = await Linking.canOpenURL(correctedLink);
      if (supported) {
        await Linking.openURL(correctedLink);
      } else {
        Alert.alert('This is not a valid link');
      }
    } catch (error) {
      Alert.alert('An error occurred', 'Could not open the link');
      console.warn(error);
    }
  };

  const openLinkPopup = () => {
    setExternalLinkPopup(!openExternalLinkPopup);
  };

  const handleRemoveExternalLink = index => {
    const updatedLinks = externalLinks.filter((_, i) => i !== index);
    setExternalLinks(updatedLinks);
  };

  const addNewLink = link => {
    setExternalLinks([...externalLinks, link]);
  };

  const openLink = () => {
    Linking.openURL(externalLinks);
  };

  const validate = () => {
    let valid = true;

    if (!title) {
      setTitleError('Title is required');
      valid = false;
    } else {
      setTitleError('');
    }

    // if (!externalLink) {
    //   setExternalLinkError('Enter URL');
    //   valid = false;
    // } else {
    //   setExternalLinkError('');
    // }

    if (!portfolioDescription) {
      setDescriptionError('Description is required');
      valid = false;
    } else {
      setDescriptionError('');
    }

    if (images.length === 0) {
      setImageError('At least one image is required');
      valid = false;
    } else {
      setImageError('');
    }

    return valid;
  };
  const handleRemoveImage = index => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages); // Update the images state
  };

  const handlePortfolio = async () => {
    if (!validate()) {
      return;
    }

    const portfolio = {
      images: images,
      title: title,
      description: portfolioDescription,
      Link: externalLinks,
      id: uuid.v4(),
      userId: user.userId,
      userName: user.displayName,
      portfolioDate: Date.now(),
    };

    try {
      await postCollectionDetails(envConfig.portfolio, portfolio);
      setPortFolioAdded(!portfolioAdded);
    } catch (error) {
      console.error('Error adding portfolio data to Firestore:', error);
    }
  };

  const onPressUpdatePortfolioBtn = () => {
    if (!validate()) {
      return;
    }
    handleUpdateConfirm();
  };

  const handleUpdateConfirm = async () => {
    const updatedPortfolioObj = {
      Link: externalLinks,
      description: portfolioDescription,
      images: images,
      title: title,
    };
    try {
      await updatePortfolioDetails(portfolioDetails.id, updatedPortfolioObj);
      setPortfolioUpdated(true); // Show the update confirmation popup
    } catch (error) {
      console.error('Error updating portfolio data:', error);
    }
  };

  return (
    <SafeAreaView>
      <HeaderComponent text={'My Portfolio'} />
      <ScrollView>
        <View style={styles.addPortfolioMainContainer}>
          <TextInputWithLabelComponent
            label={'Enter Title'}
            placeholder={'Write a captivating title'}
            onHandleChange={text => setTitle(text)}
            value={title}
            maxLength={70}
          />
          <CustomText text={`${70 - title.length} Characters left`} style={styles.charLeftText} />

          {titleError ? <CustomText text={titleError} style={styles.errorText} /> : null}

          <View>
            <View style={styles.portfolioLabel}>
              <CustomText text={'Portfolio Type'} style={styles.portfolioLabelText} />
              {/* <NewExclamationSVG /> */}
            </View>
            <View style={styles.portfolioUploadContainer}>
              <TouchableOpacity
                style={[styles.portfolioUploadBtn, loading && styles.portfolioUploadLoad]}
                onPress={chooseImageFromGallery}
                disabled={loading} // Disable the button during loading
              >
                {loading ? (
                  <ActivityIndicator size="small" color="blue" /> // Show loader
                ) : (
                  <>
                    <PortfolioGallerySVG />
                    <CustomText text={'Gallery'} style={styles.uploadText} />
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.portfolioUploadBtn} onPress={openLinkPopup}>
                <PortfolioLinkSVG />
                <CustomText text={'External Link'} style={styles.uploadText} />
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.uploadImageContainer}>
                <CustomText
                  text={'You must add at least one file or video to your project*'}
                  style={styles.uploadFileInstruction}
                />
                {images &&
                  images.map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image source={{uri: image}} style={{width: 275, height: 150, marginVertical: 5}} />
                      <TouchableOpacity onPress={() => handleRemoveImage(index)} style={styles.deleteIcon}>
                        <CustomText text={'X'} style={styles.deleteText} />
                      </TouchableOpacity>
                    </View>
                  ))}
                {imageError ? <CustomText text={imageError} style={styles.errorText} /> : null}
              </View>
              <View style={styles.fileSizeTextContainer}>
                <CustomText text={'. Images (.jpg, .png upto 3 MB Limit)'} style={styles.fileSizeText} />

                <CustomText
                  text={'. Copy and paste the links of videos, projects, documents'}
                  style={styles.fileSizeText}
                />

                <CustomText
                  text={'  and other materials ex: (Youtube, Google Drive, Dropbox'}
                  style={styles.fileSizeText}
                />
                <CustomText text={'  etc) '} style={styles.fileSizeText} />
              </View>
              <View>
                <CustomText text={'External Links'} style={styles.externaleLinkText} />
                {Array.isArray(externalLinks) && externalLinks.length > 0 ? (
                  externalLinks.map((link, index) => (
                    <View key={link} style={styles.externalLinkContainer}>
                      <TouchableOpacity onPress={() => onPressPortfolioLink(link)}>
                        <CustomText text={link.toLowerCase()} style={styles.linkText} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleRemoveExternalLink(index)}>
                        <CustomText text={'Remove'} style={styles.removeLinkText} />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <CustomText text={'No external links available'} style={styles.linkText} />
                )}
              </View>
            </View>
            <View>
              <CustomText text={'Description'} style={styles.externaleLinkText} />
              <TextAreaInputComponent
                label={'Description'}
                style={[styles.textArea, {textAlignVertical: 'top'}]}
                onChangeText={text => setPortfolioDescription(text)}
                value={portfolioDescription}
                placeholder={'Enter detailed description'}
                numberOfLines={5}
                multiline
                maxLength={500}
              />
              {descriptionError ? <CustomText text={descriptionError} style={styles.errorText} /> : null}
              <CustomText text={`${3000 - portfolioDescription.length} Characters left`} style={styles.charLeftText} />
            </View>
            {portfolioDetails ? (
              <TouchableOpacity style={styles.portfolioSubmitBtn} onPress={onPressUpdatePortfolioBtn}>
                <CustomText text={'UPDATE'} style={styles.submitText} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.portfolioSubmitBtn} onPress={handlePortfolio}>
                <CustomText text={'SUBMIT'} style={styles.submitText} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ExternalLinkPopup
          openExternalLinkPopup={openExternalLinkPopup}
          openLinkPopup={openLinkPopup}
          setExternalLink={newLink => {
            setExternalLinks([...externalLinks, newLink]); // Add the new link
          }}
        />

        <PortfolioAddPopup portfolioAdded={portfolioAdded} setPortFolioAdded={setPortFolioAdded} />
        <PortfolioUpdatePopup portfolioUpdated={portfolioUpdated} setPortfolioUpdated={setPortfolioUpdated} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPortfolioScreen;
