// import React, {useState} from 'react';
// import {useStripe} from '@stripe/stripe-react-native';
// import {Alert} from 'react-native';
// import {paymentRequest, paymentSuccess, paymentFailure} from '../../redux/payment/action';
// import {useSelector, useDispatch} from 'react-redux';
// import useErrorHandler from '../error-handler/useErrorHandler.js';
// import {postCollectionDetails} from '../../common/collection';
// import {envConfig} from '../../assets/helpers/envApi';

// const usePayment = () => {
//   const {initPaymentSheet, presentPaymentSheet} = useStripe();
//   const [secretKey, setSecretKey] = useState(null);
//   const [captureIntent, setCaptureIntent] = useState(null);

//   const {isPaymenting, data, error} = useSelector(state => state.payment);
//   const {handleError} = useErrorHandler();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.Auth.user); // User details

//   const jobDetails = useSelector(state => state.checkProfileJob.jobDetails); // Job Details
//   const profiledetail = useSelector(state => state.applicantProfileDetails.profileDetails); //service provider profile details

//   const fetchPaymentSheetParams = async amount => {
//     return new Promise((resolve, reject) => {
//       // Assuming you have some data you want to send to the API
//       const postData = {
//         user_type: '2',
//         user_id: '30013',
//         amount: amount,
//         cust_name: 'sai',
//         cust_phone: '1234567880',
//       };

//       fetch('https://zap-an7j.onrender.com/payment-sheet', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(postData),
//       })
//         .then(response => {
//           if (!response.ok) {
//             // If the response is not OK, reject the promise with an error
//             reject('Error sending data to the API');
//           } else {
//             // If the response is OK, parse the JSON response and resolve the promise with the data
//             return response.json();
//           }
//         })
//         .then(data => {
//           resolve(data); // Resolve the promise with the API response data
//         })
//         .catch(error => {
//           console.error('Fetch Error:', error);

//           reject(error); // Handle any errors that occur during the fetch or JSON parsing
//         });
//     });
//   };

//   const handleCheckout = async amount => {
//     dispatch(paymentRequest());

//     try {
//       const data = await fetchPaymentSheetParams(amount);

//       setSecretKey(data.paymentIntent);

//       const result = await initPaymentSheet({
//         merchantDisplayName: 'anything',
//         customerId: data.customer,
//         customerEphemeralKeySecret: data.ephemeralKey,
//         paymentIntentClientSecret: data.paymentIntent,
//         allowsDelayedPaymentMethods: true,
//         defaultBillingDetails: {
//           name: 'Jane Doe',
//         },
//       });
//       const response = await presentPaymentSheet({secretkey: secretKey});
//       const {error} = response;
//       if (error) {
//         //Once we will cancel the bottom scroll bar
//         dispatch(paymentFailure(error));
//       } else {
//         const paymentDetails = {
//           customerName: user.displayName,
//           customerID: user.userId,
//           jobId: 1111111,
//           // jobId: jobDetails.jobId,
//           // serviceproviderId: profiledetail.userId,
//           // serviceProviderName: profiledetail.name,
//           paymentDone: true,
//           createdOn: Date.now(),
//           amount: amount,
//         };
//         let response = await postCollectionDetails(envConfig.UsersPayment, paymentDetails);
//         // Alert.alert('Success', 'Payment Done successfully!', [{text: 'OK'}]);
//         dispatch(paymentSuccess('Payment Done successfully!'));
//         return response;
//       }
//     } catch (error) {
//       console.log('Checkout error:', error);
//       handleError(error);
//       dispatch(paymentFailure(error));
//     }
//   };

//   return {
//     handleCheckout,
//   };
// };

// export default usePayment;

import {useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {Alert} from 'react-native';
import {paymentRequest, paymentSuccess, paymentFailure} from '../../redux/payment/action';
import {useSelector, useDispatch} from 'react-redux';
// import useErrorHandler from '../error-handler/useErrorHandler';
import {postCollectionDetails} from '../../common/collection';
import {envConfig} from '../../assets/helpers/envApi';

const usePayment = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [secretKey, setSecretKey] = useState(null);

  const {isPaymenting, data, error} = useSelector(state => state.payment);
  // const {handleError} = useErrorHandler();
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user); // User details
  const jobDetails = useSelector(state => state.checkProfileJob.jobDetails); // Job Details
  const profiledetail = useSelector(state => state.applicantProfileDetails.profileDetails); // Service provider profile details

  // Fetch payment sheet parameters from the server
  const fetchPaymentSheetParams = async amount => {
    try {
      const postData = {
        user_type: '2',
        user_id: '30013',
        amount: amount,
        cust_name: 'sai',
        cust_phone: '1234567880',
      };

      const response = await fetch(`${envConfig.STRIPE_SERVER_URL}/api/payments/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching payment sheet params:', error);
      throw error;
    }
  };

  // Handle checkout process
  const handleCheckout = async amount => {
    dispatch(paymentRequest());

    try {
      const data = await fetchPaymentSheetParams(amount);
      setSecretKey(data.paymentIntent);

      const {error: initError} = await initPaymentSheet({
        merchantDisplayName: 'anything',
        customerId: data.customer,
        customerEphemeralKeySecret: data.ephemeralKey,
        paymentIntentClientSecret: data.paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
      });

      if (initError) {
        throw new Error(initError.message);
      }

      const {error: sheetError} = await presentPaymentSheet();
      if (sheetError) {
        dispatch(paymentFailure(sheetError.message));
        Alert.alert('Payment failed', sheetError.message);
      } else {
        const paymentDetails = {
          customerName: user.displayName,
          customerID: user.userId,
          jobId: 1111111, // Placeholder jobId, update as needed
          paymentDone: true,
          createdOn: Date.now(),
          amount: amount,
        };

        let response = await postCollectionDetails(envConfig.UsersPayment, paymentDetails);
        dispatch(paymentSuccess('Payment done successfully!'));
        // Alert.alert('Success', 'Payment done successfully!');
        return response;
      }
    } catch (error) {
      console.log('Checkout error:', error);
      // handleError(error);
      dispatch(paymentFailure(error.message));
    }
  };

  return {
    handleCheckout,
  };
};

export default usePayment;
