import {SafeAreaView, StyleSheet} from 'react-native';
import PreviousJobsPaymentModal from '../../organisms/previousjobspaymentmodal/previousjob-payment-modal';

const PreviousJobsPaymentScreen = () => {
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
