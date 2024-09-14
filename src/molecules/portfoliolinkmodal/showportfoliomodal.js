import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Linking, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import DeletePortfolioDetailsModal from './deleteportfoliomodal';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';
import {
  ExternalLinkPopupLine,
  EditIconSvg,
  DeleteIconSvg,
  SmallExclamationSVG,
} from '../../assets/svgImage/providerProfile';
import {ScrollView} from 'react-native';
const ShowPortfolioDetailsModal = ({
  showPortfolioModal,
  potofolioDetails,
  setShowPortfolioModal,
  onDeletePortfolio,
}) => {
  const [showDeletePortfolioModal, setShowDeletePortfolioModal] = useState(false);
  const [deletePotfolioId, setdeletePotfolioId] = useState('');
  const navigation = useNavigation();
  const DetleteDetailsModal = potofolioDetails => {
    setShowDeletePortfolioModal(!showDeletePortfolioModal);
    setdeletePotfolioId(potofolioDetails.id);
  };

  const onPressPortfolioLink = async link => {
    // Ensure the URL starts with http:// or https://
    const correctedLink = link.startsWith('http://') || link.startsWith('https://') ? link : `https://${link}`;

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

  // console.log('potofolioDetails', potofolioDetails.images);

  return (
    <Modal
      isVisible={showPortfolioModal}
      style={styles.modalContainer}
      onBackdropPress={() => setShowPortfolioModal(false)}>
      <View style={styles.modalContent}>
        <ScrollView contentContainerStyle={{paddingBottom: heightToDp(2)}}>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => navigation.navigate('AddPortfolio', potofolioDetails)}>
              <EditIconSvg />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => DetleteDetailsModal(potofolioDetails)}>
              <DeleteIconSvg />
            </TouchableOpacity>
          </View>
          <CustomText text={potofolioDetails.title} style={styles.titleText} />
          <View style={styles.dashedLine} />
          <View style={styles.imageContainer}>
            <CustomText text={'Images'} style={styles.sectionTitle} />
            <View style={styles.imageListWrapper}>
              {potofolioDetails.images && potofolioDetails.images.length > 0 ? (
                <FlatList
                  data={potofolioDetails.images}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <Image source={{uri: item}} style={styles.portfolioImage} resizeMode="cover" />
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.imageListContent}
                />
              ) : (
                <Image source={{uri: potofolioDetails.image}} style={styles.singleImage} resizeMode="cover" />
              )}
            </View>
          </View>
          <View style={styles.externalLinkContainer}>
            <CustomText text={'External Link'} style={styles.sectionTitle} />
            <View style={styles.linkInfoContainer}>
              {/* <SmallExclamationSVG /> */}
              <CustomText text={'Click on the Link to Check & Re-direct'} style={styles.linkInfoText} />
            </View>
            <TouchableOpacity onPress={() => onPressPortfolioLink(potofolioDetails.Link)}>
              <CustomText text={potofolioDetails.Link} style={styles.linkText} />
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionContainer}>
            <CustomText text={'Description'} style={styles.sectionTitle} />
            <CustomText text={potofolioDetails.description} style={styles.descriptionText} />
          </View>
        </ScrollView>
      </View>
      <DeletePortfolioDetailsModal
        showDeletePortfolioModal={showDeletePortfolioModal}
        deletePotfolioId={deletePotfolioId}
        onDeletePortfolio={onDeletePortfolio}
        setShowDeletePortfolioModal={setShowDeletePortfolioModal}
        setShowPortfolioModal={setShowPortfolioModal}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: heightToDp(9),
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: heightToDp(1),
    width: widthToDp(90),
    // padding: heightToDp(2),
    // maxHeight: '80%',
  },
  headerActions: {
    flexDirection: 'row',
    gap: heightToDp(0.5),
    justifyContent: 'flex-end',
    width: heightToDp(43),
    marginTop: heightToDp(2.5),
  },
  titleText: {
    fontFamily: 'Roboto',
    color: '#47417D',
    fontWeight: 'bold',
    fontSize: heightToDp(2.1),
    padding: heightToDp(2),
  },
  dashedLine: {
    height: 1,
    width: '100%',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'dashed',
    zIndex: 0,
  },
  imageContainer: {
    paddingBottom: heightToDp(2),
  },
  imageListWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: heightToDp(2.2),
    marginBottom: heightToDp(1),
    marginLeft: heightToDp(1),
    marginTop: heightToDp(2),
  },
  imageListContent: {
    paddingHorizontal: heightToDp(1),
  },
  portfolioImage: {
    height: heightToDp(30),
    width: heightToDp(38),
    borderRadius: heightToDp(1),
    marginRight: heightToDp(1),
  },
  singleImage: {
    height: heightToDp(30),
    borderRadius: heightToDp(1),
  },
  externalLinkContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#DCE4E8',
    // paddingVertical: heightToDp(2),
  },
  linkInfoContainer: {
    flexDirection: 'row',
    marginTop: heightToDp(1.5),
    gap: heightToDp(0.5),
    marginLeft: heightToDp(2),
  },
  linkInfoText: {
    color: '#697164',
    fontFamily: 'Roboto',
    fontSize: heightToDp(1.25),
  },
  linkText: {
    color: '#5A2DAF',
    fontFamily: 'Roboto',
    marginLeft: heightToDp(4.75),
    marginTop: heightToDp(0.5),
  },
  descriptionContainer: {
    marginTop: heightToDp(2),
    marginBottom: heightToDp(2),
  },
  descriptionText: {
    marginLeft: heightToDp(2),
    fontFamily: 'Roboto',
    fontSize: heightToDp(1.8),
    color: '#697164',
  },
});

export default ShowPortfolioDetailsModal;
