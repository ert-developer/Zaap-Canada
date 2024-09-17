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
    </Drawer.Navigator>
  );
};

export default CustomDrawer;
