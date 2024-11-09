import {ScrollView, View, FlatList, Image, Text, SafeAreaView, TouchableOpacity, Linking, Alert} from 'react-native';
import HeaderComponent from '../../atoms/header/headerComponent';
import CustomText from '../../atoms/text/textComponent';
import profilePortfolioStyles from './service-provider-portfolio-styles';
import {EmptyPortfolioSVG, LinkArrowSVG} from '../../assets/svgImage/portfolio/portfolio';
import {BlurView} from '@react-native-community/blur';
import Modal from 'react-native-modal';
// import {Modal} from 'react-native';
import {heightToDp} from '../../responsive/responsive';
import {CloseSVG, ExternalLinkPopupLine, SmallExclamationSVG} from '../../assets/svgImage/providerProfile';
import {CloseIcon} from '../../assets/svgIcons/providerPaymentSvg';
import {useSelector} from 'react-redux';

const ServiceProviderPortfolioScreen = ({
  portfolioDetails,
  setEachPortfolioDetails,
  eachPortfolioDetails,
  setPortfolioPopup,
  showPortfolioPopup,
  onPressShowPortfolioDetails,
}) => {
  const styles = profilePortfolioStyles();

  const providerStatus = useSelector(state => state.providerverification.providerDetails);
  const isVerified = providerStatus[0]?.isverified;

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

  const renderItemForImageCard = ({item}) => {
    const firstImage = item.images && item.images.length > 0 ? item.images[0] : null;
    return (
      <TouchableOpacity onPress={() => onPressShowPortfolioDetails(item)} style={styles.imageContainer}>
        {firstImage ? (
          <Image source={{uri: firstImage}} style={styles.image} resizeMode="cover" />
        ) : (
          <Image source={{uri: item.image}} style={styles.image} resizeMode="cover" />
        )}
        <BlurView style={styles.blurView} blurType="light" blurAmount={10}>
          <View style={styles.blurButtons}>
            <Text style={styles.text}>{item.title}</Text>
            <View>
              <LinkArrowSVG style={styles.linkSvgStyles} />
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

  const renderLinks = () => {
    return eachPortfolioDetails.Link && eachPortfolioDetails.Link.length > 0
      ? eachPortfolioDetails.Link.map((link, index) => (
          <TouchableOpacity key={index} onPress={() => onPressPortfolioLink(link)}>
            <CustomText text={link.toLowerCase()} style={styles.linkText} />
          </TouchableOpacity>
        ))
      : null;
  };

  return (
    <SafeAreaView>
      <Modal isVisible={showPortfolioPopup} style={styles.portfolioModalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={{paddingBottom: heightToDp(2)}}>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={() => setPortfolioPopup(false)}>
                <View style={{marginRight: 30}}>
                  <CloseIcon />
                </View>
              </TouchableOpacity>
            </View>
            <CustomText text={eachPortfolioDetails.title} style={styles.portfolioHeading} />
            <View style={styles.dashedLine} />
            <View style={styles.imagaContainer}>
              <CustomText text={'Images'} style={styles.sectionTitle} />
              <View style={styles.imageListWrapper}>
                {eachPortfolioDetails.images && eachPortfolioDetails.images.length > 0 ? (
                  <FlatList
                    data={eachPortfolioDetails.images}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <Image source={{uri: item}} style={styles.portfolioImage} resizeMode="cover" />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.imageListContent}
                  />
                ) : (
                  <Image source={{uri: eachPortfolioDetails.image}} style={styles.singleImage} resizeMode="cover" />
                )}
              </View>
            </View>
            <View style={styles.extranalLinkCon}>
              <CustomText text={'External Link'} style={styles.sectionTitle} />
              <View style={styles.linkInfoContainer}>
                <SmallExclamationSVG />
                <CustomText text={'Click on the Link to Check & Re-direct'} style={styles.linkInfoText} />
              </View>
              {renderLinks()}
            </View>
            <View style={styles.descriptionContainer}>
              <CustomText text={'Description'} style={styles.sectionTitle} />
              <CustomText text={eachPortfolioDetails.description} style={styles.descriptionText} />
            </View>
          </ScrollView>
        </View>
      </Modal>
      <HeaderComponent text={'Portfolio'} />
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.profileMainContainer}>
          {portfolioDetails.length === 0 ? (
            <View style={styles.emptyProfilePortfolioCon}>
              <EmptyPortfolioSVG style={styles.emptyProfilePortfolioSvg} />
              {isVerified === 'verified' ? (
                <>
                  <CustomText
                    style={styles.emptyProfilePortfolioHeading}
                    text={'You haven’t added  your portfolio yet '}
                  />
                  <CustomText
                    style={styles.emptyProfilePortfolioHeading}
                    text={'Add your portfolio from your account'}
                  />
                </>
              ) : (
                <>
                  <CustomText style={styles.emptyProfilePortfolioHeading} text={'Service Provider has not added'} />
                  <CustomText style={styles.emptyProfilePortfolioHeading} text={'his portfolio yet'} />
                </>
              )}
            </View>
          ) : (
            <View style={styles.allImagesContainer}>
              <FlatList data={portfolioDetails} renderItem={renderItemForImageCard} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceProviderPortfolioScreen;
