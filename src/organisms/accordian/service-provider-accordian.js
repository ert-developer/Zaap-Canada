import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import {useState} from 'react';
import Collapsible from 'react-native-collapsible';
import {widthToDp} from '../../responsive/responsive';
import {Color} from '../../assets/static/globalStyles';
import {WhiteCloseSVG, WhiteOpenSVG} from '../../assets/svgIcons/open/white-open-svg';

const ServiceProviderAccordian = ({isBookingCancel}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const openAccordian = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {!isBookingCancel && (
        <Collapsible collapsed={isCollapsed} style={[styles.accordianCollapsedCon]}>
          <CustomText text={'BEGIN WORK'} style={styles.beginTextStyles} />
        </Collapsible>
      )}

      <TouchableOpacity
        onPress={openAccordian}
        style={[styles.accordianBookingCon, isBookingCancel && styles.cancelledStyle]}>
        <CustomText text={isBookingCancel ? 'BOOKING CANCELLED' : 'BOOKING CONFIRMED'} style={styles.textStyles} />
        {!isBookingCancel && (isCollapsed ? <WhiteOpenSVG /> : <WhiteCloseSVG />)}
      </TouchableOpacity>
    </>
  );
};

export default ServiceProviderAccordian;

const styles = StyleSheet.create({
  accordianBookingCon: {
    backgroundColor: '#00BF63',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: widthToDp(12),
    marginTop: widthToDp(2),
  },
  accordianCollapsedCon: {
    backgroundColor: Color.colorIndigo2,
    height: widthToDp(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: widthToDp(2),
  },
  textStyles: {
    color: Color.colorWhite,
    fontWeight: 'bold',
    marginRight: widthToDp(2),
  },
  beginTextStyles: {
    color: Color.colorWhite,
    fontWeight: 'bold',
    marginTop: -5,
  },
  cancelledStyle: {
    backgroundColor: '#FF5757',
    borderColor: '#FF5757',
    borderWidth: 1,
  },
});
