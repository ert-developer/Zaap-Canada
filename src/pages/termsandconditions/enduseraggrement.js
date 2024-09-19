import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import {widthToDp} from '../../responsive/responsive';
import {Color} from '../../assets/static/globalStyles';

const EndUserAgreement = () => {
  return (
    <ScrollView style={styles.container}>
      <CustomText text={'Independent Contractor Agreement'} style={styles.termsCondtionsHeading} />
      <CustomText text={'Last updated August 15, 2024'} style={styles.updated} />

      <CustomText text={'1. SERVICES'} style={styles.heading} />
      <CustomText
        text={
          '   1.1 Nature of Services. The Contractor agrees to provide specific services (“Services”) as requested by users of the ZAAP - Hire or Work Locally platform (“Clients”). Each engagement will be treated as a separate and independent contractual relationship between the Contractor and the Client.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   1.2 Scope of Work. The Contractor will perform the Services in accordance with the specifications and requirements provided by the Client through the ZAAP - Hire or Work Locally platform. The Contractor is responsible for the quality and completion of the Services.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   1.3 No Employment Relationship. The Contractor acknowledges that they are not an employee of ZAAP - Hire or Work Locally. The Contractor is an independent contractor and is solely responsible for their own work and business operations.'
        }
        style={styles.paragraph}
      />

      <CustomText text={'2. TERM AND TERMINATION'} style={styles.heading} />
      <CustomText
        text={
          '   2.1 Term. This Agreement shall commence on the date the Contractorʼs account is accepted for a ‘Service Providerʼ account on the ZAAP - Hire or Work Locally platform and shall continue until terminated by either party.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   2.2 Termination. ZAAP - Hire or Work Locally may terminate this Agreement immediately if the Contractor breaches any material term of this Agreement. The Contractor may terminate this Agreement by providing written notice to ZAAP - Hire or Work Locally.'
        }
        style={styles.paragraph}
      />

      <CustomText text={'3. COMPENSATION'} style={styles.heading} />
      <CustomText
        text={
          '   3.1 Payment. The Contractor shall be paid through the ZAAP - Hire or Work Locally platform as per the agreed terms for each job or service provided.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "   3.2 Platform Fees. ZAAP - Hire or Work Locally may deduct a service fee from the Contractor's earnings as outlined in the ZAAP - Hire or Work Locally platformʼs terms of service."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   3.3 Taxes and Expenses. The Contractor is solely responsible for all taxes, insurance, and other expenses related to their services. ZAAP - Hire or Work Locally will not withhold any taxes or provide any benefits to the Contractor.'
        }
        style={styles.paragraph}
      />

      <CustomText text={'4. INDEPENDENT CONTRACTOR STATUS'} style={styles.heading} />
      <CustomText
        text={
          '   4.1 Independent Contractor. The Contractor acknowledges that they are an independent contractor and not an employee, agent, or partner of ZAAP - Hire or Work Locally. The Contractor has no authority to bind ZAAP - Hire or Work Locally or act on its behalf.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   4.2 No Benefits. As an independent contractor, the Contractor is not entitled to any benefits provided by ZAAP - Hire or Work Locally to its employees, including but not limited to health insurance, retirement benefits, or paid leave.'
        }
        style={styles.paragraph}
      />

      <CustomText text={'5. CONFIDENTIALITY'} style={styles.heading} />
      <CustomText
        text={
          '   5.1 Confidential Information. The Contractor agrees to keep all confidential and proprietary information of ZAAP - Hire or Work Locally and its Clients secure and not to disclose such information to any third party without prior written consent.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   5.2 Use of Information. The Contractor may only use confidential information for the purpose of providing the Services. The Contractor shall return or destroy all such information upon termination of this Agreement or upon request by ZAAP - Hire or Work Locally.'
        }
        style={styles.paragraph}
      />

      <CustomText text={'6. INTELLECTUAL PROPERTY'} style={styles.heading} />
      <CustomText
        text={
          '   6.1 Ownership. Any work product or intellectual property created by the Contractor during the performance of the Services shall be owned by the Client for whom the work was performed.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   6.2 License. If applicable, the Contractor grants ZAAP - Hire or Work Locally a non-exclusive, royalty-free license to use any intellectual property created during the provision of Services to the extent necessary for the operation of the ZAAP - Hire or Work Locally platform.'
        }
        style={styles.paragraph}
      />

      <CustomText text={'7. WARRANTIES AND REPRESENTATIONS'} style={styles.heading} />
      <CustomText
        text={
          '   7.1 Quality of Services. The Contractor warrants that all Services will be performed with professional skill, care, and diligence in accordance with industry standards.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   7.2 Compliance with Laws. The Contractor represents that they will comply with all applicable laws, regulations, and codes of conduct in the performance of the Services.'
        }
        style={styles.paragraph}
      />

      <CustomText text={'8. LIABILITY AND INDEMNIFICATION'} style={styles.heading} />
      <CustomText
        text={
          '   8.1 Liability. The Contractor shall be liable for any damage or loss caused by their negligence or breach of this Agreement. ZAAP - Hire or Work Locally shall not be liable for any claims, damages, or liabilities arising from the Contractorʼs performance of the Services.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   8.2 Indemnification. The Contractor agrees to indemnify and hold harmless ZAAP - Hire or Work Locally from any claims, damages, or liabilities arising out of or related to the Contractorʼs Services, including any breach of this Agreement.'
        }
        style={styles.paragraph}
      />

      <CustomText text={'9. DISPUTE RESOLUTION'} style={styles.heading} />
      <CustomText
        text={
          '   9.1 Governing Law. This Agreement shall be governed by and construed in accordance with the laws of CANADA.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   9.2 Dispute Resolution. Any disputes arising out of or related to this Agreement shall be resolved through Informal Negotiations and Arbitration in Toronto, Canada. The parties agree to first engage in good faith informal negotiations before proceeding to arbitration.'
        }
        style={styles.paragraph}
      />

      <CustomText text={'10. GENERAL PROVISIONS'} style={styles.heading} />
      <CustomText
        text={
          '   10.1 Entire Agreement. This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements or understandings, whether written or oral, related to the subject matter hereof.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   10.2 Amendments. Any amendments or modifications to this Agreement must be made in writing and signed by both parties.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   10.3 Severability. If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   10.4 Assignment. The Contractor may not assign or transfer any rights or obligations under this Agreement without the prior written consent of ZAAP - Hire or Work Locally.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   10.4 Notices. Any notices required under this Agreement shall be delivered to the respective parties at the addresses provided during the account registration process or such other address as may be specified in writing.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   10.5 Force Majeure. Neither party shall be liable for any failure to perform its obligations under this Agreement if such failure is due to circumstances beyond its reasonable control, including but not limited to natural disasters, pandemics, or other unforeseeable events.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '   10.6 Electronic Communication. Notices and agreements related to this Agreement may be conducted electronically through the ZAAP - Hire or Work Locally platform, and such electronic communications shall be deemed to be in writing.'
        }
        style={styles.paragraph}
      />

      <CustomText
        text={
          'IN WITNESS WHEREOF, the parties hereto have accepted this Independent Contractor Agreement as of the date the Contractorʼs account is accepted for a ‘Service Providerʼ account on the ZAAP - Hire or Work Locally platform.'
        }
        style={styles.paragraph}
      />

      <CustomText text={'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?'} style={styles.heading} />
      <CustomText
        text={
          'If you have questions or comments about this notice, you may contact our support team by email at help@zaapondemand.ca'
        }
        style={styles.paragraph}
      />
      <CustomText text={''} style={styles.paragraph} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  termsCondtionsHeading: {
    fontSize: widthToDp(6),
    fontWeight: 'bold',
    color: Color.colorIndigo,
    marginVertical: widthToDp(2),
  },
  heading: {
    fontSize: widthToDp(4),
    fontWeight: 'bold',
    color: Color.colorIndigo,
    marginVertical: widthToDp(2),
  },
  paragraph: {
    marginVertical: widthToDp(2),
    textAlign: 'justify',
    fontWeight: '400',
  },
  updated: {
    fontSize: widthToDp(4),
    fontWeight: 'bold',
    marginVertical: widthToDp(2),
  },
});

export default EndUserAgreement;
