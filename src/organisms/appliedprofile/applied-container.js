import React, {useEffect, useState} from 'react';
import CustomButton from '../../atoms/button/buttonComponent';
import CustomText from '../../atoms/text/textComponent';
import {StyleSheet, View, Text} from 'react-native';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {storeApplicantsProfileDetails} from '../../redux/applicantprofiledetails/action';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {Rating} from 'react-native-ratings';
import {db} from '../../../firebaseDb';
import {getDocs, collection, where, query} from 'firebase/firestore';
import {Color, Margin} from '../../assets/static/globalStyles';
import {fetchCollectionDetails} from '../../common/collection';
import {Image} from 'react-native';
import { envConfig } from '../../assets/helpers/envApi';

const AppliedDetails = ({
  onGetJobDetails,
  name,
  bio,
  AppliedOn,
  userId,
  profileImage,
  IsBookingConfirmed,
  IsBookingCancel,
  cancelCandidateDetails,
}) => {
  const [rating, setRating] = useState(0);
  const [userBio, setUserBio] = useState(bio || ''); // Initialize with passed bio or empty string
  const timeAgo = moment(AppliedOn).fromNow();
  const [cancelCandidatesList, setCancelCandidatesList] = useState(cancelCandidateDetails || []);

  const appliedProfileDetail = {
    name,
    bio,
    AppliedOn,
    userId,
    profileImage,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    let createCancelledCandidatesList = cancelCandidateDetails?.map(eachCandidate => eachCandidate.serviceProviderId);
    setCancelCandidatesList(createCancelledCandidatesList);
  }, [userId]);

  const onGetProfileDetails = () => {
    dispatch(storeApplicantsProfileDetails(appliedProfileDetail));
    onGetJobDetails();
  };

  useEffect(() => {
    const getRatingAndFeedback = async () => {
      try {
        const q = query(collection(db, envConfig.customer_Feedback), where('candidateUserId', '==', userId));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());

        if (data.length === 0) {
          setRating(0);
          return;
        }

        let totalStarRating = 0;
        data.forEach(feedback => {
          totalStarRating += feedback.startRating;
        });
        const averageRating = totalStarRating / data.length;

        setRating(averageRating);
      } catch (error) {
        console.error('Error fetching Customer Feedback data:', error);
        setRating(0);
      }
    };

    getRatingAndFeedback();
  }, [userId]);

  let result;

  if (name) {
    const names = name.split(' ');
    if (names.length === 1) {
      result = names[0].charAt(0);
    } else if (names.length >= 2) {
      result = `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
    }
  } else {
    result = 'x';
  }

  const truncateBio = bioText => {
    const maxLength = 100; // Adjust the max length as needed
    if (bioText.length > maxLength) {
      return bioText.substring(0, maxLength) + '...';
    }
    return bioText;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.content}>
          {/* <View style={styles.textContainer}>
            <CustomText text={result} style={styles.namelogo} />
          </View> */}
          <Image src={profileImage} style={styles.profilePhoto} />
          <View style={styles.starsAndName}>
            <CustomText text={name} style={styles.name} />
            {/* <Text>{rating.toFixed(1)}</Text> */}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Rating type="star" ratingCount={5} startingValue={rating} imageSize={15} readonly />
            </View>
          </View>
        </View>
        <CustomButton
          // title={'VIEW PROFILE'}
          title={cancelCandidatesList?.includes(userId) ? 'Cancelled' : 'View Profile'}
          style={[
            styles.checkProfile,
            {
              backgroundColor: cancelCandidatesList?.includes(userId)
                ? 'gray'
                : IsBookingConfirmed
                ? IsBookingCancel
                  ? '#5A2DAF'
                  : 'gray'
                : '#5A2DAF',
            },
          ]}
          onPress={
            cancelCandidatesList?.includes(userId)
              ? null
              : IsBookingConfirmed
              ? IsBookingCancel
                ? onGetProfileDetails
                : null
              : onGetProfileDetails
          }
          textStyle={styles.viewProfileBtnText}
        />
      </View>
      <View style={styles.bioContainer}>
        {/* <CustomText text="User Bio:" style={styles.description} /> */}
        <CustomText text={truncateBio(bio)} style={styles.bioText} />
      </View>
    </View>
  );
};

export default AppliedDetails;

const styles = StyleSheet.create({
  container: {
    padding: heightToDp(1.5),
    backgroundColor: Color.colorWhite,
    marginVertical: widthToDp(1),
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
  },
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightToDp(1),
  },
  bioText: {
    fontSize: heightToDp(1.55),
    letterSpacing: 0.5,
    fontWeight: '600',
    color: Color.colorSilver,
    marginLeft: heightToDp(1),
  },
  starsAndName: {
    marginLeft: heightToDp(1),
  },
  textContainer: {
    backgroundColor: '#5A2DAF',
    height: heightToDp(6.5),
    width: heightToDp(6.5),
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
    width: heightToDp(12),
    padding: heightToDp(1),
    backgroundColor: Color.colorIndigo,
    borderRadius: heightToDp(1),
    fontSize: heightToDp(4),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewProfileBtnText: {
    fontSize: widthToDp(2.9),
  },
  profilePhoto: {
    borderRadius: 40,
    width: widthToDp(14),
    height: heightToDp(7),
  },
});
