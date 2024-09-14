import React from 'react';
import {View, SafeAreaView, Image} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import FileSvgComponent from '../../assets/svgIcons/filesvg/files';
import LocationSymbolSvgComponent from '../../assets/svgIcons/locationsymbol/locationsymbol';
import PersonSvgComponent from '../../assets/svgIcons/personSvg/person';
import BudgetSvgComponent from '../../assets/svgIcons/bugdetsvg/budgeticon';
import CustomerSidePaymentModel from '../../organisms/customersidepaymentmodal/modal';
import ProviderPaymentStyles from './provider-payment-style';
import {useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import BackIcon from '../../assets/svgIcons/common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native-svg';
import {Budget, JobDescription} from '../../assets/svgImage/jobDetail';

const ProviderPaymentScreen = ({backNavigation, selectedJobDetails}) => {
  const styles = useMemo(() => ProviderPaymentStyles(), []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomerSidePaymentModel />
    </SafeAreaView>
  );
};

export default ProviderPaymentScreen;
