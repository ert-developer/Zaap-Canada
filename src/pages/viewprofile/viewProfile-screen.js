import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import ViewProfileStyles from './viewProfile-styles';
import ButtonIconComponent from '../../atoms/buttonIcon/buttonIcon-component';
import CustomImage from '../../atoms/image/imageComponent';
import CustomText from '../../atoms/text/textComponent';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import {useNavigation} from '@react-navigation/native';

const ViewProfile = () => {
  const styles = ViewProfileStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.editfalse}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <View style={styles.imageborder}>
          <Image
            source={{uri: 'https://lh3.googleusercontent.com/a-/AOh14GjkcNgdIcCDlLTtU7zYP0OCKHr9welDwEDj9zC9=s96-c'}}
            style={[styles.profileImage, {borderRadius: 50}]}
          />
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.userInfoRow}>
            <CustomText text="NAME: " style={styles.label} />
            <CustomText text={'Prakash'} style={styles.value} />
          </View>
          <View style={styles.userInfoRow}>
            <CustomText text="EMAIL: " style={styles.label} />
            <CustomText text={'Prakashgowd557@gmail.com'} style={styles.value} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewProfile;
