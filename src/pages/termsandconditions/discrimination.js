import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Color} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';

const Antidiscrimination = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>ZAAP Anti-Discrimination Policy</Text>
        <Text style={styles.updated}>Last updated August 15, 2024</Text>

        <Text style={styles.paragraph}>
          At ZAAP - Hire or Work Locally, we are committed to fostering an inclusive and respectful environment for all
          users, whether they are service providers, customers, or visitors to our platform. Discrimination of any kind
          will not be tolerated and is strictly prohibited.
        </Text>

        <Text style={styles.paragraph}>1. Zero Tolerance for Discrimination</Text>
        <Text style={styles.listItem}>
          - Discrimination on the basis of race, ethnicity, religion, gender, sexual orientation, disability, age,
          nationality, or any other protected characteristic is strictly forbidden on ZAAP - Hire or Work Locally. This
          applies to all interactions, including job listings, service descriptions, communication between users,
          reviews, and any other activities conducted on the platform.
        </Text>

        <Text style={styles.paragraph}>2. User Conduct Expectations</Text>
        <Text style={styles.listItem}>All ZAAP - Hire or Work Locally users are expected to:</Text>
        <Text style={styles.listItem}>- Treat others with respect and dignity.</Text>
        <Text style={styles.listItem}>
          - Avoid language or behavior that is offensive, discriminatory, or exclusionary.
        </Text>
        <Text style={styles.listItem}>
          - Refrain from posting content that could be perceived as discriminatory or hateful.
        </Text>

        <Text style={styles.paragraph}>3. Prohibited Actions</Text>
        <Text style={styles.listItem}>
          The following actions are strictly prohibited on ZAAP - Hire or Work Locally:
        </Text>
        <Text style={styles.listItem}>- Posting discriminatory job listings, service ads, or communications.</Text>
        <Text style={styles.listItem}>- Refusing to work with or hire someone based on discriminatory reasons.</Text>
        <Text style={styles.listItem}>
          - Leaving reviews or feedback that include discriminatory language or biases.
        </Text>
        <Text style={styles.listItem}>- Engaging in any form of harassment or hate speech.</Text>

        <Text style={styles.paragraph}>4. Reporting and Consequences</Text>
        <Text style={styles.listItem}>
          - If you encounter or experience discrimination on ZAAP - Hire or Work Locally, you can report it directly
          through our platform’s reporting tools or contact our support team. We take all reports seriously and will
          investigate them promptly. Violations of this policy may result in:
        </Text>
        <Text style={styles.listItem}>- Content removal or editing.</Text>
        <Text style={styles.listItem}>- Temporary suspension of the user’s account.</Text>
        <Text style={styles.listItem}>- Permanent account termination for repeated or severe violations.</Text>

        <Text style={styles.paragraph}>5. Commitment to Diversity and Inclusion</Text>
        <Text style={styles.listItem}>
          At ZAAP - Hire or Work Locally, we believe in fostering a diverse and inclusive community where everyone is
          treated with respect and dignity. We are dedicated to upholding this Anti-Discrimination Policy to ensure a
          fair and welcoming platform for all. If you experience or witness any form of discrimination, please report it
          to our support team. Together, we can create a space where everyone has the opportunity to succeed, free from
          bias or prejudice.
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
});

export default Antidiscrimination;
