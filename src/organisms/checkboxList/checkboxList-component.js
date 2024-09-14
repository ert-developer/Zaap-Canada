import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CircleCheckbox from '../../atoms/circleCheckbox/circleCheckbox-component';
import {RadioButton} from 'react-native-paper';
import CustomText from '../../atoms/text/textComponent';
import {widthToDp} from '../../responsive/responsive';
import {Color, FontSize} from '../../assets/static/globalStyles';

const CheckboxListComponent = ({setExposureValue, exposureValue, postPaymentMode}) => {
  const handleChange = option => {
    setExposureValue(option);
    postPaymentMode(option);
  };
  return (
    <RadioButton.Group onValueChange={handleChange} value={exposureValue}>
      <View style={styles.row}>
        <CircleCheckbox value={'free'} color={'#5A2DAF'} />
        <CustomText text={'Free Ad'} style={styles.text} />
      </View>
      <View style={styles.row}>
        <CircleCheckbox value={'paid'} color={'#5A2DAF'} />
        <View>
          <CustomText text={'Premium Ad'} style={styles.text} />
        </View>
      </View>
      {/* <View style={styles.premiumAdTextCon}>
        <Text style={styles.subText}>More Visibility</Text>
        <Text style={styles.subText}>Priority Placement</Text>
        <Text style={styles.subText}>Stand Out</Text>
      </View> */}
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    fontWeight: 'normal',
    marginLeft: 2,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#000',
    textAlign: 'left',
  },
  premiumAdTextCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: widthToDp(2),
    color: Color.colorIndigo2,
    // borderWidth: 1,
    width: '90%',
    marginLeft: widthToDp(10),
  },
  subText: {
    color: Color.colorIndigo2,
    fontSize: FontSize.size_12,
  },
});

export default CheckboxListComponent;
