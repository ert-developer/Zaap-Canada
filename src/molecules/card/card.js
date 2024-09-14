import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import CustomImage from '../../atoms/image/imageComponent';
import {Border, Color, Margin} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';
import CustomTouchableOpacity from '../touchable-opacity/touchable-opacity-component';
import {ChevronRightSvg} from '../../assets/svgImage/sideDrawer';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {BlueTick} from '../../assets/svgImage/sideDrawer';
import {fetchServiceProviderDetails} from '../../redux/providerstatus/action';
import {FontFamily} from '../../assets/static/globalStyles';
import {HourglassIcon} from '../../assets/svgImage/sideDrawer';
import ButtonIconComponent from '../../atoms/buttonIcon/buttonIcon-component';

const CardComponent = ({imageUrl, title, description, styleContainer, styleImage, styleTitle, styleDesc, onPress}) => {
  const providerStatus = useSelector(state => state.providerverification.providerDetails);

  const user = useSelector(state => state.Auth.user);
  // const providerVerify = providerStatus[0]?.isverified;
  const isVerified = providerStatus[0]?.isverified;
  return (
    <View style={[styles.cardContainer, styleContainer]}>
      {/* <HourglassIcon/> */}
      <CustomTouchableOpacity onPress={onPress} style={{position: 'relative'}}>
        {/* <CustomImage source={{uri: imageUrl?.imageUrl}} style={[styles.image, styleImage]} /> */}
        <CustomImage source={{uri: imageUrl}} style={[styles.image, styleImage]} />
        <ButtonIconComponent
          iconName={'edit'}
          size={20}
          color="black"
          style={{position: 'absolute', bottom: 0, right: 0, top: 35}}
        />
      </CustomTouchableOpacity>
      <View>
        <CustomText style={[styles.title, styleTitle]} text={title} />
        {isVerified ? (
          <View>
            {isVerified === 'verified' ? (
              <View style={[styles.row, styles.verifyContainer]}>
                <BlueTick />
                <CustomText text="Verified" style={styles.verifyText} />
              </View>
            ) : (
              <Text style={{color: isVerified === 'in progress' ? '#808080' : 'red'}}>{isVerified}</Text>
            )}
          </View>
        ) : null}

        {/* <CustomText style={[styles.title, styleTitle]} text={title} /> */}
        {/* <ChevronRightSvg/> */}
      </View>
      {/* <CustomText style={[styles.description, styleDesc]} text={description} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  verifyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyText: {fontFamily: FontFamily.helvetica, color: 'green'},

  // cardContainer: {
  //   borderRadius: Border.br_10,
  //   margin: Margin.m_8,
  // },
  // image: {
  //   width: widthToDp(10),
  //   height: widthToDp(10),
  //   borderRadius: widthToDp(15),
  //   marginBottom: 10,
  //   resizeMode: 'contain',
  // },
  // title: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 5,
  //   color: 'white',
  // },
  // description: {
  //   fontSize: 14,
  //   color: 'white',
  // },
});

export default CardComponent;
