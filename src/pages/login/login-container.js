import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import LoginScreen from './login-screen';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import useErrorHandler from '../../custom-hooks/error-handler/useErrorHandler.js';
import {addUserToChat} from '../../redux/chat/chatList/action';
import {useSelector, useDispatch} from 'react-redux';
import {loginRequest, loginSuccess, loginFailure} from '../../redux/auth/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {envConfig} from '../../assets/helpers/envApi';
import Loc from '../../organisms/loc/loc';
import {fetchServiceProviderDetails} from '../../redux/providerstatus/action';
import {PermissionsAndroid, Platform} from 'react-native';
import {mailSenter} from '../../common/mailSender';
import {CloseSVG} from '../../assets/svgImage/providerProfile';
import {ActivityIndicator, View, Text} from 'react-native';

const generateInvoiceId = () => {
  return Math.random().toString(36).substring(2, 10);
};

const LoginContainer = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {error, clearError, handleError} = useErrorHandler();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const AuthUser = useSelector(state => state.Auth);
  const {isLogIn, user, authError} = AuthUser;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '849033912129-900hqg5pi670htf7idm8kop2dg8k0bht.apps.googleusercontent.com',
    });
  }, []);

  const tc =
    'Sample Terms and Conditions Template Terms and Conditions.Sample Terms and Conditions Template Terms and Conditions...';

  // Function to save FCM token to Firestore

  const saveFcmToken = async userId => {
    try {
      // On iOS, ensure the device is registered for remote messages
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }

      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(`FCM Token for ${Platform.OS}: ${fcmToken}`);
        await firestore().collection(envConfig.User).doc(userId).set(
          {
            fcmToken: fcmToken,
          },
          {merge: true},
        );
      } else {
        console.warn('FCM token is not available.');
      }
    } catch (error) {
      console.error(`Error saving FCM token on ${Platform.OS}:`, error);
    }
  };

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Attempt to sign in and retrieve user details
      const userInfo = await GoogleSignin.signIn();

      // If userInfo is not null or undefined, proceed with the authentication process
      if (userInfo && userInfo.idToken) {
        const {idToken, user} = userInfo;

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const authInfo = await auth().signInWithCredential(googleCredential);
        const userId = authInfo.user.uid;

        const userRef = firestore().collection(envConfig.User).doc(userId);
        const userSnapshot = await userRef.get();

        if (userSnapshot.exists) {
          console.log('User with the same email already exists', user);
          const userData = userSnapshot.data();
          await saveFcmToken(userId);
          return userData;
        } else {
          const invoiceId = generateInvoiceId();
          const userData = {
            creationTime: Date.now(),
            displayName: user.name,
            email: user.email,
            imageUrl: user.photo,
            userId: userId,
            invoiceId: invoiceId,
            isServiceProvider: 'no',
          };
          const to = user.email;
          const subject = 'Welcome to ZAAP – Your Local Marketplace Awaits!';
          const bodyText = `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <h2>Hello There,</h2>
              <p>Welcome to <strong>ZAAP</strong> 🎉</p>
              <p>Thank you for downloading and registering with us. We’re excited to have you join our vibrant community and can’t wait for you to explore everything ZAAP has to offer!</p>
              
              <h3>For Our Customers:</h3>
              <ul style="padding-left: 20px;">
                <li><strong>Hire Locally, Anytime:</strong> Find talent right in your neighborhood, whenever you need it. With ZAAP, you can hire professionals who fit your budget and deliver the quality you’re looking for.</li>
                <li><strong>One-Stop Shop:</strong> Everything you need is at your fingertips. Post job listings, browse profiles, and connect with skilled service providers—all from one convenient platform.</li>
              </ul>
          
              <h3>For Our Service Providers:</h3>
              <ul style="padding-left: 20px;">
                <li><strong>Work Locally, Flexibly:</strong> Discover job opportunities in your neighborhood that match your skills and schedule. With ZAAP, you can find work that suits your expertise and offers the flexibility you need.</li>
                <li><strong>Showcase Your Skills:</strong> Create a standout profile and attract customers looking for your specific talents. Your next opportunity is just a few clicks away!</li>
              </ul>
              
              <hr style="border: 1px solid #ccc; margin: 20px 0;">
              
              <h3>Need Assistance? We’re Here to Help!</h3>
              <p>If you have any questions or need support, our team is ready to assist you. Check out the Help Center in the app for answers to common questions, or reach out to us at 
                <a href="mailto:help@zaapondemand.ca" style="color: #4CAF50;">help@zaapondemand.ca</a>
              </p>
              
              <h3>Stay Connected:</h3>
              <p>Follow us on social media to stay updated with the latest news, tips, and special offers:</p>
              <ul style="padding-left: 20px;">
                <li><a href="https://www.facebook.com" style="color: #4CAF50;">Facebook</a></li>
                <li><a href="https://www.twitter.com" style="color: #4CAF50;">Twitter</a></li>
                <li><a href="https://www.instagram.com" style="color: #4CAF50;">Instagram</a></li>
              </ul>
              
              <p>We’re thrilled to help you hire or work locally, anytime and anywhere. Let’s make great things happen together!</p>
              
              <p>Warm regards,<br>Team ZAAP</p>
            </div>
          `;

          const textMsg =
            'Welcome to ZAAP! Thank you for registering with us. Explore our platform to find local talent or work. Need help? Email us at help@zaapondemand.ca and stay connected on Facebook, Twitter, and Instagram.';

          mailSenter(to, subject, textMsg, bodyText);

          await userRef.set(userData);
          await saveFcmToken(userId);
          return userData;
        }
      } else {
        console.log('Google Sign-In was canceled by the user.');
        setLoading(false);
        return; // Exit early if the user canceled the sign-in
      }
    } catch (err) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // Handle sign-in cancellation
        setLoading(false);
        console.log('Sign-In was cancelled by the user.');
      } else {
        setLoading(false);
        handleError(err);
      }
    }
  }

  const googleLogin = async () => {
    dispatch(loginRequest());
    setLoading(true);
    console.log('loaderrrr');
    try {
      const authInfo = await onGoogleButtonPress();
      // const {displayName, email, phoneNumber, photoURL, uid, invoiceId} = authInfo?.user;
      // let authUser = {
      //   displayName: displayName,
      //   email: email,
      //   imageURL: photoURL,
      //   userId: uid,
      //   invoiceId: invoiceId,
      // };

      dispatch(addUserToChat(authInfo));
      dispatch(loginSuccess(authInfo));
      setLoading(false);
    } catch (err) {
      __DEV__ & console.error('Google sign-in failed:', err);
      setLoading(false);
      dispatch(loginFailure(err));
    }
  };

  async function onFacebookButtonPress() {
    try {
      // Request permissions for public profile and email
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Get the current access token
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Fetch user data from Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${data.accessToken}`,
      );
      const userInfo = await response.json();

      // Extract user information
      const {id, name, email, picture} = userInfo;
      const photoURL = picture?.data?.url || `https://graph.facebook.com/${id}/picture?type=normal`;

      // Authenticate with Firebase using Facebook credentials
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      const userCredential = await auth().signInWithCredential(facebookCredential);
      const {uid} = userCredential.user;

      // Check if the user already exists in Firestore
      const userRef = firestore().collection(envConfig.User).doc(uid);
      const userSnapshot = await userRef.get();

      // Generate invoiceId for new users
      const invoiceId = generateInvoiceId();

      const userData = {
        displayName: name,
        email: email || '', // Handle missing email
        imageUrl: photoURL,
        userId: uid,
        invoiceId: invoiceId, // Add invoiceId
        isServiceProvider: 'no', // Default to 'no'
      };

      if (!userSnapshot.exists) {
        // Save new user data to Firestore if they don't exist
        await userRef.set(userData);

        const to = userData.email;
        const subject = 'Welcome to ZAAP – Your Local Marketplace Awaits!';
        const bodyText = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2>Hello There,</h2>
          <p>Welcome to <strong>ZAAP</strong> 🎉</p>
          <p>Thank you for downloading and registering with us. We’re excited to have you join our vibrant community and can’t wait for you to explore everything ZAAP has to offer!</p>
          
          <h3>For Our Customers:</h3>
          <ul style="padding-left: 20px;">
            <li><strong>Hire Locally, Anytime:</strong> Find talent right in your neighborhood, whenever you need it. With ZAAP, you can hire professionals who fit your budget and deliver the quality you’re looking for.</li>
            <li><strong>One-Stop Shop:</strong> Everything you need is at your fingertips. Post job listings, browse profiles, and connect with skilled service providers—all from one convenient platform.</li>
          </ul>
      
          <h3>For Our Service Providers:</h3>
          <ul style="padding-left: 20px;">
            <li><strong>Work Locally, Flexibly:</strong> Discover job opportunities in your neighborhood that match your skills and schedule. With ZAAP, you can find work that suits your expertise and offers the flexibility you need.</li>
            <li><strong>Showcase Your Skills:</strong> Create a standout profile and attract customers looking for your specific talents. Your next opportunity is just a few clicks away!</li>
          </ul>
          
          <hr style="border: 1px solid #ccc; margin: 20px 0;">
          
          <h3>Need Assistance? We’re Here to Help!</h3>
          <p>If you have any questions or need support, our team is ready to assist you. Check out the Help Center in the app for answers to common questions, or reach out to us at 
            <a href="mailto:help@zaapondemand.ca" style="color: #4CAF50;">help@zaapondemand.ca</a>
          </p>
          
          <h3>Stay Connected:</h3>
          <p>Follow us on social media to stay updated with the latest news, tips, and special offers:</p>
          <ul style="padding-left: 20px;">
            <li><a href="https://www.facebook.com" style="color: #4CAF50;">Facebook</a></li>
            <li><a href="https://www.twitter.com" style="color: #4CAF50;">Twitter</a></li>
            <li><a href="https://www.instagram.com" style="color: #4CAF50;">Instagram</a></li>
          </ul>
          
          <p>We’re thrilled to help you hire or work locally, anytime and anywhere. Let’s make great things happen together!</p>
          
          <p>Warm regards,<br>Team ZAAP</p>
        </div>
      `;

        const textMsg =
          'Welcome to ZAAP! Thank you for registering with us. Explore our platform to find local talent or work. Need help? Email us at help@zaapondemand.ca and stay connected on Facebook, Twitter, and Instagram.';

        mailSenter(to, subject, textMsg, bodyText);
      } else {
        // If the user exists, update only the missing fields like invoiceId or isServiceProvider
        await userRef.update({
          ...userData,
          invoiceId: userSnapshot.data().invoiceId || invoiceId, // Keep the existing invoiceId if present
          isServiceProvider: userSnapshot.data().isServiceProvider || 'no', // Keep existing value or default to 'no'
        });
      }

      // Save FCM token
      await saveFcmToken(uid);

      // Dispatch the login success action with the user data from userInfo
      dispatch(
        loginSuccess({
          displayName: name,
          email: email || '', // Handle missing email by setting it to an empty string
          imageUrl: photoURL,
          userId: uid, // Use the Firebase UID
        }),
      );

      // Dispatch additional actions for chat if needed
      dispatch(
        addUserToChat({
          displayName: name,
          imageUrl: photoURL,
          userId: uid,
        }),
      );
    } catch (error) {
      console.error('Facebook login error:', error);
      dispatch(loginFailure(error));
    }
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const logoutPress = () => {
    auth()
      .signOut()
      .then(() => {
        GoogleSignin.revokeAccess();
        console.log('User signed out!');
      });
  };

  return (
    <>
      {loading && (
        <View style={{height:"100%", justifyContent: 'center', alignItems: 'center', backgroundColor: 'fffff'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Logging in, please wait...</Text>
        </View>
      )}
      <LoginScreen
        googleLogin={googleLogin}
        facebookLogin={onFacebookButtonPress}
        isLoggedIn={isLogIn}
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        toggleModal={toggleModal}
        tc={tc}
        logoutPress={logoutPress}
      />
    </>
  );
};

export default LoginContainer;
