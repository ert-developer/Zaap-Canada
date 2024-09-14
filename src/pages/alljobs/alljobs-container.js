// import AllJobsScreen from "./alljobs-screen";
import React, {useEffect, useState, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import {envConfig} from '../../assets/helpers/envApi';
import AllJobsScreen from './alljobs-screen';
import {useNavigation} from '@react-navigation/native';

const AllJobsContainer = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [lastJob, setLastJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchJobs = useCallback(async () => {
    try {
      if (loading) return;

      setLoading(true);

      let query = firestore().collection(envConfig.Jobs);
      if (lastJob) {
        query = query.startAfter(lastJob);
      }

      const querySnapshot = await query.limit(15).get();

      const jobsArray = [];
      querySnapshot.forEach(documentSnapshot => {
        jobsArray.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });

      setAllJobs(prevJobs => [...prevJobs, ...jobsArray]);
      setLastJob(querySnapshot.docs[jobsArray.length - 1]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [lastJob]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleLoadMore = () => {
    fetchJobs();
  };

  const navigation = useNavigation();
  const GoBack = () => {
    navigation.navigate('HomeScreen');
  };
  const handleJobPress = job => {
    navigation.navigate('JobDeatil', {
      imageSource: job.imageUrls[0],
      category: job.data.category,
      title: job.data.jobTitle,
      description: job.data.jobDescription,
      price: job.data.salary,
      where: job?.locationDesc?.description,
      postedBy: job.postedBy,
    });
  };

  const sortedallJobs = allJobs?.sort((a, b) => b.createdOn - a.createdOn);

  return (
    <AllJobsScreen
      allJobs={sortedallJobs}
      fetchMoreJobs={handleLoadMore}
      loading={loading}
      GoBack={GoBack}
      handleJobPress={handleJobPress}
    />

    // <CustomText text ={"Hello"}/>
  );
};

export default AllJobsContainer;
