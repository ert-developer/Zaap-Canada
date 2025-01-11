import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyJobService from './myJob-screen';
import {fetchServiceProviderDetails} from '../../../redux/providerstatus/action';
import {fetchSelectedJobs} from '../../../redux/selectedjobs/action';
import {updateProviderStatus} from '../../../redux/providerstatus/action';
import {fetchSelectedProfileDetails} from '../../../redux/selectedprofiledetails/action';
import {fetchAppliedJobs} from '../../../redux/appliedjobs/action';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

const MyJobServiceContainer = () => {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(true);
  const [recentJobs, setRecentJobs] = useState([]);

  const user = useSelector(state => state.Auth.user);
  const userId = user.userId;
  const isVerified = user?.isServiceProvider;

  const jobs = useSelector(state => state.home.jobs);
  const selectedJobs = useSelector(state => state.selectedJobs.selectedJobs);
  const filteredSelectedJobs = selectedJobs.filter(job => job.candidateUserId === userId);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch necessary data
      dispatch(fetchSelectedJobs());
      dispatch(fetchAppliedJobs());
      dispatch(fetchSelectedProfileDetails());

      if (isVerified === true) {
        dispatch(fetchServiceProviderDetails(userId));
        dispatch(updateProviderStatus(isVerified));
      }

      const filteredJobs = jobs.filter(job => job.postedBy === userId);
      const sortedJobs = filteredJobs.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
      const currentDate = new Date();
      const recentJobs = sortedJobs.filter(job => {
        const daysDifference = moment(currentDate).diff(moment(job.createdOn), 'days');
        return daysDifference < 45;
      });

      setRecentJobs(recentJobs);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredSelectedJobss = filteredSelectedJobs.sort((a, b) => new Date(b.timeAgo) - new Date(a.timeAgo));

  return (
    <ScrollView>
      <MyJobService
        filteredJobs={recentJobs}
        selectedJobs={filteredSelectedJobss}
        isVerified={isVerified}
        loading={loading}
      />
    </ScrollView>
  );
};

export default MyJobServiceContainer;
