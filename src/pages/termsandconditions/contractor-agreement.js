import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';

const ContractorAgreement = () => {
  return (
    <ScrollView>
      <View>
        <Text style={styles.paragraph}>
          This Independent Contractor Agreement (“Agreement”) is made and entered into as of the date the Contractor’s
          account is accepted for a ‘Service Provider’ account on the ZAAP - Hire or Work Locally platform, by and
          between ZAAP - Hire or Work Locally, located at Hyderabad, Telangana, India (“Company”), and the individual or
          entity registering as a service provider on the ZAAP - Hire or Work platform (“Contractor”).
        </Text>

        <Text style={styles.sectionTitle}>1. SERVICES</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>1.1 Nature of Services. </Text>
          The Contractor agrees to provide specific services (“Services”) as requested by users of the ZAAP - Hire or
          Work Locally platform (“Clients”). Each engagement will be treated as a separate and independent contractual
          relationship between the Contractor and the Client.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>1.2 Scope of Work. </Text>
          The Contractor will perform the Services in accordance with the specifications and requirements provided by
          the Client through the ZAAP - Hire or Work Locally platform. The Contractor is responsible for the quality and
          completion of the Services.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>1.3 No Employment Relationship. </Text>
          The Contractor acknowledges that they are not an employee of ZAAP - Hire or Work Locally. The Contractor is an
          independent contractor and is solely responsible for their own work and business operations.
        </Text>

        <Text style={styles.sectionTitle}>2. TERM AND TERMINATION</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>2.1 Term. </Text>
          This Agreement shall commence on the date the Contractor’s account is accepted for a ‘Service Provider’
          account on the ZAAP - Hire or Work Locally platform and shall continue until terminated by either party.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>2.2 Termination. </Text>
          ZAAP - Hire or Work Locally may terminate this Agreement immediately if the Contractor breaches any material
          term of this Agreement. The Contractor may terminate this Agreement by providing written notice to ZAAP - Hire
          or Work Locally.
        </Text>

        <Text style={styles.sectionTitle}>3. COMPENSATION</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>3.1 Payment. </Text>
          The Contractor shall be paid through the ZAAP - Hire or Work Locally platform as per the agreed terms for each
          job or service provided.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>3.2 Platform Fees. </Text>
          ZAAP - Hire or Work Locally may deduct a service fee from the Contractor's earnings as outlined in the ZAAP -
          Hire or Work Locally platform’s terms of service.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>3.3 Taxes and Expenses. </Text>
          The Contractor is solely responsible for all taxes, insurance, and other expenses related to their services.
          ZAAP - Hire or Work Locally will not withhold any taxes or provide any benefits to the Contractor.
        </Text>

        <Text style={styles.sectionTitle}>4. INDEPENDENT CONTRACTOR STATUS</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>4.1 Independent Contractor. </Text>
          The Contractor acknowledges that they are an independent contractor and not an employee, agent, or partner of
          ZAAP - Hire or Work Locally. The Contractor has no authority to bind ZAAP - Hire or Work Locally or act on its
          behalf.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>4.2 No Benefits. </Text>
          As an independent contractor, the Contractor is not entitled to any benefits provided by ZAAP - Hire or Work
          Locally to its employees, including but not limited to health insurance, retirement benefits, or paid leave.
        </Text>

        <Text style={styles.sectionTitle}>5. CONFIDENTIALITY</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>5.1 Confidential Information. </Text>
          The Contractor agrees to keep all confidential and proprietary information of ZAAP - Hire or Work Locally and
          its Clients secure and not to disclose such information to any third party without prior written consent.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>5.2 Use of Information. </Text>
          The Contractor may only use confidential information for the purpose of providing the Services. The Contractor
          shall return or destroy all such information upon termination of this Agreement or upon request by ZAAP - Hire
          or Work Locally.
        </Text>

        <Text style={styles.sectionTitle}>6. INTELLECTUAL PROPERTY</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>6.1 Ownership. </Text>
          Any work product or intellectual property created by the Contractor during the performance of the Services
          shall be owned by the Client for whom the work was performed.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>6.2 License. </Text>
          If applicable, the Contractor grants ZAAP - Hire or Work Locally a non-exclusive, royalty-free license to use
          any intellectual property created during the provision of Services to the extent necessary for the operation
          of the ZAAP - Hire or Work Locally platform.
        </Text>

        <Text style={styles.sectionTitle}>7. WARRANTIES AND REPRESENTATIONS</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>7.1 Quality of Services. </Text>
          The Contractor warrants that all Services will be performed with professional skill, care, and diligence in
          accordance with industry standards.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>7.2 Compliance with Laws. </Text>
          The Contractor represents that they will comply with all applicable laws, regulations, and codes of conduct in
          the performance of the Services.
        </Text>

        <Text style={styles.sectionTitle}>8. LIABILITY AND INDEMNIFICATION</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>8.1 Liability. </Text>
          The Contractor shall be liable for any damage or loss caused by their negligence or breach of this Agreement.
          ZAAP - Hire or Work Locally shall not be liable for any claims, damages, or liabilities arising from the
          Contractor’s performance of the Services.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>8.2 Indemnification. </Text>
          The Contractor agrees to indemnify and hold harmless ZAAP - Hire or Work Locally from any claims, damages, or
          liabilities arising out of or related to the Contractor’s Services, including any breach of this Agreement.
        </Text>

        <Text style={styles.sectionTitle}>9. DISPUTE RESOLUTION</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>9.1 Governing Law. </Text>
          This Agreement shall be governed by and construed in accordance with the laws of India.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>9.2 Dispute Resolution. </Text>
          Any disputes arising out of or related to this Agreement shall be resolved through Informal Negotiations and
          Arbitration in Hyderabad, India. The parties agree to first engage in good faith informal negotiations before
          proceeding to arbitration.
        </Text>

        <Text style={styles.sectionTitle}>10. GENERAL PROVISIONS</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>10.1 Entire Agreement. </Text>
          This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements or
          understandings, whether written or oral, related to the subject matter hereof.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>10.2 Amendments. </Text>
          Any amendments or modifications to this Agreement must be made in writing and signed by both parties.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>10.3 Severability. </Text>
          If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall
          remain in full force and effect.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>10.4 Assignment. </Text>
          The Contractor may not assign or transfer any rights or obligations under this Agreement without the prior
          written consent of ZAAP - Hire or Work Locally.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>10.5 Notices. </Text>
          Any notices required under this Agreement shall be delivered to the respective parties at the addresses
          provided during the account registration process or such other address as may be specified in writing.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>10.6 Force Majeure. </Text>
          Neither party shall be liable for any failure to perform its obligations under this Agreement if such failure
          is due to circumstances beyond its reasonable control, including but not limited to natural disasters,
          pandemics, or other unforeseeable events.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subSection}>10.7 Electronic Communication. </Text>
          Notices and agreements related to this Agreement may be conducted electronically through the ZAAP - Hire or
          Work Locally platform, and such electronic communications shall be deemed to be in writing.
        </Text>

        <Text style={styles.paragraph}>
          IN WITNESS WHEREOF, the parties hereto have accepted this Independent Contractor Agreement as of the date the
          Contractor’s account is accepted for a ‘Service Provider’ account on the ZAAP - Hire or Work Locally platform.
        </Text>

        <Text style={styles.paragraph}>
          HOW CAN YOU CONTACT US ABOUT THIS NOTICE? If you have questions or comments about this notice, you may contact
          our support team by email at help@zaapondemand.in
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#464183',
  },
  sectionTitle: {
    color: Color.colorIndigo,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_13,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: Margin.m_8,
  },
  subSection: {
    color: Color.colorIndigo,
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  paragraph: {
    color: Color.colorBlack,
    textAlign: 'justify',
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_12,
    fontWeight: '300',
    marginBottom: Margin.m_8,
  },
});

export default ContractorAgreement;
