import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, ScrollView, Dimensions} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import HeaderComponent from '../../atoms/header/headerComponent';
import InvoiceDetailStyles from './invoice-detail-styles';
import {getJobDetails} from '../../common/collection';
import {getUserDetails} from '../../common/collection';
import {useRoute} from '@react-navigation/native';
import {getPlatformFee} from '../../common/platformFee';
import {envConfig} from '../../assets/helpers/envApi';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const InvoiceDetailScreen = ({navigation}) => {
  const route = useRoute();
  const {jobId} = route.params;
  const styles = InvoiceDetailStyles();

  const fetchInvoiceDetails = async () => {
    const invoiceDetails = await getJobDetails(envConfig.completedJobs, jobId);
    return invoiceDetails;
  };

  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    fetchInvoiceDetails().then(invoiceDetails => {
      setInvoiceDetails(invoiceDetails);
    });
  }, []);

  const fetchUserDetails = async () => {
    const userDetails = await getUserDetails(envConfig.User, invoiceDetails.candidateUserId);
    return userDetails;
  };
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (invoiceDetails) {
      fetchUserDetails().then(userDetails => {
        setUserDetails(userDetails);
      });
    }
  }, [invoiceDetails]);

  // console.log('userDetails', userDetails);

  const formatDateString = date => {
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    const dateParts = new Date(date).toLocaleDateString('en-GB', options).split(' ');
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  if (!invoiceDetails || !userDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomText text="Loading..." />
      </SafeAreaView>
    );
  }

  const platformFee = getPlatformFee(invoiceDetails.salary);
  const totalAmount = parseFloat(invoiceDetails.salary) + parseFloat(platformFee);

  return (
    <>
      <HeaderComponent text={'INVOICE DETAILS'} />
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.containerWithShadow}>
            <View style={styles.invoiceContainer}>
              <View style={styles.headerRow}>
                <Image style={styles.logo} source={require('../../assets/invoice-logo.png')} />
                <View style={styles.invoiceLabelContainer}>
                  <Text style={styles.invoiceNumberText}>INVOICE</Text>
                </View>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.leftColumn}>
                  <View style={styles.infoRow}>
                    <Text style={styles.labelTextBold}>From:</Text>
                    {/* <Text style={styles.addressText}>{invoiceDetails.customerName}</Text> */}
                    <Text style={styles.addressText}>ZAAPR Online services Pvt. Ltd, Ontario, Canada</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.labelTextBold}>Bill to:</Text>
                    <Text style={styles.addressText}>{userDetails.displayName}</Text>
                  </View>
                </View>
                <View style={styles.rightColumn}>
                  <View style={styles.infoRow}>
                    <Text style={styles.labelTextBold}>INVOICE NUMBER:</Text>
                    <Text style={styles.addressText}>#{invoiceDetails.invoiceId}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.labelTextBold}>BOOKING ID:</Text>
                    <Text style={styles.addressText}>{invoiceDetails.bookingId}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.labelTextBold}>INVOICE DATE:</Text>
                    <Text style={styles.addressText}>{formatDateString(invoiceDetails.timeAgo)}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.itemList}>
                <View style={styles.itemHeader}>
                  <Text style={styles.headerText}>Service Category</Text>
                  <Text style={styles.headerText}>Amount</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemText}>{invoiceDetails.jobTitle || 'Job Title'}</Text>
                  <Text style={styles.amountText}>${invoiceDetails.salary || '1000'}</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemText}>Platform Fee</Text>
                  <Text style={styles.amountText}>${platformFee || '99'}</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemText}>Total Amount</Text>
                  <Text style={styles.amountText}>${totalAmount || '1099'}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default InvoiceDetailScreen;
