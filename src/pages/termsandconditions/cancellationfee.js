import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Color} from '../../assets/static/globalStyles';
import CustomText from '../../atoms/text/textComponent';
import {widthToDp} from '../../responsive/responsive';

const Cancellationpolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Cancellation Policy</Text>
        <Text style={styles.updated}>Last updated August 15, 2024</Text>

        <Text style={styles.paragraph}>1. Time-Based Charges:</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Time Before Service</Text>
            <Text style={styles.tableHeaderText}>Cancellation Fee</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>12-24 Hours</Text>
            <Text style={styles.tableCell}>15% of Service Value</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>6-12 Hours</Text>
            <Text style={styles.tableCell}>20% of Service Value</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>3-6 Hours</Text>
            <Text style={styles.tableCell}>25% of Service Value</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1-3 Hours</Text>
            <Text style={styles.tableCell}>30% of Service Value</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Less than 1 Hour</Text>
            <Text style={styles.tableCell}>40% of Service Value</Text>
          </View>
        </View>

        <Text style={styles.paragraph}>2. Exceptional Circumstances:</Text>
        <Text style={styles.listItem}>
          - Valid Circumstances: Such as documented emergencies, health issues, or unforeseen events.
        </Text>
        <Text style={styles.listItem}>- Cancellation Fee: Waived upon providing valid documentation.</Text>
        <Text style={styles.listItem}>
          - Users will receive a full refund in case of provider-initiated cancellations. ZAAP - Hire or Work Locally
          support team will investigate and act accordingly.
        </Text>

        <Text style={styles.paragraph}>3. Dispute Resolution:</Text>
        <Text style={styles.listItem}>
          - In case of disagreement regarding cancellations, users and providers can engage in good faith communication
          to reach a resolution.
        </Text>
        <Text style={styles.listItem}>
          - If an agreement cannot be reached, users can contact ZAAP - Hire or Work Locally support for mediation.
        </Text>
        <Text style={styles.listItem}>
          - ZAAP - Hire or Work Locally reserves the right to make final decisions based on its review of the situation
          and adherence to this policy.
        </Text>

        <Text style={styles.paragraph}>4. Cancellations after Service Start:</Text>
        <Text style={styles.listItem}>- No refund for services partially completed or fully rendered, unless:</Text>
        <Text style={styles.listItem}>
          - Provider fails to meet agreed-upon service standards and cannot offer reasonable solutions.
        </Text>
        <Text style={styles.listItem}>
          - Service is significantly different from the description provided on the platform.
        </Text>
        <Text style={styles.listItem}>
          - Cancellation is due to unforeseen circumstances outside of either party's control (e.g., medical emergency).
        </Text>

        <Text style={styles.paragraph}>5. Provider-Initiated Cancellations:</Text>
        <Text style={styles.listItem}>
          - Providers must notify users at least 24 hours before the scheduled service start time for any cancellations
          they make.
        </Text>
        <Text style={styles.listItem}>- Reasons for provider cancellations include:</Text>
        <Text style={styles.listItem}>- Unavailability due to illness or emergency.</Text>
        <Text style={styles.listItem}>- Equipment malfunction.</Text>
        <Text style={styles.listItem}>- Unexpected safety concerns.</Text>
        <Text style={styles.listItem}>
          - Users will receive a full refund in case of provider-initiated cancellations.
        </Text>

        <Text style={styles.paragraph}>6. Consequences:</Text>
        <Text style={styles.listItem}>
          - First and Second Offense: A provider who cancels 3 times within a month will receive a warning message
          reminding them of the policy and its consequences. They will also be offered resources on communication best
          practices.
        </Text>
        <Text style={styles.listItem}>
          - Third Offense: Providers who cancel 4 times within a month will face a temporary suspension from 72 hours to
          1 week.
        </Text>
        <Text style={styles.listItem}>
          - Persistent Offenses: Providers who repeatedly violate Tier 2 triggers or accumulate significant negative
          user feedback related to cancellations may be removed from the platform.
        </Text>

        <Text style={styles.paragraph}>7. Policy Updates:</Text>
        <Text style={styles.listItem}>
          - ZAAP - Hire or Work Locally may update this policy periodically to reflect changes in industry standards,
          legal requirements, or platform functionality. Users are advised to stay up-to-date with the latest version of
          the policy.
        </Text>

        <Text style={styles.paragraph}>8. Contacting Support:</Text>
        <Text style={styles.listItem}>
          - If you need assistance with cancellations or wish to discuss a specific situation, please reach out to our
          support team for guidance at <Text style={styles.link}> help@zaapondemand.ca</Text>.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  listItem: {
    lineHeight: 24,
    marginBottom: 5,
    textAlign: 'justify',
    paddingLeft: 15,
    fontWeight: '400',
  },
  link: {
    color: '#1e90ff',
  },
  table: {
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
});

export default Cancellationpolicy;
