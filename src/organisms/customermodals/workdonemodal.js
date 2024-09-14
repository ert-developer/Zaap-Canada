import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '../../assets/svgIcons/providerPaymentSvg';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
import {useNavigation} from '@react-navigation/native';
import {CancelPopupSvg} from '../../assets/svgImage/bottomDrawer';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {deleteDocument, postCollectionDetails} from '../../common/collection';
import database from '@react-native-firebase/database';
import {mailSenter} from '../../common/mailSender';
import {doc, updateDoc, getDoc, FieldValue} from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import {db} from '../../../firebaseDb';

const WorkDoneModal = ({showWorkDonePopup, onWorkdone, setWorkDonePopup, selectedJobDetails, providerStatus}) => {
  //asdf
  //Customer Work Done cancel
  const user = useSelector(state => state.Auth.user);
  const profiledetail = useSelector(state => state.Auth.profileDetail);

  const onPressCancelService = async () => {
    //   try {
    //     const docRef = doc(db, 'Jobs_dev', selectedJobDetails.jobId);
    //     const docSnap = await getDoc(docRef);
    //     const docData = docSnap.data();
    //     const cancelCandidateDetails = docData.cancelCandidateDetails || [];
    //     cancelCandidateDetails.push({
    //       serviceProviderName: providerStatus[0].legal_name_on_id,
    //       serviceProviderId: selectedJobDetails.candidateUserId,
    //       customerId: selectedJobDetails.customerId,
    //       jobID: selectedJobDetails.jobId,
    //       jobTitle: selectedJobDetails.jobTitle,
    //       jobSalary: selectedJobDetails.salary,
    //     });
    //     await updateDoc(docRef, {
    //       IsBookingCancel: true,
    //       IsBookingConfirmed: false,
    //       cancelCandidateDetails: cancelCandidateDetails,
    //       // selectedCandidateDetails: FieldValue.delete(),
    //     });

    //     console.log(selectedJobDetails, 'dcfvtgbhnj');
    //     database().ref(`myjobs/${selectedJobDetails.customerId}_${selectedJobDetails.jobId}`).child('otpData').update({
    //       otpValidationStatus: false, // Clear the existing validation status
    //     });

    //     const selectedProfileRef = firestore().collection('selectedProfiles_dev');
    //     const snapshot = await selectedProfileRef.where('jobId', '==', selectedJobDetails.jobId).get();

    //     if (snapshot.empty) {
    //       console.log(`No document with given ID found.`);
    //       return;
    //     }

    //     snapshot.forEach(async doc => {
    //       await doc.ref.delete();
    //       console.log(`Document with ID ${doc.id} deleted successfully.`);
    //     });

    //     const to = `sankeertherra01@gmail.com, ${providerStatus[0].email_id}`;
    //     const subject = 'Service Cancelled';
    //     const textMsg = 'The service has been cancelled by the customer';
    //     const bodyText = 'The service has been cancelled by the customer';

    //     mailSenter(to, subject, textMsg, bodyText);

    //     const data = {
    //       title: 'Service Cancelled',
    //       message: `Service Cancelled by ${user.displayName} for ${providerStatus[0].legal_name_on_id} on ${jobDetails.jobTitle} with an amount of ${jobDetails.salary}`,
    //       userId: profiledetail.userId,
    //       markasread: false,
    //       time: new Date(),
    //     };
    //     await postCollectionDetails('Notifications_dev', data);

    setWorkDonePopup(false);
    //     console.log('Fields added successfully to document & SP deleted from selectedProfiles_dev');
    //   } catch (error) {
    //     console.error('Error adding field to document:', error);
    //   }
  };

  return (
    <View>
      <Modal isVisible={showWorkDonePopup} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {/* <CancelPopupSvg style={{marginBottom: heightToDp(2)}} /> */}
            <FastImage
              style={{width: 100, height: 100}}
              source={require('../../assets/CancelService.gif')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <CustomText text={'Attention: Final Step Ahead!'} style={{fontFamily: 'Roboto', color: '#464183'}} />
            <Text style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(1.5)}}>
              By clicking Work Done, you'll conclude the service.
            </Text>
            <Text style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(1.5)}}>
              Are you sure you want to proceed?{' '}
            </Text>
            <Text style={{fontFamily: 'Roboto', color: '#464183', fontSize: heightToDp(1.5)}}>
              This action cannot be undone
            </Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', gap: 20, marginTop: heightToDp(2)}}>
              <CustomButton
                title={'WORK DONE'}
                onPress={onWorkdone}
                style={{
                  padding: heightToDp(1),
                  backgroundColor: '#00BF63',
                  fontFamily: 'Roboto',
                  borderRadius: heightToDp(1),
                  width: heightToDp(18),
                }}
                textStyle={{fontSize: heightToDp(2.2)}}
              />
              <CustomButton
                title={'Cancel'}
                onPress={onPressCancelService}
                style={{
                  padding: heightToDp(1),
                  backgroundColor: '#FF5757',
                  fontFamily: 'Roboto',
                  borderRadius: heightToDp(1),
                  width: heightToDp(18),
                }}
                textStyle={{fontSize: heightToDp(2.2)}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: heightToDp(2),
    borderRadius: heightToDp(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  modaltext: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    color: '#000000',
  },
  bactohome: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#fff',
    borderRadius: 8,
    backgroundColor: '#008000',
    width: heightToDp(23),
    padding: heightToDp(1),
    borderRadius: heightToDp(7),
    fontSize: 16,
    letterSpacing: 0.4,

    borderRadius: heightToDp(1),
    marginTop: heightToDp(2),
  },
});

export default WorkDoneModal;
