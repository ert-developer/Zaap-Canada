import CustomText from '../text/textComponent';
import {View, StyleSheet, Text} from 'react-native';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {Border, Color, FontFamily, FontSize, Margin} from '../../assets/static/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';

const CompletedJobsCard = ({completedJobs, timeAgoo}) => {
  const navigation = useNavigation();

  const handleJobPress = job => {
    navigation.navigate('JobDeatil', {
      title: job.jobTitle, //
      category: job.category, //
      subCategory: '--',
      price: job.salary, //
      description: job.jobDescription, //
      location: job.locationDesc.description, //
      starttime: '--',
      startdate: '--',
      isExpired: job.isExpired,
      createdOn: job.createdOn,
      images: job.imageUrl, //
      area: job.area, //
      address: job.address, //
    });
  };
  // console.log('loggggg', completedJobs);
  // const feedback = completedJobs.Feedback ? completedJobs.Feedback : '';
  // console.log('loggggg', completedJobs);
  // const feedback = completedJobs.Feedback ? completedJobs.Feedback : '';
  return (
    <TouchableOpacity
      onPress={() => handleJobPress(completedJobs)}
      style={{
        borderRadius: 10,
        borderColor: Color.colorGray,
        borderWidth: 1,
        height: 92,
        marginBottom: 10,
      }}>
      <View style={styles.mainContainer}>
        <View style={styles.frameParent}>
          <View>
            {/* <StaticImage /> */}
            <Image
              style={{width: 90, height: 90, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
              source={{uri: completedJobs.imageUrl[0]}}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.SvgtextContainer}>
              <View style={styles.spotlightBannerContainer}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
                  {completedJobs.jobTitle}
                </Text>
              </View>
              <View style={styles.amountContainer}>
                <CustomText text={`$${completedJobs.salary}`} style={styles.text1} />
              </View>
            </View>
            <View style={styles.DateandRadius}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.within15Kms}>
                {`ADDRESS:${completedJobs.address}`}
              </Text>
            </View>
            <View style={styles.timeago}>
              <View></View>
              <CustomText text={timeAgoo} style={styles.AgoText} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CompletedJobsCard;

const styles = StyleSheet.create({
  timeago: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountContainer: {
    flexDirection: 'row',
  },
  bannerContainer: {
    position: 'relative',
  },
  spotlightText: {
    position: 'absolute',
    fontSize: heightToDp(0.8),
    color: 'white',
    top: 8,
    left: 15,
  },
  spotlightBannerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: Border.br_8,
  },
  mainContainer: {
    marginBottom: heightToDp(1),
  },
  rupeeIcon: {
    width: widthToDp(5),
    height: widthToDp(5),
    marginTop: heightToDp(0.8),
  },

  frameParent: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: widthToDp(3),
    marginBottom: heightToDp(0),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: heightToDp(0.4),
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: heightToDp(2),
    justifyContent: 'center',
  },
  name: {
    fontSize: heightToDp(2),
    fontWeight: '700',
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
  },
  within15Kms: {
    fontSize: heightToDp(1.6),
    // fontWeight: '300',
    fontFamily: FontFamily.Helvetica,
    color: Color.colorBlack,
    marginTop: heightToDp(0.2),
    // flexWrap: 'wrap',
    // width: 100,
    // borderWidth:1,
    letterSpacing: widthToDp(0.4),
  },
  text1: {
    fontSize: heightToDp(1.4),
    letterSpacing: 1,
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    fontWeight: '300',
    marginTop: heightToDp(0.5),
    marginBottom: heightToDp(0.5),
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  DateandRadius: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AgoText: {
    fontSize: heightToDp(1.3),
    fontFamily: FontFamily.helvetica,
    color: '#949494',
    marginRight: heightToDp(2),
    // marginTop: heightToDp(3),
  },
});
