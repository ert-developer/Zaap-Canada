import {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import CustomButton from '../../../atoms/button/buttonComponent';
import CustomTouchableOpacity from '../../../molecules/touchable-opacity/touchable-opacity-component';
import CustomImage from '../../../atoms/image/imageComponent';
import CustomText from '../../../atoms/text/textComponent';
import {
  HomeSVG,
  DarkLightSvg,
  FaqSVG,
  FavouriteSVG,
  LeftArrowIcon,
  LogoutSVG,
  DeleteAccountSVG,
  MyaccountSVG,
  MyadsSVG,
  PremiumAdsSVG,
  InvoicesSVG,
  InviteFrndSVG,
  RareSVG,
  HelpCenterSVG,
  FeedbackSvg,
} from '../../../assets/svgImage/sideDrawer';
import {drawerStyles} from './styles';
import {heightToDp, widthToDp} from '../../../responsive/responsive';
import {Color} from '../../../assets/static/globalStyles';
import {useSelector, useDispatch} from 'react-redux';
import {envConfig} from '../../../assets/helpers/envApi';
import {getUserDetails, fetchCollectionDetails} from '../../../common/collection';
import PremiumAdsContainer from '../../../pages/premiumads/premium-ads-container';
import auth from '@react-native-firebase/auth';
import {logoutSuccess} from '../../../redux/auth/action';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {BackArrowSVG} from '../../../assets/svgImage/backArrow';
import RNRestart from 'react-native-restart';
import {NativeModules} from 'react-native';
import RNShare from 'react-native-share';
import {ToastAndroid} from 'react-native';
import {deleteUser} from 'firebase/auth';
import DeleteAccountModal from '../../../organisms/deletemodal/deletemodal';
import VerificationInProgressModal from '../../../organisms/verificationprogressmodal/verificationmodal';
import DeviceInfo from 'react-native-device-info';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export const CustomerCustomDrawerContent = ({props, state, navigation}) => {
  const styles = drawerStyles();
  const dispatch = useDispatch();

  const [myprofile, setMyprofile] = useState(true);
  const [userDetails, setUserDetails] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVerificationInProgress, setVerificationInProgress] = useState(false);
  const user = useSelector(state => state.Auth.user);
  const uid = user?.userId;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userDetails = await getUserDetails(envConfig.User, uid);
  //       setUserDetails(userDetails);
  //       // Handle userDetails as needed
  //     } catch (error) {
  //       console.error('Error fetching user details:', error);
  //       // Handle the error
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleLogout = async () => {
    try {
      // Check if user logged in with Google
      const isGoogleLoggedIn = await GoogleSignin.isSignedIn();

      if (isGoogleLoggedIn) {
        // Google logout
        GoogleSignin.configure({
          webClientId: '849033912129-900hqg5pi670htf7idm8kop2dg8k0bht.apps.googleusercontent.com',
        });
        await GoogleSignin.signOut();
      }

      // Check if user logged in with Facebook
      const fbAccessToken = await AccessToken.getCurrentAccessToken();
      if (fbAccessToken) {
        // Facebook logout
        await LoginManager.logOut();
      }

      // Firebase sign out (for both Google and Facebook users)
      if (auth().currentUser) {
        await auth().signOut();
      }

      dispatch(logoutSuccess());
      ToastAndroid.showWithGravity('Signing Off', ToastAndroid.SHORT, ToastAndroid.CENTER);
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (auth().currentUser) {
        await deleteUser(auth().currentUser);
      }
      handleLogout();
      ToastAndroid.showWithGravity('Account Deleted Successfully', ToastAndroid.SHORT, ToastAndroid.CENTER);
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        handleLogout();
        ToastAndroid.showWithGravity(
          'Please re-login to perform this action.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        // Optionally, you can redirect the user to the login screen here
        // navigation.navigate('LoginScreen');
      } else {
        console.error('Error during Deletion of Account:', error);
      }
    }
  };

  const openDeleteModal = () => {
    setModalVisible(true);
  };

  const closeDeleteModal = () => {
    setModalVisible(false);
  };

  const confirmDeleteAccount = () => {
    closeDeleteModal();
    handleDeleteAccount();
  };

  // const handleLogout = async () => {
  //   try {
  //     console.log('cstep 1');
  //     await auth().signOut();
  //     console.log('ccstep 2');
  //     await GoogleSignin.revokeAccess();
  //     console.log('cstep3');
  //     dispatch(logoutSuccess());
  //     console.log('logged out from Customer');
  //     NativeModules.DevSettings.reload();
  //     // RNRestart.Restart();
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //     // Optionally, dispatch a logout failure action or show an error message to the user
  //   }
  // };

  const DrawerItemWithArrow = ({label, icon, onPress, isSelected, style}) => (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          marginTop: 18,
          // backgroundColor:isSelected ? Color.colorIndigo:'white',
          borderRadius: 10,
          ...style,
        }}>
        {icon && icon()}
        <View style={{marginLeft: 16, flex: 1}}>
          <Text style={isSelected ? styles.label2 : [styles.label, {color: isSelected ? 'red' : 'black'}]}>
            {label}
          </Text>
        </View>
        {/* <LeftArrowIcon /> */}
      </TouchableOpacity>
    </View>
  );
  // should give line space between message and url \n
  const shareOurapp = async () => {
    const shareOptions = {
      title: 'Hey friendsCheck out this app',
      message: `Hey! This app made me think of you. It's great for finding "Flexible Work" or "Hiring" someone within your budget across various sectors. Check out ZAAP and explore the world of possibilities—sign up now! 

      Android App - https://play.google.com/store/apps/ 
      
      IOS App - https://www.apple.com/in/app-store/`,
      social: RNShare.Social.WHATSAPP,
    };
    try {
      await RNShare.open(shareOptions);
    } catch (error) {
      console.error('Error sharing job details:', error);
    }
  };

  const ProfileCard = () => {
    return (
      <View style={styles.userProfileCard}>
        {!user?.imageUrl ? (
          <CustomImage style={styles.styleImage} source={require('../../../assets/default-profile.png')} />
        ) : (
          <CustomImage source={{uri: user?.imageUrl}} style={styles.styleImage} />
        )}
        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          <CustomText style={[styles.styleTitle]} text={user?.displayName} />
          <View>
            {curruserDetails[0]?.isverified === 'in progress' && (
              <CustomText style={styles.inProgressText} text="BGC In-Progress" />
            )}
          </View>
        </View>
      </View>
    );
  };

  const [curruserDetails, setCurrentUser] = useState([]);

  useEffect(() => {
    const getBGCStatus = async () => {
      const providerDevData = await fetchCollectionDetails(envConfig.Provider);
      const response = providerDevData.filter(item => item.provider_id === uid);
      setCurrentUser(response);
    };

    getBGCStatus();
  }, [setCurrentUser, curruserDetails]);

  const IdentityVerificationContainer = async () => {
    try {
      const providerDevData = await fetchCollectionDetails(envConfig.Provider);
      const response = providerDevData.filter(item => item.provider_id === uid);
      setCurrentUser(response);
      if (curruserDetails != []) {
        const isVerified = curruserDetails[0]?.isverified;
        if (isVerified === 'in progress') {
          setVerificationInProgress(true);
          setModalVisible(true);
        } else {
          setVerificationInProgress(false);
          navigation.navigate('IdentityVerificationScreen');
        }
      } else {
        navigation.navigate('IdentityVerificationScreen');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
    // setVerificationInProgress(true);
    // setModalVisible(true);
  };

  const appVersion = DeviceInfo.getVersion();

  // useEffect(() => {
  //   IdentityVerificationContainer();
  // }, []);

  const result = myprofile ? (
    <View style={{padding: 10}}>
      {/* <CustomTouchableOpacity onPress={() => navigation.goBack()}>
      <LeftArrowIcon style={styles.back} />
    </CustomTouchableOpacity> */}
      <ProfileCard />
      {/* {(isVerified === 'rejected' || isVerified === undefined) && ( */}
      {curruserDetails[0]?.isverified === 'in progress' ? (
        <CustomButton
          title={'JOIN AS A SERVICE PROVIDER'}
          style={styles.providerLabelDisabled}
          onPress={IdentityVerificationContainer}
        />
      ) : (
        <CustomButton
          title={'JOIN AS A SERVICE PROVIDER'}
          style={styles.providerLabel}
          onPress={IdentityVerificationContainer}
        />
      )}

      <VerificationInProgressModal visible={isModalVisible} onClose={() => setModalVisible(false)} />

      {/* )} */}
      <View style={{marginTop: heightToDp(2)}}>
        <DrawerItemWithArrow
          label="Home"
          icon={() => <HomeSVG />}
          onPress={() => navigation.navigate('HomeScreenStack')}
          isSelected={state.routes[state.index].name === 'HomeScreenStack'}
          style={{
            backgroundColor: state.routes[state.index].name === 'HomeScreenStack' ? Color.colorLightWhite : 'white',
          }}
        />
        <DrawerItemWithArrow
          label="Favourite"
          icon={() => <FavouriteSVG />}
          onPress={() => navigation.navigate('Favourite')}
          isSelected={state.routes[state.index].name === 'Favourite'}
          style={{backgroundColor: state.routes[state.index].name === 'Favourite' ? Color.colorLightWhite : 'white'}}
        />
        <DrawerItemWithArrow
          label="Help Center"
          icon={() => <HelpCenterSVG />}
          onPress={() => navigation.navigate('FAQ')}
          isSelected={state.routes[state.index].name === 'FAQ'}
          style={{backgroundColor: state.routes[state.index].name === 'FAQ' ? Color.colorLightWhite : 'white'}}
        />

        <DrawerItemWithArrow
          label="My Account"
          icon={() => <MyaccountSVG />}
          // onPress={() => navigation.navigate('FAQ')}
          onPress={() => setMyprofile(false)}
          isSelected={state.routes[state.index].name === 'FAQ'}
          style={{backgroundColor: state.routes[state.index].name === 'FAQ' ? Color.colorLightWhite : 'white'}}
        />

        <View style={styles.customerLogoutAndDarkCon}>
          <DrawerItemWithArrow
            label="Log Out"
            icon={() => <LogoutSVG />}
            onPress={() => handleLogout()}
            // isSelected={state.routes[state.index].name === 'Favourite'}
          />

          {/* <DrawerItemWithArrow
            label="Dark Mode"
            icon={() => <DarkLightSvg />}
            onPress={() => navigation.navigate('darklighttheme')}
            isSelected={state.routes[state.index].name === 'darklighttheme'}
            style={{marginTop: heightToDp(1)}}
          /> */}
        </View>
        <View style={styles.versionContainer}>
          <CustomText text={`Android Version: ${appVersion}`} style={styles.versionText} />
        </View>
      </View>
    </View>
  ) : (
    <View style={{padding: 10}}>
      <CustomTouchableOpacity style={styles.backBtnContainer}>
        <BackArrowSVG onPress={() => setMyprofile(true)} />
        <CustomText text={'Back'} style={styles.backBtnText} />
      </CustomTouchableOpacity>
      <ProfileCard />
      <View style={{marginTop: heightToDp(2)}}>
        <DrawerItemWithArrow
          label="My Profile"
          icon={() => <MyaccountSVG />}
          onPress={() => navigation.navigate('ProfileScreen')}
          isSelected={state.routes[state.index].name === 'HomeScreenStack'}
          style={{
            backgroundColor: state.routes[state.index].name === 'HomeScreenStack' ? Color.colorLightWhite : 'white',
          }}
        />
        <DrawerItemWithArrow
          label="My Ads"
          icon={() => <MyadsSVG />}
          onPress={() => navigation.navigate('MyJobScreen')}
          isSelected={state.routes[state.index].name === 'MyJobScreen'}
          style={{backgroundColor: state.routes[state.index].name === 'MyJobScreen' ? Color.colorLightWhite : 'white'}}
        />
        <DrawerItemWithArrow
          label="Premium Ads"
          icon={() => <PremiumAdsSVG />}
          onPress={() => navigation.navigate('PremiumAds')}
          isSelected={state.routes[state.index].name === 'PremiumAds'}
          style={{backgroundColor: state.routes[state.index].name === 'PremiumAds' ? Color.colorLightWhite : 'white'}}
        />

        <DrawerItemWithArrow
          label="Invoices"
          icon={() => <InvoicesSVG />}
          onPress={() => navigation.navigate('Invoices')}
          isSelected={state.routes[state.index].name === 'Invoices'}
          style={{backgroundColor: state.routes[state.index].name === 'Invoices' ? Color.colorLightWhite : 'white'}}
        />
        <DrawerItemWithArrow
          label="Feedback"
          icon={() => <FeedbackSvg />}
          onPress={() => navigation.navigate('feedback')}
          isSelected={state.routes[state.index].name === 'Feedback'}
          style={{backgroundColor: state.routes[state.index].name === 'Invoices' ? Color.colorLightWhite : 'white'}}
        />
        {/* <DrawerItemWithArrow
          label="Rate Us"
          icon={() => <RareSVG />}
          // onPress={() => navigation.navigate('darklighttheme')}
          // isSelected={state.routes[state.index].name === 'darklighttheme'}
          style={{marginTop: heightToDp(1)}}
        /> */}
        <DrawerItemWithArrow
          label="Invite Friends to ZAAP"
          icon={() => <InviteFrndSVG />}
          onPress={() => shareOurapp()}
          isSelected={state.routes[state.index].name === 'ShareOurApp'}
          style={{backgroundColor: state.routes[state.index].name === 'ShareOurApp' ? Color.colorLightWhite : 'white'}}
        />
        <DrawerItemWithArrow
          label="Delete Account"
          icon={() => <DeleteAccountSVG />}
          onPress={openDeleteModal} // Open modal on button press
          style={{marginTop: heightToDp(1)}}
        />

        <DeleteAccountModal visible={isModalVisible} onClose={closeDeleteModal} onConfirm={confirmDeleteAccount} />
      </View>
    </View>
  );

  return result;
};
