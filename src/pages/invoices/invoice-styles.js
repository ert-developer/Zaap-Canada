import {StyleSheet, Dimensions} from 'react-native';
import {heightToDp} from '../../responsive/responsive';

const InvoicesStyles = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    infoicon: {
      marginRight: heightToDp(0),
      position: 'absolute',
      right: 5,
      top: 5,
    },
    jobsContainer: {
      width: screenWidth - 32,
      minHeight: screenHeight - 90,
      marginTop: 16,
      marginBottom: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      margin: 16,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    cardLeft: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    cardRight: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    jobTitle: {
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
      color: '#464183',
      marginBottom: 4,
    },
    jobTitleInvoice: {
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
      color: '#000000',
      marginBottom: 4,
      textTransform: 'uppercase',
    },
    invoiceText: {
      fontSize: 10,
      fontFamily: 'Roboto-Regular',
      color: '#000000',
      marginBottom: 2,
      opacity: 0.8,
    },
    bookingText: {
      fontSize: 12,
      fontFamily: 'Roboto-Regular',
      color: '#000000',
      opacity: 0.7,
      textTransform: 'uppercase',
      marginBottom: 3,
    },
    dateText: {
      fontSize: 10,
      fontFamily: 'Roboto-Regular',
      color: '#000000',
      fontWeight: '400',
      lineHeight: 11.72,
      textAlign: 'right',
      opacity: 0.8,
    },
    salaryText: {
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
      color: '#464183',
      textAlign: 'right',
      marginTop: 16,
    },
    salaryTextInvoice: {
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
      color: '#000000',
      textAlign: 'right',
      marginTop: 20,
    },
    separator: {
      width: '100%',
      height: 1,
      backgroundColor: '#DCE4E8',
      marginVertical: 8,
    },
    emptyInvoiceContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
      width: screenWidth - 32,
      margin: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      padding: 16,
    },
    emptyInvoiceHeading: {
      fontSize: 18,
      fontFamily: 'Roboto-Bold',
      color: '#000000',
      marginVertical: 10,
      textAlign: 'center',
    },
    emptyEarningsImage: {
      width: 150,
      height: 150,
      marginBottom: 16,
    },
    emptyEarningsText: {
      fontSize: 14,
      fontFamily: 'Roboto-Regular',
      color: '#888',
      textAlign: 'center',
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return styles;
};

export default InvoicesStyles;
