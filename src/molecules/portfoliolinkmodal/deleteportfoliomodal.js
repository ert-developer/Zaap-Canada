import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import CustomButton from '../../atoms/button/buttonComponent';
// import {AddPortfolioPop} from '../../assets/svgIcons/bottomdrawersvg';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
const DeletePortfolioDetailsModal = ({
  showDeletePortfolioModal,
  deletePotfolioId,
  onDeletePortfolio,
  setShowDeletePortfolioModal,
}) => {
  const [deletePortfolio, setdeletePortfolio] = useState(false);
  const navigation = useNavigation();

  const onDeletePortfolioId = async () => {
    try {
      setdeletePortfolio(true);
      await onDeletePortfolio(deletePotfolioId);
    } catch (error) {
      console.error('Error deleting portfolio:', error);
    } finally {
      setdeletePortfolio(false);
    }
  };

  const closeModal = () => {
    setShowDeletePortfolioModal(false);
    navigation.navigate('Portfolio');
  };

  return (
    <View>
      <Modal isVisible={showDeletePortfolioModal} style={styles.modalContainer} onBackdropPress={() => closeModal()}>
        <View style={styles.modalContent}>
          {deletePortfolio ? (
            <View
              style={{
                height: heightToDp(25),
                width: heightToDp(37),
                alignItems: 'center',
                justifyContent: 'center',
                padding: heightToDp(1),
              }}>
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/Success.gif')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <CustomText text={'Portfolio Removed Successfully !'} />
            </View>
          ) : (
            <View
              style={{width: heightToDp(43), alignItems: 'center', justifyContent: 'center', padding: heightToDp(1)}}>
              <View style={{marginBottom: heightToDp(4)}}>
                <CustomText
                  text={'Are you sure you want'}
                  style={{Color: '#464183', fontFamily: 'Roboto', fontSize: heightToDp(2)}}
                />
                <CustomText
                  text={'to Delete this portfolio?'}
                  style={{Color: '#464183', fontFamily: 'Roboto', fontSize: heightToDp(2)}}
                />
              </View>
              <View style={{flexDirection: 'row', gap: 20}}>
                <CustomButton
                  title={'YES, DELETE '}
                  style={{
                    padding: heightToDp(1),
                    backgroundColor: '#00BF63',
                    fontFamily: 'Roboto',
                    borderRadius: heightToDp(1),
                    width: heightToDp(18),
                  }}
                  onPress={onDeletePortfolioId}
                  textStyle={{fontSize: heightToDp(2.2)}}
                />
                <CustomButton
                  title={'CANCEL'}
                  style={{
                    padding: heightToDp(1),
                    backgroundColor: '#FF5757',
                    fontFamily: 'Roboto',
                    borderRadius: heightToDp(1),
                    width: heightToDp(18),
                  }}
                  onPress={() => setShowDeletePortfolioModal(false)}
                  textStyle={{fontSize: heightToDp(2.2)}}
                />
              </View>
            </View>
          )}
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
});

export default DeletePortfolioDetailsModal;
