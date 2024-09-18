import React from 'react';
import CustomTouchableOpacity from '../../molecules/touchable-opacity/touchable-opacity-component';
import CardJobs from '../../molecules/job-card/jobCard';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {Margin} from '../../assets/static/globalStyles';

const JobList = ({item, handleJobPress, fav}) => {
  const navigation = useNavigation();

  const {createdOn} = item;
  const timeAgo = moment(createdOn).fromNow();
  const truncateDescription = (text, maxLength) => {
    return text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const jobAdType = item?.jobAds?.type || null;

  const goToJobsDetails = () => {
    navigation.navigate('JobDeatil', {
      imageSource: item.imageUrls[0],
      category: item.data.category,
      title: item.data.jobTitle,
      description: item.data.jobDescription,
      price: item.data.salary,
      location: item?.locationDesc?.description,
      postedBy: item.postedBy,
      id: item.id,
      jobAdType: item.jobAds.type,
      createdOn: item.createdOn,
      starttime: item.data.starttime,
      startdate: item.data.startdate,
      subCategory: item.data.subCategory,
      images: item.imageUrls,
      area: item.area,
      lat: item.location.lat,
      lng: item.location.lng,
      address: item.address,
      userName: item.userName,
      IsPaid: item.IsPaid ? item.IsPaid : false,
    });
  };

  const formattedSalary = parseInt(item?.data?.salary).toLocaleString('en-CA');

  return (
    <CustomTouchableOpacity
      key={item?.id}
      onPress={handleJobPress === null ? () => goToJobsDetails() : () => handleJobPress(item)}
      style={{paddingHorizontal: 6, paddingTop: 0, paddingBottom: 9}}>
      <CardJobs
        key={item?.id}
        image={item?.imageUrls && item?.imageUrls[0]}
        title={item?.data?.jobTitle}
        description={truncateDescription(item?.data?.jobDescription, 100)}
        jobAdType={jobAdType}
        price={formattedSalary}
        item={item}
        timeAgo={timeAgo}
        category={item.data.category}
        location={truncateDescription(item?.locationDesc?.description, 30)}
      />
    </CustomTouchableOpacity>
  );
};

export default JobList;
