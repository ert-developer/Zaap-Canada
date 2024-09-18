const {default: CustomText} = require('../../../atoms/text/textComponent');
import {useSelector, useDispatch} from 'react-redux';
import {fetchAppliedJobs} from '../../../redux/appliedjobs/action';
import {useEffect, useState} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Touchable, Text, ActivityIndicator} from 'react-native';
import CardJobs from '../../../molecules/job-card/jobCard';
import CustomTouchableOpacity from '../../../molecules/touchable-opacity/touchable-opacity-component';
import {fetchSelectedProfileDetails} from '../../../redux/selectedprofiledetails/action';
import {heightToDp, widthToDp} from '../../../responsive/responsive';
import SelectedProfilesCard from '../../../atoms/selectedprofilescard/selected-profilecard';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {it} from 'date-fns/locale';
import {Color, FontFamily, FontSize} from '../../../assets/static/globalStyles';
import CustomLoader from '../../../molecules/customLoader/customLoader';
const MyJobsSelectd = () => {
  //1st Tab
  const navigation = useNavigation();
  const providerStatus = useSelector(state => state.providerverification.providerDetails);
  const isVerified = providerStatus[0]?.isverified;
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user);
  const appliedjobs = useSelector(state => state.appliedjobs.appliedJobsDetails);
  const selectedProfiles = useSelector(state => state.selectedProfiles.candidateDetails);
  // console.log("appliedjobs",appliedjobs)
  // console.log('selectedProfiles++++++++++++++++++', selectedProfiles);
  const filteredProfileDetails = selectedProfiles.filter(job => job.postedBy === user.userId);
  useEffect(() => {
    dispatch(fetchAppliedJobs());
    dispatch(fetchSelectedProfileDetails());
    setLoading(false);
  }, []);

  // console.log("filteredProfileDetails",filteredProfileDetails)

  const filteredAppliedJobs = appliedjobs.filter(item => item.userId === user.userId);

  // console.log("filteredAppliedJobs",filteredAppliedJobs)

  const handleJobPress = item => {
    navigation.navigate('JobDeatil', {
      imageSource: item.imageUrls[0],
      category: item.data.category,
      title: item.data.jobTitle,
      description: item.data.jobDescription,
      price: item.data.salary,
      location: item?.locationDesc?.description,
      postedBy: item.postedBy,
      id: item.id,
      jobAdType: item.jobAds.type,
      createdOn: item.createdOn,
      starttime: item.data.starttime,
      startdate: item.data.startdate,
      subCategory: item.data.subCategory,
      images: item.imageUrls,
      area: item.area,
      lat: item.location.lat,
      lng: item.location.lng,
      address: item.address,
      userName: item.userName,
      IsPaid: item.IsPaid ? item.IsPaid : false,
    });
  };
  const renderJobList = ({item}) => {
    // console.log("itemApplied---",item)
    const {createdOn, imageSource, title, description, jobAdType, price, category, location} = item.items;
    const timeAgo = moment(createdOn).fromNow();

    const truncateDescription = (text, maxLength) => {
      return text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return isVerified === 'verified' ? (
      <TouchableOpacity onPress={() => handleJobPress(item.items)} style={styles.appliedCards}>
        <CardJobs
          key={item?.id}
          image={imageSource}
          title={title}
          description={truncateDescription(description, 100)}
          jobAdType={jobAdType}
          price={price}
          timeAgo={timeAgo}
          category={category}
          location={location}
        />
      </TouchableOpacity>
    ) : null;
  };

  // const renderProfileList = ({item}) => {
  //   return isVerified === 'verified' ? null : (
  //     <View>
  //       <View>
  //         <SelectedProfilesCard item={item} />
  //       </View>
  //     </View>
  //   );
  // };

  const [isLoading, setLoading] = useState(true);

  const renderProfileList = ({item}) => {
    const {createdOn, images, title, jobAdType, price, category, location} = item;
    const timeAgo = moment(createdOn).fromNow();

    const truncateDescription = (text, maxLength) => {
      return text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return isVerified === 'verified' ? null : (
      <TouchableOpacity>
        <CardJobs
          key={item?.id}
          image={images}
          title={title}
          // description={truncateDescription(description, 100)}
          jobAdType={jobAdType}
          price={price}
          timeAgo={timeAgo}
          location={location}
          category={category}
        />
      </TouchableOpacity>
    );
  };

  const filteredAppliedJobssortedJobs = filteredAppliedJobs.sort(
    (a, b) => new Date(b.items.createdOn) - new Date(a.items.createdOn),
  );

  // console.log("filteredAppliedJobssortedJobs",filteredAppliedJobssortedJobs)

  return (
    <SafeAreaView style={styles.selectedContainer}>
      <View>
        {/* Service Provider Side */}
        {isLoading && isVerified === 'verified' ? (
          <ActivityIndicator color={'black'} size="large" />
        ) : filteredAppliedJobssortedJobs.length > 0 ? (
          <FlatList
            data={filteredAppliedJobssortedJobs}
            renderItem={renderJobList}
            keyExtractor={(item, index) => String(index)}
          />
        ) : (
          isVerified === 'verified' && (
            <View style={styles.noDataContainer}>
              <Text style={styles.noData}>You haven't Applied for any jobs yet!</Text>
            </View>
          )
        )}

        {/* Customer Side */}
        {isLoading && isVerified !== 'verified' ? (
          <ActivityIndicator color={'black'} size="large" />
        ) : filteredProfileDetails.length > 0 ? (
          <FlatList
            data={filteredProfileDetails}
            renderItem={renderProfileList}
            keyExtractor={(item, index) => String(index)}
          />
        ) : (
          isVerified !== 'verified' && (
            <View style={styles.noDataContainer}>
              <Text style={styles.noData}>You haven't hired anyone yet!</Text>
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyJobsSelectd;
const styles = StyleSheet.create({
  selectedContainer: {
    backgroundColor: 'white',
    margin: widthToDp(3),
    height: '100%',
  },
  selectedText: {
    fontSize: heightToDp(2),
    fontWeight: 'bold',
    color: '#5A2DAF',
  },
  container: {
    padding: heightToDp(1.5),
    marginBottom: heightToDp(2),
    borderBottomColor: '#ABABAB',
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    margin: heightToDp(1),
  },
  description: {
    fontSize: heightToDp(1.9),
    letterSpacing: 0.5,
    fontWeight: '500',
    fontFamily: 'Helvetica',
    color: '#000',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: heightToDp(1),
  },
  starsAndName: {
    marginLeft: heightToDp(1),
  },
  textContainer: {
    backgroundColor: '#5A2DAF',
    height: heightToDp(7),
    width: heightToDp(7),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  namelogo: {
    padding: 11,
    color: '#FFFFFF',
    fontSize: heightToDp(2.5),
    fontWeight: '700',
    fontFamily: 'Helvetica',
    letterSpacing: 0.8,
  },
  name: {
    fontSize: 12,
    letterSpacing: 0.6,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#000',
  },

  checkProfile: {
    width: heightToDp(15),
    padding: heightToDp(1.5),
    backgroundColor: '#5A2DAF',
    borderRadius: heightToDp(7),
  },

  content: {
    flexDirection: 'row',
    // justifyContent:"space-between",
    alignItems: 'center',
  },
  appliedCards: {
    marginVertical: widthToDp(1),
  },
  noData: {
    fontSize: FontSize.size_16,
    fontWeight: '500',
    fontFamily: FontFamily.helvetica,
    color: Color.colorSilver,
    textAlign: 'center',
  },
  noDataContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightToDp(33),
  },
});
