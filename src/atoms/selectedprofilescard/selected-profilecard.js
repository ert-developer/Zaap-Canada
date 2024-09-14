import CustomText from '../text/textComponent';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Color, FontFamily} from '../../assets/static/globalStyles';
import {storeApplicantsProfileDetails} from '../../redux/applicantprofiledetails/action';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const SelectedProfilesCard = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let result;

  if (item.candiateName) {
    const names = item.candiateName.split(' ');
    if (names.length === 1) {
      // Only first name provided
      result = names[0].charAt(0);
    } else if (names.length >= 2) {
      // Both first and last names provided
      result = `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
    }
  } else {
    result = 'No name provided';
  }

  const onGetProfileDetails = item => {
    
    const appliedProfileDetail = {
      name: item.candiateName,
      bio: item.userBio, // Assuming 'userBio' is a property of 'item'
      userId: item.userId,
      //  profileImage:item.imageURL
    };
    
    dispatch(storeApplicantsProfileDetails(appliedProfileDetail));
    navigation.navigate('ProviderFeedbackScreen');
  };
  return (
    <TouchableOpacity onPress={() => onGetProfileDetails(item)}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <CustomText text={result} style={styles.namelogo} />
        </View>
        <View>
          <CustomText text={item.candiateName} style={styles.profileName} />
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.profileBio}>
            {item.userBio}
          </Text>

          <CustomText
            text={`SELECTED TO ${item.jobtitle.toUpperCase()}`}
            style={styles.selectedTo}
            numberOfLines={2}
            ellipsizeMode="tail"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SelectedProfilesCard;
const styles = StyleSheet.create({
  selectedTo: {
    color: '#2c3e50',
    marginTop: heightToDp(1),
    fontFamily: FontFamily.helvetica,
    width: 260,
  },
  profileBio: {
    fontSize: heightToDp(2),
    fontWeight: '300',
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    marginTop: heightToDp(0.2),
    // flexWrap: 'wrap',
    width: '90%',
  },
  profileName: {
    fontSize: heightToDp(2.3),
    fontWeight: '700',
    fontFamily: FontFamily.helvetica,
    color: Color.colorBlack,
    marginBottom: heightToDp(0.4),
    letterSpacing: widthToDp(0.4),
  },
  textContainer: {
    backgroundColor: '#5A2DAF',
    height: heightToDp(10),
    width: heightToDp(10),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  namelogo: {
    padding: heightToDp(2),
    color: '#FFFFFF',
    fontSize: heightToDp(2.5),
    fontWeight: '700',
    fontFamily: 'Helvetica',
    letterSpacing: 0.8,
  },
  container: {
    padding: heightToDp(1),
    paddingTop: heightToDp(2),
    paddingBottom: heightToDp(2),
    marginBottom: heightToDp(2),
    borderBottomColor: '#ABABAB',
    borderBottomWidth: 1,
    backgroundColor: '#fff',

    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    margin: heightToDp(1),
    flexDirection: 'row',
    alignItems: 'center',
    gap: heightToDp(2),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: heightToDp(0.4),
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
});
