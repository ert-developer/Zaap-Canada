/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useState} from 'react';
import {View, TouchableOpacity, Text, ScrollView, ToastAndroid} from 'react-native';
import CustomTouchableOpacity from '../../../molecules/touchable-opacity/touchable-opacity-component';
import CustomImage from '../../../atoms/image/imageComponent';
import CustomText from '../../../atoms/text/textComponent';
import {deleteUser} from 'firebase/auth';

import {
  HomeSVG,
  FavouriteSVG,
  LogoutSVG,
  DeleteAccountSVG,
  MyaccountSVG,
  InviteFrndSVG,
  BlueTick,
  MyJobsSVG,
  MyPublicProfileSVG,
  MyPortfolioSVG,
  MyEarningsSVG,
  BankDetailsSVG,
  GovtIDSVG,
  HelpCenterSVG,
  FeedbackSvg,
} from '../../../assets/svgImage/sideDrawer';
import {drawerStyles} from './styles';
import {heightToDp, widthToDp} from '../../../responsive/responsive';
import {Color} from '../../../assets/static/globalStyles';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {logoutSuccess} from '../../../redux/auth/action';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {BackArrowSVG} from '../../../assets/svgImage/backArrow';
import RNShare from 'react-native-share';
import DeleteAccountModal from '../../../organisms/deletemodal/deletemodal';
import DeviceInfo from 'react-native-device-info';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {Platform} from 'react-native';

export const ProviderCustomDrawerContent = ({props, state, navigation}) => {
  const serviceProviderDetails = useSelector(state => state.providerverification.providerDetails);

  const styles = drawerStyles();
  const dispatch = useDispatch();

  const [myprofile, setMyprofile] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const appVersion = DeviceInfo.getVersion();

  const handleLogout = async () => {
    try {
      // Check if user logged in with Google
      const isGoogleLoggedIn = await GoogleSignin.isSignedIn();

      if (isGoogleLoggedIn) {
        // Google logout
        GoogleSignin.configure({
          webClientId: '600651705755-ua5v3vhufd010oja72b1a7libdk3hogr.apps.googleusercontent.com',
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

  const DrawerItemWithArrow = useCallback(
    ({label, icon, onPress, isSelected, style}) => (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: widthToDp(2),
          margin: widthToDp(1),
          borderRadius: 10,
        }}>
        <View
          style={{
            padding: widthToDp(1),
          }}>
          {icon && icon()}
        </View>
        <View
          style={{
            marginLeft: widthToDp(6),
            flex: 1,
          }}>
          <Text style={isSelected ? styles.label2 : [styles.label, {color: isSelected ? 'red' : 'black'}]}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  const ProfileCard = () => {
    return (
      <View style={styles.userProfileCard}>
        {serviceProviderDetails[0]?.personal_photo ? (
          <CustomImage source={{uri: serviceProviderDetails[0]?.personal_photo[0]}} style={styles.styleImage} />
        ) : (
          <CustomImage source={{uri: serviceProviderDetails[0]?.imageURL}} style={styles.styleImage} />
        )}
        <View>
          <CustomText style={[styles.styleTitle]} text={serviceProviderDetails[0]?.legal_name_on_id} />
          <View style={styles.verifiedTextCon}>
            <BlueTick style={styles.rightTick} />
            <Text style={styles.verificationText}>Verified</Text>
          </View>
          <Text style={styles.serviceProvidertext}>Service Provider</Text>
        </View>
      </View>
    );
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

  const shareOurapp = async () => {
    const shareOptions = {
      title: 'Hey friendsCheck out this app',
      message: `Hey! This app made me think of you. It's great for finding "Flexible Work" or "Hiring" someone within your budget across various sectors. Check out ZAAP and explore the world of possibilities—sign up now! 

      Android App - https://play.google.com/store/apps/details?id=com.zaap-canada
      
      IOS App - https://apps.apple.com/app/zaap-ondemand/id6737913133`,
      url: 'https://apps.apple.com/app/zaap-ondemand/id6737913133', //should keep the link of the app
      social: RNShare.Social.WHATSAPP,
    };
    try {
      await RNShare.open(shareOptions);
    } catch (error) {
      console.log('Error sharing app:', error);
    }
  };

  const result = myprofile ? (
    <View style={{padding: 10}}>
      <ProfileCard />
      <View style={{marginTop: heightToDp(2)}}>
        <DrawerItemWithArrow
          label=" Home"
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

        <View style={styles.logoutAndDarkCon}>
          <DrawerItemWithArrow
            label="Log Out"
            icon={() => <LogoutSVG />}
            onPress={() => handleLogout()}
            isSelected={state.routes[state.index].name === 'Favourite'}
          />
          <View style={styles.versionContainerSP}>
            {Platform.OS === 'ios' ? (
              <CustomText text={`iOS Version: ${appVersion}`} style={styles.versionText} />
            ) : (
              <CustomText text={`Android Version: ${appVersion}`} style={styles.versionText} />
            )}
          </View>

          {/* <DrawerItemWithArrow
            label="Dark Mode"
            icon={() => <DarkLightSvg />}
            onPress={() => navigation.navigate('darklighttheme')}
            isSelected={state.routes[state.index].name === 'darklighttheme'}
            style={{marginTop: heightToDp(1)}}
          /> */}
        </View>
      </View>
    </View>
  ) : (
    <>
      <View style={{padding: 10}}>
        <CustomTouchableOpacity style={styles.backBtnContainer}>
          <BackArrowSVG onPress={() => setMyprofile(true)} />
          <CustomText text={'Back'} style={styles.backBtnText} />
        </CustomTouchableOpacity>
        <ProfileCard />
      </View>
      <ScrollView style={{marginTop: heightToDp(2)}}>
        <DrawerItemWithArrow
          label="My Profile"
          icon={() => <MyaccountSVG />}
          onPress={() => navigation.navigate('ServiceProviderProfile')}
          isSelected={state.routes[state.index].name === 'ServiceProviderProfile'}
          style={{
            backgroundColor:
              state.routes[state.index].name === 'ServiceProviderProfile' ? Color.colorLightWhite : 'white',
          }}
        />
        <DrawerItemWithArrow
          label="My Jobs"
          icon={() => <MyJobsSVG />}
          onPress={() => navigation.navigate('MyJobScreen')}
          isSelected={state.routes[state.index].name === 'My Jobs'}
          style={{backgroundColor: state.routes[state.index].name === 'My Jobs' ? Color.colorLightWhite : 'white'}}
        />
        <DrawerItemWithArrow
          label="My Public Profile"
          icon={() => <MyPublicProfileSVG />}
          onPress={() => navigation.navigate('ServiceProviderPublicProfile')}
          isSelected={state.routes[state.index].name === 'ServiceProviderPublicProfile'}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor:
              state.routes[state.index].name === 'ServiceProviderPublicProfile' ? Color.colorLightWhite : 'white',
          }}
        />

        <DrawerItemWithArrow
          label="My Portfolio"
          icon={() => <MyPortfolioSVG />}
          onPress={() => navigation.navigate('Portfolio')}
          isSelected={state.routes[state.index].name === 'Portfolio'}
          style={{backgroundColor: state.routes[state.index].name === 'Portfolio' ? Color.colorLightWhite : 'white'}}
        />
        <DrawerItemWithArrow
          label="My Earnings"
          icon={() => <MyEarningsSVG />}
          onPress={() => navigation.navigate('myEarnings')}
          isSelected={state.routes[state.index].name === 'myEarnings'}
          style={{backgroundColor: state.routes[state.index].name === 'myEarnings' ? Color.colorLightWhite : 'white'}}
        />
        <DrawerItemWithArrow
          label="Update Bank Details"
          icon={() => <BankDetailsSVG />}
          onPress={() => navigation.navigate('UpdateBankDetails')}
          isSelected={state.routes[state.index].name === 'UpdateBankDetails'}
          style={{marginTop: heightToDp(1)}}
        />
        <DrawerItemWithArrow
          label="Update Govt ID"
          icon={() => <GovtIDSVG />}
          onPress={() => navigation.navigate('UpdateGovtDetails')}
          isSelected={state.routes[state.index].name === 'UpdateGovtDetails'}
          style={{marginTop: heightToDp(1)}}
        />
        <DrawerItemWithArrow
          label="Feedback"
          icon={() => <FeedbackSvg />}
          onPress={() => navigation.navigate('feedback')}
          isSelected={state.routes[state.index].name === 'feedback'}
          style={{marginTop: heightToDp(1)}}
        />
        {/* <DrawerItemWithArrow
          label="Rate Us"
          icon={() => <RareSVG />}
          //   onPress={() => navigation.navigate('darklighttheme')}
          //   isSelected={state.routes[state.index].name === 'darklighttheme'}
          //   style={{marginTop: heightToDp(1)}}
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
      </ScrollView>
    </>
  );

  return result;
};
