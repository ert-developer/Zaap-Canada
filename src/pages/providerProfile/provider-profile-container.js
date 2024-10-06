import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import ProviderProfile from './provider-profile-screen';
import {Country, State, City} from 'country-state-city';
import {useSelector, useDispatch} from 'react-redux';
import {uploadImage} from '../../common/camera';
import {fetchCollectionDetails, postCollectionDetails, updateCollectionDetails} from '../../common/collection';
import {envConfig} from '../../assets/helpers/envApi';
import {updateProviderStatus} from '../../redux/providerstatus/action';
import {fetchServiceProviderDetails} from '../../redux/providerstatus/action';
import storage from '@react-native-firebase/storage';
import {mailSenter} from '../../common/mailSender';
import firestore from '@react-native-firebase/firestore';

const categoriesOptions = [
  {
    category: 'PERSONAL',
    inputFields: [
      {name: 'Legal Name on ID', type: 'text', totalWidth: true},
      {name: 'Phone Number', type: 'text', totalWidth: true},
      {name: 'Email ID', type: 'text', totalWidth: true},
      {name: 'Home Address', type: 'textArea', totalWidth: true},

      {name: 'Country', type: 'picker', totalWidth: true},
      {name: 'State', type: 'picker', totalWidth: false},
      {name: 'City', type: 'text', totalWidth: false},
      {name: 'Postal Code', type: 'text', totalWidth: true},
      {name: 'Languages Known', type: 'LANGUAGE', totalWidth: true},
      {name: 'Gender', type: 'picker', totalWidth: true},

      {name: 'Bio', type: 'textArea', totalWidth: true},

      // {name: 'Location', type: 'LOCATION', totalWidth: true},

      {name: 'SAVE AND NEXT', type: 'button', totalWidth: true},
    ],
    flag: false,
  },
  // {
  //   category: 'PERSONAL',
  //   inputFields: [
  //     {name: 'Legal Name on ID', type: 'text', totalWidth: true},
  //     {name: 'PHONE NO', type: 'text', totalWidth: true},
  //     {name: 'EMAIL ID', type: 'text', totalWidth: true},
  //     {name: 'BIO', type: 'textArea', totalWidth: true},
  //     {name: 'HOME ADDRESS', type: 'textArea', totalWidth: true},
  //     {name: 'COUNTRY', type: 'picker', totalWidth: true},
  //     {name: 'STATE', type: 'picker', totalWidth: false},
  //     {name: 'CITY', type: 'picker', totalWidth: false},
  //     {name: 'POSTAL CODE', type: 'text', totalWidth: true},
  //     {name: 'SAVE AND NEXT', type: 'button', totalWidth: true},
  //   ],
  //   flag: false,
  // },
  {
    category: 'BANK DETAILS',
    inputFields: [
      {name: 'Bank Name', type: 'text', totalWidth: true},
      {name: 'Account Holder Name', type: 'text', totalWidth: true},
      {name: 'Account Type', type: 'picker', totalWidth: true},
      {name: 'Account Number', type: 'text', totalWidth: true},
      {name: 'Confirm Account Number', type: 'text', totalWidth: true},
      // {name: 'IFSC Code', type: 'text', totalWidth: true},
      {name: 'Bank Transit Number', type: 'text', totalWidth: true},
      {name: 'Institution Number', type: 'text', totalWidth: true},
      {name: 'SAVE AND NEXT', type: 'button', totalWidth: true},
    ],
    flag: false,
  },
  {
    category: 'BACKGROUND CHECK',
    inputFields: [
      {name: 'PERSONAL PHOTO', type: 'buttonIcon', totalWidth: true},
      {
        name: 'Personal Photo, Document Front & Back Photo is required. Please submit a clear and visible selfie to prevent interruptions in background check',
        type: 'textt',
        info: true,
      },
      {name: 'Date of Birth', type: 'text', totalWidth: true},
      // {name: 'ID Category', type: 'picker', totalWidth: true},
      {name: 'ID TYPE', type: 'picker', totalWidth: true},
      {name: 'ID Number', type: 'text', totalWidth: true},
      {name: 'ID Expiration Date', type: 'text', totalWidth: true},
      {name: 'FRONT', type: 'buttonIcon', totalWidth: false},
      {name: 'BACK', type: 'buttonIcon', totalWidth: false},
      {
        name: 'Please submit a clear and visible ID photos - Front and Back. ',
        type: 'textt',
        info: true,
      },
      {name: 'SAVE AND NEXT', type: 'button', totalWidth: true},
    ],
    flag: false,
  },
  {
    category: 'TERMS AND CONDITIONS',
    inputFields: [
      {
        name: 'Acceptance of Terms: By accessing or using this website, you agree to be bound by these Terms and Conditions, which govern your use of the website. If you do not agree to these Terms and Conditions, please refrain from using the website.',
        name2:
          "Use of Website: You may use the website for lawful purposes only and in a manner consistent with all applicable laws and regulations. You agree not to use the website in any way that could damage. disable, overburden, or impair the website or interfere with any other party's use and enjoyment of the website.",
        name3:
          'Intellectual Property: All content on this website, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of the website owner or its content suppliers and is protected by international copyright laws.',
        type: 'textOnly',
        totalWidth: true,
      },
      {
        name: 'I accept the terms and conditions',
        type: 'checkbox',
        totalWidth: true,
      },
      {name: 'SUBMIT FOR VERIFICATION', type: 'button', totalWidth: true},
    ],
    flag: false,
  },
];

const genderOptions = [
  {name: 'Male', value: 'Male'},
  {name: 'Female', value: 'Female'},
  {name: 'Non-Binary', value: 'Non-Binary'},
];

const data = [
  {label: 'A', value: 'a'},
  {label: 'B', value: 'b'},
  {label: 'C', value: 'c'},
];

const accountType = [
  {name: 'Checking', value: 'checking'},
  {name: 'Savings', value: 'savings'},
];

const indiaGovDocs = [
  {name: 'Canadian passport', value: 'Canadian passport'},
  {name: "Driver's License", value: 'driverslicense'},
  {name: 'Permanent resident card', value: 'Permanent resident card'},
  {name: 'Provincial Identity Cards', value: 'Provincial Identity Cards'},
  {name: 'Study Permit', value: 'Study Permit'},
  {name: 'Work Permit', value: 'Work Permit'},
];

const indiaStateOptions = [
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

const ProviderProfileContainer = ({navigation}) => {
  const dispatch = useDispatch();

  const [categoriesData, setCategoriesData] = useState(categoriesOptions);
  const [selectedCategory, setSelectedCategory] = useState(categoriesOptions[0].category);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [documents, setDocuments] = useState([]);
  const AuthUser = useSelector(state => state.Auth);
  const {isLogIn, user, authError, isLogOut} = AuthUser;
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const userID = user?.userId;

  useEffect(() => {
    const countries = Country.getAllCountries();
    const canada = countries.find(country => country.name === 'Canada');
    // const india = countries.find(country => country.name === 'India');

    if (canada) {
      setCountries([canada]);
    }
    // setCountries(countries);
    getAllDocuments();
  }, []);

  useEffect(() => {
    updateFlag();
  }, [formData]);

  const getAllDocuments = async () => {
    try {
      let response = await fetchCollectionDetails(envConfig.Provider_docs);
      setDocuments(response);
    } catch (err) {
      console.error(err);
    }
  };

  const isInteger = value => /^\d*$/.test(value);
  const isNumeric = value => /^\d+$/.test(value);
  const isCharacter = value => /^[a-zA-Z\s]+$/.test(value);
  const isTenDigitNumber = value => /^\d{0,10}$/.test(value);
  const isEmailValid = value => /^[^\s@]*@[^\s@]*\.[^\s@]*$/.test(value);
  const nameRegex = /^[a-zA-Z\s]*$/;
  const isSixDigitNumber = value => /^\d{0,6}$/.test(value);

  const onHandleInputChange = (field, value) => {
    setFormErrors(prevState => ({...prevState, [field]: false}));

    if (field !== 'languages_known') {
      if (value.trim() === '') {
        setFormData(prevState => ({...prevState, [field]: value}));
        return;
      }
    }

    if (field === 'phone_number' && (!isInteger(value) || !isTenDigitNumber(value))) {
      setFormErrors(prevState => ({...prevState, [field]: true}));
    } else if (field === 'country') {
      setFormData(prevState => ({...prevState, [field]: value, state: '', city: ''}));
      setStates(State.getStatesOfCountry(value));
    }
    if (field === 'postal_code' && value.length > 7) {
      setFormErrors(prevState => ({...prevState, [field]: true}));
    } else if (field === 'city') {
      if (!isCharacter(value)) {
        setFormErrors(prevState => ({...prevState, [field]: true}));
      } else {
        setFormData(prevState => ({...prevState, [field]: value}));
      }
    } else if (['account_number', 'confirm_account_number'].includes(field) && !isNumeric(value) && value.length > 0) {
      setFormErrors(prevState => ({...prevState, [field]: true}));
    } else if (
      (field === 'legal_name_on_id' || field === 'bank_name' || field === 'account_holder_name') &&
      !nameRegex.test(value)
    ) {
      setFormErrors(prevState => ({...prevState, [field]: true}));
    } else if (['email_id', 'home_address'].includes(field) && !value) {
      setFormErrors(prevState => ({...prevState, [field]: true}));
    } else {
      setFormData(prevState => ({...prevState, [field]: value}));
    }
  };

  // State to handle loaders for different uploads
  const [photoLoader, setPhotoLoader] = useState(false);
  const [frontLoader, setFrontLoader] = useState(false);
  const [backLoader, setBackLoader] = useState(false);

  // Function to handle opening the camera and triggering the loader
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
          const storageRef = storage().ref(`verification-images/${Date.now()}-${image.fileName}`);
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

  const updateFlag = () => {
    const currentCategory = categoriesData.find(category => category.category === selectedCategory);
    const isCategoryValid = currentCategory.inputFields.every(
      question =>
        formData[question.name.toLowerCase().split(' ').join('_')].length > 0 &&
        formErrors[question.name.toLowerCase().split(' ').join('_')] === false,
    );

    setCategoriesData(prevCategoriesData => {
      return prevCategoriesData.map(category => {
        return category.category === selectedCategory ? {...category, flag: isCategoryValid} : category;
      });
    });
  };

  let generateInitialForm = (categories, value) => {
    const initialForm = {};
    categories.forEach(category => {
      category.inputFields.forEach(field => {
        initialForm[field.name.toLowerCase().split(' ').join('_')] =
          value === 'initialState' ? '' : value[0][field.name.toLowerCase().split(' ').join('_')];
      });
    });
    return initialForm;
  };

  const formdata = useSelector(state => state.providerverification.providerDetails);
  // console.log('formdata', formdata);
  // // console.log('formdata', formdata !== []);
  const [formData, setFormData] = useState(() => {
    return formdata.length > 0
      ? generateInitialForm(categoriesData, formdata)
      : generateInitialForm(categoriesData, 'initialState');
  });
  const [formErrors, setFormErrors] = useState(generateInitialForm(categoriesData, 'errorValidation'));

  const deleteAndPostProviderDetails = async (collectionName, userID) => {
    try {
      const querySnapshot = await firestore().collection(collectionName).where('provider_id', '==', userID).get();
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async doc => {
          await firestore().collection(collectionName).doc(doc.id).delete();
          console.log('Document deleted');
        });
      } else {
        console.log('user filling for the first time');
      }
    } catch (error) {
      console.error('Error deleting and posting provider details:', error);
      throw error;
    }
  };
  const saveAndNext = async () => {
    console.log('came heree');
    let providerDetails = {
      provider_id: userID,
      ...formData,
    };
    await deleteAndPostProviderDetails(envConfig.Provider, userID);
    let response = await postCollectionDetails(envConfig.Provider, providerDetails);
    console.log('response', response);
    dispatch(fetchServiceProviderDetails(userID));
  };

  const handleCategoriesChange = value => {
    if (selectedCategory === 'PERSONAL') {
      const personalDetailsSubmitted = validatePersonalDetails(value);
      if (personalDetailsSubmitted) {
        const updatedCategoriesData = categoriesData.map(category => {
          if (category.category === 'PERSONAL') {
            return {...category, flag: true};
          }
          return category;
        });
        setCategoriesData(updatedCategoriesData);
      }
    } else if (selectedCategory === 'BANK DETAILS') {
      const bankDetailsSubmitted = validateBankDetails(value);
      if (bankDetailsSubmitted) {
        const updatedCategoriesData = categoriesData.map(category => {
          if (category.category === 'BANK DETAILS') {
            return {...category, flag: true};
          }
          return category;
        });
        setCategoriesData(updatedCategoriesData);
      }
    } else if (selectedCategory === 'BACKGROUND CHECK') {
      const governmentDetailsSubmitted = validateGovernmentID(value);
      if (governmentDetailsSubmitted) {
        const updatedCategoriesData = categoriesData.map(category => {
          if (category.category === 'BACKGROUND CHECK') {
            return {...category, flag: true};
          }
          return category;
        });
        setCategoriesData(updatedCategoriesData);
      }
    }
  };

  {
    categoriesData.map(item => {
      if (item.category === 'TERMS AND CONDITIONS') {
        item.flag = toggleCheckBox;
      }
    });
  }
  const handleCategoriesChangeonTop = value => {
    if (selectedCategory === 'PERSONAL') {
      setSelectedCategory(value);
    } else if (selectedCategory === 'BANK DETAILS') {
      setSelectedCategory(value);
    } else if (selectedCategory === 'BACKGROUND CHECK') {
      setSelectedCategory(value);
    } else if (selectedCategory === 'TERMS AND CONDITIONS') {
      setSelectedCategory(value);
    }
  };

  const validateGovernmentID = value => {
    const govtDetails = categoriesOptions.find(option => option.category === 'BACKGROUND CHECK');
    const formErrors = {};

    const isValid = govtDetails.inputFields.every(field => {
      switch (field.name) {
        case 'PERSONAL PHOTO':
          if (!formData.personal_photo) {
            setFormErrors(prevState => ({...prevState, personal_photo: true}));
            return false;
          }
          break;
        case 'DATE OF BIRTH':
          if (!formData.date_of_birth) {
            setFormErrors(prevState => ({...prevState, date_of_birth: true}));
            return false;
          }
          break;
        case 'ID TYPE':
          if (!formData.id_type) {
            setFormErrors(prevState => ({...prevState, id_type: true}));
            return false;
          }
          break;
        case 'ID NUMBER':
          if (!formData.id_number) {
            setFormErrors(prevState => ({...prevState, id_number: true}));
            return false;
          }
          break;
        case 'ID Expiration Date':
          if ((!formData.id_expiration_date && formData.id_type === 'Passoport') || formData.id_type === 'Driving ') {
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
      setSelectedCategory(value);
      setFormErrors(prevState => ({...prevState, ...formErrors}));
    } else {
      setFormErrors(prevState => ({...prevState, ...formErrors}));
    }

    return isValid;
  };

  const validatePersonalDetails = value => {
    const personalDetails = categoriesOptions.find(option => option.category === 'PERSONAL');
    const formErrors = {};
    const isValid = personalDetails.inputFields.every(field => {
      switch (field.name) {
        case 'Legal Name on ID':
          if (!formData.legal_name_on_id || !nameRegex.test(value)) {
            formErrors.legal_name_on_id = true;
            return false;
          }
          break;
        case 'Phone Number':
          if (formData.phone_number.length !== 10) {
            formErrors.phone_number = true;
            return false;
          }
          break;
        case 'Email ID':
          if (!isEmailValid(formData.email_id)) {
            formErrors.email_id = true;
            return false;
          }
          break;
        case 'Bio':
          if (!formData.bio) {
            formErrors.bio = true;
            return false;
          }
          break;
        case 'Home Address':
          if (!formData.home_address) {
            formErrors.home_address = true;
            return false;
          }
          break;
        case 'Country':
          if (!formData.country) {
            formErrors.country = true;
            return false;
          }
          break;
        case 'State':
          if (!formData.state) {
            formErrors.state = true;
            return false;
          }
          break;
        case 'City':
          if (!formData.city) {
            formErrors.city = true;
            return false;
          }
          break;
        case 'Gender':
          if (!formData.gender) {
            formErrors.gender = true;
            return false;
          }
          break;
        case 'Languages Known':
          if (!formData.languages_known) {
            formErrors.languages_known = true;
            return false;
          }
          break;
        case 'Postal Code':
          if (formData.postal_code.length > 7 || formData.postal_code.length < 3) {
            formErrors.postal_code = true;
            return false;
          }
          break;
        default:
          break;
      }
      return true; // Valid field
    });
    if (isValid) {
      setSelectedCategory(value);
      setFormErrors(prevState => ({...prevState, ...formErrors}));
    } else {
      setFormErrors(prevState => ({...prevState, ...formErrors}));
    }
    return isValid;
  };

  const validateBankDetails = value => {
    const bankDetails = categoriesOptions.find(option => option.category === 'BANK DETAILS');
    const formErrors = {};

    const isValid = bankDetails.inputFields.every(field => {
      switch (field.name) {
        case 'Bank Name':
          if (!formData.bank_name) {
            formErrors.bank_name = true;
            return false;
          }
          break;

        case 'Account Holder Name':
          if (!formData.account_holder_name) {
            formErrors.account_holder_name = true;
            return false;
          }
          break;

        case 'Account Type':
          if (!formData.account_type) {
            formErrors.account_type = true;
            return false;
          }
          break;

        case 'Account Number':
          if (!formData.account_number) {
            formErrors.account_number = true;
            return false;
          }
          break;
        case 'Confirm Account Number':
          if (!formData.confirm_account_number || formData.account_number !== formData.confirm_account_number) {
            formErrors.confirm_account_number = true;
            return false;
          }
          break;
        case 'Bank Transit Number':
          if (!formData.bank_transit_number) {
            formErrors.bank_transit_number = true;
            return false;
          }
          break;
        case 'Institution Number':
          if (!formData.institution_number) {
            formErrors.institution_number = true;
            return false;
          }
          break;
        default:
          break;
      }
      return true;
    });

    if (isValid) {
      setSelectedCategory(value);
      setFormErrors(prevState => ({...prevState, ...formErrors}));
    } else {
      setFormErrors(prevState => ({...prevState, ...formErrors}));
    }

    return isValid;
  };

  const categoryData = categoriesData?.find(category => category.category === selectedCategory);

  const currentIndex = categoriesData.findIndex(category => category.category === selectedCategory);
  let nextCategory = '';
  // Check if the current category is found and there is a next category
  if (currentIndex !== -1 && currentIndex < categoriesData.length - 1) {
    nextCategory = categoriesData[currentIndex + 1].category;
  }

  const handleDeleteImage = file => {
    setFormData(prevData => ({
      ...prevData,
      [file]: '',
    }));
  };

  const handleSubmit = async () => {
    const personalDetailsSubmitted = validatePersonalDetails();
    const bankDetailsSubmitted = validateBankDetails();
    const governmentDetailsSubmitted = validateGovernmentID();

    console.log('Details Check', personalDetailsSubmitted, bankDetailsSubmitted, governmentDetailsSubmitted);
    console.log('Form Data for SP BGC', formData);

    if (!personalDetailsSubmitted || !bankDetailsSubmitted || !governmentDetailsSubmitted) {
      Alert.alert('please fill form completely');
    } else {
      try {
        let providerDetails = {
          createdOn: Date.now(),
          provider_id: userID,
          isverified: 'in progress',
          ...formData,
        };

        await deleteAndPostProviderDetails(envConfig.Provider, userID);

        let response = await postCollectionDetails(envConfig.Provider, providerDetails);
        const to = 'help@zaapondemand.ca';
        const subject = 'New Application For Background Verification';
        const textMsg = 'New Application For Background Verification';
        const bodyText = `
      div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2>New Application For Background verification</h2>
      <p>New Application For Background Verification from ${formData.legal_name_on_id}. Check your dashboard for verification</p>
    </div>
`;
        mailSenter(to, subject, textMsg, bodyText);

        await updateCollectionDetails(envConfig.User, {isServiceProvider: false}, userID);
        const data = {
          title: 'New Application For Background Verification',
          message: `New Application For Background Verification from ${formData.legal_name_on_id}`,
          userId: userID,
          markasread: false,
          time: new Date(),
        };
        await postCollectionDetails(envConfig.Notifications, data);

        // let response = await updateCollectionDetails(envConfig.Provider, providerDetails, userID);
        // dispatch(providerSuccess(response));
        if (response._documentPath) {
          setShowVerificationModal(true); // Show the verification modal
          dispatch(updateProviderStatus(true, formData?.bio));

          // Alert.alert('Success', 'Background Verification in Progress', [{text: 'OK'}]);
          setFormData(generateInitialForm(categoriesData, 'initialState'));
          dispatch(fetchServiceProviderDetails(userID));

          // navigation.navigate('HomeScreen');
        }
      } catch (error) {
        // dispatch(providerFailure(error));
        console.error('Error adding job data to Firestore:', error);
      }
    }
  };

  return (
    <ProviderProfile
      categoriesData={categoriesData}
      formData={formData}
      formErrors={formErrors}
      handleInputChange={onHandleInputChange}
      selectedCategory={selectedCategory}
      handleCategoriesChange={handleCategoriesChange}
      countries={countries}
      states={states}
      cities={cities}
      navigation={navigation}
      data={data}
      categoryData={categoryData}
      nextCategory={nextCategory}
      accountType={accountType}
      handleOpenCamera={handleOpenCamera}
      onHandleDeleteImage={handleDeleteImage}
      govDocuments={documents}
      handleSubmit={handleSubmit}
      showVerificationModal={showVerificationModal}
      handleCategoriesChangeonTop={handleCategoriesChangeonTop}
      setToggleCheckBox={setToggleCheckBox}
      toggleCheckBox={toggleCheckBox}
      indiaGovDocs={indiaGovDocs}
      genderOptions={genderOptions}
      photoLoader={photoLoader}
      frontLoader={frontLoader}
      backLoader={backLoader}
      indiaStateOptions={indiaStateOptions}
      saveAndNext={saveAndNext}
    />
  );
};

export default ProviderProfileContainer;
