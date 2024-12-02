import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllJobs, fetchCategories, toggleCategory} from '../../redux/home/action';
import HomeScreen from './home-screen';
import CustomLoader from '../../organisms/customLoader';
import firestore from '@react-native-firebase/firestore';
import {envConfig} from '../../assets/helpers/envApi';
import {updateProviderStatus} from '../../redux/providerstatus/action';
import {useRoute} from '@react-navigation/native';
import {db} from '../../../firebaseDb';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {fetchServiceProviderDetails} from '../../redux/providerstatus/action';
import {fetchSelectedProfileDetails} from '../../redux/selectedprofiledetails/action';
import {FETCH_UNREAD_MESSAGES, fetchUnreadMessages} from '../../redux/unreadmessages/action';
import database from '@react-native-firebase/database';
import {fetchSelectedJobs} from '../../redux/selectedjobs/action';
import {fetchCollectionDetails, getUserDetails} from '../../common/collection';
import {loginSuccess} from '../../redux/auth/action';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const HomeContainer = ({navigation}) => {
  const route = useRoute();
  const selectedLocation = route?.params?.selectedLocation;
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [spotLight, setSpotLight] = useState([]);
  const [load, setLoading] = useState('');
  const user = useSelector(state => state.Auth.user);
  const authDetails = useSelector(state => state.Auth);

  const userId = user.userId;

  const {currentLocation, permissionRes, latlang} = useSelector(state => state?.location);

  const categoriesData = [
    {
      key: 1,
      text: 'Entertainers',
      apiName: 'ENTERTAINERS',
      image: 'ArtistIcon',
    },
    {
      key: 2,
      text: 'Photographers',
      apiName: 'PHOTOGRAPHER',
      image: 'BeautyIcon',
    },
    {
      key: 3,
      text: 'Tech & Design',
      apiName: 'TECH & DESIGN',
      image: 'RepairIcon',
    },
    {
      key: 4,
      text: 'Delivery',
      apiName: 'DELIVERY',
      image: 'CleaningIcon',
    },
    {
      key: 5,
      text: 'Beauty',
      apiName: 'BEAUTY & WELLNESS',
      image: 'DriverIcon',
    },
    {
      key: 6,
      text: 'Appliance Repair',
      apiName: 'APPLIANCE REPAIR',
      image: 'HaircutIcon',
    },
    {
      key: 7,
      text: 'Video Makers',
      apiName: 'VIDEO MAKERS',
      image: 'HostIcon',
    },
    {
      key: 8,
      text: 'Events',
      image: 'Host',
    },
    // {
    //   key: 9,
    //   text: 'More',
    //   image: 'More',
    // },
  ];
  const [filteredJobs, setFilteredJobs] = useState([]);
  const selectedCategories = useSelector(state => state.home.selectedCategories);
  const {loading, jobs, categories} = useSelector(state => state.home);
  const [featured, setFeatured] = useState([]);
  const [filteredLocationJobs, setfilteredLocationJobs] = useState();
  const [hasNotifications, setHasNotifications] = useState(false);

  //////////////////Filter Jobs(Remove Spotlight Jobs)///////////////
  const removeSpotlightJobs = jobs.filter(eachJob => {
    return !(eachJob?.jobAds?.type === 'SPOTLIGHT');
  });

  ////////////////All jobs sorting based on createdOn field////////////
  const sortingJobs = removeSpotlightJobs.sort((a, b) => {
    return b.createdOn - a.createdOn;
  });

  useEffect(() => {
    // Filter jobs based on user's location
    if (currentLocation && jobs) {
      const filtered = jobs.filter(job => {
        // Define latitude and longitude range
        const latRange = [latlang.latitude - 0.05, latlang.latitude + 0.05];
        const lngRange = [latlang.longitude - 0.05, latlang.longitude + 0.05];

        // Check if job's latitude and longitude are within the range
        return (
          job.area?.lat >= latRange[0] &&
          job.area?.lat <= latRange[1] &&
          job.area?.lng >= lngRange[0] &&
          job.area?.lng <= lngRange[1]
        );
      });

      setfilteredLocationJobs(filtered);
    }
  }, [currentLocation, jobs]);

  // const calculateDistance = (lat1, lon1, lat2, lon2) => {
  //   const R = 6371; // Radius of the Earth in kilometers
  //   const dLat = toRadians(lat2 - lat1);
  //   const dLon = toRadians(lon2 - lon1);
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = R * c;
  //   return distance;
  // };

  // const toRadians = degrees => {
  //   return degrees * (Math.PI / 180);
  // };

  useEffect(() => {
    dispatch(fetchAllJobs());
    dispatch(fetchCategories());
    fetchSpotlightJobs();
    fetchFreeFeatured();
    dispatch(fetchServiceProviderDetails(user.userId));
    dispatch(fetchSelectedJobs());
    dispatch(fetchUnreadMessages(user.userId));
    // dispatch(fetchSelectedProfileDetails())
    // dispatch(());
  }, [latlang]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const handleEndReached = () => {
    const nextPage = currentPage + 1;

    if (jobs.length > nextPage * pageSize) {
      setCurrentPage(nextPage);
    }
  };

  // const allJobs = featured?.slice(0, currentPage * pageSize);

  const fetchFreeFeatured = async () => {
    try {
      const querySnapshot = await firestore()
        .collection(envConfig.Jobs)
        // .orderBy('createdOn', 'desc')
        .where('jobAds.type', '!=', 'SPOTLIGHT')
        // .orderBy('createdOn', 'asc')
        .get();

      const fetchedJobs = [];
      querySnapshot.forEach(documentSnapshot => {
        fetchedJobs.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });

      setFeatured(fetchedJobs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch jobs whenever searchText changes
    jobsSearch();
  }, [searchText]);

  const toggleCategories = cat => {
    if (selectedCategories.includes(cat)) {
      dispatch(toggleCategory(cat));
    } else {
      dispatch(toggleCategory(cat));
    }
  };

  const renderPopular = category => {
    navigation.navigate('JobsList', {featured, category, navigation});
  };

  const handleCategoryPress = (item, category) => {
    navigation.navigate('search', {item, jobs, category, categories, navigation});
  };

  const [printedCategories, setPrintedCategories] = useState([]);

  const jobsSearch = async () => {
    try {
      const q = query(
        collection(db, envConfig.Jobs),
        where('data.jobTitle', '>=', searchText),
        where('data.jobTitle', '<=', searchText + '\uf8ff'),
      );

      const snapshot = await getDocs(q);

      const jobss = [];
      snapshot.forEach(documentSnapshot => {
        jobss.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });

      setFilteredJobs(jobss);
    } catch (error) {
      console.error(error);
    }
  };
  const showSpotLight = () => {
    navigation.navigate('SpotLight', {spotLight, navigation});
  };

  const [loader, Setloader] = useState(false);
  const checkNotification = async () => {
    const notifications = await fetchCollectionDetails(envConfig.Notifications);
    const userNotifications = notifications.filter(
      notification => notification.userId === userId && !notification.markasread,
    );
    if (userNotifications.length > 0) {
      setHasNotifications(true);
      console.log('total notifications user has', userNotifications.length);
    } else {
      setHasNotifications(false);
    }
  };
  const fetchSpotlightJobs = async () => {
    try {
      Setloader(true);

      const querySnapshot = await firestore().collection(envConfig.Jobs).where('jobAds.type', '==', 'SPOTLIGHT').get();

      const spotlightJobs = [];
      querySnapshot.forEach(documentSnapshot => {
        spotlightJobs.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });
      setSpotLight(spotlightJobs);
      Setloader(false);
    } catch (error) {
      console.error(error);
    }
  };

  const showAllCategory = subcategoryName => {
    navigation.navigate('CategoryList', {selectedCategory: subcategoryName});
  };

  const incrementAdViews = async (adId, userId, postedBy) => {
    try {
      const adRef = firestore().collection(envConfig.Jobs).doc(adId);
      const adDoc = await adRef.get();

      if (userId !== postedBy) {
        // Check if the user has not viewed the ad before
        if (!adDoc.data()?.viewedBy?.includes(userId)) {
          // Update the views count and add the user to the viewedBy array
          await adRef.update({
            // views: firestore.FieldValue.increment(1),
            viewedBy: firestore.FieldValue.arrayUnion(userId),
          });
          dispatch(fetchAllJobs());
        }
      }
    } catch (error) {
      console.error('Error incrementing ad views:', error);
    }
  };

  const handleJobPress = job => {
    incrementAdViews(job.id, user.userId, job.postedBy);

    navigation.navigate('JobDeatil', {
      imageSource: job.imageUrls[0],
      category: job.data.category,
      title: job.data.jobTitle,
      description: job.data.jobDescription,
      price: job.data.salary,
      location: job?.locationDesc?.description,
      postedBy: job.postedBy,
      id: job.id,
      jobAdType: job.jobAds.type,
      createdOn: job.createdOn,
      starttime: job.data.starttime,
      startdate: job.data.startdate,
      subCategory: job.data.subCategory,
      images: job.imageUrls,
      area: job.area,
      lat: job.location.lat,
      lng: job.location.lng,
      address: job.address,
      userName: job.userName,
      IsPaid: job?.IsPaid ? job?.IsPaid : false,
    });
    setSearchText('');
  };

  const sortedSpotlightJobs = spotLight.sort((a, b) => {
    // Assuming 'createdOn' is a timestamp in milliseconds
    return b.createdOn - a.createdOn;
  });

  const allJobs = featured.sort((a, b) => {
    // Assuming 'createdOn' is a timestamp in milliseconds
    return b.createdOn - a.createdOn;
  });

  const needtodispatch = userId => {
    const getUser = async () => {
      try {
        const user = getUserDetails(envConfig.User, userId);
        return user;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    getUser().then(user => {
      dispatch(loginSuccess(user));
    });
  };

  // const fetchUnreadMessages = async userId => {
  //   try {
  //     const snapshot = await database().ref(`/chatlist/${userId}`).once('value');
  //     const chatList = snapshot.val() || {};

  //     let unreadMessages = [];

  //     // Loop through each chat room to check for unread messages
  //     for (let key in chatList) {
  //       const chatRoom = chatList[key];
  //       const roomId = chatRoom.roomId;

  //       if (!roomId) {
  //         continue; // Skip if there's no roomId
  //       }

  //       const roomSnapshot = await database().ref(`/messages/${roomId}`).once('value');
  //       const messages = roomSnapshot.val();
  //       console.log(messages, 'messages in room');

  //       // Filter out unread messages
  //       const roomUnreadMessages = Object.values(messages || {}).filter(
  //         message => message.markasread === false && message.from !== userId,
  //       );

  //       console.log(roomUnreadMessages, 'room unread');

  //       if (roomUnreadMessages.length > 0) {
  //         unreadMessages = [...unreadMessages, ...roomUnreadMessages];
  //       }
  //     }

  //     console.log(unreadMessages, 'All unread messages');

  //     dispatch({
  //       type: FETCH_UNREAD_MESSAGES,
  //       payload: unreadMessages,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching unread messages:', error);
  //   }
  // };

  // fetchUnreadMessages(user.userId);

  const onRefresh = useCallback(() => {
    // Dispatch the action to fetch data here
    dispatch(fetchServiceProviderDetails(user.userId));

    dispatch(fetchAllJobs());
    dispatch(fetchCategories());
    needtodispatch(user.userId);
    checkNotification();
    fetchSpotlightJobs();
    fetchFreeFeatured();
    dispatch(fetchSelectedJobs());
    dispatch(fetchSelectedProfileDetails());
    dispatch(fetchUnreadMessages(user.userId));
  }, [dispatch]);

  //code to check for notifications every 5 seconds it is not good to have in production
  // useEffect(() => {
  //   console.log('checking for notifications...');
  //   checkNotification();
  //   const intervalId = setInterval(() => {
  //     checkNotification();
  //   }, 300);
  //   return () => clearInterval(intervalId);
  // }, []);

  const [categoriesSearlist, setcategoriesSearlist] = useState('');
  // console.log("filteredJobs",filteredJobs)
  const fetchCategoriedData = async searchText => {
    try {
      // Check if searchText is provided
      if (searchText) {
        let queryRef = firestore().collection(envConfig.Categories).orderBy('name');

        // Convert searchText to lowercase
        const searchTextUpper = searchText.toUpperCase();

        // Add a where clause to filter based on the 'name' field (case-insensitive)
        queryRef = queryRef.where('name', '>=', searchTextUpper).where('name', '<=', searchTextUpper + '\uf8ff');

        const snapshot = await queryRef.get();

        const categoryDatasearchData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (categoryDatasearchData.length === 0) {
          setcategoriesSearlist([{id: 'no-data', name: `Oops! It seems we don't have this category yet`}]);
        } else {
          setcategoriesSearlist(categoryDatasearchData);
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategoriedData(searchText);
  }, [searchText]);
  return (
    <>
      <HomeScreen
        // jobs={jobs}
        category={categories}
        navigation={navigation}
        categoriesData={categoriesData}
        showAllCategory={showAllCategory}
        searchText={searchText}
        setSearchText={setSearchText}
        filteredJobs={filteredJobs}
        selectedCategories={toggleCategories}
        toggleCategory={toggleCategory}
        loading={loading}
        setLoading={setLoading}
        handleJobPress={handleJobPress}
        spotLight={sortedSpotlightJobs}
        allJobs={sortingJobs}
        // allJobs={jobs}
        printedCategories={printedCategories}
        setPrintedCategories={setPrintedCategories}
        showSpotLight={showSpotLight}
        handleCategoryPress={handleCategoryPress}
        renderPopular={renderPopular}
        selectedLocation={selectedLocation}
        currentLocation={currentLocation}
        dispatch={dispatch}
        permissionRes={permissionRes}
        onRefresh={onRefresh}
        loader={loader}
        categoriesSearlist={categoriesSearlist}
        hasNotifications={hasNotifications}
      />

      {/* <CustomLoader visible={loading} /> */}
    </>
  );
};

export default HomeContainer;
