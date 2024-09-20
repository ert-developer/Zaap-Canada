import React, {useState, useEffect, useCallback} from 'react';
import PostJobScreen from './postJob-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {Alert, BackHandler} from 'react-native';
import {fetchCollectionDetails, getJobDetails, postCollectionDetails} from '../../common/collection';
import {postJobRequest, postJobSuccess, postJobFailure} from '../../redux/myJobs/action';
import {useNavigation, useRoute} from '@react-navigation/native';
import usePayment from '../../custom-hooks/payment/usePayment';
import {envConfig} from '../../assets/helpers/envApi';
import {uploadImage} from '../../common/camera';
import {fetchMyJobs} from '../../redux/myJobs/action';
import {fetchAllJobs} from '../../redux/home/action';
import CustomModal from '../../molecules/custommodal';
import {useIsFocused} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {InvoiceNumber} from 'invoice-number';
import {setEditJobStatus} from '../../redux/editjob/action';
import {getDoc, doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../firebaseDb';

const initialFormData = Object.freeze({
  jobTitle: '',
  categories: '',
  subCategory: '',
  salary: '',
  phone: '',
  location: '',
  landmark: '',
  description: '',
  area: '',
  address: '',
  startdate: '',
  starttime: '',
  chekced: false,
  images: [],
  advertisement: {
    type: 'free',
    featured: 'featured',
    spotlight: 'spotlight',
    pay: 0,
  },
});

const PostJobContainer = () => {
  const isFocused = useIsFocused();
  const [isModal, setModal] = useState(false);
  const [jobModal, setJobModal] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(false);
  const [popUps, setPopUps] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [spotlightPaymentAmount, setSpotlightPaymentAmount] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const editablestatus = useSelector(state => state.editJobStatusReducer);

  const fetchData = async () => {
    if (editablestatus.editJobStatus === true) {
      setLoader(true);
      const jobId = editablestatus.jobId;
      try {
        const docRef = doc(db, envConfig.Jobs, jobId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          return data;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
        return null;
      } finally {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const jobData = await fetchData();
      if (jobData) {
        setFormData(prevFormData => ({
          ...prevFormData,
          jobTitle: jobData.data?.jobTitle || '',
          categories: jobData.data?.category || '',
          subCategory: jobData.data?.subCategory[0] || '',
          salary: jobData.data?.salary || 0,
          phone: jobData.phone || '',
          location: jobData.locationDesc?.description || '',
          landmark: '',
          description: jobData.data?.jobDescription || '',
          area: jobData.area || '',
          address: jobData.address || '',
          startdate: jobData.data?.startdate || '',
          starttime: jobData.data?.starttime || '',
          checked: false,
          images: jobData.imageUrls || [],
          advertisement: {
            type: jobData.jobAds?.type || 'free',
            featured: jobData.jobAds?.featured || 'featured',
            spotlight: jobData.jobAds?.spotlight || 'spotlight',
            pay: jobData.jobAds?.pay || 0,
          },
        }));
      }
    };

    loadData();
    // Cleanup function
    return () => {
      dispatch(setEditJobStatus({jobId: null, editJobStatus: false}));
      setFormData(initialFormData);
    };
  }, []);

  // useEffect(() => {
  //   if (isModal) {
  //     setModal(true);
  //   }

  //   return () => {
  //     // Clean up when the component is unmounted
  //     setModal(!isModal);
  //   };
  // }, [isModal]);

  const toggleModal = () => {
    setModal(!isModal);
    console.log('isModal', isModal);
  };

  // const [categories, setCategories] = useState([]);
  const {categories} = useSelector(state => state.home);
  // console.log("categories",categories)

  const [formErrors, setFormErrors] = useState({
    jobTitle: false,
    categories: false,
    subCategory: false,
    salary: false,
    phone: false,
    location: false,
    description: false,
    images: false,
    advertisement: false,
    startdate: false,
    starttime: false,
    area: false,
    address: false,
  });

  const [screenType, setScreenType] = useState('job-form');
  const [exposureValue, setExposureValue] = useState('free');
  const [adType, setAdType] = useState(); //This is for type of add
  const [usedCheckBox, setUsedCheckBox] = useState(false); // this is for check box while posting the premium ad
  const [available, setAvailable] = useState('');
  const [advertisementOptions, setAdvertisementOptions] = useState([
    {
      value: 'SPOTLIGHT',
      label: 'SPOTLIGHT',
      money: 0,
      tags: ['Prime Positioning', 'Exclusive Exposure', 'Maximum Visibility'],
    },
    {
      value: 'FEATURED',
      label: 'FEATURED',
      money: 0,
      tags: ['More Visibility', 'Priority Placement', 'Stand Out'],
    },
  ]);
  const jobPostScreen = () => setScreenType('job-form');
  const [modalVisible, setModalVisible] = useState(false);

  const {isLogIn, user, authError} = useSelector(state => state.Auth);
  const {isPostingJobs, jobs, error} = useSelector(state => state.myJobs);
  const [featuredPayment, setFeaturedPayment] = useState(0);
  const [spotlightPayment, setSpotlightPayment] = useState(0);

  const {handleCheckout} = usePayment();
  const {isPaymenting, paymentData} = useSelector(state => state.payment);

  const navigation = useNavigation();
  // const userID = user.userId;
  const userName = user.displayName;
  // console.log("usrname",userName)
  const userID = user.userId;
  //BY using this we can get the invoice number from the firestore by getting collection details
  const fetchInvoiceNumber = async () => {
    try {
      const response = await fetchCollectionDetails(envConfig.User, userID);
      for (let i = 0; i < response.length; i++) {
        if (response[i].userId === userID) {
          return response[i].invoiceId;
        }
      }
      return invoiceId;
    } catch (error) {
      console.error('Error fetching invoice number:', error);
    }
  };

  const [invoiceId, setInvoiceId] = useState(fetchInvoiceNumber());

  useEffect(() => {
    calculateAdsMoney();
  }, [formData.salary, featuredPayment]);

  useEffect(() => {
    const backAction = () => {
      if (screenType === 'preview-form') {
        // Change screenType to 'job-form' when back is pressed
        setScreenType('job-form');
        return true; // Prevent default back action
      } else if (screenType === 'job-form') {
        // Navigate to the home screen
        navigation.navigate('HomeScreen'); // Adjust 'HomeScreen' to your actual home screen name
        return true; // Prevent default back action
      }

      return false; // Allow default behavior for other screen types
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Cleanup on component unmount
  }, [screenType, navigation]); // Add dependencies for screenType and navigation

  const generateBookingId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const bookingId = generateBookingId();
  // Store image
  const handleImage = sourceType => {
    if (formData.images.length >= 3) {
      // You can display a message to the user indicating that only 3 images are allowed.
      Alert.alert('You can only upload up to 3 images.');
      return;
    }
    uploadImage(sourceType, handleImageResponse);
  };

  const [imagesLoader, setImagesLoader] = useState(false);

  const handleImageResponse = async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      try {
        setImagesLoader(true); // Start loader
        setModalVisible(false);

        if (response.assets && response.assets.length > 0) {
          // Calculate the number of slots left for new images
          const remainingSlots = 3 - formData.images.length;
          const newImages = response.assets.slice(0, remainingSlots); // Limit the number of images based on remaining slots
          const imageUrls = [];

          await Promise.all(
            newImages.map(async image => {
              const storageRef = storage().ref(`images/${Date.now()}-${image.fileName}`);
              await storageRef.putFile(image.uri);
              const downloadURL = await storageRef.getDownloadURL();
              imageUrls.push(downloadURL);
            }),
          );

          // Store the image URLs directly in your formData after all images are uploaded
          setFormData(prevData => ({
            ...prevData,
            images: [...prevData.images, ...imageUrls],
          }));
        }
      } catch (error) {
        console.error('Error uploading image to Firebase:', error);
      } finally {
        setImagesLoader(false); // Stop loader after the process is done
      }
    }
  };

  // Delete the image
  const deleteImage = index => {
    setFormData(prevData => {
      const newImages = [...prevData.images];
      newImages.splice(index, 1);
      return {...prevData, images: newImages};
    });
  };

  const isInteger = value => /^\d*$/.test(value);
  const isTenDigitNumber = value => /^\d{0,10}$/.test(value);
  // HandleChange
  const handleChange = (field, value) => {
    // Remove the error style when the user is typing in any input box
    setFormErrors(prevState => ({...prevState, [field]: false}));

    if (field === 'salary') {
      if (!isInteger(value) || Number(value) <= 0 || String(value).length > 6) {
        setFormErrors(prevState => ({...prevState, [field]: true}));
        setFormData(prevState => ({...prevState, [field]: ''}));
      } else {
        setFormData(prevState => ({...prevState, [field]: Number(value)}));
      }
    } else if (field === 'phone') {
      if (!isTenDigitNumber(value)) {
        setFormErrors(prevState => ({...prevState, [field]: true}));
      } else {
        setFormData(prevState => ({...prevState, [field]: value}));
      }
    } else if (field === 'startdate' && value) {
      setFormData(prevState => ({...prevState, [field]: value}));
    } else if (field === 'starttime' && value) {
      setFormData(prevState => ({...prevState, [field]: value}));
    } else if (field === 'area' && value) {
      setFormData(prevState => ({...prevState, [field]: value}));
    } else if (field === 'address' && value) {
      setFormData(prevState => ({...prevState, [field]: value}));
    } else {
      setFormData(prevState => ({...prevState, [field]: value}));
    }

    if (field === 'area') {
      if (!location.trim()) {
        Alert.alert('Error', 'Please enter a valid location');
        return;
      }
      // Use a geocoding service to convert location to lat/lng
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${envConfig.GOOGLE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            const {lat, lng} = data.results[0].geometry.location;
            console.log('dataaaaaa', lat, lng);
            setLatitude(lat);
            setLongitude(lng);
          } else {
            Alert.alert('Error', 'Location not found');
          }
        })
        .catch(error => {
          console.error('Error fetching location data:', error);
          Alert.alert('Error', 'An error occurred while fetching location data');
        });
    }
  };

  const handlePostJob = async () => {
    dispatch(postJobRequest());
    try {
      const {
        jobTitle,
        categories,
        subCategory,
        salary,
        phone,
        location,
        description,
        images,
        advertisement,
        startdate,
        starttime,
        area,
        address,
      } = formData;

      let jobPostData = {
        createdOn: Date.now(),
        data: {
          jobStatus: 'active', // 'active', 'closed'
          category: categories,
          jobDescription: description,
          jobTitle: jobTitle,
          salary: Number(salary),
          subCategory: [subCategory],
          startdate: startdate,
          starttime: starttime,
        },
        imageUrls:
          images.length === 0
            ? ['https://res.cloudinary.com/dbtmnaluh/image/upload/v1720422769/Default_image_qkg5fw.jpg']
            : images, // Storing in Array
        location: {
          lat: location.location.lat,
          lng: location.location.lng,
        },
        locationDesc: {
          description: location.description,
        },

        area: {lat: area.lat, lng: area.lng},
        // address: {
        //   lat: address.lat,
        //   lng: address.lng,
        // }, commenting address google API
        address: address,
        phone: phone,
        postedBy: userID,
        jobAds: advertisement,
        userName: userName,
        // Include other job-related data here
        invoiceId: invoiceId['_j'],
        bookingId: bookingId,
      };

      let response = await postCollectionDetails(envConfig.Jobs, jobPostData);

      await firestore()
        .collection(envConfig.User)
        .doc(userID)
        .update({
          invoiceId: InvoiceNumber.next(invoiceId['_j']),
        });
      dispatch(fetchMyJobs());
      setJobModal(false);
      dispatch(fetchAllJobs());
      // jobPostScreen();
      setExposureValue('free');
      // setFormData(initialFormData);
      setFormErrors({
        jobTitle: false,
        categories: false,
        subCategory: false,
        salary: false,
        phone: false,
        location: false,
        description: false,
        images: false,
        advertisement: false,
        startdate: false,
        starttime: false,
        area: false,
        address: false,
      });
      setAdType('');
      setPopUps(true);
      // navigation.navigate('HomeScreen');
    } catch (error) {
      dispatch(postJobFailure(error));
      console.error('Error adding job data to Firestore:', error);
    }
  };

  //////////////////This is for Update premium ads Data ////////////////
  const purchasePremiumAds = async payStatus => {
    try {
      const collectionRef = firestore().collection(envConfig.Premium_ads);
      const docRef = collectionRef.doc(userID); // Use the user's ID as the document ID
      const docSnapshot = await docRef.get();

      let updatedFeaturedAds;
      let updatedSpotlightAds;

      // Define pricing for ads
      const featuredPricing = {
        19.99: 1,
        54.99: 3,
        89.99: 5,
        169.99: 10,
      };

      const spotlightPricing = {
        29.99: 1,
        79.99: 3,
        129.99: 5,
        299.99: 10,
      };

      if (docSnapshot.exists) {
        const docsData = docSnapshot.data();

        if (available === 'AVAILABLE' && payStatus === 'used') {
          if (adType === 'FEATURED') {
            updatedFeaturedAds = docsData.featuredAds - 1;
            updatedSpotlightAds = docsData.spotlightAds;
          } else {
            updatedFeaturedAds = docsData.featuredAds;
            updatedSpotlightAds = docsData.spotlightAds - 1;
          }

          // Update the document with the new values
          await docRef.update({
            featuredAds: updatedFeaturedAds,
            spotlightAds: updatedSpotlightAds,
          });
          setUsedCheckBox(false);
        } else {
          const pricing = adType === 'FEATURED' ? featuredPricing : spotlightPricing;
          const paymentAmount = adType === 'FEATURED' ? featuredPayment : spotlightPayment;
          const purchasedAdsCount = pricing[paymentAmount] || 0;

          if (adType === 'FEATURED') {
            updatedFeaturedAds = docsData.featuredAds + purchasedAdsCount - 1;
            updatedSpotlightAds = docsData.spotlightAds;
          } else {
            updatedFeaturedAds = docsData.featuredAds;
            updatedSpotlightAds = docsData.spotlightAds + purchasedAdsCount - 1;
          }

          await docRef.update({
            featuredAds: updatedFeaturedAds,
            spotlightAds: updatedSpotlightAds,
          });
          setAvailable(false);
        }
      } else {
        const pricing = adType === 'FEATURED' ? featuredPricing : spotlightPricing;
        const paymentAmount = adType === 'FEATURED' ? featuredPayment : spotlightPayment;
        const purchasedAdsCount = pricing[paymentAmount] || 0;

        await docRef.set({
          featuredAds: adType === 'FEATURED' ? purchasedAdsCount : 0,
          spotlightAds: adType === 'SPOTLIGHT' ? purchasedAdsCount : 0,
        });
        setAvailable(false);
      }
    } catch (error) {
      console.error('Error purchasing premium ads:', error);
    }
  };

  const [paymentLoader, setPaymentLoader] = useState(false);
  // Save the data
  const handleSubmitJob = async payStatus => {
    const requiredFields = [
      'jobTitle',
      'categories',
      'subCategory',
      'salary',
      'phone',
      'startdate',
      'starttime',
      'location',
      'description',
      'area',
      'address',
      'advertisement',
    ];

    const errors = {};

    // Validate required fields
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].length <= 0) {
        errors[field] = true;
      }
    });

    // Update form errors state if there are validation errors
    if (Object.keys(errors).length > 0) {
      setFormErrors(prevState => ({...prevState, ...errors}));
      return;
    }

    // Additional validations
    if (screenType === 'job-form') {
      if (formData.phone.length !== 10) {
        setFormErrors(prevState => ({...prevState, phone: true}));
      } else {
        setScreenType('preview-form');
      }
    } else {
      const isSpotlight = adType === 'SPOTLIGHT';
      const paymentAmount = isSpotlight ? spotlightPayment : featuredPayment;

      if (parseInt(formData.advertisement.pay) > 0) {
        if (available === 'AVAILABLE' && payStatus === 'used') {
          await purchasePremiumAds(payStatus);
          handlePostJob();
        } else {
          try {
            setPaymentLoader(true);
            let response = await handleCheckout(parseFloat(paymentAmount));
            if (response && response['_documentPath']) {
              await purchasePremiumAds();
              handlePostJob();
            } else {
              Alert.alert('Cancel', 'Canceled Payment.', [{text: 'OK'}]);
            }
          } catch (error) {
            console.log('This is Payment Stripe Response :::::', error);
          }
          setPaymentLoader(false);
        }
      } else {
        handlePostJob();
      }
    }
  };

  // Select the Ads on Post
  const closepopup = () => {
    setPopUps(false);
    jobPostScreen();
    setFormData(initialFormData);
    navigation.navigate('HomeScreen');
  };
  const calculateAdsMoney = () => {
    const salary = parseFloat(formData.salary);
    const updatedOptions = advertisementOptions.map(option => {
      const updatedOption = {...option};
      if (option.value === 'SPOTLIGHT') {
        updatedOption.money = (salary * 0.05).toFixed(2);
      } else if (option.value === 'FEATURED') {
        updatedOption.money = (salary * 0.08).toFixed(2);
      }
      return updatedOption;
    });

    setAdvertisementOptions(updatedOptions);
  };

  const postPaymentMode = useCallback(
    options => {
      if (options === 'free') {
        const values = {type: 'free', pay: 0};
        handleChange('advertisement', values);
      } else {
        handleChange('advertisement', '');
        calculateAdsMoney();
      }
    },
    [exposureValue, formData.salary],
  );

  const GetFeaturePaymentAmount = value => {
    setFeaturedPayment(value);
  };

  const GetSpotlightPaymentAmount = value => {
    setSpotlightPayment(value);
  };

  // const onClosePopup = () => {
  //   setPopUps(false);
  //   // navigation.navigate('HomeScreen');
  // };

  // const closeModal = () => {
  //   // setJobModal(false);
  //   setPopUps(false);
  //   navigation.navigate('HomeScreen');
  // };
  //==================> Update Job Details <=================
  const updateJobDetails = async jobId => {
    try {
      // Reference to the job document
      const jobRef = doc(db, envConfig.Jobs, jobId);
      // Fetch existing job details
      const jobSnap = await getDoc(jobRef);
      if (!jobSnap.exists()) {
        throw new Error('Job does not exist');
      }
      const jobDetails = jobSnap.data();
      // Destructure formData
      const {
        jobTitle,
        categories,
        subCategory,
        salary,
        phone,
        startdate,
        starttime,
        location,
        area,
        address,
        description,
        images,
      } = formData;

      // Prepare the update data
      const updatedJobDetails = {
        ...jobDetails, // Retain existing data
        data: {
          ...jobDetails.data, // Retain existing job data
          jobStatus: 'active', // Or any other status if needed
          category: categories || jobDetails.data.category,
          jobDescription: description || jobDetails.data.jobDescription,
          jobTitle: jobTitle || jobDetails.data.jobTitle,
          salary: Number(salary) || jobDetails.data.salary,
          subCategory: [subCategory] || jobDetails.data.subCategory,
          startdate: startdate || jobDetails.data.startdate,
          starttime: starttime || jobDetails.data.starttime,
        },
        imageUrls:
          images.length === 0
            ? ['https://res.cloudinary.com/dbtmnaluh/image/upload/v1720422769/Default_image_qkg5fw.jpg']
            : images,
        location: {
          lat: location?.lat || jobDetails.location.lat,
          lng: location?.lng || jobDetails.location.lng,
        },
        locationDesc: {
          description: location?.description || jobDetails.locationDesc.description,
        },
        area: {lat: area?.lat || jobDetails.area.lat, lng: area?.lng || jobDetails.area.lng},
        address: address || jobDetails.address,
        phone: phone || jobDetails.phone,
      };
      // Update the job document in Firestore
      await updateDoc(jobRef, updatedJobDetails);
      Alert.alert('Job Details updated successfully');
      navigation.navigate('HomeScreen');
      setFormData(initialFormData);
      dispatch(setEditJobStatus({jobId: null, editJobStatus: false}));
    } catch (error) {
      console.error('Error updating job details:', error);
    }
  };

  ////////////////////////////////////////////////////////////////
  const cancelUpdatedJob = () => {
    setFormData(initialFormData);
    dispatch(setEditJobStatus({jobId: null, editJobStatus: false}));
    navigation.navigate('HomeScreen');
  };

  return (
    <>
      <PostJobScreen
        GetFeaturePaymentAmount={GetFeaturePaymentAmount}
        GetSpotlightPaymentAmount={GetSpotlightPaymentAmount}
        categories={categories}
        formData={formData}
        formErrors={formErrors}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        advertisementOptions={advertisementOptions}
        onUploadImage={handleImage}
        deleteImage={deleteImage}
        handleChange={handleChange}
        onHandleSubmitJob={handleSubmitJob}
        screenType={screenType}
        setScreenType={setScreenType}
        jobPostScreen={jobPostScreen}
        exposureValue={exposureValue}
        setExposureValue={setExposureValue}
        postPaymentMode={postPaymentMode}
        isPostingJobs={isPostingJobs}
        isPaymenting={isPaymenting}
        toggleModal={toggleModal}
        isModal={isModal}
        // closeModal={closeModal}
        jobModal={jobModal}
        availableBalance={availableBalance}
        setAvailableBalance={setAvailableBalance}
        adType={adType}
        setAdType={setAdType}
        usedCheckBox={usedCheckBox}
        setUsedCheckBox={setUsedCheckBox}
        available={available}
        setAvailable={setAvailable}
        popUps={popUps}
        // onClosePopup={onClosePopup}
        closepopup={closepopup}
        setPaymentAmount={setPaymentAmount}
        paymentAmount={paymentAmount}
        paymentLoader={paymentLoader}
        imagesLoader={imagesLoader}
        loader={loader}
        editablestatus={editablestatus}
        updateJobDetails={updateJobDetails}
        cancelUpdatedJob={cancelUpdatedJob}
      />
    </>
  );
};

export default PostJobContainer;
