import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomText from '../../atoms/text/textComponent';
import {widthToDp, heightToDp} from '../../responsive/responsive';
import {EditIconSvg, DeleteIconSvg} from '../../assets/svgImage/providerProfile';
import HeaderComponent from '../../atoms/header/headerComponent';
import DeletePortfolioDeleteModal from './deleteportfoliomodal';
import {FontFamily} from '../../assets/static/globalStyles';

const PortfolioDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {portfolioDetails, onDeletePortfolio} = route.params;
  const deletePotfolioId = portfolioDetails.id;
  const [showDeletePortfolioModal, setShowDeletePortfolioModal] = useState(false);

  const renderImages = () => {
    return portfolioDetails.images && portfolioDetails.images.length > 0 ? (
      <FlatList
        data={portfolioDetails.images}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Image source={{uri: item}} style={styles.portfolioImage} resizeMode="cover" />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageListContent}
      />
    ) : (
      <Image source={{uri: portfolioDetails.image}} style={styles.singleImage} resizeMode="cover" />
    );
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

  const renderLinks = () => {
    return portfolioDetails.Link && portfolioDetails.Link.length > 0 ? (
      <View>
        <CustomText text={'External Links'} style={styles.sectionTitle} />

        {portfolioDetails.Link.map((link, index) => (
          <TouchableOpacity key={index} onPress={() => onPressPortfolioLink(link)}>
            <CustomText text={link.toLowerCase()} style={styles.linkText} />
          </TouchableOpacity>
        ))}
      </View>
    ) : null;
  };

  const DetleteDetailsModal = potofolioDetails => {
    setShowDeletePortfolioModal(!showDeletePortfolioModal);
  };

  return (
    <>
      <DeletePortfolioDeleteModal
        showDeletePortfolioModal={showDeletePortfolioModal}
        setShowDeletePortfolioModal={setShowDeletePortfolioModal}
        onDeletePortfolio={onDeletePortfolio}
        deletePotfolioId={deletePotfolioId}
      />
      <HeaderComponent text={'My Portfolio'} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddPortfolio', portfolioDetails)}
            style={styles.editSvgStyles}>
            <EditIconSvg />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => onDeletePortfolio(portfolioDetails.id)}> */}
          <TouchableOpacity onPress={() => DetleteDetailsModal()}>
            <DeleteIconSvg />
          </TouchableOpacity>
        </View>
        <CustomText text={portfolioDetails.title} style={styles.titleText} />
        <View style={styles.dashedLine} />
        <View style={styles.imageContainer}>
          <CustomText text={'Images'} style={styles.sectionTitle} />
          {renderImages()}
        </View>
        <View style={styles.descriptionContainer}>
          <CustomText text={'Description'} style={styles.sectionTitle} />
          <CustomText text={portfolioDetails.description} style={styles.descriptionText} />
        </View>
        {renderLinks()}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: heightToDp(2),
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(2),
    margin: heightToDp(2),
    borderRadius: heightToDp(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: heightToDp(2),
  },
  editSvgStyles: {marginRight: widthToDp(2)},
  titleText: {
    fontSize: heightToDp(3),
    fontWeight: 'bold',
    color: '#464183',
    marginVertical: heightToDp(1),
  },
  dashedLine: {
    height: 1,
    width: '100%',
    borderColor: '#CCCCCC',
    borderStyle: 'dashed',
    borderWidth: 1,
    marginVertical: heightToDp(2),
  },
  imageContainer: {
    marginVertical: heightToDp(2),
  },
  sectionTitle: {
    fontSize: heightToDp(2.2),
    fontWeight: '600',
    color: '#464183',
    marginBottom: 1,
  },
  portfolioImage: {
    height: heightToDp(30),
    width: heightToDp(38),
    marginRight: heightToDp(1.5),
    borderRadius: heightToDp(1),
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  singleImage: {
    height: heightToDp(30),
    borderRadius: heightToDp(1),
    width: '100%',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  descriptionText: {
    fontSize: heightToDp(1.8),
    lineHeight: heightToDp(2.5),
    fontFamily: FontFamily.helvetica,
    color: '#666666',
    fontWeight: '400',
    marginBottom: 20,
  },
  // linkContainer: {
  //   marginVertical: heightToDp(2),
  //   padding: heightToDp(1.5),
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: heightToDp(1),
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  //   elevation: 3,
  // },
  linkText: {
    fontSize: heightToDp(1.8),
    color: '#1E90FF',
    textDecorationLine: 'underline',
    marginBottom: heightToDp(1),
  },
  imageListContent: {
    paddingVertical: heightToDp(1),
  },
});

export default PortfolioDetailsScreen;
