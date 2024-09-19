import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Color} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';

const Disclaimer = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>DISCLAIMER</Text>
        <Text style={styles.updated}>Last updated August 15, 2024</Text>

        <Text style={styles.sectionTitle}>WEBSITE DISCLAIMER</Text>
        <Text style={styles.paragraph}>
          The information provided by ZAAP ONDEMAND INC ('we', 'us', or 'our') on our mobile application is for general
          informational purposes only. All information on our mobile application is provided in good faith, however we
          make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy,
          validity, reliability, availability, or completeness of any information on our mobile application. UNDER NO
          CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE
          USE OF OUR MOBILE APPLICATION OR RELIANCE ON ANY INFORMATION PROVIDED ON OUR MOBILE APPLICATION. YOUR USE OF
          OUR MOBILE APPLICATION AND YOUR RELIANCE ON ANY INFORMATION ON OUR MOBILE APPLICATION IS SOLELY AT YOUR OWN
          RISK.
        </Text>

        <Text style={styles.sectionTitle}>EXTERNAL LINKS DISCLAIMER</Text>
        <Text style={styles.paragraph}>
          Our mobile application may contain (or you may be sent through our mobile application) links to other websites
          or content belonging to or originating from third parties or links to websites and features in banners or
          other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy,
          validity, reliability, availability, or completeness by us. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
          RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED
          THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY
          TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF
          PRODUCTS OR SERVICES.
        </Text>

        <Text style={styles.sectionTitle}>PROFESSIONAL DISCLAIMER</Text>
        <Text style={styles.paragraph}>
          The Site cannot and does not contain medical advice. The medical information is provided for general
          informational and educational purposes only and is not a substitute for professional advice. Accordingly,
          before taking any actions based upon such information, we encourage you to consult with the appropriate
          professionals. We do not provide any kind of medical advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED
          ON OUR MOBILE APPLICATION IS SOLELY AT YOUR OWN RISK
        </Text>

        <Text style={styles.sectionTitle}>AFFILIATES DISCLAIMER</Text>
        <Text style={styles.paragraph}>
          Our mobile application may contain links to affiliate websites, and we receive an affiliate commission for any
          purchases made by you on the affiliate website using such links. Our affiliates include the following:
        </Text>

        <Text style={styles.sectionTitle}>TESTIMONIALS DISCLAIMER</Text>
        <Text style={styles.paragraph}>
          The Site may contain testimonials by users of our products and/or services. These testimonials reflect the
          real-life experiences and opinions of such users. However, the experiences are personal to those particular
          users, and may not necessarily be representative of all users of our products and/or services. We do not
          claim, and you should not assume, that all users will have the same experiences. YOUR INDIVIDUAL RESULTS MAY
          VARY.
        </Text>

        <Text style={styles.paragraph}>
          The testimonials on the Site are submitted in various forms such as text, audio and/or video, and are reviewed
          by us before being posted. They appear on the Site verbatim as given by the users, except for the correction
          of grammar or typing errors. Some testimonials may have been shortened for the sake of brevity where the full
          testimonial contained extraneous information not relevant to the general public.
        </Text>

        <Text style={styles.paragraph}>
          The views and opinions contained in the testimonials belong solely to the individual user and do not reflect
          our views and opinions. We are not affiliated with users who provide testimonials, and users are not paid or
          otherwise compensated for their testimonials.
        </Text>
        <CustomText text={''} style={styles.paragraph} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: widthToDp(4),
  },
  // content: {
  //   paddingBottom: 30,
  // },
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
    // color: Color.colorIndigo,
  },
  sectionTitle: {
    fontSize: widthToDp(4),
    fontWeight: 'bold',
    marginVertical: widthToDp(2),
    color: Color.colorIndigo,
  },
  paragraph: {
    marginVertical: widthToDp(2),
    textAlign: 'justify',
    fontWeight: '400',
  },
});

export default Disclaimer;
