import { StyleSheet, Dimensions } from 'react-native';

const myEarningStyles = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
      paddingHorizontal: 16,
    },
    jobsContainer: {
      width: screenWidth - 32,
      minHeight: screenHeight - 32,
      marginTop: 16,
      marginBottom: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      padding: 16,
    },
    emptyInvoiceContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    emptyEarningsImage: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    emptyInvoiceHeading: {
      fontSize: 18,
      fontFamily: 'Roboto-Bold',
      color: '#000000',
      marginVertical: 10,
      textAlign: 'center',
    },
    emptyEarningsText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 14,
      color: '#ABABAB',
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginVertical: 10,
      marginHorizontal: 16,
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
      fontSize: 16,
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
    },
    dateText: {
      fontSize: 10,
      fontFamily: 'Roboto-Regular',
      color: '#000000',
      marginBottom: 2,
      opacity: 0.8,
      textAlign: 'right',
    },
    salaryText: {
      fontSize: 16,
      fontFamily: 'Roboto-Bold',
      color: '#000000',
      textAlign: 'right',
    },
    separator: {
      width: '100%',
      height: 1,
      backgroundColor: '#DCE4E8',
      marginVertical: 8,
    },
  });
};

export default myEarningStyles;
