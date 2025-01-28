import React, {useEffect, useMemo, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import HomeStyles from './home-styles';
import CustomTextInput from '../../atoms/textInput/textInputComponent';
import CustomTouchableOpacity from '../../molecules/touchable-opacity/touchable-opacity-component';
import CardSpotlite from '../../organisms/cardSpotlight/CardSpotlight';
import CustomLoader from '../../organisms/customLoader';
import LinearGradient from 'react-native-linear-gradient';
import {
  Events,
  VideoMakers,
  Appliance,
  Beauty,
  Delivery,
  Tech,
  Photographers,
  Entertainers,
  More,
  SearchIcon,
} from '../../assets/svgImage/popularCategories';
import {
  Architect,
  Cleaner,
  Construction,
  Cook,
  Drivers,
  Electrician,
  Fitness,
  InteriorDesigner,
  Mechanic,
  Packers,
  Painter,
  PetService,
  Security,
  Taxes,
  Translation,
  Tutor,
} from '../../assets/svgImage/categories';
import CustomHeader from '../../organisms/Header/Header';
import {heightToDp, tabView, widthToDp} from '../../responsive/responsive';
import CustomImage from '../../atoms/image/imageComponent';
import CardJobs from '../../molecules/job-card/jobCard';
import JobList from '../../organisms/jobList/jobList';
import {CircleIcon, Live, MenuSvg} from '../../assets/svgImage/home';
import CurrentLocation from '../../organisms/currentLocation/currentLocation';
import StaticImage from '../../assets/svgImage/static';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import BottomHalfModal from '../../organisms/bottomHalfModal/bottomHalfModal';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import Loc from '../../organisms/loc/loc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationListener from '../../organisms/locationListner/locationListner';
import {permission} from '../../redux/location/action';
import LocationBack from '../../assets/svgImage/locationBackground';
import LocationSVG from '../../assets/svgImage/jobDetail/location';
import LocationSvg from '../../assets/svgImage/home/location-svg';
import {NotificationSvg, Activenotification} from '../../assets/svgImage/home/notification-svg';
import {useNavigation} from '@react-navigation/native';
import Carousel from './carousel';
import {Padding} from '../../assets/static/globalStyles';
import JobCarousel from './jobs-carousel';
import {fetchCollectionDetails} from '../../common/collection';
import {useSelector} from 'react-redux';
import {tr} from 'date-fns/locale';
import FastImage from 'react-native-fast-image';
import {envConfig} from '../../assets/helpers/envApi';
import {Image} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const HomeScreen = ({
  navigation,
  categoriesData,
  showAllCategory,
  searchText,
  setSearchText,
  wlteredJobs,
  handleJobPress,
  spotLight,
  allJobs,
  showSpotLight,
  handleCategoryPress,
  renderPopular,
  selectedLocation,
  currentLocation,
  dispatch,
  permissionRes,
  onRefresh,
  loader,
  filteredJobs,
  categoriesSearlist,
  hasNotifications,
}) => {
  const sideNavigation = useNavigation();
  const sideDrawerOpen = () => sideNavigation.openDrawer();

  const styles = useMemo(() => HomeStyles(), []);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const {width: screenWidth} = Dimensions.get('window');
  const userId = useSelector(state => state.Auth.user.userId);
  const handlePermissionGranted = () => {
    setModalVisible(false);
    // Update the state or perform any action needed
    setLocationPermissionGranted(true);
  };

  // if (locationPermissionGranted === true) {
  //   // Setting location permission status to 'granted'
  //   AsyncStorage.setItem('locationPermissionStatus', 'granted')
  //     .then(() => {
  //       console.log('Location permission status set to granted');
  //     })
  //     .catch(error => {
  //       console.error('Error setting location permission status:', error);
  //     });
  // }

  // useEffect(() => {
  //   if (locationPermissionGranted) {
  //     // Refresh the page or perform any action needed
  //     // For example, you can navigate to the same screen to trigger a refresh
  //     navigation.navigate('HomeScreen'); // Replace 'HomeScreen' with your actual screen name
  //   }
  // }, [locationPermissionGranted]);

  useEffect(() => {
    // Foreground handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification:', remoteMessage);
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        ios: {
          sound: 'default',
        },
      });
    });

    return unsubscribe;
  }, []);

  const renderSvgIcon = iconName => {
    switch (iconName) {
      case 'ArtistIcon':
        return <Entertainers width={50} height={50} />;
      case 'BeautyIcon':
        return <Photographers width={50} height={50} />;
      case 'RepairIcon':
        return <Tech width={50} height={50} />;
      case 'CleaningIcon':
        return <Delivery width={50} height={50} />;
      case 'DriverIcon':
        return <Beauty width={50} height={50} />;
      case 'HaircutIcon':
        return <Appliance width={50} height={50} />;
      case 'HostIcon':
        return <VideoMakers width={50} height={50} />;
      case 'Host':
        return <Events width={50} height={50} />;
      case 'More':
        return <More width={16} height={16} />;
      default:
        return null;
    }
  };

  const renderCategoryIcon = category => {
    switch (category) {
      case 'PACKERS & MOVERS':
        return <Packers width={30} height={30} />;
      case 'APPLIANCE REPAIR':
        return <Appliance width={30} height={30} />;
      case 'ARCHITECT':
        return <Architect width={30} height={30} />;
      case 'DRIVERS':
        return <Drivers width={30} height={30} />;
      case 'CLEANER':
        return <Cleaner width={30} height={30} />;
      case 'SECURITY GUARDS':
        return <Security width={30} height={30} />;
      case 'BEAUTY & WELLNESS':
        return <Beauty width={30} height={30} />;
      case 'VIDEO MAKERS':
        return <VideoMakers width={30} height={30} />;
      // case 'BEAUTY & WELLNESS MEN':
      //   return <Beauty width={30} height={30} />;
      case 'ENTERTAINERS':
        return <Entertainers width={30} height={30} />;
      case 'MECHANIC':
        return <Mechanic width={30} height={30} />;
      case 'ELECTRICIAN':
        return <Electrician width={30} height={30} />;
      case 'PET SERVICES':
        return <PetService width={30} height={30} />;
      case 'COOK':
        return <Cook width={30} height={30} />;
      case 'CONSTRUCTION':
        return <Construction width={30} height={30} />;
      case 'FITNESS':
        return <Fitness width={30} height={30} />;
      case 'TUTOR':
        return <Tutor width={30} height={30} />;
      case 'TECH & DESIGN':
        return <Tech width={30} height={30} />;
      case 'TAXES':
        return <Taxes width={30} height={30} />;
      case 'INTERIOR DESIGNER':
        return <InteriorDesigner width={30} height={30} />;
      case 'PAINTER':
        return <Painter width={30} height={30} />;
      case 'EVENTS':
        return <Events width={30} height={30} />;
      case 'LANGUAGE TRANSLATION':
        return <Translation width={30} height={30} />;
      case 'PHOTOGRAPHER':
        return <Photographers width={30} height={30} />;
      case 'DELIVERY':
        return <Delivery width={30} height={30} />;
      // case 'BEAUTY & WELLNESS WOMEN':
      //   return <Beauty width={30} height={30} />;
      case 'OTHER':
        return <Others width={30} height={30} />;
      default:
        return null;
    }
  };

  const renderPopularCategories = ({item}) => {
    if (item.image === 'More') {
      return (
        <CustomTouchableOpacity style={styles.tc} onPress={showAllCategory}>
          <View style={[styles.imageContainer, styles.moreIconContainer]}>{renderSvgIcon(item.image, 30, 30)}</View>
          <CustomText style={[styles.catName, styles.more]} text="More" />
        </CustomTouchableOpacity>
      );
    }
    // console.log('item', item);
    if (!item.apiName) {
      item.apiName = 'Events';
    }
    return (
      <CustomTouchableOpacity style={styles.tc} onPress={() => renderPopular(item.apiName)}>
        <View style={styles.imageContainer}>
          {renderSvgIcon(item.image)}
          <CustomText style={styles.catName} text={item.text} />
        </View>
      </CustomTouchableOpacity>
    );
  };

  const searchJob = () => {
    return (
      <View style={styles.itemList}>
        {categoriesSearlist?.length > 0 ? (
          categoriesSearlist.map(category =>
            category.id === 'no-data' ? (
              <View key={category.id} style={styles.noDataText}>
                <CustomText text={category.name} />
              </View>
            ) : (
              <CustomTouchableOpacity
                key={category.id}
                onPress={() => {
                  Keyboard.dismiss();
                  showAllCategory(category.name);
                }}>
                <View style={styles.rowRow}>
                  {renderCategoryIcon(category.name)}
                  <CustomText text={category.name} style={styles.categorySearch} />
                </View>
              </CustomTouchableOpacity>
            ),
          )
        ) : (
          <CustomText text={'No such category found'} style={styles.noDataText} />
        )}
      </View>
    );
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const locationPermission = async () => {
    try {
      const permissionResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      dispatch(permission(permissionResult));
      if (permissionResult === 'granted') {
        // <CurrentLocation />;
        navigation.navigate('nearMe');
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chooseLocation = () => {
    navigation.navigate('nearMe');
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={loader} onRefresh={onRefresh} />}>
        {/* {isModalVisible && (
          <View style={styles.overlay}>
            <LocationBack />
          </View>
        )} */}
        <View style={styles.container}>
          {/* {!selectedLocation && Alert.alert('Please Enable Location for better Job Searching.')} */}
          {/* <CustomHeader style={tabView ? styles.tabHeader : ''} /> */}
          <View style={[styles.searchContainer]}>
            <View style={styles.live}>
              {/* <Live style={[styles.liveLocation, {marginRight: -3}]} /> */}
              <View style={styles.liveLocationAndLocationTextContainer}>
                <LocationSvg style={styles.locationSvg} />
                <View style={{margin: 0, padding: 0}}>
                  <CustomText text="You are in" style={styles.youAreInText} />
                  {selectedLocation ? (
                    <CustomTouchableOpacity onPress={chooseLocation} style={{margin: 0, padding: 0}}>
                      <CustomText
                        text={`${selectedLocation.city}, ${selectedLocation.countryCode}`}
                        style={styles.currentLocationText}
                      />
                    </CustomTouchableOpacity>
                  ) : currentLocation ? (
                    <CustomTouchableOpacity onPress={chooseLocation} style={{margin: 0, padding: 0}}>
                      <CustomText text={currentLocation} style={styles.currentLocationText} />
                    </CustomTouchableOpacity>
                  ) : (
                    <CustomTouchableOpacity onPress={locationPermission} style={{margin: 0, padding: 0}}>
                      <CustomText text="SELECT" style={styles.currentLocationText} />
                    </CustomTouchableOpacity>
                  )}
                </View>
              </View>
              {/* <NotificationContainer onNotificationCheck={setHasNotifications} /> */}
              <CustomTouchableOpacity onPress={() => navigation.navigate('Notification')} style={{padding: 0}}>
                {hasNotifications ? (
                  <Image
                    style={styles.activenotification}
                    source={require('../../assets/notification-bell.gif')}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                ) : (
                  <NotificationSvg style={styles.notificationSvg} />
                )}
              </CustomTouchableOpacity>
              {/* <More style={[styles.moreLoc, {marginLeft: -8, top: 4}]} /> */}
            </View>
            <View style={styles.searchBarContainer}>
              <TouchableOpacity onPress={sideDrawerOpen}>
                <MenuSvg />
              </TouchableOpacity>
              <View style={tabView ? styles.tabSearchBox : styles.searchBox}>
                <SearchIcon style={tabView ? styles.tabSearch : styles.search} />
                <CustomTextInput
                  placeholder="Search for Cleaner, Tutor, Driver, etc...."
                  value={searchText}
                  onChangeText={text => setSearchText(text)}
                  style={tabView ? styles.tabInput : styles.input}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.shadowLine} />
        <View style={styles.container2}>
          {searchText.length > 0 ? (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
              {searchJob()}
            </KeyboardAvoidingView>
          ) : (
            <>
              <ScrollView>
                <View style={styles.container2}>
                  <View style={{marginTop: -42, marginLeft: -9}}>
                    <Carousel />
                    {/* <FlatList
                      ref={flatListRef}
                      data={data}
                      keyExtractor={(item, index) => index.toString()}
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      snapToAlignment="start"
                      scrollEventThrottle={16}
                      renderItem={({item: BannerComponent}) => <BannerComponent style={styles.bannerComponent} />}
                      decelerationRate="fast"
                      pagingEnabled
                      onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                          flatListRef.current?.scrollToIndex({index: info.index, animated: true});
                        });
                      }}
                    /> */}
                  </View>
                  <View>
                    <View style={styles.categories}>
                      <CustomText style={styles.cat} text="Popular Categories" />
                      <TouchableOpacity onPress={showAllCategory}>
                        <CustomText style={[styles.cat, styles.seeAllText]} text="See all" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.categoryList}>
                      <FlatList
                        data={categoriesData}
                        renderItem={renderPopularCategories}
                        keyExtractor={item => item.key}
                        numColumns={4}
                        columnWrapperStyle={styles.row}
                      />
                    </View>
                  </View>
                  <View style={styles.spotLightCard}>
                    <View style={styles.spotLightHeadingContainer}>
                      <View style={{marginLeft: widthToDp(33)}}>
                        <CustomText text={'SPOTLIGHT ADS'} style={styles.spotliteText} />
                      </View>
                      <CustomTouchableOpacity style={{paddingVertical: 0, marginVertical: 0}} onPress={showSpotLight}>
                        <CustomText text="View all" style={styles.viewAllText} />
                      </CustomTouchableOpacity>
                    </View>
                    {/* <FlatList
                        data={pairs}
                        keyExtractor={pair => pair[0].id}
                        renderItem={renderPair}
                        horizontal
                        showsHorizontalScrollIndicator={true}
                      /> */}
                    <JobCarousel data={spotLight} handleJobPress={handleJobPress} />
                    {/* <CustomTouchableOpacity style={styles.op} onPress={showSpotLight}>
                        <CustomText text="See more" style={styles.seeMoreText} />
                      </CustomTouchableOpacity> */}
                  </View>
                  <View style={{marginTop: 10}}>
                    <View style={{...styles.categories, marginBottom: 9}}>
                      <CustomText style={styles.cat} text="All Jobs" />
                    </View>
                    <FlatList
                      data={allJobs}
                      renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} />}
                      keyExtractor={(item, index) => String(index)}
                      onEndReachedThreshold={0.5}
                    />
                  </View>
                </View>
              </ScrollView>
            </>
          )}
          {isModalVisible && <BottomHalfModal onPermissionGranted={handlePermissionGranted} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
