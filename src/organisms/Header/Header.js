import React from 'react';
import {Margin} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';
import {useNavigation} from '@react-navigation/native';
import {Hamburger} from '../../assets/svgImage/sideDrawer';
import {ZaapLogo} from '../../assets/svgImage/zaaplogo';
import {StyleSheet, View} from 'react-native';

const CustomHeader = () => {
  const navigation = useNavigation();
  const drawerOpen = () => navigation.openDrawer();
  return (
    <View style={styles.header}>
      <Hamburger style={styles.hamberger} onPress={drawerOpen} />
      <ZaapLogo style={styles.zaapLogo} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  zaapLogo: {
    marginLeft: widthToDp(30),
  },
  header: {
    width: widthToDp(96),
    height: widthToDp(10),
    flexDirection: 'row',
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  hamberger: {
    // marginTop: Margin.m_10,
    // marginLeft: Margin.m_20,
  },
});
