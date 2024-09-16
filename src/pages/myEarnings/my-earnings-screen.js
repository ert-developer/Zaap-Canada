import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import HeaderComponent from '../../atoms/header/headerComponent';
import CustomText from '../../atoms/text/textComponent';
import InvoicesStyles from '../invoices/invoice-styles';
import {getExpiredJobs} from '../../common/collection';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getPlatformFee} from '../../common/platformFee';
import {ExclamationSVG} from '../../assets/svgImage/providerProfile';
import {envConfig} from '../../assets/helpers/envApi';

const MyEarningScreen = () => {
  const styles = InvoicesStyles();
  const [completedJobs, setCompletedJobs] = useState([]);
  const user = useSelector(state => state.Auth.user);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchCompletedJobs();
  }, []);

  const FetchCompletedJobs = async () => {
    setLoading(true);
    try {
      const completedJobs = await getExpiredJobs(envConfig.completedJobs);
      const candidateUserId = user?.userId;
      let currentUserCompletedJobs = completedJobs.filter(job => job.candidateUserId === candidateUserId);
      const sortCurrentCompletedJobs = currentUserCompletedJobs.sort((a, b) => b.timeAgo - a.timeAgo);
      setCompletedJobs(sortCurrentCompletedJobs);
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

  const renderJobItem = ({item, index}) => (
    <View key={index}>
      <TouchableOpacity onPress={() => navigation.navigate('myEarningsDetails')}>
        <ExclamationSVG style={styles.infoicon} />
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardLeft}>
            <CustomText text={item.jobTitle} style={styles.jobTitle} />
            <CustomText text={`Work Value ₹${item.salary}`} style={styles.bookingText} />
            {/* platform fee */}
            <CustomText text={`Platform Fee ₹${getPlatformFee(item.salary)}`} style={styles.bookingText} />
            <CustomText text={`Booking ID  #${item.bookingId}`} style={styles.bookingText} />
          </View>
          <View style={styles.cardRight}>
            <CustomText text={formatDateString(item.timeAgo)} style={styles.dateText} />
            <CustomText
              text={`₹${parseFloat(item.salary) - parseFloat(getPlatformFee(item.salary))}`}
              style={styles.salaryText}
            />
          </View>
        </View>
      </View>
      {index < completedJobs.length + 1 && <View style={styles.separator} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent text={'MY EARNINGS'} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : completedJobs.length === 0 ? (
        <View style={styles.emptyInvoiceContainer}>
          <Image source={require('../../assets/empty-earning.png')} style={styles.emptyEarningsImage} />
          <CustomText text={'No earnings yet'} style={styles.emptyInvoiceHeading} />
          <CustomText
            text={'Start applying for works that you can do and earn daily'}
            style={styles.emptyEarningsText}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.jobsContainer}>
            <View>{completedJobs.map((item, index) => renderJobItem({item, index}))}</View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MyEarningScreen;
