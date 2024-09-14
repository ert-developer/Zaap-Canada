import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import SpotliteStaticImage from '../../assets/svgImage/spotlitestaticimage';
import {heightArea, heightToDp, widthToDp} from '../../responsive/responsive';
import RupeeSvgComponent from '../../assets/svgIcons/RupeeIcon/rupeeiconsvg';
import {FontFamily, Color} from '../../assets/static/globalStyles';
import {SpotlightBanner} from '../../assets/svgIcons/spotlightbanner';
import {NewSpotlightBanner} from '../../assets/svgIcons/spotlightbanner';
import BlackRupeeSvgComponent from '../../assets/svgIcons/RupeeIcon/rupeeiconblack';
const CardSpotlite = ({image, title, description, price}) => {
  return (
    <View style={styles.cardContainer}>
      {/* <View style={styles.spotliteStaticImage}>
      <SpotliteStaticImage />

      </View> */}
      <Image style={styles.spotLightJobImage} source={{uri: image}} />
      <View style={styles.textContainer}>
        <View style={styles.salaryAndTitleContainer}>
          <View style={styles.titleAndSpotlightCon}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
              {title}
            </Text>
            <View style={styles.spotLightbanner}>
              <NewSpotlightBanner />
              <CustomText text={'SPOTLIGHT'} style={styles.spotLightbannerText} />
            </View>
          </View>
          <View style={styles.salaryContainer}>
            <BlackRupeeSvgComponent style={styles.rupee} />
            <CustomText text={price} style={styles.priceText} />
          </View>
        </View>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.within15Kms}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  within15Kms: {
    fontSize: heightToDp(1.5),
    fontWeight: '300',
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    marginTop: heightToDp(0.2),
    // flexWrap: 'wrap',
    width: 100,
    // backgroundColor:"red"
  },
  name: {
    fontSize: heightToDp(2),
    fontWeight: '700',
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    width: widthToDp(50),
  },
  spotliteStaticImage: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  salaryAndTitleContainer: {
    paddingBottom: heightToDp(2.3),
  },
  rupee: {
    marginTop: heightToDp(0.3),
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // width: widthToDp('85%'),
    backgroundColor: '#FFFFFF',
    borderRadius: heightToDp(1.8),
    // marginRight: heightToDp(1),
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  spotLightJobImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: widthToDp(2.5),
    borderBottomLeftRadius: widthToDp(2.5),
  },
  spotLightbanner: {
    position: 'absolute',
    right: 1,
    top: 6,
  },
  spotLightbannerText: {
    position: 'absolute',
    fontSize: heightToDp(1),
    right: 9,
    top: 5,
    color: 'white',
  },

  textContainer: {
    marginLeft: 10,
  },
  titleAndSpotlightCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 14,
    color: Color.colorBlack,
  },
  descriptionText: {
    fontSize: 12,
    color: 'gray',
  },
});

export default CardSpotlite;
