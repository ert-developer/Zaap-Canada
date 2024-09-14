import CustomText from '../../atoms/text/textComponent';
import {Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import CustomButton from '../../atoms/button/buttonComponent';
import {heightToDp} from '../../responsive/responsive';
import FileSvgComponent from '../../assets/svgIcons/filesvg/files';
import RupeeSvgComponent from '../../assets/svgIcons/RupeeIcon/rupeeiconsvg';
import LocationSymbolSvgComponent from '../../assets/svgIcons/locationsymbol/locationsymbol';
import PersonSvgComponent from '../../assets/svgIcons/personSvg/person';
import budgeticon from '../../assets/svgIcons/bugdetsvg/budgeticon';
// import CustomerSidePaymentModel from "../../organisms/customersidepaymentmodal/modal"
import PreviousJobsPaymentModal from '../../organisms/previousjobspaymentmodal/previousjob-payment-modal';
import ProviderPaymentScreen from '../providerpayment/provider-payment-screen';
import OtpComponent from '../../organisms/otp/otp';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const PreviousJobsPaymentScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <PreviousJobsPaymentModal />
    </SafeAreaView>
  );
};

export default PreviousJobsPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
