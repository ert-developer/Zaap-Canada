import React, {useEffect, useState} from 'react';
import ProfileScreen from './profile-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useErrorHandler from '../../custom-hooks/error-handler/useErrorHandler.js';
import {getUserDetails, updateCollectionDetails} from '../../common/collection';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logError} from '../../utils/logger/logger';
import CustomLoader from '../../organisms/customLoader';
import {envConfig} from '../../assets/helpers/envApi';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {logoutSuccess} from '../../redux/auth/action.js';
import {loginSuccess} from '../../redux/auth/action';
import storage from '@react-native-firebase/storage';

const ProfileContainer = ({navigation}) => {
  const [customerPreJobsList, setCustomerPreJobsList] = useState([]);
  const {jobs} = useSelector(state => state.home);

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    phone: '',
    address: '',
    dob: '',
    images: '',
    city: '',
    provinces: '',
    // bio: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    gender: false,
    phone: false,
    dob: false,
    images: false,
    address: false,
    city: false,
    provinces: false,
    // bio: false,
  });

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Non-Binary', value: 'Non-Binary'},
  ];

  const canadaProvincesOptions = [
    //changing to india states
    // {label: 'British Columbia', value: 'British Columbia'},
    // {label: 'Alberta', value: 'Alberta'},
    // {label: 'Saskatchewan', value: 'Saskatchewan'},
    // {label: 'Manitoba', value: 'Manitoba'},
    // {label: 'Ontario', value: 'Ontario'},
    // {label: 'Quebec', value: 'Quebec'},
    // {label: 'New Brunswick', value: 'New Brunswick'},
    // {label: 'Nova Scotia', value: 'Nova Scotia'},
    // {label: 'Prince Edward Island', value: 'Prince Edward Island'},
    // {label: 'Newfoundland and Labrador', value: 'Newfoundland and Labrador'},
    {label: 'Andhra Pradesh', value: 'Andhra Pradesh'},
    {label: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
    {label: 'Assam', value: 'Assam'},
    {label: 'Bihar', value: 'Bihar'},
    {label: 'Chhattisgarh', value: 'Chhattisgarh'},
    {label: 'Goa', value: 'Goa'},
    {label: 'Gujarat', value: 'Gujarat'},
    {label: 'Haryana', value: 'Haryana'},
    {label: 'Himachal Pradesh', value: 'Himachal Pradesh'},
    {label: 'Jharkhand', value: 'Jharkhand'},
    {label: 'Karnataka', value: 'Karnataka'},
    {label: 'Kerala', value: 'Kerala'},
    {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
    {label: 'Maharashtra', value: 'Maharashtra'},
    {label: 'Manipur', value: 'Manipur'},
    {label: 'Meghalaya', value: 'Meghalaya'},
    {label: 'Mizoram', value: 'Mizoram'},
    {label: 'Nagaland', value: 'Nagaland'},
    {label: 'Odisha', value: 'Odisha'},
    {label: 'Punjab', value: 'Punjab'},
    {label: 'Rajasthan', value: 'Rajasthan'},
    {label: 'Sikkim', value: 'Sikkim'},
    {label: 'Tamil Nadu', value: 'Tamil Nadu'},
    {label: 'Telangana', value: 'Telangana'},
    {label: 'Tripura', value: 'Tripura'},
    {label: 'Uttar Pradesh', value: 'Uttar Pradesh'},
    {label: 'Uttarakhand', value: 'Uttarakhand'},
    {label: 'West Bengal', value: 'West Bengal'},
    {label: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands'},
    {label: 'Chandigarh', value: 'Chandigarh'},
    {label: 'Dadra and Nagar Haveli and Daman and Diu', value: 'Dadra and Nagar Haveli and Daman and Diu'},
    {label: 'Lakshadweep', value: 'Lakshadweep'},
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Puducherry', value: 'Puducherry'},
  ];

  const [editMode, setEditMode] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [loader, setloader] = useState(false);
  const [updateSuccessPopup, setUpdateSuccessPopup] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);

  const {handleError} = useErrorHandler();

  const dispatch = useDispatch();

  const {isLogIn} = useSelector(state => state.Auth);
  const [userDetails, setUserDetails] = useState([]);

  const user = useSelector(state => state.Auth.user);
  // console.log('user.....', user);
  const uid = user?.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await getUserDetails(envConfig.User, uid);
        if (userDetails) {
          setFormData({
            name: userDetails.displayName || '',
            phone: userDetails.phoneNumber || '',
            email: userDetails.email || '',
            address: userDetails.address || '',
            dob: userDetails.dob || '',
            images: userDetails.imageUrl || '',
            city: userDetails.city || '',
            provinces: userDetails.provinces || '',
            // bio: userDetails.bio || '',
          });
        }
        setUserDetails(userDetails);
        // Handle userDetails as needed
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle the error
      }
    };

    fetchData();
  }, []);

  const getCustomerPreviousJobsDetails = () => {
    const customerID = user?.userId;
    const customerJobs = jobs.filter(eachJob => eachJob.postedBy === customerID);
    setCustomerPreJobsList(customerJobs);
  };

  useEffect(() => {
    getCustomerPreviousJobsDetails();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const isInteger = value => /^\d*$/.test(value);
  const isTenDigitNumber = value => /^\d{0,10}$/.test(value);
  // console.log("isTenDigitNumber", isTenDigitNumber)

  const updateField = (field, value) => {
    // Remove the error style when the user is typing in any input box
    const cleanedValue = value?.replace(/\D/g, '');
    setFormErrors({...formErrors, [field]: false});
    if (field === 'phone' && !isTenDigitNumber(cleanedValue)) {
      setFormErrors({...formErrors, [field]: true});
    } else {
      // if (editMode) {
      setFormData({...formData, [field]: value});
      // }
    }
  };

  // Upload the images from camera & gallery
  const uploadImage = sourceType => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      maxWidth: 600,
      maxHeight: 600,
      quality: 0.8,
      includeBase64: false,
      saveToPhotos: true,
      cameraType: 'back',
      videoQuality: 'high',
      durationLimit: 10,
    };

    const callback = response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        if (response.assets && response.assets.length > 0) {
          const selectedImageUri = response.assets[0].uri;
          handleImageUpload(selectedImageUri);
        }
      }
      setModalVisible(false);
    };

    if (sourceType === 'camera') {
      launchCamera(options, callback);
    } else if (sourceType === 'gallery') {
      launchImageLibrary(options, callback);
    }
  };

  const handleImageUpload = async uri => {
    try {
      // Set loader to true when the upload process starts
      setImageLoader(true);

      const imageName = `image_${Date.now()}.jpg`;
      const storageRef = storage().ref(`images/${imageName}`);
      await storageRef.putFile(uri);

      // Get the download URL after the upload is complete
      const downloadURL = await storageRef.getDownloadURL();

      // Update the form data with the image URL
      setFormData({...formData, images: downloadURL});
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
    } finally {
      // Set loader to false when the upload process is finished
      setImageLoader(false);
    }
  };

  const saveProfile = async () => {
    const requiredFields = ['name', 'phone', 'address', 'dob', 'city', 'provinces', 'email'];
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Adjust this regex to match the specific format of your phone numbers

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].length <= 0) {
        errors[field] = true;
      }
    });

    // Additional validation for email and phone number
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = true;
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.phone = true;
    }

    if (Object.keys(errors).length > 0) {
      // If there are errors, show error style and set formErrors state
      setFormErrors({...formErrors, ...errors});
    } else {
      setloader(true);
      // No errors, proceed with form submission
      try {
        const {name, images, address, phone, dob, city, provinces, email} = formData;

        // Create a reference to the storage service
        // const storageRef = storage.ref();

        // // Generate a unique filename for the image (you can customize this logic)
        // const imageName = `${uid}_${Date.now()}.jpg`;

        // // Create a reference to the file in the storage
        // const imageRef = storageRef.child(`images/${imageName}`);

        // // Upload the file to the storage
        // const snapshot = await imageRef.putString(images, 'data_url'); // Assuming images is a base64 encoded data URL

        // // Get the HTTPS link to the uploaded image
        // const uploadedImageUrl = await snapshot.ref.getDownloadURL();

        let profileData = {
          creationTime: Date.now(),
          displayName: name,
          email: email,
          phoneNumber: phone,
          imageUrl: images,
          address: address,
          userId: uid,
          dob: dob,
          city: city,
          provinces: provinces,
          // bio: bio,
        };
        // const uploadedImageUrl = uploadImageToServer('file:///data/user/0/com.zaap/cache/rn_image_picker_lib_temp_1d9e8e38-bc6f-4b85-b994-b97dff5ac07a.jpg');
        // console.log('uploadedImageUrl', uploadedImageUrl)
        // // Now, `uploadedImageUrl` contains the HTTPS link to the uploaded image.
        // console.log("HTTPS URL:", uploadedImageUrl);
        let response = await updateCollectionDetails(envConfig.User, profileData, uid);
        setloader(false);
        dispatch(loginSuccess(profileData));
        setUpdateSuccessPopup(true);
        // Alert.alert('Success', 'Profile posted successfully!', [{text: 'OK'}]);
        // navigation.navigate('HomeScreenStack');
        setEditMode(false);
      } catch (error) {
        logError(error);
      }
    }
  };

  const handleGenderChange = selectedValue => {
    setFormData(prevFormData => ({
      ...prevFormData,
      gender: selectedValue,
    }));
  };

  const handleProvinceChange = selectedValue => {
    setFormData(prevFormData => ({
      ...prevFormData,
      provinces: selectedValue,
    }));
  };

  // const handleLogout = () => {
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       dispatch(logoutSuccess());
  //       GoogleSignin.revokeAccess();
  //       alert('User signed out!');
  //     });
  // };

  // const DobChange = () => {
  //   Alert.alert("hi")
  // }

  // const DobPicker = () => {

  // }

  //Redirection to home after details updated and closed the popup//
  const onPressOnBackdrop = () => {
    setUpdateSuccessPopup(false);
    navigation.navigate('HomeScreen');
  };

  return (
    <>
      <ProfileScreen
        formData={formData}
        saveProfile={saveProfile}
        updateField={updateField}
        navigation={navigation}
        uploadImage={uploadImage}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        formErrors={formErrors}
        isLogIn={isLogIn}
        editMode={editMode}
        setEditMode={setEditMode}
        genderOptions={genderOptions}
        handleGenderChange={handleGenderChange}
        handleProvinceChange={handleProvinceChange}
        // handleLogout={handleLogout}
        // DobChange={DobChange}
        user={user}
        userDetails={userDetails}
        loader={loader}
        customerPreJobsList={customerPreJobsList}
        canadaProvincesOptions={canadaProvincesOptions}
        updateSuccessPopup={updateSuccessPopup}
        onPressOnBackdrop={onPressOnBackdrop}
        imageLoader={imageLoader}
      />
      {/* <CustomLoader visible={isLogIn} /> */}
    </>
  );
};

export default ProfileContainer;
