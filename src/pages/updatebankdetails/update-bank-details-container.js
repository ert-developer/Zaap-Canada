import {Alert} from 'react-native';
import UpdateBankDetailsScreen from './update-bank-details-screen';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {postCollectionDetails} from '../../common/collection';
import {tr} from 'date-fns/locale';
import {envConfig} from '../../assets/helpers/envApi';

const UpdateBankDetailsContainer = () => {
  const AuthUser = useSelector(state => state.Auth);
  const userID = AuthUser.user.userId;

  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const bankDetailsFields = [
    {
      category: 'BANK DETAILS',
      inputFields: [
        {name: 'Bank Name', type: 'text', totalWidth: true},
        {name: 'Account Holder Name', type: 'text', totalWidth: true},
        {name: 'Account Type', type: 'picker', totalWidth: true},
        {name: 'Account Number', type: 'text', totalWidth: true},
        {name: 'Confirm Account Number', type: 'text', totalWidth: true},
        {name: 'IFSC Code', type: 'text', totalWidth: true},
        // {name: 'Bank Transit Number', type: 'text', totalWidth: true},
        // {name: 'Institution Number', type: 'text', totalWidth: true},
      ],
      flag: false,
    },
  ];

  const generateInitialForm = (categories, value) => {
    const initialForm = {};
    categories.forEach(category => {
      category.inputFields.forEach(field => {
        initialForm[field.name.toLowerCase().split(' ').join('_')] = value === 'initialState' ? '' : false;
      });
    });
    return initialForm;
  };

  const [formData, setFormData] = useState(generateInitialForm(bankDetailsFields, 'initialState'));
  const [formErrors, setFormErrors] = useState(generateInitialForm(bankDetailsFields, 'errorValidation'));

  const accountType = [
    {name: 'Savings', value: 'savings'},
    {name: 'Current', value: 'current'},
  ];

  const isInteger = value => /^\d*$/.test(value);

  const onHandleInputChange = (field, value) => {
    setFormErrors(prevState => ({...prevState, [field]: false}));
    if (['account_number', 'confirm_account_number'].includes(field) && !isInteger(value)) {
      setFormErrors(prevState => ({...prevState, [field]: true}));
    } else {
      setFormData(prevState => ({...prevState, [field]: value}));
    }
  };

  const validateBankDetails = () => {
    const bankDetails = bankDetailsFields.find(option => option.category === 'BANK DETAILS');
    const formErrorss = {};

    const isValid = bankDetails.inputFields.every(field => {
      switch (field.name) {
        case 'Bank Name':
          if (!formData.bank_name) {
            formErrorss.bank_name = true;
            return false;
          }
          break;

        case 'Account Holder Name':
          if (!formData.account_holder_name) {
            formErrorss.account_holder_name = true;
            return false;
          }
          break;

        case 'Account Type':
          if (!formData.account_type) {
            formErrorss.account_type = true;
            return false;
          }
          break;

        case 'Account Number':
          if (!formData.account_number) {
            formErrorss.account_number = true;
            return false;
          }
          break;

        case 'Confirm Account Number':
          if (!formData.confirm_account_number || formData.account_number !== formData.confirm_account_number) {
            formErrorss.confirm_account_number = true;
            return false;
          }
          break;

        case 'Bank Transit Number':
          if (!formData.bank_transit_number) {
            formErrorss.bank_transit_number = true;
            return false;
          }
          break;

        case 'Institution Number':
          if (!formData.institution_number) {
            formErrorss.institution_number = true;
            return false;
          }
          break;

        case 'ifsc_code':
          if (!formData.ifsc_code) {
            formErrorss.ifsc_code = true;
            return false;
          }
          break;

        default:
          break;
      }
      return true;
    });

    setFormErrors(prevState => ({...prevState, ...formErrors}));
    return isValid;
  };

  // const UpdateProviderBankDetails = async () => {
  //   try {
  //     const querySnapshot = await firestore().collection('Provider_dev').where('provider_id', '==', `${userID}`).get();

  //     const batch = firestore().batch();
  //     querySnapshot.forEach(documentSnapshot => {
  //       const docRef = firestore().collection('Provider_dev').doc(documentSnapshot.id);
  //       batch.update(docRef, {
  //         bank_name: formData.bank_name,
  //         account_holder_name: formData.account_holder_name,
  //         account_type: formData.account_type,
  //         account_number: formData.account_number,
  //         confirm_account_number: formData.confirm_account_number,
  //         bank_transit_number: formData.bank_transit_number,
  //         institution_number: formData.institution_number,
  //       });
  //     });

  //     await batch.commit();
  //     setShowPopup(true);
  //     setFormData(generateInitialForm(bankDetailsFields, 'initialState'));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const postToNewCollection = async () => {
    const bankDetails = {
      bank_name: formData.bank_name,
      account_holder_name: formData.account_holder_name,
      account_type: formData.account_type,
      account_number: formData.account_number,
      confirm_account_number: formData.confirm_account_number,
      // bank_transit_number: formData.bank_transit_number,
      // institution_number: formData.institution_number,
      ifsc_code: formData.ifsc_code,
      updatedDateAndTime: new Date(),
    };

    const collection = envConfig.updateBankDetails;
    const document = userID;
    postCollectionDetails(collection, bankDetails, document);
    setShowPopup(true);
    setFormData(generateInitialForm(bankDetailsFields, 'initialState'));
  };

  const updateUserBankDetails = () => {
    const bankDetailsSubmitted = validateBankDetails();
    if (!bankDetailsSubmitted) {
      setError(true);
    } else {
      // UpdateProviderBankDetails();
      postToNewCollection();
    }
  };

  const onClosePopup = () => {
    setShowPopup(false);
    setError(false);
  };

  return (
    <UpdateBankDetailsScreen
      formData={formData}
      accountType={accountType}
      bankDetailsFields={bankDetailsFields}
      handleInputChange={onHandleInputChange}
      formErrors={formErrors}
      updateUserBankDetails={updateUserBankDetails}
      showPopup={showPopup}
      onClosePopup={onClosePopup}
      error={error}
    />
  );
};

export default UpdateBankDetailsContainer;
