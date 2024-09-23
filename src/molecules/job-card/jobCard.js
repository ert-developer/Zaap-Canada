import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import CustomImage from '../../atoms/image/imageComponent';
import {Border, Color, FontFamily, FontSize, Margin} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import StaticImage from '../../assets/svgImage/static';
import {
  SpotlightBanner,
  FeaturedBanner,
  NewFeaturedBanner,
  NewSpotlightBanner,
} from '../../assets/svgIcons/spotlightbanner';

const CardJobs = ({image, title, price, jobAdType, timeAgo, category, location}) => {
  const renderBanner = () => {
    switch (jobAdType) {
      case 'SPOTLIGHT':
        return (
          <View style={styles.spotLightbanner}>
            {/* <SpotlightBanner /> */}
            <NewSpotlightBanner />
            <CustomText text={'SPOTLIGHT'} style={styles.spotLightbannerText} />
          </View>
        );
      case 'FEATURED':
        return (
          <View style={styles.bannerContainer}>
            {/* <FeaturedBanner /> */}
            <NewFeaturedBanner />
            <CustomText text={'FEATURED'} style={styles.spotlightText} />
          </View>
        );
      default:
        return null;
    }
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

  const truncatedTitle = truncateText(title, 20);

  return (
    <View style={styles.frameParent}>
      <Image
        style={{width: 90, height: 90, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
        source={{uri: image}}
      />
      <View style={styles.textContainer}>
        <View>
          <View style={styles.spotlightBannerContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
              {truncatedTitle}
            </Text>
            {renderBanner()}
          </View>
          <View>
            <CustomText text={category} style={styles.categoryTextStyle} />
            <CustomText text={location} style={styles.categoryTextStyle} />
          </View>
        </View>
        <View style={styles.DateandRadius}>
          {/* <Text numberOfLines={2} ellipsizeMode="tail" style={styles.within15Kms}>
              {description}
            </Text> */}
          <CustomText text={timeAgo} style={styles.AgoText} />
          <View style={styles.amountContainer}>
            <CustomText text={`$${price}`} style={styles.text1} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardJobs;

const styles = StyleSheet.create({
  spotLightbannerText: {
    position: 'absolute',
    fontSize: heightToDp(1.19),
    right: 0,
    top: 4,
    color: 'black',
    fontWeight: 'bold',
  },
  spotLightbanner: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  amountContainer: {
    flexDirection: 'row',
  },
  bannerContainer: {
    position: 'absolute',
    right: 0,
    borderColor: 'red',
  },
  spotlightText: {
    position: 'absolute',
    fontSize: heightToDp(1.19),
    color: 'white',
    top: 4,
    left: 12,
    fontWeight: 'bold',
    // letterSpacing:1
  },
  spotlightBannerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: Border.br_8,
  },
  rupeeIcon: {
    width: widthToDp(5),
    height: widthToDp(5),
    marginTop: heightToDp(0.8),
    color: 'green',
  },

  frameParent: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: widthToDp(2),
    // marginBottom: -5,
  },
  textContainer: {
    flex: 1,
    marginLeft: heightToDp(2),
    justifyContent: 'center',
  },
  name: {
    fontSize: heightToDp(1.8),
    fontWeight: 'bold',
    fontFamily: FontFamily.helvetica,
    color: Color.colorIndigo2,
    width: widthToDp(50),
    marginTop: 4,
  },
  within15Kms: {
    fontSize: heightToDp(1.5),
    fontWeight: '300',
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    marginTop: heightToDp(0.2),
    flexWrap: 'wrap',
    width: 100,
  },
  text1: {
    fontSize: heightToDp(1.5),
    letterSpacing: 1,
    fontFamily: FontFamily.helvetica,
    color: '#16A637',
    fontWeight: 'bold',
    marginTop: heightToDp(0.5),
    marginRight: widthToDp(4),
    fontSize: widthToDp(4),
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  DateandRadius: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AgoText: {
    fontSize: heightToDp(1.3),
    fontFamily: FontFamily.helvetica,
    color: '#949494',
    marginRight: heightToDp(2.5),
    marginTop: heightToDp(3),
  },
  categoryTextStyle: {
    color: Color.colorSilver,
    textTransform: 'capitalize',
    fontSize: widthToDp(3),
  },
});
