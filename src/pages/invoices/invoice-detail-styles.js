import {StyleSheet, Dimensions} from 'react-native';
import {heightToDp, widthToDp} from '../../responsive/responsive';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const InvoiceDetailStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerWithShadow: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      margin: heightToDp(2),
      padding: heightToDp(0.5),
      borderRadius: 12,
      width: screenWidth - 40, // Adjusted to match design
      alignSelf: 'center',
      top: heightToDp(3),
      flexGrow: 1,
      paddingBottom: heightToDp(6),
    },
    invoiceContainer: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      flex: 1,
      paddingBottom: heightToDp(2),
      marginBottom: heightToDp(8),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: heightToDp(1),
      marginBottom: heightToDp(2),
      marginTop: heightToDp(2),
    },
    logo: {
      width: 83,
      height: 35,
    },
    invoiceLabelContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#464183',
      padding: heightToDp(1),
      borderRadius: 5,
      width: 130,
    },
    invoiceNumberText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '800',
      fontSize: 14,
      lineHeight: 16,
      color: '#464183',
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: heightToDp(0.5),
      marginHorizontal: heightToDp(0.5), // Add margin around the columns
    },
    leftColumn: {
      flex: 1,
      paddingRight: 30,
    },
    rightColumn: {
      flex: 1,
      paddingLeft: 30, // Add more padding to the left
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: heightToDp(1),
    },
    labelText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 8, // Decrease font size
      lineHeight: 14,
      color: '#000000',
      marginRight: 8,
    },
    labelTextBold: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 10, // Decrease font size
      lineHeight: 14,
      color: '#000000',
      marginRight: 6,
      paddingRight: 2,
    },
    addressText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: widthToDp(2), // Decrease font size
      // lineHeight: 12,
      letterSpacing: 0.005,
      color: '#000000',
      opacity: 0.7,
      textTransform: 'uppercase',
    },
    itemList: {
      width: '100%',
      marginTop: heightToDp(5),
      borderWidth: 1,
      borderColor: '#969696',
    },
    itemHeader: {
      backgroundColor: '#D9D9D9',
      padding: 8,
      borderWidth: 1,
      borderBottomColor: '#000000',
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontWeight: '900',
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#D9D9D9',
    },
    headerText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'Bold',
      fontSize: 14,
      lineHeight: 16,
      color: '#000000',
    },
    itemText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 16,
      color: '#000000',
    },
    amountText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 16,
      color: '#000000',
    },
  });
};

export default InvoiceDetailStyles;
