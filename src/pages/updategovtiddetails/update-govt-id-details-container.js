import UpdateGovtIdDetailsScreen from './update-govt-id-details-screen';
import {useEffect, useState} from 'react';
import {uploadImage} from '../../common/camera';
import {fetchCollectionDetails} from '../../common/collection';
import {envConfig} from '../../assets/helpers/envApi';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {postCollectionDetails} from '../../common/collection';

const UpdateGovtIdDetailsContainer = () => {
  const AuthUser = useSelector(state => state.Auth);
  const userID = AuthUser.user.userId;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dob, setDob] = useState('');

  const [documents, setDocuments] = useState([]);
  const [showIdExpirationPicker, setShowIdExpirationPicker] = useState(false);
  const [idExpirationDate, setIdExpirationDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  let generateInitialForm = (categories, value) => {
    const initialForm = {};
    categories.forEach(category => {
      category.inputFields.forEach(field => {
        initialForm[field.name.toLowerCase().split(' ').join('_')] = value === 'initialState' ? '' : false;
      });
    });
    return initialForm;
  };

  //   console.log('categoriesData--------------------', categoriesData);

  const updateGovtIdDetails = [
    {
      category: 'BACKGROUND CHECK',
      inputFields: [
        {name: 'PERSONAL PHOTO', type: 'buttonIcon', totalWidth: true},
        // {
        //   name: 'Personal Photo, Document Front & Back Photo is required. Please submit a clear and visible selfie to prevent interruptions in background check',
        //   type: 'textt',
        //   info: true,
        // },
        {name: 'Date of Birth', type: 'date', totalWidth: true},
        // {name: 'ID Category', type: 'picker', totalWidth: true},
        {name: 'ID Type', type: 'picker', totalWidth: true},
        {name: 'ID Number', type: 'text', totalWidth: true},
        {name: 'ID Expiration Date', type: 'date', totalWidth: true},
        {name: 'FRONT', type: 'buttonIcon', totalWidth: false},
        {name: 'BACK', type: 'buttonIcon', totalWidth: false},
        // {
        //   name: 'Please submit a clear and visible ID photos - Front and Back. ',
        //   type: 'textt',
        //   info: true,
        // },
      ],
      flag: false,
    },
  ];

  const indiaGovDocs = [
    {name: 'Aadhar', value: 'aadhar'},
    {name: 'Passport', value: 'passport'},
    {name: "Driver's License", value: 'driverslicense'},
    {name: 'Voter ID', value: 'voterid'},
  ];

  const [formData, setFormData] = useState(generateInitialForm(updateGovtIdDetails, 'initialState'));
  const [formErrors, setFormErrors] = useState(generateInitialForm(updateGovtIdDetails, 'errorValidation'));

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChangeDate = selectedDate => {
    toggleDatePicker(); // Close the date picker
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-based
      const day = currentDate.getDate();

      // Format the date as YYYY-MM-DD
      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
      setDob(formattedDate);

      // Set the selected date to the state variable
      setDob(formattedDate);
      onHandleInputChange('date_of_birth', currentDate); // Update the form data with the selected date
    }
  };

  const toggleIdExpirationDatePicker = () => {
    setShowIdExpirationPicker(!showIdExpirationPicker);
  };

  const onIdExpirationDateChange = selectedDate => {
    toggleIdExpirationDatePicker(); // Close the date picker
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-based
      const day = currentDate.getDate();

      // Format the date as YYYY-MM-DD
      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
      setIdExpirationDate(formattedDate);

      // Update the form data with the selected date
      onHandleInputChange('id_expiration_date', formattedDate);
    }
  };

  const isInteger = value => /^\d*$/.test(value);

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

  const handleOpenCamera = (sourceType, fieldName, imageIndex) => {
    uploadImage(sourceType, response => handleImageResponse(response, fieldName, imageIndex), fieldName);
  };

  const handleImageResponse = (response, fieldName) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      if (response.assets && response.assets.length > 0) {
        const newImages = response.assets.slice(0, 3);
        const imageUrls = [];

        for (const image of newImages) {
          const storageRef = storage().ref(`verification-images/${Date.now()}-${image.fileName}`);

          const uploadTask = storageRef.putFile(image.uri);
          // Listen for state changes, then get the download URL
          uploadTask.on(
            'state_changed',
            snapshot => {
              // Handle progress, if needed
            },
            error => {
              console.error('Error uploading image to Firebase:', error);
            },
            async () => {
              // Upload completed successfully, get the download URL
              const downloadURL = await storageRef.getDownloadURL();
              imageUrls.push(downloadURL);
              // Store the image URLs directly in your formData
              setFormData(prevData => ({
                ...prevData,
                [fieldName.toString()]: [...(prevData[fieldName.toString()] || []), ...imageUrls],
              }));

              setFormErrors(prevState => ({...prevState, [fieldName.toString()]: false}));
            },
          );
        }
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

  // const updateServiceProviderBankDetails = async () => {
  //   try {
  //     const querySnapshot = await firestore().collection('Provider_dev').where('provider_id', '==', `${userID}`).get();

  //     const batch = firestore().batch();
  //     querySnapshot.forEach(documentSnapshot => {
  //       const docRef = firestore().collection('Provider_dev').doc(documentSnapshot.id);
  //       batch.update(docRef, {
  //         date_of_birth: formData.date_of_birth,
  //         id_category: formData.id_category,
  //         id_type: formData.document_name,
  //         id_number: formData.id_number,
  //         id_expiration_date: formData.id_expiration_date,
  //         personal_photo: formData.personal_photo,
  //         front: formData.front,
  //         back: formData.back,
  //       });
  //     });
  //     await batch.commit();
  //     console.log('Fields updated successfully');
  //     setShowPopup(true);
  //     setFormData(generateInitialForm(updateGovtIdDetails, 'initialState'));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
  };

  return (
    <UpdateGovtIdDetailsScreen
      updateGovtIdDetails={updateGovtIdDetails}
      showDatePicker={showDatePicker}
      setShowDatePicker={setShowDatePicker}
      toggleDatePicker={toggleDatePicker}
      onChangeDate={onChangeDate}
      dob={dob}
      handleInputChange={onHandleInputChange}
      formErrors={formErrors}
      formData={formData}
      handleOpenCamera={handleOpenCamera}
      handleDeleteImage={handleDeleteImage}
      govDocuments={documents}
      toggleIdExpirationDatePicker={toggleIdExpirationDatePicker}
      onIdExpirationDateChange={onIdExpirationDateChange}
      idExpirationDate={idExpirationDate}
      showIdExpirationPicker={showIdExpirationPicker}
      onSubmitGovtIdDetails={onSubmitGovtIdDetails}
      showPopup={showPopup}
      onClosePopup={onClosePopup}
      indiaGovDocs={indiaGovDocs}
    />
  );
};

export default UpdateGovtIdDetailsContainer;
