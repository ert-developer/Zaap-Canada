import {StyleSheet, Dimensions} from 'react-native';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {Color, FontFamily} from '../../assets/static/globalStyles';

const notificationstyles = () => {
  const screenWidth = Dimensions.get('window').width;
  const styles = StyleSheet.create({
    noData: {
      fontSize: widthToDp(5),
      textAlign: 'center',
      fontWeight: '500',
      fontFamily: FontFamily.helvetica,
      color: Color.colorSilver,
    },
    loadingContainer: {
      height: heightToDp(100),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'red',
    },
    container: {
      width: screenWidth - 28,
      height: heightToDp(90),
      margin: heightToDp(2),
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notificationContainer: {
      width: screenWidth - 28,
      margin: heightToDp(1),
      padding: heightToDp(2),
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    title: {
      fontSize: heightToDp(2.2),
      fontWeight: 'bold',
      color: '#464183',
      fontFamily: 'poppins-bold',
    },
    messageRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: heightToDp(1),
    },
    message: {
      fontSize: heightToDp(1.75),
      color: '#555',
      fontFamily: 'poppins-regular',
      maxWidth: '70%', // Ensures the message and date fit in the same row
    },
    time: {
      fontSize: heightToDp(1.5),
      color: '#555',
      marginBottom: heightToDp(1),
      fontFamily: 'poppins-regular',
    },
    button: {
      backgroundColor: '#464183',
      borderRadius: 20,
      paddingVertical: heightToDp(1),
      paddingHorizontal: widthToDp(5),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: heightToDp(1),
    },
    buttonText: {
      color: '#fff',
      fontSize: heightToDp(1.8),
      fontFamily: 'poppins-bold',
    },
    markAllButton: {
      backgroundColor: '#464183',
      borderRadius: 5,
      paddingVertical: heightToDp(0.5),
      paddingHorizontal: heightToDp(0.5),
      alignSelf: 'flex-end',
      marginVertical: heightToDp(1),
      marginRight: widthToDp(2),
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
    },
    markAllButtonText: {
      color: '#fff',
      fontSize: heightToDp(1.5),
      fontFamily: 'poppins-bold',
      marginLeft: widthToDp(1),
    },
  });
  return styles;
};

export default notificationstyles;
