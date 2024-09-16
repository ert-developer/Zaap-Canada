import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CircleCheckbox from '../../atoms/circleCheckbox/circleCheckbox-component';
import CustomText from '../../atoms/text/textComponent';
import RupeeSvgComponent from '../../assets/svgIcons/RupeeIcon/rupeeiconsvg';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {Color} from '../../assets/static/globalStyles';

const SpotlightCheckBox = ({GetSpotlightPaymentAmount, paymentAmount, setPaymentAmount}) => {
  const handleChange = value => {
    setPaymentAmount(value);
    GetSpotlightPaymentAmount(value);
  };

  return (
    <RadioButton.Group onValueChange={handleChange} value={paymentAmount}>
      <View style={styles.radioButtonsContainer}>
        <TouchableOpacity style={styles.row} onPress={() => handleChange('29.99')}>
          <CircleCheckbox value={'29.99'} color={'#5A2DAF'} checked={paymentAmount === '29.99'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'01 Ad'} style={styles.text} />
                <CustomText text={'  (25% off)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save $10'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$39.99'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$29.99'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('79.99')}>
          <CircleCheckbox value={'79.99'} color={'#5A2DAF'} checked={paymentAmount === '79.99'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'03 Ads'} style={styles.text} />
                <CustomText text={'  (33.3% off)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save $40'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$119.97'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$79.99'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('129.99')}>
          <CircleCheckbox value={'129.99'} color={'#5A2DAF'} checked={paymentAmount === '129.99'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'05 Ads'} style={styles.text} />
                <CustomText text={'  (35% off)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save $70'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$199.95'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$129.99'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('229.99')}>
          <CircleCheckbox value={'229.99'} color={'#5A2DAF'} checked={paymentAmount === '229.99'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'10 Ads'} style={styles.text} />
                <CustomText text={'  (42.5% off)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save $170'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$399.90'} style={{...styles.originalPriceText, marginRight: 7}} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$229.99'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  rupeeIcon: {
    marginTop: heightToDp(0.5),
  },
  radioButtonsContainer: {
    borderColor: Color.colorSilver,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: widthToDp(2),
    borderRadius: widthToDp(2),
  },
  purchaseText: {
    color: 'white',
    fontSize: heightToDp(2),
    letterSpacing: 0.9,
  },
  purchase: {
    backgroundColor: '#5A2DAF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  amountContainer: {
    flexDirection: 'row',
  },
  featuredAdsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  amountText: {
    color: 'green',
  },
  originalPriceText: {
    textDecorationLine: 'line-through',
    color: 'grey',
    fontSize: widthToDp(3),
    marginLeft: 90,
    marginTop: 2,
  },
});

export default SpotlightCheckBox;
