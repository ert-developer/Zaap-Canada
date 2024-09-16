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
        <TouchableOpacity style={styles.row} onPress={() => handleChange('149')}>
          <CircleCheckbox value={'149'} color={'#5A2DAF'} checked={paymentAmount === '149'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'01 Ads'} style={styles.text} />
                <CustomText text={'  (149/ad)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save Rs. 51'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$200'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$149'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('499')}>
          <CircleCheckbox value={'499'} color={'#5A2DAF'} checked={paymentAmount === '499'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'03 Ads'} style={styles.text} />
                <CustomText text={'  (166/ad)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save Rs. 101'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$600'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$499'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('799')}>
          <CircleCheckbox value={'799'} color={'#5A2DAF'} checked={paymentAmount === '799'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'05 Ads'} style={styles.text} />
                <CustomText text={'  (160/ad)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save Rs. 201'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$1000'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$799'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('1499')}>
          <CircleCheckbox value={'1499'} color={'#5A2DAF'} checked={paymentAmount === '1499'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'10 Ads'} style={styles.text} />
                <CustomText text={'  (150/ad)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save Rs. 501'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$2000'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$1499'} style={styles.amountText} />
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
