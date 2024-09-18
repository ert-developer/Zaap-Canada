import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import HeaderComponent from '../../atoms/header/headerComponent';
import {EmptyInvoiceSVG} from '../../assets/svgImage/invoices/invoices';
import CustomText from '../../atoms/text/textComponent';
import InvoicesStyles from './invoice-styles';
import {getExpiredJobs} from '../../common/collection';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getJobDetails} from '../../common/collection';
import {set} from 'date-fns';
import {envConfig} from '../../assets/helpers/envApi';

const InvoiceScreen = () => {
  const styles = InvoicesStyles();
  const [completedJobs, setCompletedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.Auth.user);
  const navigation = useNavigation();

  useEffect(() => {
    FetchCompletedJobs();
  }, []);

  const FetchCompletedJobs = async () => {
    setLoading(true);
    try {
      const completedJobs = await getExpiredJobs(envConfig.completedJobs);
      const customerID = user?.userId;
      let currentUserCompletedJobs = completedJobs.filter(job => job.customerID === customerID);

      // Sort completed jobs in descending order by timeAgo
      const sortedCompletedJobs = currentUserCompletedJobs.sort((a, b) => b.timeAgo - a.timeAgo);
      setCompletedJobs(sortedCompletedJobs);
    } catch (error) {
      console.error('Error fetching completed jobs: ', error);
    }
    setLoading(false);
  };

  const formatDateString = date => {
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    const dateParts = new Date(date).toLocaleDateString('en-GB', options).split(' ');
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const renderJobItem = ({item, index}) => {
    function truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      }
      return text;
    }

    const truncatedTitle = truncateText(item.jobTitle, 15);

    return (
      <View key={index}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('InvoiceDetail', {jobId: item.id})}>
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <CustomText text={truncatedTitle} style={styles.jobTitleInvoice} />
              <CustomText text={`Invoice #${item.invoiceId}`} style={styles.invoiceText} />
              <CustomText text={`Booking ID #${item.bookingId}`} style={styles.bookingText} />
            </View>
            <View style={styles.cardRight}>
              <CustomText text={formatDateString(item.timeAgo)} style={styles.dateText} />
              <CustomText text={`$${parseFloat(item.salary).toFixed(2)}`} style={styles.salaryTextInvoice} />
            </View>
          </View>
        </TouchableOpacity>
        {index < completedJobs.length && <View style={styles.separator} />}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent text={'INVOICES'} />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : completedJobs.length === 0 ? (
        <View style={styles.emptyInvoiceContainer}>
          <EmptyInvoiceSVG />
          <CustomText
            text={'Currently, no invoices have been generated for your account'}
            style={styles.emptyInvoiceHeading}
          />
          <CustomText text={'View invoices post-transaction'} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.jobsContainer}>{completedJobs.map((item, index) => renderJobItem({item, index}))}</View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default InvoiceScreen;
