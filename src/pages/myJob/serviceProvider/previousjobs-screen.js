const {default: CustomText} = require('../../../atoms/text/textComponent');
import {differenceInDays, differenceInHours} from 'date-fns';
import {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMyJobs} from '../../../redux/myJobs/action';
import {View, SafeAreaView, FlatList, TouchableOpacity, Text, ActivityIndicator, ScrollView} from 'react-native';
import MyJobStyles from './myJob-styles';
import MyjobsCardList from '../../../organisms/myjobscardlist/myjobscardList-component';
import {useNavigation} from '@react-navigation/native';
import {getDocs, collection, where, query} from 'firebase/firestore';
import {db} from '../../../../firebaseDb';
import CompletedJobsCard from '../../../atoms/completedjobscard/completed-jobs-card';
import moment from 'moment';
import {fetchServiceProviderDetails} from '../../../redux/providerstatus/action';
import {useIsFocused} from '@react-navigation/native';
import {backgroundUpload} from 'react-native-compressor';
import {envConfig} from '../../../assets/helpers/envApi';

const MyJobsPreviousJobs = () => {
  // 3rd Tab
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  // const providerStatuss = useSelector(state => state.providerverification.providerStatus);
  const providerStatus = useSelector(state => state.providerverification.providerDetails);
  const isVerified = providerStatus[0]?.isverified;
  // console.log("providerVerifyproviderVerify",providerVerify)
  const styles = useMemo(() => MyJobStyles(), []);
  const dispatch = useDispatch();
  const {loading, jobs, categories} = useSelector(state => state.home);

  const user = useSelector(state => state.Auth.user);
  const userId = user.userId;
  const [completedJobs, setCompletedJobs] = useState([]);
  const [isLoading, setLoader] = useState(true);

  const fetchCompletedJobs = async () => {
    try {
      const q = query(collection(db, envConfig.completedJobs), where('candidateUserId', '==', userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());
      // console.log("datadatadata",data)
      setCompletedJobs(data);
    } catch (error) {
      console.error('Error fetching Completed Jobs data:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (isFocused && isVerified === 'verified') {
      fetchCompletedJobs();
      setLoader(false);
    }
  }, [isFocused]);

  const [expireJobs, setExpiredJobs] = useState([]);

  const fetchExpiredJobsData = async () => {
    try {
      const q = query(collection(db, envConfig.expired_Jobs), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());
      setExpiredJobs(data);
    } catch (error) {
      console.error('Error fetching Customer Feedback data:', error);
      // Handle error if needed
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (isFocused && isVerified !== 'verified') {
      fetchExpiredJobsData();
      setLoader(false);
    }
  }, [isFocused]);

  const [olderJobs, setOlderJobs] = useState([]);

  useEffect(() => {
    const filteredJobs = jobs.filter(job => job.postedBy === userId);
    const sortedJobs = filteredJobs.sort((a, b) => b.createdOn - a.createdOn);
    const currentDate = new Date();

    const olderJobs = sortedJobs.filter(job => {
      const daysDifference = differenceInDays(currentDate, new Date(job.createdOn));
      return daysDifference >= 5;
    });
    setOlderJobs(olderJobs);
    setLoader(false);
  }, [jobs, userId]);

  const renderItem = ({item}) => {
    const {createdOn} = item;

    const timeAgo = moment(createdOn).fromNow();

    return isVerified === 'verified' ? null : <CompletedJobsCard completedJobs={item} timeAgoo={timeAgo} />;
  };

  const renderItemcompletedJobs = ({item}) => {
    const {timeAgo} = item;
    const timeAgoo = moment(timeAgo).fromNow();

    return isVerified === 'verified' ? <CompletedJobsCard completedJobs={item} timeAgoo={timeAgoo} /> : null;
  };

  return (
    <SafeAreaView style={styles.frameParent}>
      <ScrollView style={{backgroundColor: 'white', height: '100%', paddingTop: 15}}>
        {isLoading ? (
          <ActivityIndicator color={'black'} size="large" />
        ) : (
          <>
            {/* This is service provider side */}
            {completedJobs.length > 0 ? (
              <FlatList data={completedJobs} renderItem={renderItemcompletedJobs} keyExtractor={item => item.id} />
            ) : (
              isVerified === 'verified' && (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noData}>You have no previous jobs to display!</Text>
                </View>
              )
            )}

            {/* This is customer side */}
            {expireJobs.length > 0 ? (
              <FlatList data={expireJobs} renderItem={renderItem} keyExtractor={item => item.id} />
            ) : (
              isVerified !== 'verified' && (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noData}>No Previous jobs to display!</Text>
                </View>
              )
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyJobsPreviousJobs;
