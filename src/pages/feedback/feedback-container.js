import {useState} from 'react';
import FeedbackScreen from './feedback-screen';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {envConfig} from '../../assets/helpers/envApi';
import {useNavigation} from '@react-navigation/native';

const FeedbackContainer = () => {
  const [formData, setFormData] = useState({name: '', email: '', feedback: ''});
  const [formErrors, setFormErrors] = useState({name: false, email: false, feedback: false});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const navigation = useNavigation();

  const user = useSelector(state => state.Auth.user);

  const validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  ///change the text input fields
  const handleChangeInputText = (field, value) => {
    if (field === 'email') {
      if (!validateEmail(value)) {
        setFormErrors(prevState => ({...prevState, [field]: true}));
      } else {
        setFormErrors(prevState => ({...prevState, [field]: false}));
      }
    } else {
      if (value.length > 0) {
        setFormErrors(prevState => ({...prevState, [field]: false}));
      }
    }
    setFormData(prevState => ({...prevState, [field]: value}));
  };

  ///Submit the feedback to firebase
  const createFeedbackCollectionInFirebase = async () => {
    try {
      const collectionRef = firestore().collection(envConfig.feedback);
      const docRef = collectionRef.doc(user.userId); // Use the user's ID as the document ID
      const docSnapshot = await docRef.get();

      // Set data for the newly created document
      const feedbackData = {
        createdAt: new Date(),
        userId: user.userId,
        name: formData?.name,
        email: formData?.email,
        feedback: formData?.feedback,
      };
      await docRef.set(feedbackData);
      setShowFeedbackModal(true);
      setFormData({name: '', email: '', feedback: ''});
    } catch (error) {
      console.error('Error while submit the feedback:', error);
    }
  };

  const onSubmitFeedback = () => {
    const requiredFields = ['name', 'email', 'feedback'];
    const errors = {};

    requiredFields.forEach(field => {
      // Find all field -> empty or undefined
      if (!formData[field] || formData[field].length <= 0) {
        errors[field] = true;
      }
    });

    if (Object.keys(errors).length > 0) {
      // If there are errors, show error style and set formErrors state
      setFormErrors({...formErrors, ...errors});
    } else {
      createFeedbackCollectionInFirebase();
    }
  };

  //Close the modal
  const onCloseSuccessModal = () => {
    setShowFeedbackModal(false);
    navigation.navigate('HomeScreen');
  };

  return (
    <FeedbackScreen
      formData={formData}
      formErrors={formErrors}
      handleChangeInputText={handleChangeInputText}
      onSubmitFeedback={onSubmitFeedback}
      showFeedbackModal={showFeedbackModal}
      onCloseSuccessModal={onCloseSuccessModal}
    />
  );
};

export default FeedbackContainer;
