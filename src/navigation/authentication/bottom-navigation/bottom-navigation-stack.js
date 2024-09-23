import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PostJobContainer from '../../../pages/postJob/postJob-container';
import HomeContainer from '../../../pages/home/home-container';
import {heightToDp} from '../../../responsive/responsive';
import {
  FillHome,
  FillChat,
  FillNear,
  FillChatt,
  FillMyJobs,
  NearMeNewSVG,
  HomeNewSVG,
  NearMeFillNewSVG,
  MyJobsFillNewSVG,
} from '../../../assets/svgImage/bottomDrawer';
import {MyJobsSvg, ChatSvg} from '../../../assets/svgIcons/bottomdrawersvg';
import {JobPost} from '../../../assets/svgIcons/bottomdrawersvg';
import {ChatStack} from '../post-auth/post-auth-stack';
import styles from './styles';
import {View, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {widthToDp} from '../../../responsive/responsive';
import MyJobServiceContainer from '../../../pages/myJob/serviceProvider/myJob-container';
import NearMeContainer from '../../../pages/nearMe/nearMe-container';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyJobsSelectd from '../../../pages/myJob/serviceProvider/selected-screen';
import MyJobsPreviousJobs from '../../../pages/myJob/serviceProvider/previousjobs-screen';
import {useDispatch, useSelector} from 'react-redux';
import {fetchServiceProviderDetails} from '../../../redux/providerstatus/action';
import {useEffect} from 'react';
import HeaderComponent from '../../../atoms/header/headerComponent';
import NoJobPostModal from '../../../molecules/modals/job-post-service-provider-pop-up';
import {useNavigation} from '@react-navigation/native';
import {setEditJobStatus} from '../../../redux/editjob/action';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function MyTabs() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.Auth.user);
  const userId = user.userId;
  useEffect(() => {
    if (userId) {
      dispatch(fetchServiceProviderDetails(userId));
    }
  }, [userId]);
  const providerStatus = useSelector(state => state.providerverification.providerDetails);
  const isVerified = providerStatus[0]?.isverified;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{name: isVerified === 'verified' ? 'HIRED' : 'Live Ads'}],
  //     });
  //   }, [isVerified]),
  // );

  return (
    <TopTab.Navigator style={styles.mainContainer}>
      <Tab.Screen
        name={isVerified === 'verified' ? 'APPLIED' : 'HIRED'}
        component={MyJobsSelectd}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text style={{color, fontSize: 11, fontWeight: 'bold'}}>
              {isVerified === 'verified' ? 'APPLIED' : 'HIRED'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={isVerified === 'verified' ? 'HIRED' : 'Live Ads'}
        component={MyJobServiceContainer}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text style={{color, fontSize: 11, fontWeight: 'bold'}}>
              {isVerified === 'verified' ? 'HIRED' : 'LIVE ADS'}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={isVerified === 'verified' ? 'PREVIOUS WORK' : 'PREVIOUS ADS'}
        component={MyJobsPreviousJobs}
        isVerified={isVerified}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text style={{color, fontSize: 11, textAlign: 'center', fontWeight: 'bold'}}>
              {isVerified === 'verified' ? 'PREVIOUS WORK' : 'PREVIOUS ADS'}
            </Text>
          ),
        }}
      />
      {/* <TopTab.Screen name={isVerified === 'verified' ? 'HIRED' : ' Live Ads'} component={MyJobServiceContainer} /> */}
      {/* <TopTab.Screen
        name={isVerified === 'verified' ? 'PREVIOUS WORK' : 'PREVIOUS Ads'}
        component={MyJobsPreviousJobs}
      /> */}
    </TopTab.Navigator>
  );
}
const HeaderText = () => (
  <>
    <HeaderComponent text={'My Jobs'} />
    <MyTabs />
  </>
);

const BottomTabStack = () => {
  const providerStatus = useSelector(state => state.providerverification.providerDetails);
  const isVerified = providerStatus[0]?.isverified;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'red',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeContainer}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) =>
            focused ? <FillHome width={24} height={24} /> : <HomeNewSVG width={30} height={30} />,
        }}
      />
      <Tab.Screen
        name="Chatt"
        component={ChatStack}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({focused}) => {
            const unreadMessages = useSelector(state => state.unreadMessages.unreadMessages);
            const hasUnreadMessages = unreadMessages.length > 0;

            return (
              <>
                {hasUnreadMessages ? (
                  <View>
                    <Image
                      source={require('../../../assets/ChatNotification.gif')}
                      style={styles.activeNotification}
                      resizeMode="contain"
                    />
                  </View>
                ) : focused ? (
                  <FillChatt width={24} height={24} />
                ) : (
                  <ChatSvg width={20} height={20} />
                )}
              </>
            );
          },
        }}
      />

      <Tab.Screen
        name="PostJobScreen"
        component={isVerified === 'verified' ? NoJobPostModal : PostJobContainer}
        options={{
          tabBarLabel: 'Post Job',
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                position: 'absolute',
                bottom: 9,
                // backgroundColor: 'lightgray',
                width: widthToDp(18),
                height: widthToDp(10),
                borderRadius: widthToDp(9),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setEditJobStatus({jobId: null, editJobStatus: false}));
                  navigation.navigate('PostJobScreen');
                }}
                style={{
                  // backgroundColor: 'black',
                  // width: widthToDp(25),
                  // height: widthToDp(25),
                  // borderRadius: widthToDp(50),
                  // justifyContent: 'center',
                  // alignItems: 'center',

                  // shadowColor: '#000000',
                  // shadowOffset: {
                  //   width: 0,
                  //   height: -20, // Negative value to make the shadow appear on top
                  // },
                  // shadowOpacity: 0.24,
                  // shadowRadius: 6,
                  // elevation: 9,
                  boxShadow: {
                    elevation: 5, // Android
                    // shadowColor: '#0000FF',
                    shadowColor: '#000',
                    shadowOffset: {width: 8, height: 2},
                    shadowOpacity: 1,
                    shadowRadius: 13,
                  },
                }}>
                <JobPost />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NearByMeScreen"
        component={NearMeContainer}
        options={{
          tabBarLabel: 'Near Me',
          tabBarIcon: ({focused}) =>
            focused ? <NearMeFillNewSVG width={24} height={24} /> : <NearMeNewSVG width={24} height={24} />,
        }}
      />
      <Tab.Screen
        name="MyJobScreen"
        component={HeaderText}
        options={{
          tabBarLabel: 'My Jobs',
          tabBarIcon: ({focused}) =>
            focused ? <MyJobsFillNewSVG width={25} height={25} /> : <MyJobsSvg width={20} height={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;
