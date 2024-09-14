import {widthToDp} from '../../responsive/responsive';

const {StyleSheet} = require('react-native');
const {Color, FontSize} = require('../../assets/static/globalStyles');

export const reportStyles = () => {
  const styles = StyleSheet.create({
    reportsMainContainer: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      margin: widthToDp(2),
      borderRadius: widthToDp(2),
      padding: widthToDp(3),
      //   flexDirection: 'row',
      //   alignItems: 'center',
    },
    reportItemsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: widthToDp(1),
    },
    reportTextColor: {
      color: Color.colorBlack,
      fontSize: FontSize.size_14,
    },
    reportSendBtn: {
      marginTop: widthToDp(70),
      backgroundColor: Color.colorIndigo2,
      borderRadius: widthToDp(2),
      height: widthToDp(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    reportBtnText: {
      color: Color.colorWhite,
      fontWeight: 'bold',
    },
    modalContainer: {
      backgroundColor: '#fff',
      borderRadius: widthToDp(2),
    },
    modalContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: widthToDp(5),
    },
    modalSuccessText: {
      color: Color.colorIndigo2,
      fontWeight: 'bold',
      fontSize: widthToDp(5),
    },
    modalSuccessDescriptionText: {
      textAlign: 'center',
      padding: widthToDp(2),
      color: Color.colorBlack,
    },
    textArea: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      backgroundColor: '#fff',
      borderRadius: 10,
      justifyContent: 'flex-start',
      padding: 10,
    },
  });
  return styles;
};
