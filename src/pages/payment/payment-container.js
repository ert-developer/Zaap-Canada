import React, {useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import PaymentScreen from './payment-screen';
import firestore from '@react-native-firebase/firestore';
import {envConfig} from '../../assets/helpers/envApi';

const PaymentContainer = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [secretKey, setSecretKey] = useState(null);
  const [captureIntent, setCaptureIntent] = useState(null);

  const fetchPaymentSheetParams = async () => {
    return new Promise((resolve, reject) => {
      // Assuming you have some data you want to send to the API
      const postData = {
        user_type: '2',
        user_id: '30013',
        amount: '2900',
        cust_name: 'sai',
        cust_phone: '1234567880',
      };
      // Make an HTTP POST request to the API
      fetch('https://zap-an7j.onrender.com/payment-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you may need
        },
        body: JSON.stringify(postData),
      })
        .then(response => {
          if (!response.ok) {
            // If the response is not OK, reject the promise with an error
            reject('Error sending data to the API');
          } else {
            // If the response is OK, parse the JSON response and resolve the promise with the data
            return response.json();
          }
        })
        .then(data => {
          resolve(data); // Resolve the promise with the API response data
        })
        .catch(error => {
          reject(error); // Handle any errors that occur during the fetch or JSON parsing
        });
    });
  };

  const handleCheckout = async () => {
    try {
      const data = await fetchPaymentSheetParams();

      setSecretKey(data.paymentIntent);

      const result = await initPaymentSheet({
        merchantDisplayName: 'anything',
        customerId: data.customer,
        customerEphemeralKeySecret: data.ephemeralKey,
        paymentIntentClientSecret: data.paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
      });

      // Present the payment sheet
      const {error} = await presentPaymentSheet({secretkey: secretKey});

      if (error) {
        console.log('Payment sheet error:', error);
      } else {
        console.log('Payment sheet else:', 'true part');

        firestore()
          .collection(envConfig.UsersPayment)
          .add({
            name: 'sai',
            paymentDone: true,
          })
          .then(() => {
            console.log('User added!');
          });
      }
    } catch (error) {
      console.log('Checkout error:', error);
    }
  };

  return <PaymentScreen handleButtonPress={handleCheckout} amount={'2900'} />;
};

export default PaymentContainer;
