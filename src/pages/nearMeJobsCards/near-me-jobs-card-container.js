import NearMeJobsScreen from './near-me-jobs-card-screen';
import {useNavigation} from '@react-navigation/native';

const NearMeJobsContainer = ({route}) => {
  const nearMeJobs = route.params;
  const navigation = useNavigation();

  const handleJobPress = item => {
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

  return <NearMeJobsScreen handleJobPress={handleJobPress} nearMeJobs={nearMeJobs} />;
};

export default NearMeJobsContainer;
