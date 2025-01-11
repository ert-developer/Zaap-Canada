import React from 'react';
import JobsList from './jobs-list-screen';

const JobsListContainer = ({navigation, route}) => {
  const {featured, category} = route.params;

  const cat = category?.toUpperCase();

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
