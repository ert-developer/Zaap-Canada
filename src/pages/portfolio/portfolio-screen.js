import {Image, SafeAreaView, ScrollView, StatusBar, View, Text, ImageBackground, RefreshControl} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import HeaderComponent from '../../atoms/header/headerComponent';
import {TouchableOpacity} from 'react-native';
import portfolioStyles from './portfolio-styles';
import {FilledAddIconSVG} from '../../assets/svgIcons/postJob';
import {DeleteSVG, EmptyPortfolioSVG, LinkArrowSVG, PencilSVG} from '../../assets/svgImage/portfolio/portfolio';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {FlatList} from 'react-native';
import {SmallExclamationSVG} from '../../assets/svgImage/providerProfile';
import ShowPortfolioDetailsModal from '../../molecules/portfoliolinkmodal/showportfoliomodal';
import {useState} from 'react';
const PortfolioScreen = ({portfolioDetails, onDeletePortfolio, onRefresh, loader}) => {
  const styles = portfolioStyles();
  const navigation = useNavigation();

  const [potofolioDetails, setPotofolioDetails] = useState('');
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  const portfolioItemDetails = item => {
    navigation.navigate('PortfolioDetails', {
      portfolioDetails: item,
      onDeletePortfolio,
    });
  };

  const sortedPortfolioDetails = [...portfolioDetails].sort((a, b) => b.portfolioDate - a.portfolioDate);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  const renderItemForImageCard = ({item}) => {
    const firstImage = item.images && item.images.length > 0 ? item.images[0] : null;
    const truncatedTitle = truncateText(item.title, 25);
    return (
      <TouchableOpacity onPress={() => portfolioItemDetails(item)} style={styles.imageContainer}>
        {firstImage ? (
          <Image source={{uri: firstImage}} style={styles.image} resizeMode="cover" />
        ) : (
          <Image source={{uri: item.image}} style={styles.image} resizeMode="cover" />
        )}
        <BlurView style={styles.blurView} blurType="light" blurAmount={10}>
          <View style={styles.blurButtons}>
            <Text style={styles.text}>{truncatedTitle}</Text>
            <View>
              <LinkArrowSVG style={styles.linkSvgStyles} />
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <HeaderComponent text={'My Portfolio'} />
      <ScrollView
        refreshControl={<RefreshControl refreshing={loader} onRefresh={onRefresh} />}
        style={{backgroundColor: 'white', height: '100%'}}>
        <View style={styles.portfolioMainContainer}>
          <View style={styles.portfolioBtnsContainer}>
            <TouchableOpacity style={styles.portfolioBtns}>
              <CustomText text={`Portfolio(${portfolioDetails.length})`} style={styles.portfolioBtnsText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.portfolioBtns, styles.activeBtn]}
              onPress={() => navigation.navigate('AddPortfolio')}>
              <CustomText text={'Add New'} style={[styles.portfolioBtnsText, styles.activeText]} />
              <FilledAddIconSVG />
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.allImagesContainer}>
              {portfolioDetails.length === 0 ? (
                <View style={styles.emptyProfilePortfolioCon}>
                  <EmptyPortfolioSVG
                    style={styles.emptyProfilePortfolioSvg}
                    width={110} // Set your desired width
                    height={110}
                  />
                  <CustomText style={styles.emptyProfilePortfolioHeading} text={'You have not added'} />
                  <CustomText style={styles.emptyProfilePortfolioHeading} text={'your portfolio yet'} />
                  <CustomText
                    style={styles.emptyProfilePortfolioDesc}
                    text={'Capture clients attention with\nShowcase of your work'}
                  />
                </View>
              ) : (
                <FlatList data={sortedPortfolioDetails} renderItem={renderItemForImageCard} />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <ShowPortfolioDetailsModal
        showPortfolioModal={showPortfolioModal}
        setShowPortfolioModal={setShowPortfolioModal}
        potofolioDetails={potofolioDetails}
        onDeletePortfolio={onDeletePortfolio}
      />
    </SafeAreaView>
  );
};

export default PortfolioScreen;
