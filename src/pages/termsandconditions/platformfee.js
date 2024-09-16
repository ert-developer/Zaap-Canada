import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import {widthToDp} from '../../responsive/responsive';
import {Color} from '../../assets/static/globalStyles';

const Platformfee = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Platform Fee</Text>
        <Text style={styles.updated}>Last updated August 15, 2024</Text>

        <Text style={styles.paragraph}>
          At ZAAP - Hire or Work Locally, we aim to provide a secure, efficient, and transparent platform for connecting
          service providers with clients for on-demand jobs and services. To maintain the platform’s quality, ensure
          smooth operations, and support further development, we charge a platform service fee on all transactions
          between service providers and clients. This fee helps cover operational costs, customer support, payment
          processing, and ongoing improvements to the platform.
        </Text>

        <Text style={styles.header}>Transaction Amount and Service Fees</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Transaction Amount</Text>
            <Text style={styles.tableHeaderText}>Service Fee</Text>
            <Text style={styles.tableHeaderText}>Minimum Fee</Text>
            <Text style={styles.tableHeaderText}>Maximum Fee</Text>
          </View>

          {[
            {amount: 'Up to $100', fee: '10%', minFee: '$5', maxFee: 'None'},
            {amount: '$101 - $499', fee: '9%', minFee: '$5', maxFee: '$40'},
            {amount: '$500 - $999', fee: '8%', minFee: '$40', maxFee: '$80'},
            {amount: '$1,000 - $4,999', fee: '7%', minFee: '$70', maxFee: '$250'},
            {amount: '$5,000 - $9,999', fee: '6%', minFee: '$250', maxFee: '$500'},
            {amount: '$10,000 - $19,999', fee: '5%', minFee: '$500', maxFee: '$1,000'},
            {amount: '$20,000 - $49,999', fee: '4%', minFee: '$800', maxFee: '$1,500'},
            {amount: '$50,000 and above', fee: '3%', minFee: '$1,500', maxFee: '$2,000'},
          ].map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.amount}</Text>
              <Text style={styles.tableCell}>{row.fee}</Text>
              <Text style={styles.tableCell}>{row.minFee}</Text>
              <Text style={styles.tableCell}>{row.maxFee}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.paragraph}>
          We want to ensure you have a seamless experience. Please reach out to our support team if you have any
          concerns at <Text style={styles.link}>help@zaapondemand.in</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: widthToDp(4),
  },
  content: {
    paddingHorizontal: widthToDp(4),
  },
  header: {
    fontSize: widthToDp(6),
    fontWeight: 'bold',
    color: Color.colorIndigo,
    marginVertical: widthToDp(2),
  },
  updated: {
    fontSize: widthToDp(4),
    fontWeight: 'bold',
    marginVertical: widthToDp(2),
  },
  paragraph: {
    marginVertical: widthToDp(2),
    textAlign: 'justify',
    fontWeight: '400',
  },
  table: {
    marginVertical: widthToDp(2),
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  link: {
    color: '#1e90ff',
  },
});

export default Platformfee;
