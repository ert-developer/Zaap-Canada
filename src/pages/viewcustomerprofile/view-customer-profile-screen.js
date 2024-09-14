import {SafeAreaView, View, TouchableOpacity, FlatList, Text, ScrollView} from 'react-native';
import HeaderComponent from '../../atoms/header/headerComponent';
import viewCustomerProfileStyles from './view-customer-profile-styles';
import JobList from '../../organisms/jobList/jobList';
import CustomText from '../../atoms/text/textComponent';
import CustomImage from '../../atoms/image/imageComponent';
import {LocationSVG, PersonSVG, StartSVG} from '../../assets/svgImage/profile';
import CustomLoader from '../../../src/molecules/customLoader/customLoader';

const ViewCustomerProfileScreen = ({userDetails, customerPreJobsList, starRatingCount, feedbackData, loader}) => {
  const styles = viewCustomerProfileStyles();

  return (
    <SafeAreaView>
      <HeaderComponent text={'View Profile'} />
      <ScrollView>
        {loader ? (
          <CustomLoader visible={loader} />
        ) : (
          <View>
            <View style={styles.editfalse}>
              <TouchableOpacity>
                <View style={styles.imageborder}>
                  {!userDetails?.imageUrl ? (
                    <CustomImage style={styles.profileImage} source={require('../../assets/default-profile.png')} />
                  ) : (
                    <CustomImage source={{uri: userDetails?.imageUrl}} style={styles.profileImage} />
                  )}
                </View>
              </TouchableOpacity>

              <View style={styles.profileIconAndTextStyle}>
                <PersonSVG style={styles.profileIcon} />
                <CustomText text={userDetails?.displayName} style={styles.customerNameText} />
              </View>
              <View style={styles.profileIconAndTextStyle}>
                <LocationSVG style={styles.profileIcon} />
                {userDetails.city == undefined || userDetails.provinces == undefined ? (
                  <CustomText text={'No info provided'} style={styles.customerLocationText} />
                ) : (
                  <CustomText
                    text={`${userDetails.city}, ${userDetails.provinces}`}
                    style={styles.customerLocationText}
                  />
                )}
              </View>
              <View style={styles.profileIconAndTextStyle}>
                <StartSVG style={styles.profileIcon} />
                {/* <CustomText text={'4.8(121 Reviews)'} style={styles.customerRatingText} /> */}
                <CustomText
                  text={`${(starRatingCount === 0 ? 0 : starRatingCount / feedbackData.length).toFixed(1)} (${
                    feedbackData.length
                  } Reviews)`}
                  style={styles.customerRatingText}
                />

                {/* <Text style={styles.reviewsTextStyle}>
                {(starRatingCount / feedbackData.length).toFixed(1)} ({feedbackData.length} Reviews)
              </Text> */}
              </View>
            </View>
            <View style={styles.customerPreviousJobsContainer}>
              <View style={styles.customerPreAdsBtn}>
                <CustomText text={'OTHER ADS POSTED BY THIS USER'} style={styles.customerOtherAddText} />
              </View>
              <FlatList
                data={customerPreJobsList}
                renderItem={({item}) => <JobList item={item} handleJobPress={null} />}
                keyExtractor={(item, index) => String(index)}
                onEndReachedThreshold={0.5}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewCustomerProfileScreen;
