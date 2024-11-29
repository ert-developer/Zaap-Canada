import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {differenceInDays} from 'date-fns';
import MyJobService from './myJob-screen';
import {fetchServiceProviderDetails} from '../../../redux/providerstatus/action';
import {fetchSelectedJobs} from '../../../redux/selectedjobs/action';
import {updateProviderStatus} from '../../../redux/providerstatus/action';
import {fetchSelectedProfileDetails} from '../../../redux/selectedprofiledetails/action';

const MyJobServiceContainer = () => {
  const selectedJobs = useSelector(state => state.selectedJobs.selectedJobs);
  const [loading, setIsLoading] = useState(true);

  const user = useSelector(state => state.Auth.user);
  // const providerVerify = user?.isServiceProvider;

  const isVerified = user?.isServiceProvider;
  // const isVerified = user?.isServiceProvider;
  // console.log("providerVerify",providerVerify,providerStatus)
  const dispatch = useDispatch();
  const {jobs, categories} = useSelector(state => state.home);
  // const jobss= jobs.slice(0,3)

  const userId = user.userId;
  const filteredSelectedJobs = selectedJobs.filter(job => job.candidateUserId === userId);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchSelectedJobs());
    dispatch(fetchSelectedProfileDetails());
    setIsLoading(false);
  }, []);
  useEffect(() => {
    dispatch(fetchServiceProviderDetails(user.userId));
    dispatch(updateProviderStatus(isVerified));
  }, [user]);

  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const filteredJobs = jobs.filter(job => job.postedBy === userId);
    // console.log('filteredJobsfilteredJobsfilteredJobs', filteredJobs);
    const sortedJobs = filteredJobs.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    const currentDate = new Date();
    const recentJobs = sortedJobs.filter(job => {
      const daysDifference = differenceInDays(currentDate, new Date(job.createdOn));
      // setIsLoading(false);
      return daysDifference < 45;
    });

    setRecentJobs(recentJobs);
    setIsLoading(false);
  }, [jobs, userId]);

  // if (recentJobs[0] && recentJobs[0].area) {
  //   console.log('Area:', recentJobs[0].area);
  // } else {
  //   console.log('Area is undefined or not present in the object.');
  // }

  const filteredSelectedJobss = filteredSelectedJobs.sort((a, b) => new Date(b.timeAgo) - new Date(a.timeAgo));

  // console.log('filteredJobs-jobs-------------------------', jobs);
  // console.log("filteredSelectedJobss",recentJobs)
  return (
    <View>
      {/* {loading ? (
        <ActivityIndicator color={'black'} size="large" />
      ) : (
        <MyJobService filteredJobs={recentJobs} selectedJobs={filteredSelectedJobss} isVerified={isVerified} />
      )} */}
      <MyJobService filteredJobs={recentJobs} selectedJobs={filteredSelectedJobss} isVerified={isVerified} />
    </View>
  );
};

export default MyJobServiceContainer;
