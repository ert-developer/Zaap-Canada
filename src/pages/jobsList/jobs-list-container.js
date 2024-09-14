import React, {useState, useMemo, useEffect} from 'react';
import JobsList from './jobs-list-screen';
import CustomLoader from '../../organisms/customLoader';
import {fetchCollectionDetails} from '../../common/collection';
import {envConfig} from '../../assets/helpers/envApi';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const JobsListContainer = ({navigation, route}) => {
  const [beautyJobs, setBeautyJobs] = useState(false);

  const {featured, category} = route.params;
  const [categories, setCategories] = useState([]);

  const cat = category?.toUpperCase();
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      let response = await fetchCollectionDetails(envConfig.Categories);
      setCategories(response);
    } catch (err) {
      console.log(err);
    }
  };

  const featuredJobs = featured?.filter(
    job => job?.data?.category?.toLowerCase() === category?.toLowerCase() && job.jobAds.type === 'FEATURED',
  );
  const freeJobs = featured?.filter(
    job => job?.data?.category?.toLowerCase() === category?.toLowerCase() && job.jobAds.type === 'free',
  );

  const sortedFeatured = featuredJobs?.sort((a, b) => b.createdOn - a.createdOn);
  const sortedFree = freeJobs?.sort((a, b) => b.createdOn - a.createdOn);

  const sortedJobs = [...sortedFeatured, ...sortedFree];

  const handleJobPress = job => {
    navigation.navigate('JobDeatil', {
      images: job.imageUrls,
      category: job.data.category,
      title: job.data.jobTitle,
      description: job.data.jobDescription,
      price: job.data.salary,
      postedBy: job.postedBy,
      jobAdType: job.jobAds.type,
      location: job.locationDesc.description,
      id: job.id,
      createdOn: job.createdOn,
      starttime: job.data.starttime,
      startdate: job.data.startdate,
      subCategory: job.data.subCategory,
      isExpired: job.isExpired,
      area: job.area,
      address: job.address,
      userName: job.userName,
      IsPaid: job?.IsPaid,
    });
  };

  return (
    <>
      <JobsList
        filterdJobs={sortedJobs}
        handleJobPress={handleJobPress}
        navigation={navigation}
        cat={cat}
        // sortedBeauty={sortedBeauty}
      />
    </>
  );
};

export default JobsListContainer;
