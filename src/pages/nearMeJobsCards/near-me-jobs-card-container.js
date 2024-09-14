import NearMeJobsScreen from './near-me-jobs-card-screen';
import {useNavigation} from '@react-navigation/native';

const NearMeJobsContainer = ({route}) => {
  const nearMeJobs = route.params;
  const navigation = useNavigation();

  const handleJobPress = job => {
    navigation.navigate('JobDeatil', {
      imageSource: job.imageUrls[0],
      category: job.data.category, //
      title: job.data.jobTitle, //
      description: job.data.jobDescription, //
      price: job.data.salary, //
      location: job?.locationDesc?.description, //////////-----
      postedBy: job.postedBy, //
      id: job.id, //
      jobAdType: job.jobAds.type,
      createdOn: job.createdOn,
      starttime: job.data.starttime,
      startdate: job.data.startdate,
      subCategory: job.data.subCategory,
      images: job.imageUrls, //
      area: job.area,
      lat: job.location.lat,
      lng: job.location.lng,
      address: job.address,
      userName: job.userName,
      // isPaid: job?.IsPaid,
    });
  };

  return <NearMeJobsScreen handleJobPress={handleJobPress} nearMeJobs={nearMeJobs} />;
};

export default NearMeJobsContainer;
