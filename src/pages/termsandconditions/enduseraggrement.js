import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import {widthToDp} from '../../responsive/responsive';
import {Color} from '../../assets/static/globalStyles';

const Enduseraggrement = () => {
  return (
    <ScrollView style={styles.container}>
      <CustomText text={'End User Agreement'} style={styles.termsCondtionsHeading} />
      <CustomText text={'Last updated August 15, 2024'} />
      <CustomText
        text={`ZAAP - Hire or Work Locally is licensed to You (End-User) by Zaapr Online Services Private Limited, located and registered at Hyderabad, Telangana, India ('Licensor'), for use only under the terms of this Licence Agreement.`}
        style={styles.paragraph}
      />
      <CustomText
        text={
          "By downloading the Licensed Application from Apple's software distribution platform ('App Store') and Google's software distribution platform ('Play Store'), and any update thereto (as permitted by this Licence Agreement), You indicate that You agree to be bound by all of the terms and conditions of this Licence Agreement, and that You accept this Licence Agreement. App Store and Play Store are referred to in this Licence Agreement as 'Services'."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'The parties of this Licence Agreement acknowledge that the Services are not a Party to this Licence Agreement and are not bound by any provisions or obligations with regard to the Licensed Application, such as warranty, liability, maintenance and support thereof. Zaapr Online Services Private Limited, not the Services, is solely responsible for the Licensed Application and the content thereof.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "This Licence Agreement may not provide for usage rules for the Licensed Application that are in conflict with the latest Apple Media Services Terms and Conditions and Google Play Terms of Service ('Usage Rules').Zaapr Online Services Private Limited acknowledges that it had the opportunity to review the Usage Rules and this Licence Agreement is not conflicting with them."
        }
        style={styles.paragraph}
      />

      <CustomText
        text={
          "ZAAP - Hire or Work Locally when purchased or downloaded through the Services, is licensed to You for use only under the terms of this Licence Agreement. The Licensor reserves all rights not expressly granted to You. ZAAP - Hire or Work Locally is to be used on devices that operate with Apple's operating systems ('iOS' and 'Mac OS') or Google's operating system ('Android')."
        }
        style={styles.paragraph}
      />

      <CustomText text={'Table of Contents'} style={styles.heading} />
      <View style={styles.list}>
        <CustomText text={'1. THE APPLICATION'} style={styles.paragraph} />
        <CustomText text={'2. SCOPE OF LICENCE'} style={styles.paragraph} />
        <CustomText text={'3. TECHNICAL REQUIREMENTS'} style={styles.paragraph} />
        <CustomText text={'4. MAINTENANCE AND SUPPORT'} style={styles.paragraph} />
        <CustomText text={'6. USER-GENERATED CONTRIBUTIONS'} style={styles.paragraph} />
        <CustomText text={'7. CONTRIBUTION LICENCE'} style={styles.paragraph} />
        <CustomText text={'8. LIABILITY'} style={styles.paragraph} />
        <CustomText text={'9. WARRANTY'} style={styles.paragraph} />
        <CustomText text={'10. PRODUCT CLAIMS'} style={styles.paragraph} />
        <CustomText text={'11. LEGAL COMPLIANCE'} style={styles.paragraph} />
        <CustomText text={'12. CONTACT INFORMATION'} style={styles.paragraph} />
        <CustomText text={'13. TERMINATION'} style={styles.paragraph} />
        <CustomText text={'14. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY'} style={styles.paragraph} />
        <CustomText text={'15. INTELLECTUAL PROPERTY RIGHTS'} style={styles.paragraph} />
        <CustomText text={'16. APPLICABLE LAW'} style={styles.paragraph} />
        <CustomText text={'17. MISCELLANEOUS'} style={styles.paragraph} />
      </View>

      <CustomText text={'1. THE APPLICATION'} style={styles.heading} />
      <CustomText
        text={`ZAAP - Hire or Work Locally ('Licensed Application') is a piece of software created to connect customers with service providers for a wide range of on-demand jobs and services. The platform allows customers to find and hire professionals within their budget, while service providers can discover job opportunities in their local area and work according to their skills and availability. The application streamlines the process of finding and providing services, ensuring a convenient and efficient experience for both parties.`}
        style={styles.paragraph}
      />

      <CustomText text={'2. SCOPE OF LICENCE'} style={styles.heading} />
      <CustomText
        text={`2.1 You are given a non-transferable, non-exclusive, non-sublicensable licence to install and use the Licensed Application on any Devices that You (End-User) own or control and as permitted by the Usage Rules, with the exception that such Licensed Application may be accessed and used by other accounts associated with You (End-User, The Purchaser) via Family Sharing or volume purchasing.`}
        style={styles.paragraph}
      />
      <CustomText
        text={
          '2.2 This licence will also govern any updates of the Licensed Application provided by Licensor that replace, repair, and/or supplement the first Licensed Application, unless a separate licence is provided for such update, in which case the terms of that new licence will govern.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "2.3 You may not share or make the Licensed Application available to third parties (unless to the degree allowed by the Usage Rules, and with Zaapr Online Services Private Limited's prior written consent), sell, rent, lend, lease or otherwise redistribute the Licensed Application."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "2.4 You may not reverse engineer, translate, disassemble, integrate, decompile, remove, modify, combine, create derivative works or updates of, adapt, or attempt to derive the source code of the Licensed Application, or any part thereof (except with Zaapr Online Services Private Limited's prior written consent)."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '2.5 You may not copy (excluding when expressly authorised by this licence and the Usage Rules) or alter the Licensed Application or portions thereof. You may create and store copies only on devices that You own or control for backup keeping under the terms of this licence, the Usage Rules, and any other terms and conditions that apply to the device or software used. You may not remove any intellectual property notices. You acknowledge that no unauthorised third parties may gain access to these copies at any time. If you sell your Devices to a third party, you must remove the Licensed Application from the Devices before doing so.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '2.6 Violations of the obligations mentioned above, as well as the attempt of such infringement, may be subject to prosecution and damages.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={'2.7 Licensor reserves the right to modify the terms and conditions of licensing.'}
        style={styles.paragraph}
      />
      <CustomText
        text={
          '2.8 Nothing in this licence should be interpreted to restrict third-party terms. When using the Licensed Application, You must ensure that You comply with applicable thirdparty terms and conditions.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'3. TECHNICAL REQUIREMENTS'} style={styles.heading} />
      <CustomText
        text={
          '3.1 The Licensed Application requires a firmware version 1.0.0 or higher. Licensor recommends using the latest version of the firmware.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '3.2 Licensor attempts to keep the Licensed Application updated so that it complies with modified/new versions of the firmware and new hardware. You are not granted rights to claim such an update.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '3.3 You acknowledge that it is Your responsibility to confirm and determine that the app end-user device on which You intend to use the Licensed Application satisfies the technical specifications mentioned above.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '3.4 Licensor reserves the right to modify the technical specifications as it sees appropriate at any time.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'4. MAINTENANCE AND SUPPORT'} style={styles.heading} />
      <CustomText
        text={
          '4.1 The Licensor is solely responsible for providing any maintenance and support services for this Licensed Application. You can reach the Licensor at the email address listed in the App Store or Play Store Overview for this Licensed Application.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '4.2 Zaapr Online Services Private Limited and the End-User acknowledge that the Services have no obligation whatsoever to furnish any maintenance and support services with respect to the Licensed Application.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'5. USE OF DATA'} style={styles.heading} />
      <CustomText
        text={
          "You acknowledge that Licensor will be able to access and adjust Your downloaded Licensed Application content and Your personal information, and that Licensor's use of such material and information is subject to Your legal agreements with Licensor and Licensor's privacy policy: http://www.zaapondemand.in/privacy."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'You acknowledge that the Licensor may periodically collect and use technical data and related information about your device, system, and application software, and peripherals, offer product support, facilitate the software updates, and for purposes of providing other services to you (if any) related to the Licensed Application. Licensor may also use this information to improve its products or to provide services or technologies to you, as long as it is in a form that does not personally identify you.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'6. USER-GENERATED CONTRIBUTIONS'} style={styles.heading} />
      <CustomText
        text={
          "The Licensed Application may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or in the Licensed Application, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, 'Contributions'). Contributions may be viewable by other users of the Licensed Application and through third-party websites or applications. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any"
        }
        style={styles.paragraph}
      />
      <CustomText text={'Contributions, you thereby represent and warrant that: '} style={styles.paragraph} />
      <CustomText
        text={
          '1. The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '2. You are the creator and owner of or have the necessary licences, rights, consents, releases, and permissions to use and to authorise us, the Licensed Application, and other users of the Licensed Application to use your Contributions in any manner contemplated by the Licensed Application and this Licence Agreement.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '3. You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness or each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Licensed Application and this Licence Agreement.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'4. Your Contributions are not false, inaccurate, or misleading.'} style={styles.paragraph} />
      <CustomText
        text={
          '5. Your Contributions are not unsolicited or unauthorised advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '6. Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libellous, slanderous, or otherwise objectionable (as determined by us).'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={'7. Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone'}
        style={styles.paragraph}
      />
      <CustomText
        text={
          '8. Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={'9. Your Contributions do not violate any applicable law, regulation, or rule.'}
        style={styles.paragraph}
      />
      <CustomText
        text={'10. Your Contributions do not violate the privacy or publicity rights of any third party.'}
        style={styles.paragraph}
      />
      <CustomText
        text={
          '11. Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.'
        }
        style={styles.paragraph}
      />
      <CustomText
        tex={
          '12. Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '13. Your Contributions do not otherwise violate, or link to material that violates, any provision of this Licence Agreement, or any applicable law or regulation.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'Any use of the Licensed Application in violation of the foregoing violates this Licence Agreement and may result in, among other things, termination or suspension of your rights to use the Licensed Application.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'7. CONTRIBUTION LICENCE'} style={styles.heading} />
      <CustomText
        text={
          'By posting your Contributions to any part of the Licensed Application or making Contributions accessible to the Licensed Application by linking your account from the Licensed Application to any of your social networking accounts, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to host, use copy, reproduce, disclose, sell, resell, publish, broad cast, retitle, archive, store, cache, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial advertising, or otherwise, and to prepare derivative works of, or incorporate in other works, such as Contributions, and grant and authorise sublicences of the foregoing. The use and distribution may occur in any media formats and through any media channels.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'This licence will apply to any form, media, or technology now known or hereafter developed, and includes our use of your name, company name, and franchise name, as applicable, and any of the trademarks, service marks, trade names, logos, and personal and commercial images you provide. You waive all moral rights in your Contributions, and you warrant that moral rights have not otherwise been asserted in your Contributions.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area in the Licensed Application. You are solely responsible for your Contributions to the Licensed Application and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to recategorise any Contributions to place them in more appropriate locations in the Licensed Application; and (3) to prescreen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'8. LIABILITY'} style={styles.heading} />
      <CustomText
        text={
          "8.1 Licensor's responsibility in the case of violation of obligations and tort shall be limited to intent and gross negligence. Only in case of a breach of essential contractual duties (cardinal obligations), Licensor shall also be liable in case of slight negligence. In any case, liability shall be limited to the foreseeable, contractually typical damages. The limitation mentioned above does not apply to injuries to life, limb, or health."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '8.2 Licensor takes no accountability or responsibility for any damages caused due to a breach of duties according to Section 2 of this Licence Agreement. To avoid data loss, You are required to make use of backup functions of the Licensed Application to the extent allowed by applicable third-party terms and conditions of use. You are aware thatin case of alterations or manipulations of the Licensed Application, You will not haveaccess to the Licensed Application.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'9. WARRANTY'} style={styles.heading} />
      <CustomText
        text={
          '9.1 Licensor warrants that the Licensed Application is free of spyware, trojan horses, viruses, or any other malware at the time of Your download. Licensor warrants that the Licensed Application works as described in the user documentation.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "9.2 No warranty is provided for the Licensed Application that is not executable on the device, that has been unauthorisedly modified, handled inappropriately or culpably, combined or installed with inappropriate hardware or software, used with inappropriate accessories, regardless if by Yourself or by third parties, or if there are any other reasons outside of Zaapr Online Services Private Limited's sphere of influence that affect the executability of the Licensed Application."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '9.3 You are required to inspect the Licensed Application immediately after installing it and notify Zaapr Online Services Private Limited about issues discovered without delay by email provided in Contact Information.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '9.4 If we confirm that the Licensed Application is defective, Zaapr Online Services Private Limited reserves a choice to remedy the situation either by means of solving the defect or substitute delivery'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '9.5 In the event of any failure of the Licensed Application to conform to any applicable warranty, You may notify the Services Store Operator, and Your Licensed Application purchase price will be refunded to You. To the maximum extent permitted by applicable law, the Services Store Operator will have no other warranty obligation whatsoever with respect to the Licensed Application, and any other losses, claims, damages, liabilities, expenses, and costs attributable to any negligence to adhere to any warranty.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '9.6 If the user is an entrepreneur, any claim based on faults expires after a statutory period of limitation amounting to twelve (12) months after the Licensed Application was made available to the user. The statutory periods of limitation given by law apply for users who are consumers.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'10. PRODUCT CLAIMS'} style={styles.heading} />
      <CustomText
        text={
          'Zaapr Online Services Private Limited and the End-User acknowledge that Zaapr Online Services Private Limited, and not the Services, is responsible for addressing any claims of the End-User or any third party relating to the Licensed Application or the End-Userʼs possession and/or use of that Licensed Application, including, but not limited to:'
        }
        style={styles.paragraph}
      />
      <CustomText text={'(i) product liability claims;'} style={styles.paragraph} />
      <CustomText
        text={
          '(ii) any claim that the Licensed Application fails to conform to any applicable legal or regulatory requirement; and'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '(iii) claims arising under consumer protection, privacy, or similar legislation, including in connection with Your Licensed Applicationʼs use of the HealthKit and HomeKit.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'11. LEGAL COMPLIANCE'} style={styles.heading} />
      <CustomText
        text={
          "You represent and warrant that You are not located in a country that is subject to a US Government embargo, or that has been designated by the US Government as a 'terrorist supporting' country; and that You are not listed on any US Government list of prohibited or restricted parties."
        }
        style={styles.paragraph}
      />
      <CustomText text={'12. CONTACT INFORMATION'} style={styles.heading} />
      <CustomText
        text={
          'For general inquiries, complaints, questions or claims concerning the Licensed Application, please contact our support team by email at help@zaapondemand.in'
        }
        style={styles.paragraph}
      />
      <CustomText text={'13. TERMINATION'} style={styles.heading} />
      <CustomText
        text={
          'The licence is valid until terminated by Zaapr Online Services Private Limited or by You. Your rights under this licence will terminate automatically and without notice from Zaapr Online Services Private Limited if You fail to adhere to any term(s) of this licence. Upon Licence termination, You shall stop all use of the Licensed Application, and destroy all copies, full or partial, of the Licensed Application.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'14. THIRD-PARTY TERMS OF AGREEMENTS AND BENEFICIARY'} style={styles.heading} />
      <CustomText
        text={
          'Zaapr Online Services Private Limited represents and warrants that Zaapr Online Services Private Limited will comply with applicable third-party terms of agreement when using Licensed Application.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "In Accordance with Section 9 of the 'Instructions for Minimum Terms of Developer's End-User Licence Agreement', both Apple and Google and their subsidiaries shall be third-party beneficiaries of this End User Licence Agreement and — upon Your acceptance of the terms and conditions of this Licence Agreement, both Apple and Google will have the right (and will be deemed to have accepted the right) to enforce this End User Licence Agreement against You as a third-party beneficiary thereof."
        }
        style={styles.paragraph}
      />
      <CustomText text={'15. INTELLECTUAL PROPERTY RIGHTS'} style={styles.heading} />
      <CustomText
        text={
          "Zaapr Online Services Private Limited and the End-User acknowledge that, in the event of any third-party claim that the Licensed Application or the End-User's possession and use of that Licensed Application infringes on the third party's intellectual property rights, Zaapr Online Services Private Limited, and not the Services, will be solely responsible for the investigation, defence, settlement, and discharge or any such intellectual property infringement claims."
        }
        style={styles.paragraph}
      />
      <CustomText text={'16. APPLICABLE LAW'} style={styles.heading} />
      <CustomText
        text={'This Licence Agreement is governed by the laws of India excluding its conflicts of law rules'}
        style={styles.paragraph}
      />
      <CustomText text={'17. MISCELLANEOUS'} style={styles.heading} />
      <CustomText
        text={
          '17.1 If any of the terms of this agreement should be or become invalid, the validity of the remaining provisions shall not be affected. Invalid terms will be replaced by valid ones formulated in a way that will achieve the primary purpose.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '17.2 Collateral agreements, changes and amendments are only valid if laid down in writing. The preceding clause can only be waived in writing'
        }
        style={styles.paragraph}
      />
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
});

export default Enduseraggrement;
