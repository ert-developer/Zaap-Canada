import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import {FontSize, Margin, Color} from '../../assets/static/globalStyles';
import CircleCheckbox from '../../atoms/circleCheckbox/circleCheckbox-component';
import FeatureCheckBox from '../featurecheckboxlist';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import SpotlightCheckBox from '../spotlightcheckboxlist';
import {envConfig} from '../../assets/helpers/envApi';

const DropdownComponent = ({
  data,
  handleChange,
  formData,
  formErrors,
  GetFeaturePaymentAmount,
  GetSpotlightPaymentAmount,
  setAdType,
  adType,
  usedCheckBox,
  setUsedCheckBox,
  available,
  setAvailable,
  paymentAmount,
  setPaymentAmount,
}) => {
  let {advertisement} = formData;
  let initialMoney = advertisement.type ? advertisement.type : null;
  /////////////////This is For Getting Data///////////////////
  const [premiumAdsDataList, setPremiumAdsDataList] = useState({});
  const user = useSelector(state => state.Auth.user);
  const loginUserId = user.userId;
  ///////////////////////////////////////////////////////////

  const [value, setValue] = useState(initialMoney);
  const [isFocus, setIsFocus] = useState(false);
  const [showTags, setTags] = useState('');
  const [isShowFeature, setFeature] = useState('');
  // const [available, setAvailable] = useState('');

  /////////////////This is For Getting Data///////////////////
  const getPremiumAdsData = async () => {
    try {
      const docRef = firestore().collection(envConfig.Premium_ads).doc(loginUserId);
      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        const premiumAdsData = docSnapshot.data();
        setPremiumAdsDataList(premiumAdsData);
        return premiumAdsData;
      } else {
        console.log('Premium ads document does not exist for user:', loginUserId);
        return null; // or return some default value as needed
      }
    } catch (error) {
      console.error('Error getting premium ads data:', error);
      return null; // or handle error accordingly
    }
  };

  useEffect(() => {
    getPremiumAdsData();
  }, [value]);

  const onPressCheckBox = () => {
    if (remainingAds > 0) {
      setUsedCheckBox(!usedCheckBox);
    }
  };

  const renderItem = item => {
    return (
      <View style={styles.dropdownItem}>
        <Text style={styles.labelText}>{item.label}</Text>
        {/* <View style={styles.moneyIconContainer}>
        {/* <View style={styles.moneyIconContainer}>
          <Text style={styles.moneyText}>${item.money}</Text>
        </View> */}
      </View>
    );
  };
  const onHandleChange = item => {
    setTags(item.tags || []);
    setFeature(item.value);
    setValue(item.value);
    setAdType(item.value);
    setIsFocus(false);
    const values = {type: item.value, pay: item.money};
    handleChange('advertisement', values);
  };

  const renderTags = ({item}) => (
    <CustomText style={styles.tagsText} text={item?.showTags ? item.showTags.join(', ') : ''} />
  );

  const remainingAds =
    value === 'FEATURED'
      ? premiumAdsDataList.featuredAds ?? 0
      : value === 'SPOTLIGHT'
      ? premiumAdsDataList.spotlightAds ?? 0
      : 0;

  return (
    <View style={[styles.container]}>
      <View>
        <FlatList data={[{key: 'tags', showTags}]} renderItem={renderTags} keyExtractor={item => item.key} />
      </View>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: 'blue'},
          formErrors.advertisement ? styles.errorContainer : null,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Explore Your Options' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        renderItem={renderItem}
        onChange={onHandleChange}
      />

      {value && (
        <View style={styles.amountButtonCon}>
          <TouchableOpacity
            style={[styles.balanceBtn, available === 'AVAILABLE' ? styles.balanceBtnActiveBgm : null]}
            onPress={() => setAvailable('AVAILABLE')}>
            <CustomText
              text={'AVAILABLE BALANCE'}
              style={[styles.amountButtonText, available === 'AVAILABLE' ? styles.amountButtonActiveText : null]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.balanceBtn, available === 'BUY' ? styles.balanceBtnActiveBgm : null]}
            onPress={() => setAvailable('BUY')}>
            <CustomText
              text={'BUY'}
              style={[styles.amountButtonText, available === 'BUY' ? styles.amountButtonActiveText : null]}
            />
          </TouchableOpacity>
        </View>
      )}

      {available === 'AVAILABLE' ? (
        <View style={styles.remainingAdsCon}>
          <View style={styles.remainingAdsInnerCon}>
            <CustomText text="Remaining" style={styles.reaminingText} />
            <CustomText text={remainingAds} style={styles.reaminingAdsText} />
          </View>
          <TouchableOpacity style={styles.useAdTextContainer} onPress={onPressCheckBox} disabled={remainingAds === 0}>
            <CheckBox value={usedCheckBox} onValueChange={onPressCheckBox} disabled={remainingAds === 0} />
            <CustomText text={remainingAds > 0 ? 'Use 1 For This Ad' : 'No Ads Left to Use'} style={styles.useAdText} />
          </TouchableOpacity>
        </View>
      ) : null}

      {available === 'BUY' && value === 'FEATURED' ? (
        <View style={styles.featuredContainer}>
          <FeatureCheckBox
            GetFeaturePaymentAmount={GetFeaturePaymentAmount}
            paymentAmount={paymentAmount}
            setPaymentAmount={setPaymentAmount}
          />
        </View>
      ) : null}

      {available === 'BUY' && value === 'SPOTLIGHT' ? (
        <View style={styles.spotlightContainer}>
          <SpotlightCheckBox
            GetSpotlightPaymentAmount={GetSpotlightPaymentAmount}
            paymentAmount={paymentAmount}
            setPaymentAmount={setPaymentAmount}
          />
        </View>
      ) : null}
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  tagsText: {
    fontSize: FontSize.size_9,
    letterSpacing: 0.8,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#5a2daf',
    marginBottom: Margin.m_10,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  checkBoxContainer: {
    flexDirection: 'row',
  },
  rupeeSvg: {
    marginTop: 3,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseText: {
    color: 'white',
    fontsize: heightToDp(2),
  },
  featuredContainer: {
    marginTop: heightToDp(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  purchase: {
    backgroundColor: '#5A2DAF',
    color: 'white',
    backgroundColor: '#5A2DAF',
    color: 'white',
    alignItems: 'center', // Add this line to center the content horizontally
    justifyContent: 'center', // Add this line to center the content vertically
    paddingVertical: 10,
  },
  firstAd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: heightToDp(0.8),
    marginTop: heightToDp(0.8),
  },
  container: {
    backgroundColor: 'white',
    // padding: 16,
    // width: '100%',
    // marginLeft: 20,
  },
  dropdown: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    textAlign: 'center',
  },

  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: '#b7b5b5',
    textAlign: 'center',
    marginLeft: 27,
    fontWeight: '700',
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#5a2daf',
    textAlign: 'center',
    marginLeft: 17,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  labelText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  moneyText: {
    color: 'green',
    fontWeight: 'bold',
  },
  moneyIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    borderColor: 'red',
    borderWidth: 1,
  },
  amountButtonCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: widthToDp(5),
  },
  balanceBtn: {
    margin: widthToDp(1),
    width: widthToDp(42),
    height: widthToDp(12),
    borderWidth: 1,
    borderColor: Color.colorSilver,
    borderStyle: 'solid',
    borderRadius: widthToDp(2),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  amountButtonText: {
    color: Color.colorIndigo2,
    fontWeight: '800',
  },
  amountButtonActiveText: {
    color: Color.colorWhite,
    fontWeight: '800',
  },
  balanceBtnActiveBgm: {
    backgroundColor: Color.colorIndigo2,
    borderColor: Color.colorIndigo2,
  },
  remainingAdsCon: {
    borderWidth: 1,
    borderColor: Color.colorSilver,
    borderStyle: 'solid',
    borderRadius: widthToDp(2),
    padding: widthToDp(8),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: widthToDp(5),
  },
  remainingAdsInnerCon: {
    borderWidth: 1,
    borderColor: Color.colorSilver,
    borderStyle: 'solid',
    borderRadius: widthToDp(2),
    paddingVertical: widthToDp(3),
  },
  reaminingText: {
    color: Color.colorBlack,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorSilver,
    padding: 10,
    paddingHorizontal: 35,
    textAlign: 'center',
  },
  reaminingAdsText: {
    color: Color.colorBlack,
    padding: 15,
    // paddingHorizontal: 20,
    textAlign: 'center',
  },
  useAdTextContainer: {
    marginTop: widthToDp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  useAdText: {
    color: Color.colorBlack,
  },
});
