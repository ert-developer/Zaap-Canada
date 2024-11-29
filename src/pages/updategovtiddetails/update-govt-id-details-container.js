import UpdateGovtIdDetailsScreen from './update-govt-id-details-screen';
import {useEffect, useState} from 'react';
import {uploadImage} from '../../common/camera';
import {fetchCollectionDetails} from '../../common/collection';
import {envConfig} from '../../assets/helpers/envApi';
import storage from '@react-native-firebase/storage';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {postCollectionDetails} from '../../common/collection';
import {useNavigation} from '@react-navigation/native';

const UpdateGovtIdDetailsContainer = () => {
  const AuthUser = useSelector(state => state.Auth);
  const userID = AuthUser.user.userId;

  const [documents, setDocuments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [photoLoader, setPhotoLoader] = useState(false);
  const [frontLoader, setFrontLoader] = useState(false);
  const [backLoader, setBackLoader] = useState(false);

  const navigation = useNavigation();

  let generateInitialForm = (categories, value) => {
    const initialForm = {};
    categories.forEach(category => {
      category.inputFields.forEach(field => {
        initialForm[field.name.toLowerCase().split(' ').join('_')] = value === 'initialState' ? '' : false;
      });
    });
    return initialForm;
  };

  const updateGovtIdDetails = [
    {
      category: 'BACKGROUND CHECK',
      inputFields: [
        {name: 'PERSONAL PHOTO', type: 'buttonIcon', totalWidth: true},
        {name: 'Date of Birth', type: 'date', totalWidth: true},
        {name: 'ID Type', type: 'picker', totalWidth: true},
        {name: 'ID Number', type: 'text', totalWidth: true},
        {name: 'ID Expiration Date', type: 'date', totalWidth: true},
        {name: 'FRONT', type: 'buttonIcon', totalWidth: false},
        {name: 'BACK', type: 'buttonIcon', totalWidth: false},
      ],
      flag: false,
    },
  ];

  const indiaGovDocs = [
    {name: 'Canadian passport', value: 'Canadian passport'},
    {name: "Driver's License", value: 'driverslicense'},
    {name: 'Permanent resident card', value: 'Permanent resident card'},
    {name: 'Provincial Identity Cards', value: 'Provincial Identity Cards'},
    {name: 'Study Permit', value: 'Study Permit'},
    {name: 'Work Permit', value: 'Work Permit'},
  ];

  const [formData, setFormData] = useState(generateInitialForm(updateGovtIdDetails, 'initialState'));
  const [formErrors, setFormErrors] = useState(generateInitialForm(updateGovtIdDetails, 'errorValidation'));

  const onHandleInputChange = (field, value) => {
    // console.log('shbsjdhs----------------------------------------', field, value);
    setFormErrors(prevState => ({...prevState, [field]: false}));
    if (field === 'id_number' && value.toString().length > 16) {
      setFormErrors(prevState => ({...prevState, [field]: true}));
    } else {
      setFormData(prevState => ({...prevState, [field]: value}));
    }
  };

  const handleDeleteImage = file => {
    setFormData(prevData => ({
      ...prevData,
      [file]: '',
    }));
  };
  const handleOpenCamera = (sourceType, fieldName) => {
    if (fieldName === 'personal_photo') setPhotoLoader(true);
    if (fieldName === 'front') setFrontLoader(true);
    if (fieldName === 'back') setBackLoader(true);

    uploadImage(sourceType, response => handleImageResponse(response, fieldName), fieldName);
  };

  // Function to handle image response and stop the loader
  const handleImageResponse = (response, fieldName) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      if (fieldName === 'personal_photo') setPhotoLoader(false);
      if (fieldName === 'front') setFrontLoader(false);
      if (fieldName === 'back') setBackLoader(false);
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
      if (fieldName === 'personal_photo') setPhotoLoader(false);
      if (fieldName === 'front') setFrontLoader(false);
      if (fieldName === 'back') setBackLoader(false);
    } else {
      // Assuming the image is uploaded and the URL is set in formData
      const imageUrls = [];
      if (response.assets && response.assets.length > 0) {
        response.assets.forEach(image => {
          const storageRef = storage().ref(`${envConfig.vertification_images}/${Date.now()}-${image.fileName}`);
          const uploadTask = storageRef.putFile(image.uri);

          uploadTask.on(
            'state_changed',
            snapshot => {
              // Handle progress if needed
            },
            error => {
              console.error('Error uploading image to Firebase:', error);
            },
            async () => {
              const downloadURL = await storageRef.getDownloadURL();
              imageUrls.push(downloadURL);
              setFormData(prevData => ({
                ...prevData,
                [fieldName]: [...(prevData[fieldName] || []), ...imageUrls],
              }));
              setFormErrors(prevState => ({...prevState, [fieldName]: false}));
              // Stop the loader
              if (fieldName === 'personal_photo') setPhotoLoader(false);
              if (fieldName === 'front') setFrontLoader(false);
              if (fieldName === 'back') setBackLoader(false);
            },
          );
        });
      }
    }
  };
  //////////////////////This is for Get Govt Id Details Dropdown/////////////////////////
  const getAllDocuments = async () => {
    try {
      let response = await fetchCollectionDetails(envConfig.Provider_docs);
      setDocuments(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  const validateGovernmentID = value => {
    const govtDetails = updateGovtIdDetails.find(option => option.category === 'BACKGROUND CHECK');
    const formErrors = {};

    const isValid = govtDetails.inputFields.every(field => {
      switch (field.name) {
        case 'PERSONAL PHOTO':
          if (!formData.personal_photo) {
            setFormErrors(prevState => ({...prevState, personal_photo: true}));
            return false;
          }
          break;
        case 'Date of Birth':
          if (!formData.date_of_birth) {
            setFormErrors(prevState => ({...prevState, date_of_birth: true}));
            return false;
          }
          break;
        case 'ID Category':
          if (!formData.id_category) {
            setFormErrors(prevState => ({...prevState, id_category: true}));
            return false;
          }
          break;
        case 'ID Type':
          if (!formData.id_type) {
            setFormErrors(prevState => ({...prevState, id_type: true}));
            return false;
          }
          break;
        case 'ID Number':
          if (!formData.id_number) {
            setFormErrors(prevState => ({...prevState, id_number: true}));
            return false;
          }
          break;
        case 'ID Expiration Date':
          if (!formData.id_expiration_date) {
            setFormErrors(prevState => ({...prevState, id_expiration_date: true}));
            return false;
          }
          break;
        case 'FRONT':
          if (!formData.front) {
            setFormErrors(prevState => ({...prevState, front: true}));
            return false;
          }
          break;
        case 'BACK':
          if (!formData.back) {
            setFormErrors(prevState => ({...prevState, back: true}));
            return false;
          }
          break;
        default:
          break;
      }
      return true;
    });

    if (isValid) {
      setFormErrors(prevState => ({...prevState, ...formErrors}));
    } else {
      setFormErrors(prevState => ({...prevState, ...formErrors}));
    }
    return isValid;
  };

  const postToUpadation = async () => {
    const govtDetails = {
      date_of_birth: formData.date_of_birth,
      // id_category: formData.id_category,
      id_type: formData.id_type,
      id_number: formData.id_number,
      id_expiration_date: formData.id_expiration_date,
      personal_photo: formData.personal_photo,
      front: formData.front,
      back: formData.back,
      updatedDateAndTime: new Date(),
    };
    const collection = envConfig.updateGovtIdDetails;
    const document = userID;
    postCollectionDetails(collection, govtDetails, document);
    setShowPopup(true);
    setFormData(generateInitialForm(updateGovtIdDetails, 'initialState'));
  };

  const onSubmitGovtIdDetails = () => {
    const govtDetailsSubmitted = validateGovernmentID();
    if (!govtDetailsSubmitted) {
      Alert.alert('please fill form completely');
    } else {
      // updateServiceProviderBankDetails();
      postToUpadation();
    }
  };

  const onClosePopup = () => {
    setShowPopup(false);
    navigation.navigate('HomeScreen');
  };

  return (
    <UpdateGovtIdDetailsScreen
      updateGovtIdDetails={updateGovtIdDetails}
      handleInputChange={onHandleInputChange}
      formErrors={formErrors}
      formData={formData}
      handleOpenCamera={handleOpenCamera}
      handleDeleteImage={handleDeleteImage}
      govDocuments={documents}
      onSubmitGovtIdDetails={onSubmitGovtIdDetails}
      showPopup={showPopup}
      onClosePopup={onClosePopup}
      indiaGovDocs={indiaGovDocs}
      photoLoader={photoLoader}
      frontLoader={frontLoader}
      backLoader={backLoader}
    />
  );
};

export default UpdateGovtIdDetailsContainer;
