import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CircleCheckbox from '../../atoms/circleCheckbox/circleCheckbox-component';
import CustomText from '../../atoms/text/textComponent';
import RupeeSvgComponent from '../../assets/svgIcons/RupeeIcon/rupeeiconsvg';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {Color} from '../../assets/static/globalStyles';

const FeatureCheckBox = ({GetFeaturePaymentAmount, paymentAmount, setPaymentAmount}) => {
  const handleChange = value => {
    setPaymentAmount(value);
    GetFeaturePaymentAmount(value);
  };

  return (
    <RadioButton.Group onValueChange={handleChange} value={paymentAmount}>
      <View style={styles.radioButtonsContainer}>
        <TouchableOpacity style={styles.row} onPress={() => handleChange('19.99')}>
          <CircleCheckbox value={'19.99'} color={'#5A2DAF'} checked={paymentAmount === '19.99'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'01 Ad'} style={styles.text} />
                <CustomText text={'  (20% off)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save $5'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$24.99'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$19.99'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('54.99')}>
          <CircleCheckbox value={'54.99'} color={'#5A2DAF'} checked={paymentAmount === '54.99'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'03 Ads'} style={styles.text} />
                <CustomText text={'  (26.6% off)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save $20'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$74.97'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$54.99'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('89.99')}>
          <CircleCheckbox value={'89.99'} color={'#5A2DAF'} checked={paymentAmount === '89.99'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'05 Ads'} style={styles.text} />
                <CustomText text={'  (28% off)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save $35'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$124.95'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$89.99'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('169.99')}>
          <CircleCheckbox value={'169.99'} color={'#5A2DAF'} checked={paymentAmount === '169.99'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'10 Ads'} style={styles.text} />
                <CustomText text={'  (32% off)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save $80'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$249.90'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$169.99'} style={styles.amountText} />
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
  originalPriceText: {
    textDecorationLine: 'line-through',
    color: 'grey',
    fontSize: widthToDp(3),
    marginLeft: 90,
    marginTop: 2,
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
});

export default FeatureCheckBox;
