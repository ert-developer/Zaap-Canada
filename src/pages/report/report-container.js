import React, {useState} from 'react';
import ReportScreen from './report-screen';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {envConfig} from '../../assets/helpers/envApi';

const ReportContainer = () => {
  const route = useRoute();
  const jobDetails = route.params;
  const user = useSelector(state => state.Auth.user);

  const navigation = useNavigation();

  const [reportSubmitModal, setReportSubmitModal] = useState(false);

  const onCloseSuccessModal = () => {
    setReportSubmitModal(false);
    navigation.navigate('HomeScreen');
  };

  const submitJobReport = async reportValue => {
    try {
      const collectionRef = firestore().collection(envConfig.job_reports);
      const docRef = collectionRef.doc(jobDetails.jobID);
      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        const docsData = docSnapshot.data();
        const currCount = docsData.reportType[0].count;
        const checkExitUser = docsData.reporterIdList.includes(user.userId);
        if (checkExitUser) {
          Alert.alert('You have already reported this job');
          return;
        } else {
          // Add the current user's name to the reporterName array
          docsData.reporterName.push(user.displayName);
          docsData.reporterIdList.push(user.userId);
          await docRef.update({
            reportType: [
              {
                reportValue,
                count: currCount + 1,
              },
            ],
            reporterName: docsData.reporterName,
            reporterIdList: docsData.reporterIdList, // Update reporterName field
          });
          setReportSubmitModal(true);
        }

        // Alert.alert('Reported Successfully');
      } else {
        const jobReportData = {
          creationTime: Date.now(),
          jobID: jobDetails.jobID,
          postedBy: jobDetails.postedBy,
          jobTitle: jobDetails.jobTitle,
          jobDescription: jobDetails.jobDescription,
          category: jobDetails.category,
          subCategory: jobDetails.subCategory,
          reportType: [
            {
              reportValue,
              count: 1,
            },
          ],
          reporterName: [user.displayName],
          reporterEmail: user.email,
          reportedAt: Date.now(),
          reporterIdList: [user.userId],
        };
        await docRef.set(jobReportData);
        setReportSubmitModal(true);
        // Alert.alert('Reported Successfully');
      }
    } catch (error) {
      console.error('Error reporting job:', error);
      Alert.alert('Your are getting error while posting the job report');
    }
  };

  return (
    <ReportScreen
      submitJobReport={submitJobReport}
      reportSubmitModal={reportSubmitModal}
      onCloseSuccessModal={onCloseSuccessModal}
    />
  );
};

export default ReportContainer;
