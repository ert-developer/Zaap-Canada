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
        <TouchableOpacity style={styles.row} onPress={() => handleChange('249')}>
          <CircleCheckbox value={'249'} color={'#5A2DAF'} checked={paymentAmount === '249'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'01 Ads'} style={styles.text} />
                <CustomText text={'  (249/ad)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save Rs. 51'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$300'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$249'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('699')}>
          <CircleCheckbox value={'699'} color={'#5A2DAF'} checked={paymentAmount === '699'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'03 Ads'} style={styles.text} />
                <CustomText text={'  (233/ad)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save Rs. 201'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$600'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$699'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('1099')}>
          <CircleCheckbox value={'1099'} color={'#5A2DAF'} checked={paymentAmount === '1099'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'05 Ads'} style={styles.text} />
                <CustomText text={'  (220/ad)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save Rs. 401'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$900'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$1099'} style={styles.amountText} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => handleChange('2099')}>
          <CircleCheckbox value={'2099'} color={'#5A2DAF'} checked={paymentAmount === '2099'} />
          <View style={styles.featuredAdsContainer}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomText text={'10 Ads'} style={styles.text} />
                <CustomText text={'  (210/ad)'} style={{fontSize: 10, color: Color.colorIndigo2}} />
              </View>
              <CustomText text={'You save Rs. 901'} style={styles.text} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$1500'} style={styles.originalPriceText} />
            </View>
            <View style={styles.amountContainer}>
              <CustomText text={'$2099'} style={styles.amountText} />
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
