import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import {ExternalLinkPopupLine} from '../../assets/svgImage/providerProfile';
import TextInputWithLabelComponent from '../../organisms/textInputWithLabel/textInputWithLabel-component';
import CustomButton from '../../atoms/button/buttonComponent';
const ExternalLinkPopup = ({openExternalLinkPopup, openLinkPopup, setExternalLink}) => {
  const [linktext, setLinkText] = useState('');

  const linkTextFunction = () => {
    setExternalLink(linktext);
    setLinkText('');
    openLinkPopup();
  };

  return (
    <View>
      <Modal isVisible={openExternalLinkPopup} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{width: heightToDp(43)}}>
            <View style={{justifyContent: 'center', alignItems: 'center', padding: heightToDp(2)}}>
              <CustomText
                text={'Add Links to your'}
                style={{color: '#47417D', fontFamily: 'Roboto', fontSize: heightToDp(2.2)}}
              />
              <CustomText
                text={'Videos/Documents'}
                style={{color: '#47417D', fontFamily: 'Roboto', fontSize: heightToDp(2.2)}}
              />
            </View>
            <ExternalLinkPopupLine />
            <View style={{padding: heightToDp(2)}}>
              <View style={{marginVertical: heightToDp(2), marginBottom: heightToDp(6)}}>
                <TextInputWithLabelComponent
                  placeholder={'Enter URL'}
                  label={'Paste Here'}
                  onHandleChange={text => setLinkText(text)}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <CustomButton
                  title={'SAVE'}
                  style={styles.saveButton}
                  onPress={() => linktext && linkTextFunction(linktext)}
                />

                <CustomButton title={'CANCEL '} style={styles.cancel} onPress={openLinkPopup} />
              </View>
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
  saveButton: {
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#fff',
    backgroundColor: '#00BF63',
    width: heightToDp(19),
    padding: heightToDp(1.7),
    borderRadius: heightToDp(1),
  },
  cancel: {
    fontWeight: '700',
    fontFamily: 'Helvetica',
    backgroundColor: '#FF5757',
    width: heightToDp(19),
    padding: heightToDp(1.7),
    borderRadius: heightToDp(1),
  },
});

export default ExternalLinkPopup;
