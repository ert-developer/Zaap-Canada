import CustomText from '../../atoms/text/textComponent';
import MyjobsCardList from '../../organisms/myjobscardlist/myjobscardList-component';
import React from 'react';
import {View, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useMemo} from 'react';
import PreviousJobsPaymentScreen from '../previousjobspayment/previousjobs-payment-screen';
import PreviousJobsStyles from './previous-jobs-styles';
const PreviousJobsScreen = ({filteredJobs, timeAgoForJobs, selectedJobs}) => {
  const navigation = useNavigation();
  const styles = useMemo(() => PreviousJobsStyles(), []);

  const renderItem = ({item}) => {
    const {data = {}, id} = item || {};
    const {jobTitle, jobDescription, salary, imageUrls = []} = data;

    // const timeAgo = timeAgoForJobs[filteredJobs.indexOf(item)];
    const jobAdType = item?.jobAds?.type;

    const JobsList = {
      jobTitle,
      salary,
      jobDescription,
      imageUrls,
      // timeAgo,
    };

    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('PreviousJobsPaymentScreen')}>
          <MyjobsCardList JobsList={JobsList} accordianStatus={false} jobAdType={jobAdType} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSelectedJobs = ({item}) => {
    const {data = {}, id} = item || {};
    const {jobTitle, jobDescription, salary, imageUrls = []} = data;

    // const timeAgo = timeAgoForJobs[filteredJobs.indexOf(item)];

    const JobsList = {
      jobTitle,
      salary,
      jobDescription,
      imageUrls,
      // timeAgo,
    };

    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('PreviousJobsPaymentScreen')}>
          <MyjobsCardList JobsList={JobsList} accordianStatus={false} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.frameParent}>
      <ScrollView>
        <CustomText text={'LIVE ADS'} style={styles.selected} />
        <FlatList data={filteredJobs} renderItem={renderItem} keyExtractor={item => item.id} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreviousJobsScreen;

//   previousJobs:{
//     height:heightToDp(50),
//     paddingBottom:40
//   },
//   selectedJobs:{
//     height:heightToDp(30),

//         marginBottom:10
//   },
//     frameParent:{
//         padding:heightToDp(2)
//     },
//     myJobs: {
//         fontSize: heightToDp(2.8),
//         fontWeight: "700",
//         fontFamily: "Helvetica",
//         color: "#000",
//         paddingTop: 10,
//         paddingBottom: 20
//       },

//       selected:{
//     fontSize:heightToDp(2.5),
//  letterSpacing: 2.4,
// fontWeight: "200",
// fontFamily: "Helvetica",
// color: "#5a2daf",
// paddingBottom:heightToDp(2),
//       }

//   });
