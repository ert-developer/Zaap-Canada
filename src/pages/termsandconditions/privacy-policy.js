import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import {widthToDp} from '../../responsive/responsive';
import {Color} from '../../assets/static/globalStyles';

const PrivacyPolicies = () => {
  return (
    <View style={styles.container}>
      <CustomText text={'Privacy Policy'} style={styles.termsCondtionsHeading} />
      <CustomText text={'Last updated: August 15, 2024'} />
      <CustomText
        text={
          "This privacy notice for Zaapr Online Services Private Limited (doing business as ZAAP - Hire or Work Locally) ('we', 'us', or 'our'), describes how and why we might collect, store, use, and/or share ('process') your information when you use our services ('Services'), such as when you:"
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• Download and use our mobile application ZAAP - Hire or Work Locally, or any other application of ours that links to this privacy notice'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={'• Engage with us in other related ways, including any sales, marketing, or events'}
        style={styles.paragraph}
      />
      <CustomText
        text={
          'Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at help@zaapondemand.ca.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'SUMMARY OF KEY POINTS'} style={styles.heading} />
      <CustomText
        text={
          'What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Do we process any sensitive personal information? We do not process sensitive personal information.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={'Do we collect any information from third parties? We do not collect any information from third parties.'}
        style={styles.paragraph}
      />
      <CustomText
        text={
          'How do we process your information? We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'In what situations and with which types of parties do we share personal information? We may share information in specific situations and with specific categories of third parties.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'How do we keep your information safe? We have organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'What are your rights? Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'How do you exercise your rights? The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'TABLE OF CONTENTS'} style={styles.heading} />

      <CustomText text={'1. WHAT INFORMATION DO WE COLLECT?'} style={styles.paragraph} />
      <CustomText text={'2. HOW DO WE PROCESS YOUR INFORMATION?'} style={styles.paragraph} />
      <CustomText text={'3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?'} style={styles.paragraph} />
      <CustomText text={'4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?'} style={styles.paragraph} />
      <CustomText text={'5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?'} style={styles.paragraph} />
      <CustomText text={'6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?'} style={styles.paragraph} />
      <CustomText text={'7. HOW LONG DO WE KEEP YOUR INFORMATION?'} style={styles.paragraph} />
      <CustomText text={'8. HOW DO WE KEEP YOUR INFORMATION SAFE?'} style={styles.paragraph} />
      <CustomText text={'9. DO WE COLLECT INFORMATION FROM MINORS?'} style={styles.paragraph} />
      <CustomText text={'10. WHAT ARE YOUR PRIVACY RIGHTS?'} style={styles.paragraph} />
      <CustomText text={'11. CONTROLS FOR DO-NOT-TRACK FEATURES'} style={styles.paragraph} />
      <CustomText text={'12. DO WE MAKE UPDATES TO THIS NOTICE?'} style={styles.paragraph} />
      <CustomText text={'13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?'} style={styles.paragraph} />
      <CustomText text={'14. WHAT INFORMATION DO WE COLLECT?'} style={styles.paragraph} />
      <CustomText text={'In Short: We collect personal information that you provide to us.'} style={styles.paragraph} />
      <CustomText
        text={
          'We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:'
        }
        style={styles.paragraph}
      />
      <CustomText text={'• Names'} style={styles.paragraph} />
      <CustomText text={'• Phone numbers'} style={styles.paragraph} />
      <CustomText text={'• Email addresses'} style={styles.paragraph} />
      <CustomText text={'• Mailing addresses'} style={styles.paragraph} />
      <CustomText text={'• Billing addresses'} style={styles.paragraph} />
      <CustomText text={'• Bank account details'} style={styles.paragraph} />
      <CustomText text={'• Government issued id'} style={styles.paragraph} />
      <CustomText text={'Sensitive Information. We do not process sensitive information.'} style={styles.paragraph} />
      <CustomText
        text={
          'Payment Data. We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by RazorPay, GooglePay and PhonePe. You may find their privacy notice link(s) here: https://razorpay.com/privacy/, https://pay.google.com/intl/en_in/about/policy/ and https://www.phonepe.com/privacy-policy.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "Social Media Login Data. We may provide you with the option to register with us using your existing social media account details, like your Facebook, Gmail, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called 'HOW DO WE HANDLE YOUR SOCIAL LOGINS?' below."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'Application Data. If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "• Geolocation Information. We may request access or permission to track locationbased information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• Mobile Device Data. We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our application(s), we may also collect information about the phone network associated with your mobile device, your mobile deviceʼs operating system or platform, the type of mobile device you use, your mobile deviceʼs unique device ID, and information about the features of our application(s) you accessed.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "• Push Notifications. We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'Information automatically collected'} style={styles.heading} />
      <CustomText
        text={
          'In Short: Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={'Like many businesses, we also collect information through cookies and similar technologies.'}
        style={styles.paragraph}
      />
      <CustomText text={'The information we collect includes:'} style={styles.paragraph} />
      <CustomText
        text={
          "• Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps'), and hardware settings)."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• Device Data. We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "Location Data. We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services."
        }
        style={styles.paragraph}
      />
      <CustomText text={'Google API'} style={styles.heading} />
      <CustomText
        text={
          'Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'2. HOW DO WE PROCESS YOUR INFORMATION?'} style={styles.heading} />
      <CustomText
        text={
          'In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'We process your personal information for a variety of reasons, depending on how you interact with our Services, including:'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• To send administrative information to you. We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• To fulfil and manage your orders. We may process your information to fulfil and manage your orders, payments made through the Services.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "• To send you marketing and promotional communications. We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see 'WHAT ARE YOUR PRIVACY RIGHTS?' below."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• To protect our Services. We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• To evaluate and improve our Services, products, marketing, and your experience. We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• To identify usage trends. We may process information about how you use our Services to better understand how they are being used so we can improve them.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          '• To comply with our legal obligations. We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?'} style={styles.heading} />
      <CustomText
        text={
          'In Short: We may share information in specific situations described in this section and/or with the following categories of third parties.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "Vendors, Consultants, and Other Third-Party Service Providers. We may share your data with third-party vendors, service providers, contractors, or agents ('third parties') who perform services for us or on our behalf and require access to such information to do that work."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={'The categories of third parties we may share personal information with are as follows:'}
        style={styles.paragraph}
      />
      <CustomText text={'• Data Analytics Services'} style={styles.paragraph} />
      <CustomText text={'• Performance Monitoring Tools'} style={styles.paragraph} />
      <CustomText text={'• Product Engineering & Design Tools'} style={styles.paragraph} />
      <CustomText text={'• Sales & Marketing Tools'} style={styles.paragraph} />
      <CustomText text={'• User Account Registration & Authentication Services'} style={styles.paragraph} />
      <CustomText text={'• Website Hosting Service Providers'} style={styles.paragraph} />
      <CustomText text={'• Ad Networks'} style={styles.paragraph} />
      <CustomText text={'• Finance & Accounting Tools'} style={styles.paragraph} />
      <CustomText text={'• Payment Processors'} style={styles.paragraph} />
      <CustomText text={'• Testing Tools'} style={styles.paragraph} />
      <CustomText
        text={'We also may need to share your personal information in the following situations:'}
        style={styles.paragraph}
      />

      <CustomText
        text={
          'Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          "When we use Google Maps Platform APIs. We may share your information with certain Google Maps Platform APIs (e.g. Google Maps API, Places API). We use certain Google Maps Platform APIs to retrieve certain information when you make location-specific requests. A full list of what we use information for can be found in this section and in the previous section titled 'HOW DO WE PROCESS YOUR INFORMATION?' The Google Maps Platform APIs that we use store and access cookies and other information on your devices."
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'Affiliates. We may share your information with our affiliates, in which case we will require those affiliates to honour this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'Business Partners. We may share your information with our business partners to offer you certain products, services, or promotions.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?'} style={styles.heading} />
      <CustomText
        text={
          'In Short: We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy notice. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Services. You should review the policies of such third parties and contact them directly to respond to your questions. '
        }
        style={styles.paragraph}
      />
      <CustomText text={'5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?'} style={styles.heading} />
      <CustomText
        text={'In Short: We may use cookies and other tracking technologies to collect and store your information.'}
        style={styles.paragraph}
      />
      <CustomText
        text={
          'We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'Google Analytics'} style={styles.heading} />
      <CustomText
        text={
          'We may share your information with Google Analytics to track and analyse the use of the Services. To opt out of being tracked by Google Analytics across the Services, visit https://tools.google.com/dlpage/gaoptout. For more information on the privacy practices of Google, please visit the Google Privacy & Terms page'
        }
        style={styles.paragraph}
      />
      <CustomText text={'6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?'} style={styles.heading} />
      <CustomText
        text={
          'In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or Gmail logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'7. HOW LONG DO WE KEEP YOUR INFORMATION?'} style={styles.heading} />
      <CustomText
        text={
          'In Short: We keep your information for as long as necessary to fulfil the purposes outlined in this privacy notice unless otherwise required by law.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'8. HOW DO WE KEEP YOUR INFORMATION SAFE?'} style={styles.heading} />
      <CustomText
        text={
          'In Short: We aim to protect your personal information through a system of organisational and technical security measures'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.'
        }
        style={styles.paragraph}
      />
      <CustomText text={'9. DO WE COLLECT INFORMATION FROM MINORS?'} style={styles.heading} />
      <CustomText
        text={'In Short: We do not knowingly collect data from or market to children under 18 years of age.'}
        style={styles.paragraph}
      />
      <CustomText
        text={
          'We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependentʼs use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at help@zaapondemand.ca'
        }
        style={styles.paragraph}
      />
      <CustomText text={''} />
      <CustomText text={'10. WHAT ARE YOUR PRIVACY RIGHTS?'} style={styles.heading} />
      <CustomText
        text={'In Short: You may review, change, or terminate your account at any time.'}
        style={styles.paragraph}
      />
      <CustomText
        text={
          'If you are a resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'If you are a resident in Switzerland, the contact details for the data protection authorities are available here: https://www.edoeb.admin.ch/edoeb/en/home.html.'
        }
        style={styles.paragraph}
      />
      <CustomText
        text={
          'If you have questions or comments about your privacy rights, you may email us at https://zaapondemand.ca/contact-us/.'
        }
        style={styles.paragraph}
      />
    </View>
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

export default PrivacyPolicies;
