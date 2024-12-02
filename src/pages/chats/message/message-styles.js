import {StyleSheet} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../../responsive/responsive';

function ChatStyles() {
  const styles = StyleSheet.create({
    chatDisable: {
      fontSize: FontSize.size_16,
      fontWeight: '500',
      fontFamily: FontFamily.helvetica,
      color: Color.colorSilver,
      flex: 1,
      textAlign: 'center',
    },
    nameAndBackIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: heightToDp(2),
    },
    text: {
      color: 'black',
      fontSize: FontSize.size_24,
      fontWeight: 'bold',
    },
    container: {
      padding: Padding.p_16,
      flex: 1,
    },
    safeArea: {
      backgroundColor: Color.pageBgColor,
      flex: 1,
    },
    containerFade: {
      backgroundColor: Color.pageBgFade,
    },
    timeStamp: {
      fontSize: 9,
    },
    scrollView: {
      marginHorizontal: 0,
    },
    avatarContainer: {
      width: widthToDp(20),
      height: widthToDp(20),
      borderRadius: widthToDp(10), // Should be half of the width and height for a perfect circle
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: widthToDp(3),
      alignSelf: 'center',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      borderRadius: widthToDp(10), // Match this to the container's radius
      resizeMode: 'cover', // Ensures the image covers the container without stretching
    },

    avatarText: {
      color: '#fff', // Set your text color
      fontSize: FontSize.size_24,
      fontWeight: 'bold',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 16,
    },
    avatarContainer2: {
      width: 30,
      height: 30,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      // marginRight: 2,
    },
    avatarText2: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
    displayName: {
      fontSize: FontSize.size_22,
      fontWeight: '700',
      fontFamily: FontFamily.helvetica,
      color: Color.colorBlack,
      textAlign: 'center',
    },
    button: {
      width: widthToDp(30),
      height: heightToDp(4),
      borderRadius: Border.br_8,
      backgroundColor: '#E6E6E6',
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      marginVertical: Margin.m_10,
    },
    buttonText: {
      fontFamily: FontFamily.helvetica,
      color: Color.colorBlack,
    },
    input: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E6E6E6',
      borderRadius: Border.br_24,
      height: heightToDp(6),
      maxHeight: 85,
      position: 'sticky',
      justifyContent: 'space-between',
      width: widthToDp(90),
      alignSelf: 'center',
    },
    sendButton: {color: Color.colorBlack, fontFamily: FontFamily.helvetica},
    row: {flexDirection: 'row'},
    camsend: {justifyContent: 'center', alignItems: 'center'},
    date: {
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_16,
      fontWeight: '400',
      textAlign: 'center',
    },
    inputField: {
      //   width: widthToDp(90),
      marginLeft: Margin.m_10,
      padding: 10,
    },
  });

  return styles;
}

export default ChatStyles;
