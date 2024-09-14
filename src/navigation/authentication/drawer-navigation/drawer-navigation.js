import React, {useEffect, useState} from 'react';
import {DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreenStack, ProfileScreenStack} from '../post-auth/post-auth-stack';
import {
  HomeSVG,
  AllJobsSVG,
  AboutUsSVG,
  DarkLightSvg,
  FaqSVG,
  FavouriteSVG,
  PreviousJobsSVG,
  BackIcon,
  BlueTick,
  LeftArrowIcon,
  LogoutSVG,
  MyaccountSVG,
  MyadsSVG,
  PremiumAdsSVG,
  InvoicesSVG,
  InviteFrndSVG,
  RareSVG,
} from '../../../assets/svgImage/sideDrawer';
import CardComponent from '../../../molecules/card/card';
// import styles from './styles';
import CustomButton from '../../../atoms/button/buttonComponent';
import {Alert, View, TouchableOpacity, Text, StyleSheet, Button} from 'react-native';
import DevelopmentScreen from '../../../atoms/developmentScreen/dev-screen';
import CustomText from '../../../atoms/text/textComponent';
import {useNavigation} from '@react-navigation/native';
import {tabView, widthToDp} from '../../../responsive/responsive';
import CustomTouchableOpacity from '../../../molecules/touchable-opacity/touchable-opacity-component';
import DevContainer from '../../../atoms/developmentScreen/dev-container';
import {useSelector} from 'react-redux';
import ContactUs from '../../../pages/contactUs/contactUs-screen';
import AllJobsContainer from '../../../pages/alljobs/alljobs-container';
import {fetchCollectionDetails} from '../../../common/collection';
import {envConfig} from '../../../assets/helpers/envApi';
import {useDispatch} from 'react-redux';
import {fetchServiceProviderDetails} from '../../../redux/providerstatus/action';
const Drawer = createDrawerNavigator();
import FavouritConatiner from '../../../pages/favourite/favourite-container';
import {updateProviderStatus} from '../../../redux/providerstatus/action';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {logoutSuccess} from '../../../redux/auth/action';
import auth from '@react-native-firebase/auth';
import IdentityVerificationContainer from '../../../pages/identityverification/identity-container';
import {heightToDp} from '../../../responsive/responsive';
import {ChevronRightSvg} from '../../../assets/svgImage/sideDrawer';
import CustomModal from '../../../molecules/custommodal';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomImage from '../../../atoms/image/imageComponent';
import {drawerStyles} from './styles';
import {Color} from '../../../assets/static/globalStyles';
import {CustomerCustomDrawerContent} from './customer-custome-drawer-content';
import {ProviderCustomDrawerContent} from './provider-custome-drawer-content';

const CustomDrawer = () => {
  const [myprofile, setMyprofile] = useState(true);

  const styles = drawerStyles();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigation = useNavigation();
  const user = useSelector(state => state.Auth.user);

  const providerStatus = useSelector(state => state.providerverification.providerDetails);
  const isVerified = user?.isServiceProvider;
  // const providerStatus = useSelector(state => state.providerverification.providerDetails);

  // const providerVerify = providerStatus.some(item => item.provider_id === user.userId);
  const providerVerify = providerStatus[0]?.isverified;

  useEffect(() => {
    dispatch(fetchServiceProviderDetails(user.userId));
  }, []);
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(logoutSuccess());
        GoogleSignin.revokeAccess();
        // alert('User signed outtttttt!');
        // setModalVisible(true)
      });
  };

  // const DrawerItemWithArrow = ({label, icon, onPress, isSelected, style}) => (
  //   <View>
  //     <TouchableOpacity
  //       onPress={onPress}
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         padding: 10,
  //         marginTop: 18,
  //         // backgroundColor:isSelected ? Color.colorIndigo:'white',
  //         borderRadius: 10,
  //         ...style,
  //       }}>
  //       {icon && icon()}
  //       <View style={{marginLeft: 16, flex: 1}}>
  //         <Text style={isSelected ? styles.label2 : [styles.label, {color: isSelected ? 'red' : 'black'}]}>
  //           {label}
  //         </Text>
  //       </View>
  //       {/* <LeftArrowIcon /> */}
  //     </TouchableOpacity>
  //   </View>
  // );

  // const IdentityVerificationContainer = () => {
  //   navigation.navigate('IdentityVerificationScreen');
  // };

  // const CustomDrawerContent = ({props, state, navigation}) => {

  //   const result = myprofile ? (
  //     <View style={{padding: 10}}>
  //       {/* <CustomTouchableOpacity onPress={() => navigation.goBack()}>
  //     <LeftArrowIcon style={styles.back} />
  //   </CustomTouchableOpacity> */}
  //       <ProfileCard />
  //       {(isVerified === 'rejected' || isVerified === undefined) && (
  //         <CustomButton
  //           title={'JOIN AS A SERVICE PROVIDER'}
  //           style={styles.providerLabel}
  //           onPress={IdentityVerificationContainer}
  //         />
  //       )}
  //       <View style={{marginTop: heightToDp(2)}}>
  //         <DrawerItemWithArrow
  //           label="Home"
  //           icon={() => <HomeSVG />}
  //           onPress={() => navigation.navigate('HomeScreenStack')}
  //           isSelected={state.routes[state.index].name === 'HomeScreenStack'}
  //           style={{
  //             backgroundColor: state.routes[state.index].name === 'HomeScreenStack' ? Color.colorLightWhite : 'white',
  //           }}
  //         />
  //         {/* <DrawerItemWithArrow
  //         label="Previous Jobs"
  //         icon={() => <PreviousJobsSVG />}
  //         onPress={() => navigation.navigate('Previous Jobs')}
  //         isSelected={state.routes[state.index].name === 'Previous Jobs'}
  //         style={{backgroundColor:state.routes[state.index].name === 'Previous Jobs' ? Color.colorIndigo:'white'}}
  //       /> */}
  //         <DrawerItemWithArrow
  //           label="Favourite"
  //           icon={() => <FavouriteSVG />}
  //           onPress={() => navigation.navigate('Favourite')}
  //           isSelected={state.routes[state.index].name === 'Favourite'}
  //           style={{backgroundColor: state.routes[state.index].name === 'Favourite' ? Color.colorLightWhite : 'white'}}
  //         />
  //         <DrawerItemWithArrow
  //           label="Contact Us"
  //           icon={() => <FaqSVG />}
  //           onPress={() => navigation.navigate('FAQ')}
  //           isSelected={state.routes[state.index].name === 'FAQ'}
  //           style={{backgroundColor: state.routes[state.index].name === 'FAQ' ? Color.colorLightWhite : 'white'}}
  //         />

  //         <DrawerItemWithArrow
  //           label="My Account"
  //           icon={() => <MyaccountSVG />}
  //           // onPress={() => navigation.navigate('FAQ')}
  //           onPress={() => setMyprofile(false)}
  //           isSelected={state.routes[state.index].name === 'FAQ'}
  //           style={{backgroundColor: state.routes[state.index].name === 'FAQ' ? Color.colorLightWhite : 'white'}}
  //         />

  //         <View style={styles.logoutAndDarkCon}>
  //           <DrawerItemWithArrow
  //             label="Log Out"
  //             icon={() => <LogoutSVG />}
  //             onPress={() => handleLogout()}
  //             isSelected={state.routes[state.index].name === 'Favourite'}
  //           />
  //           <DrawerItemWithArrow
  //             label="Dark Mode"
  //             icon={() => <DarkLightSvg />}
  //             onPress={() => navigation.navigate('darklighttheme')}
  //             isSelected={state.routes[state.index].name === 'darklighttheme'}
  //             style={{marginTop: heightToDp(1)}}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   ) : (
  //     <View style={{padding: 10}}>
  //       <CustomTouchableOpacity onPress={() => setMyprofile(true)}>
  //         <LeftArrowIcon style={styles.back} />
  //       </CustomTouchableOpacity>
  //       <ProfileCard />
  //       {/* {(isVerified === 'rejected' || isVerified === undefined) && (
  //         <CustomButton
  //           title={'JOIN AS A SERVICE PROVIDER'}
  //           style={styles.providerLabel}
  //           onPress={IdentityVerificationContainer}
  //         />
  //       )} */}
  //       <View style={{marginTop: heightToDp(2)}}>
  //         <DrawerItemWithArrow
  //           label="My Profile"
  //           icon={() => <MyaccountSVG />}
  //           onPress={() => navigation.navigate('HomeScreenStack')}
  //           isSelected={state.routes[state.index].name === 'HomeScreenStack'}
  //           style={{
  //             backgroundColor: state.routes[state.index].name === 'HomeScreenStack' ? Color.colorLightWhite : 'white',
  //           }}
  //         />
  //         {/* <DrawerItemWithArrow
  //         label="Previous Jobs"
  //         icon={() => <PreviousJobsSVG />}
  //         onPress={() => navigation.navigate('Previous Jobs')}
  //         isSelected={state.routes[state.index].name === 'Previous Jobs'}
  //         style={{backgroundColor:state.routes[state.index].name === 'Previous Jobs' ? Color.colorIndigo:'white'}}
  //       /> */}
  //         <DrawerItemWithArrow
  //           label="My Ads"
  //           icon={() => <MyadsSVG />}
  //           onPress={() => navigation.navigate('Favourite')}
  //           isSelected={state.routes[state.index].name === 'Favourite'}
  //           style={{backgroundColor: state.routes[state.index].name === 'Favourite' ? Color.colorLightWhite : 'white'}}
  //         />
  //         <DrawerItemWithArrow
  //           label="Premium Ads"
  //           icon={() => <PremiumAdsSVG />}
  //           onPress={() => navigation.navigate('FAQ')}
  //           isSelected={state.routes[state.index].name === 'FAQ'}
  //           style={{backgroundColor: state.routes[state.index].name === 'FAQ' ? Color.colorLightWhite : 'white'}}
  //         />

  //         <DrawerItemWithArrow
  //           label="Invoices"
  //           icon={() => <InvoicesSVG />}
  //           onPress={() => navigation.navigate('FAQ')}
  //           isSelected={state.routes[state.index].name === 'FAQ'}
  //           style={{backgroundColor: state.routes[state.index].name === 'FAQ' ? Color.colorLightWhite : 'white'}}
  //         />
  //         <DrawerItemWithArrow
  //           label="Invite Friends to ZAAP"
  //           icon={() => <InviteFrndSVG />}
  //           onPress={() => handleLogout()}
  //           isSelected={state.routes[state.index].name === 'Favourite'}
  //         />
  //         <DrawerItemWithArrow
  //           label="Rare Ua"
  //           icon={() => <RareSVG />}
  //           onPress={() => navigation.navigate('darklighttheme')}
  //           isSelected={state.routes[state.index].name === 'darklighttheme'}
  //           style={{marginTop: heightToDp(1)}}
  //         />
  //       </View>
  //     </View>
  //   );

  //   return result;
  //   // <View style={{padding: 10}}>
  //   //   {/* <CustomTouchableOpacity onPress={() => navigation.goBack()}>
  //   //     <LeftArrowIcon style={styles.back} />
  //   //   </CustomTouchableOpacity> */}
  //   //   <ProfileCard />
  //   //   {(isVerified === 'rejected' || isVerified === undefined) && (
  //   //     <CustomButton
  //   //       title={'JOIN AS A SERVICE PROVIDER'}
  //   //       style={styles.providerLabel}
  //   //       onPress={IdentityVerificationContainer}
  //   //     />
  //   //   )}
  //   //   <View style={{marginTop: heightToDp(2)}}>
  //   //     <DrawerItemWithArrow
  //   //       label="Home"
  //   //       icon={() => <HomeSVG />}
  //   //       onPress={() => navigation.navigate('HomeScreenStack')}
  //   //       isSelected={state.routes[state.index].name === 'HomeScreenStack'}
  //   //       style={{
  //   //         backgroundColor: state.routes[state.index].name === 'HomeScreenStack' ? Color.colorLightWhite : 'white',
  //   //       }}
  //   //     />
  //   //     {/* <DrawerItemWithArrow
  //   //         label="Previous Jobs"
  //   //         icon={() => <PreviousJobsSVG />}
  //   //         onPress={() => navigation.navigate('Previous Jobs')}
  //   //         isSelected={state.routes[state.index].name === 'Previous Jobs'}
  //   //         style={{backgroundColor:state.routes[state.index].name === 'Previous Jobs' ? Color.colorIndigo:'white'}}
  //   //       /> */}
  //   //     <DrawerItemWithArrow
  //   //       label="Favourite"
  //   //       icon={() => <FavouriteSVG />}
  //   //       onPress={() => navigation.navigate('Favourite')}
  //   //       isSelected={state.routes[state.index].name === 'Favourite'}
  //   //       style={{backgroundColor: state.routes[state.index].name === 'Favourite' ? Color.colorLightWhite : 'white'}}
  //   //     />
  //   //     <DrawerItemWithArrow
  //   //       label="Contact Us"
  //   //       icon={() => <FaqSVG />}
  //   //       onPress={() => navigation.navigate('FAQ')}
  //   //       isSelected={state.routes[state.index].name === 'FAQ'}
  //   //       style={{backgroundColor: state.routes[state.index].name === 'FAQ' ? Color.colorLightWhite : 'white'}}
  //   //     />

  //   //     <DrawerItemWithArrow
  //   //       label="My Account"
  //   //       icon={() => <MyaccountSVG />}
  //   //       onPress={() => navigation.navigate('FAQ')}
  //   //       isSelected={state.routes[state.index].name === 'FAQ'}
  //   //       style={{backgroundColor: state.routes[state.index].name === 'FAQ' ? Color.colorLightWhite : 'white'}}
  //   //     />

  //   //     <View style={styles.logoutAndDarkCon}>
  //   //       <DrawerItemWithArrow
  //   //         label="Log Out"
  //   //         icon={() => <LogoutSVG />}
  //   //         onPress={() => handleLogout()}
  //   //         isSelected={state.routes[state.index].name === 'Favourite'}
  //   //       />
  //   //       <DrawerItemWithArrow
  //   //         label="Dark Mode"
  //   //         icon={() => <DarkLightSvg />}
  //   //         onPress={() => navigation.navigate('darklighttheme')}
  //   //         isSelected={state.routes[state.index].name === 'darklighttheme'}
  //   //         style={{marginTop: heightToDp(1)}}
  //   //       />
  //   //     </View>
  //   //   </View>
  //   // </View>
  // };

  // const ProfileCard = () => {
  //   return (
  //     <View style={styles.userProfileCard}>
  //       <CustomImage source={{uri: user?.imageUrl}} style={[styles.styleImage]} />
  //       <CustomText style={[styles.styleTitle]} text={user.displayName} />
  //     </View>
  //   );

  //   // return (
  //   //   <CardComponent
  //   //     imageUrl={user?.imageURL}
  //   //     title={user.displayName}
  //   //     description={providerVerify ? 'ServiceProvider' : null}
  //   //     styleContainer={styles.styleContainer}
  //   //     styleImage={styles.styleImage}
  //   //     styleTitle={styles.styleTitle}
  //   //     styleDesc={styles.styleDesc}
  //   //     onPress={() => navigation.navigate('ProfileScreen')}
  //   //   />
  //   // );
  // };

  return (
    <Drawer.Navigator
      initialRouteName="HomeScreenStack"
      drawerContent={
        isVerified === true
          ? props => <ProviderCustomDrawerContent {...props} />
          : props => <CustomerCustomDrawerContent {...props} />
      }
      screenOptions={{
        headerShown: false,
      }}>
      {/* {(isVerified === 'rejected' || isVerified === undefined) && (
        <Drawer.Screen
          name="Verify"
          options={{
            drawerLabel: 'BECOME A PROVIDER',
            drawerLabelStyle: styles.providerLabel,
            title: '',
          }}
          component={IdentityVerificationContainer}
        />
      )} */}
      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          headerShown: false,
          drawerLabel: 'Home',
          title: '',
          drawerIcon: ({focused, size}) => <HomeSVG width={size} height={size} />,
        }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="Previous Jobs"
        options={{
          drawerLabel: 'Previous Jobs',
          title: '',
          drawerIcon: ({focused, size}) => <PreviousJobsSVG width={size} height={size} />,
        }}
        component={DevContainer}
      />
      <Drawer.Screen
        name="Favourite"
        options={{
          drawerLabel: 'Favourite',
          title: '',
          drawerIcon: ({focused, size}) => <FavouriteSVG width={size} height={size} />,
        }}
        component={FavouritConatiner}
      />
      <Drawer.Screen
        name="FAQ"
        options={{
          drawerLabel: 'Contact Us',
          title: '',
          drawerIcon: ({focused, size}) => <FaqSVG width={size} height={size} />,
        }}
        component={ContactUs}
      />
      <Drawer.Screen
        name="LogOut"
        options={{
          drawerLabel: 'LogOut',
          title: '',
          drawerIcon: ({focused, size}) => <AllJobsSVG width={size} height={size} />,
        }}
        component={handleLogout}
      />
      <Drawer.Screen
        name="darklighttheme"
        options={{
          drawerLabel: 'Dark Mode',
          title: '',
          drawerIcon: ({focused, size}) => <DarkLightSvg width={100} height={100} />,
        }}
        component={DevContainer}
      />
    </Drawer.Navigator>
  );
};

export default CustomDrawer;
