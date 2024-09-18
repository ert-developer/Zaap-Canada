import React, {useEffect, useState} from 'react';
import MoreJobs from './moreJobs-screen';
import {envConfig} from '../../assets/helpers/envApi';
import firestore from '@react-native-firebase/firestore';
import {fetchCollectionDetails} from '../../common/collection';

const MoreJobscontainer = ({navigation, route}) => {
  const [catJobs, setCatJobs] = useState([]);
  const {selectedCategories} = route.params;
  const fetchJobsByCategory = async selectedCat => {
    try {
      const querySnapshot = await firestore()
        .collection(envConfig.Jobs)
        .where('data.category', 'in', selectedCat)
        .where('jobAds.type', '!=', 'SPOTLIGHT')
        .orderBy('jobAds.type', 'asc')
        .orderBy('createdOn', 'desc')
        .get();

      const jobData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      return jobData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const filteredJobs = await fetchJobsByCategory(selectedCategories);
      setCatJobs(filteredJobs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJobPress = job => {
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

  useEffect(() => {
    fetchData(); // Call fetchData inside useEffect
  }, [selectedCategories]);

  // const sortedCatJobs = catJobs?.sort((a, b) => {
  //   // Assuming 'createdOn' is a timestamp in milliseconds
  //   return b.createdOn - a.createdOn;
  // });
  return <MoreJobs navigation={navigation} catJobs={catJobs} handleJobPress={handleJobPress} />;
};

export default MoreJobscontainer;
