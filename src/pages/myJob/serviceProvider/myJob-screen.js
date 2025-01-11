import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {View, SafeAreaView, FlatList, ScrollView, Text, ActivityIndicator, RefreshControl} from 'react-native';
import MyjobsCardList from '../../../organisms/myjobscardlist/myjobscardList-component';
import MyJobStyles from './myJob-styles';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getJobDetails} from '../../../common/collection';
import moment from 'moment';
import CustomLoader from '../../../molecules/customLoader/customLoader';
import {fetchSelectedJobs} from '../../../redux/selectedjobs/action';
import {fetchSelectedProfileDetails} from '../../../redux/selectedprofiledetails/action';
import {fetchServiceProviderDetails} from '../../../redux/providerstatus/action';
import {fetchAllJobs, fetchCategories, fetchSpotlightJobs} from '../../../redux/home/action';
import {Color} from '../../../assets/static/globalStyles';
import {envConfig} from '../../../assets/helpers/envApi';

const MyJobService = ({filteredJobs, selectedJobs}) => {
  const navigation = useNavigation();
  const styles = useMemo(() => MyJobStyles(), []);
  const providerStatus = useSelector(state => state.providerverification.providerDetails);
  const isVerified = providerStatus[0]?.isverified;

  const [jobDetailsMap, setJobDetailsMap] = useState({});

  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setLoader(true);
    const fetchAllJobDetails = async () => {
      const jobDetailsPromises = selectedJobs.map(async job => {
        try {
          const jobDetails = await getJobDetails(envConfig.Jobs, job.jobId);
          return {jobId: job.jobId, details: jobDetails};
        } catch (error) {
          console.error('Error fetching job details:', error);
          return {jobId: job.jobId, details: null};
        }
      });

      const allJobDetails = await Promise.all(jobDetailsPromises);
      const jobDetailsObject = allJobDetails.reduce((acc, {jobId, details}) => {
        acc[jobId] = details;
        return acc;
      }, {});

      setJobDetailsMap(jobDetailsObject);
      dispatch(fetchServiceProviderDetails(user.userId));

      dispatch(fetchAllJobs());
      dispatch(fetchCategories());
      fetchSpotlightJobs();
      // fetchFreeFeatured();
      dispatch(fetchSelectedJobs());
      dispatch(fetchSelectedProfileDetails());
    };

    fetchAllJobDetails();
    setLoader(false);
  }, [selectedJobs, dispatch]);

  const renderItem = ({item}) => {
    const {
      data = {},
      id,
      jobApplications,
      createdOn,
      viewedBy,
      locationDesc,
      imageUrls,
      jobAds,
      postedBy,
      address,
      IsBookingConfirmed,
      selectedCandidateDetails,
      IsBookingCancel,
      area,
      cancelCandidateDetails,
      IsPaid,
    } = item || {};
    const timeAgo = moment(createdOn).fromNow();
    const {jobTitle, jobDescription, salary, category, subCategory, startdate, starttime} = data;
    const viewCount = Array.isArray(viewedBy) ? (viewedBy.length >= 1 ? viewedBy.length : 0) : 0;
    const jobAdType = item?.jobAds?.type;
    const JobsList = {
      jobTitle,
      salary,
      jobDescription,
      imageUrls,
      jobId: id,
      timeAgo,
      category,
      locationDesc,
      subCategory,
      startdate,
      starttime,
      createdOn,
      jobAds,
      postedBy,
      address,
      area,
      serviceProviderId: item?.selectedCandidateDetails?.userId,
      IsPaid,
    };
    return isVerified === 'verified' ? null : (
      <MyjobsCardList
        JobsList={JobsList}
        accordianStatus={true}
        jobAdType={jobAdType}
        jobApplications={jobApplications}
        viewCount={viewCount}
        IsBookingConfirmed={IsBookingConfirmed}
        selectedCandidateDetails={selectedCandidateDetails}
        IsBookingCancel={IsBookingCancel}
        cancelCandidateDetails={cancelCandidateDetails}
        providerStatus={providerStatus}
      />
    );
  };

  const renderSelectedJobsItem = ({item}) => {
    const jobDetails = jobDetailsMap[item.jobId];
    const timeAgoo = moment(item.timeAgo).fromNow();
    const jobList = {
      jobDescription: item.jobDescription,
      jobTitle: item.jobTitle,
      salary: item.salary,
      timeAgo: timeAgoo,
      candidateUserId: item.candidateUserId,
      customerId: item.customerId,
      area: item.area,
      jobId: item.jobId,
      imageUrls: [item.images],
      category: item.category,
      locationDesc: item.locationDesc,
    };

    return isVerified === 'verified' && jobDetails ? (
      <View>
        <MyjobsCardList
          JobsList={jobList}
          hired={true}
          accordianStatus={false}
          jobAdType={item?.jobAds?.type}
          isNavigate={true}
          IsBookingCancel={jobDetails.IsBookingCancel}
          providerStatus={providerStatus}
        />
      </View>
    ) : null;
  };
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    // Set interval to trigger the OnRefreshHandler every 5 seconds
    const interval = setInterval(() => {
      OnRefreshHandler(); // Trigger the refresh handler
    }, 10000); // Trigger every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const OnRefreshHandler = () => {
    // Create an array of dispatches as promises
    setLoad(true);
    Promise.all([dispatch(fetchSelectedJobs(), dispatch(fetchAllJobs())), dispatch(fetchSelectedProfileDetails())])
      .then(() => {
        // All promises resolved, stop loading

        setLoad(false);
      })
      .catch(error => {
        console.error('Error refreshing data:', error);
        // Handle errors and stop loading
      });
  };

  return (
    <SafeAreaView style={styles.frameParent}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={load} onRefresh={OnRefreshHandler} />}
        style={{
          backgroundColor: 'white',
          height: isVerified === 'verified' ? selectedJobs.length * 850 : filteredJobs.length * 850,
          paddingTop: 20,
        }}>
        {loader ? (
          <ActivityIndicator color={'black'} size="small" />
        ) : (
          <>
            {/* This is customer side flat list */}
            {filteredJobs.length > 0 ? (
              <FlatList data={filteredJobs} renderItem={renderItem} keyExtractor={item => item.id} />
            ) : (
              isVerified !== 'verified' && (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noData}>You haven't posted any jobs yet!</Text>
                </View>
              )
            )}
            {/* This is service provider side flat list */}
            {selectedJobs.length > 0 ? (
              <>
                <FlatList data={selectedJobs} renderItem={renderSelectedJobsItem} keyExtractor={item => item.id} />
                <FlatList data={selectedJobs} renderItem={renderSelectedJobsItem} keyExtractor={item => item.id} />
                <FlatList data={selectedJobs} renderItem={renderSelectedJobsItem} keyExtractor={item => item.id} />
                <FlatList data={selectedJobs} renderItem={renderSelectedJobsItem} keyExtractor={item => item.id} />

                <FlatList data={selectedJobs} renderItem={renderSelectedJobsItem} keyExtractor={item => item.id} />
              </>
            ) : (
              isVerified === 'verified' && (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noData}>You haven't been hired for any jobs yet!</Text>
                </View>
              )
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyJobService;
