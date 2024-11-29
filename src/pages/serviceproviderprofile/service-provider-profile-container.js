import React, {useEffect, useState} from 'react';
// import ProfileScreen from './profile-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import useErrorHandler from '../../custom-hooks/error-handler/useErrorHandler.js';
import {fetchCollectionDetails, updateCollectionDetails} from '../../common/collection';
import {useDispatch, useSelector} from 'react-redux';
import {logError} from '../../utils/logger/logger';
import {envConfig} from '../../assets/helpers/envApi';
import storage from '@react-native-firebase/storage';
import SeriveProviderProfileScreen from './service-provider-profile-screen';
import {firebase} from '@react-native-firebase/firestore';
import moment from 'moment';

const ServiceProviderProfileContainer = ({navigation}) => {
  const serviceProviderDetails = useSelector(state => state.providerverification.providerDetails);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: serviceProviderDetails[0].legal_name_on_id,
    gender: serviceProviderDetails[0].gender || 'Male',
    phone: serviceProviderDetails[0].phone_number,
    address: serviceProviderDetails[0].home_address || '',
    dob: serviceProviderDetails[0].date_of_birth || '',
    images: serviceProviderDetails[0].personal_photo
      ? serviceProviderDetails[0].personal_photo[0]
      : serviceProviderDetails[0].imageURL,
    city: serviceProviderDetails[0].city,
    email: serviceProviderDetails[0].email_id,
    state: serviceProviderDetails[0].state,
    languagesKnown: serviceProviderDetails[0].languages_known || '',
    professionBio: serviceProviderDetails[0].bio,
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    gender: false,
    phone: false,
    dob: false,
    images: false,
    address: false,
    city: false,
    email: false,
    state: false,
    languagesKnown: false,
    professionBio: false,
  });
  const genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Non-Binary', value: 'Non-Binary'},
  ];

  const canadaProvincesOptions = [
    //change into indian states
    {label: 'British Columbia', value: 'British Columbia'},
    {label: 'Alberta', value: 'Alberta'},
    {label: 'Saskatchewan', value: 'Saskatchewan'},
    {label: 'Manitoba', value: 'Manitoba'},
    {label: 'Ontario', value: 'Ontario'},
    {label: 'Quebec', value: 'Quebec'},
    {label: 'New Brunswick', value: 'New Brunswick'},
    {label: 'Nova Scotia', value: 'Nova Scotia'},
    {label: 'Prince Edward Island', value: 'Prince Edward Island'},
    {label: 'Newfoundland and Labrador', value: 'Newfoundland and Labrador'},
  ].sort((a, b) => a.label.localeCompare(b.label));

  const [editMode, setEditMode] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [loader, setloader] = useState(false);
  const [updateSuccessPopup, setUpdateSuccessPopup] = useState(false);

  const {handleError} = useErrorHandler();

  const dispatch = useDispatch();

  const {isLogIn} = useSelector(state => state.Auth);
  const [usetDetails, setUserDetails] = useState([]);

  const user = useSelector(state => state.Auth.user);
  // console.log('user.....', user);
  const uid = user?.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCollectionDetails(envConfig.Provider);
        const userDetails = response.filter(item => item.provider_id === uid);
        if (userDetails) {
          const dob = userDetails[0].date_of_birth;
          let formattedDob = '';

          if (dob && dob.seconds !== undefined && dob.nanoseconds !== undefined) {
            const dateInMillis = dob.seconds * 1000 + dob.nanoseconds / 1000000;
            const date = new Date(dateInMillis);
            formattedDob = moment(date).format('DD-MM-YYYY');
          } else {
            formattedDob = userDetails[0].date_of_birth;
          }

          setFormData({
            name: userDetails[0].legal_name_on_id,
            gender: userDetails[0].gender || 'Male',
            phone: userDetails[0].phone_number,
            address: userDetails[0].home_address || '',
            dob: formattedDob,
            images: userDetails[0].personal_photo ? userDetails[0].personal_photo[0] : userDetails[0].imageURL,
            city: userDetails[0].city,
            email: userDetails[0].email_id,
            state: userDetails[0].state,
            languagesKnown: userDetails[0].languages_known || '',
            professionBio: userDetails[0].bio,
            // bio: userDetails.bio || '',
          });
        }
        setUserDetails(userDetails);
        // Handle userDetails as needed
      } catch (error) {
        console.error('Error fetching user detils:', error);
        // Handle the error
      }
    };

    fetchData();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const updateField = (field, value) => {
    setFormData({...formData, [field]: value});
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
      const storageRef = storage().ref(`${envConfig.images}/${imageName}`);
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
    const requiredFields = [
      'name',
      'phone',
      'address',
      'gender',
      'dob',
      'city',
      'email',
      'state',
      'languagesKnown',
      'professionBio',
    ];
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
      // No errors, proceed with form submission
      setloader(true);
      try {
        const {name, images, address, phone, city, state, languagesKnown, professionBio} = formData;

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
          phone_number: phone,
          imageURL: images,
          home_address: address,
          userId: uid,
          city: city,
          languages_known: languagesKnown,
          bio: professionBio,
          state: state,
        };
        // const uploadedImageUrl = uploadImageToServer('file:///data/user/0/com.zaap/cache/rn_image_picker_lib_temp_1d9e8e38-bc6f-4b85-b994-b97dff5ac07a.jpg');
        // console.log('uploadedImageUrl', uploadedImageUrl)
        // // Now, `uploadedImageUrl` contains the HTTPS link to the uploaded image.
        // console.log("HTTPS URL:", uploadedImageUrl);
        let uidList = await fetchCollectionDetails(envConfig.Provider);
        let currentUid = uidList.filter(item => item.provider_id === uid);
        await updateCollectionDetails(
          envConfig.Provider,
          {personal_photo: firebase.firestore.FieldValue.delete()},
          currentUid[0].id,
        );
        await updateCollectionDetails(envConfig.Provider, profileData, currentUid[0].id);
        // await updateCollectionDetails(envConfig.User, {displayName: name}, uid);
        // dispatch(loginSuccess(profileData));
        setloader(false);

        // navigation.navigate('HomeScreenStack');
        setUpdateSuccessPopup(true);
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
      state: selectedValue,
    }));
  };

  const onPressOnBackdrop = () => {
    setUpdateSuccessPopup(false);
    navigation.navigate('HomeScreen');
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

  return (
    <>
      <SeriveProviderProfileScreen
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
        usetDetails={usetDetails}
        loader={loader}
        serviceProviderDetails={serviceProviderDetails}
        canadaProvincesOptions={canadaProvincesOptions}
        tooltipVisible={tooltipVisible}
        setTooltipVisible={setTooltipVisible}
        updateSuccessPopup={updateSuccessPopup}
        onPressOnBackdrop={onPressOnBackdrop}
        imageLoader={imageLoader}
      />
      {/* <CustomLoader visible={isLogIn} /> */}
    </>
  );
};

export default ServiceProviderProfileContainer;
