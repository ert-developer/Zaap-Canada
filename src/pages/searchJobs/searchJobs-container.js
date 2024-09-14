import React from 'react';
import SearchJobs from './searchJobs-screen';

const SearchJobsContainer = ({navigation, route}) => {
  const {item, jobs, categories, category} = route.params;
  let filterdJobs = [];

  filterdJobs = jobs?.filter(job => job?.data?.category === category);

  const handleJobPress = job => {
    navigation.navigate('JobDeatil', {
      imageSource: job.imageUrls[0],
      category: job.data.category,
      title: job.data.jobTitle,
      description: job.data.jobDescription,
      price: job.data.salary,
      where: job.locationDesc.description,
      postedBy: job.postedBy,
      // IsPaid: job?.IsPaid
    });
  };
  return (
    <SearchJobs filterdJobs={filterdJobs} category={category} navigation={navigation} handleJobPress={handleJobPress} />
  );
};

export default SearchJobsContainer;
