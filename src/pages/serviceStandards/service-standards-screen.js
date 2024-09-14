import React from 'react';
import HeaderComponent from '../../atoms/header/headerComponent';
import serviceStandardStyles from './service-standards-styles';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import CustomText from '../../atoms/text/textComponent';

const ServiceStandardScreen = () => {
  const styles = serviceStandardStyles();
  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent text={'Service Standards'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text style={styles.headerText}>On-Demand Marketplace Service Standards for Providers</Text>
          <Text style={styles.subHeaderText}>General Standards:</Text>
          <CustomText
            text={`- Professionalism: Be courteous, polite, and respectful in all interactions with clients. Communicate clearly and promptly, keeping clients informed throughout the service process.
- Reliability: Show up on time for appointments and complete jobs as scheduled. Be proactive in managing your schedule and communicating any unforeseen delays.
- Quality: Deliver services to the highest standard, meeting or exceeding client expectations. Use appropriate tools and equipment, and ensure the work meets agreed- upon specifications.
- Safety: Prioritize your own and client safety by following all safety guidelines and regulations relevant to your service. Always maintain a clean and safe work environment.
- Honesty and Transparency: Be upfront about your qualifications, experience, and fees. Do not make misleading claims or promise results you cannot deliver.`}
            style={styles.text}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceStandardScreen;
