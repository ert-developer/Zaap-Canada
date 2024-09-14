import {StyleSheet, Dimensions} from 'react-native';
import {heightToDp, widthToDp} from '../../responsive/responsive';

const serviceStandardStyles = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    headerText: {
      position: 'absolute',
      width: 306,
      height: 42,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 18,
      lineHeight: 21,
      color: '#464183',
      margin: 10,
      marginVertical: 15,
      marginLeft: 20,
    },
    subHeaderText: {
      position: 'absolute',
      width: 306,
      height: 21,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 18,
      lineHeight: 21,
      color: '#000000',
      margin: 10,
      marginTop: 20,
      top: 50,
      marginLeft: 20,
    },
    container: {
      flex: 1,
      margin: 10,
      paddingHorizontal: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    text: {
      margin: 8,
      top: 60,
      fontSize: 16,
      fontFamily: 'Roboto',
      fontWeight: '10',
      color: '#000000',
      marginBottom: 4,
      marginTop: 40,
    },
  });
  return styles;
};

export default serviceStandardStyles;
