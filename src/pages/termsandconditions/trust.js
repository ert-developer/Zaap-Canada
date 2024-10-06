import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {Color} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';

const Trustandsafety = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Trust & Safety</Text>
      <Text style={styles.updated}>Last updated August 15, 2024</Text>

      <Text style={styles.paragraph}>
        At ZAAP - Hire or Work Locally, ensuring a secure and reliable experience for our users is our top priority. Our
        Trust and Safety policy is designed to protect both customers and service providers, promote positive
        interactions, and maintain the integrity of our platform.
      </Text>

      <Text style={styles.paragraph}>1. Safe Interactions and Transactions</Text>
      <Text style={styles.listItem}>
        ● Verified Accounts: ZAAP - Hire or Work Locally verifies user accounts by requiring identity documentation from
        service providers to enhance trust and credibility.
      </Text>
      <Text style={styles.listItem}>
        ● Secure Payments: All transactions on ZAAP - Hire or Work Locally are processed securely through trusted
        payment gateways, ensuring that your financial information is protected.
      </Text>
      <Text style={styles.listItem}>
        ● Privacy Protection: Your personal data is safeguarded according to our Privacy Policy, and sensitive
        information is not shared without consent.
      </Text>

      <Text style={styles.paragraph}>2. User Accountability and Reviews</Text>
      <Text style={styles.listItem}>
        ● Transparent Reviews: ZAAP - Hire or Work Locally encourages honest feedback through our review system. Users
        can rate and review service providers and customers, promoting accountability and trustworthiness.
      </Text>
      <Text style={styles.listItem}>
        ● Behavior Monitoring: We actively monitor interactions to detect and address fraudulent activity, harassment,
        and other policy violations.
      </Text>

      <Text style={styles.paragraph}>3. Reporting Issues and Disputes</Text>
      <Text style={styles.listItem}>
        ● Easy Reporting: If you encounter inappropriate behavior, fraud, or other concerns, you can report it directly
        through our platform. Our reporting tools are accessible and user-friendly.
      </Text>
      <Text style={styles.listItem}>
        ● Responsive Support: Our support team is dedicated to investigating reported issues promptly and taking
        appropriate action, whether it’s content removal, account suspension, or dispute mediation.
      </Text>

      <Text style={styles.paragraph}>4. Safety Guidelines for Users</Text>
      <Text style={styles.listItem}>
        ● Communication Best Practices: We recommend keeping all communications within the ZAAP - Hire or Work Locally
        platform. Avoid sharing personal contact information or conducting transactions outside of the platform.
      </Text>
      <Text style={styles.listItem}>
        ● Vetting Service Providers: Customers are encouraged to review profiles, ratings, and previous work before
        hiring a service provider.
      </Text>
      <Text style={styles.listItem}>
        ● Service Providers’ Safety: Service providers should carefully review job details and only accept projects they
        are comfortable with. Reporting suspicious job listings is essential for community safety.
      </Text>

      <Text style={styles.paragraph}>5. Prohibited Activities</Text>
      <Text style={styles.listItem}>
        ● Fraud and Scams: ZAAP - Hire or Work Locally strictly prohibits fraudulent activities, including deceptive
        practices, false advertising, and payment scams.
      </Text>
      <Text style={styles.listItem}>
        ● Harassment and Abuse: Harassment, bullying, or any form of abuse is not tolerated. Such behavior will lead to
        immediate action, including account suspension or termination.
      </Text>

      <Text style={styles.paragraph}>6. Enforcement and Penalties</Text>
      <Text style={styles.listItem}>
        ● Policy Violations: Violations of our Trust and Safety policies may result in penalties, including temporary
        suspension, permanent account termination, or legal action, depending on the severity of the offense.
      </Text>
      <Text style={styles.listItem}>
        ● Appeal Process: Users who believe they were unfairly penalized can appeal by contacting our support team,
        where we’ll review the situation thoroughly.
      </Text>

      <Text style={styles.paragraph}>7. Commitment to Continuous Improvement</Text>
      <Text style={styles.listItem}>
        ● Ongoing Enhancements: ZAAP - Hire or Work Locally is committed to continuously improving our safety measures
        by updating our tools, technology, and guidelines based on user feedback and emerging risks.
      </Text>

      <Text style={styles.paragraph}>
        At ZAAP - Hire or Work Locally, trust and safety are at the heart of our platform. We are committed to providing
        a secure, reliable, and transparent environment for all our users. By following these guidelines and engaging
        responsibly, both customers and service providers can enjoy a positive experience on ZAAP - Hire or Work
        Locally. Should you have any concerns or encounter any issues, our support team is always here to assist you{' '}
        \n\nTogether, we can build a trusted community where everyone thrives.
      </Text>
      <Text>{'  '}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: widthToDp(4),
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

export default Trustandsafety;
