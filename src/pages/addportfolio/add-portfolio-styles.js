import {StyleSheet} from 'react-native';
import {Border, Color, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';

const addPortfolioStyles = () => {
  const styles = StyleSheet.create({
    addPortfolioMainContainer: {
      borderColor: Color.colorSilver,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: widthToDp(2),
      margin: widthToDp(3),
      padding: widthToDp(3),
      backgroundColor: Color.colorWhite,
      marginBottom: widthToDp(20),
      backgroundColor: 'white',
    },
    charLeftText: {
      color: '#464183',
      fontSize: 12,
      fontWeight: '500',
      textAlign: 'right',
    },
    portfolioLabel: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    portfolioLabelText: {
      color: Color.colorBlack,
      fontSize: FontSize.size_14,
      fontWeight: 'bold',
      marginRight: widthToDp(1),
    },
    textArea: {
      padding: Padding.p_10,
      shadowColor: Color.colorBlack,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3.84,
      shadowOpacity: 0.25,
      elevation: 5,
      backgroundColor: Color.colorWhite,
      borderRadius: Border.br_8,
      fontSize: FontSize.size_sm,
      color: Color.colorSilver,
      marginBottom: Margin.m_10,
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
    },
    imageWrapper: {
      position: 'relative',
      marginBottom: 10,
    },
    deleteIcon: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
      borderRadius: 50,
      width: 20,
      padding: 5,
      zIndex: 1,
    },
    deleteText: {
      color: 'white',
      fontSize: 9,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    portfolioUploadContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: widthToDp(1),
      //   borderWidth: 1,
    },
    portfolioUploadBtn: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      borderRadius: widthToDp(2),
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: widthToDp(8),
      paddingVertical: widthToDp(2),
    },
    portfolioUploadLoad: {
      paddingHorizontal: widthToDp(18),
    },
    uploadText: {
      fontSize: FontSize.size_12,
    },
    uploadImageContainer: {
      paddingHorizontal: widthToDp(5),
    },
    uploadFileInstruction: {
      fontWeight: '700',
      marginVertical: widthToDp(3),
    },
    fileSizeTextContainer: {
      marginVertical: widthToDp(4),
    },
    fileSizeText: {
      fontSize: FontSize.size_12,
      lineHeight: widthToDp(6),
      fontWeight: '600',
    },
    descrptionLabelText: {
      color: Color.colorBlack,
      fontWeight: 'bold',
      fontSize: FontSize.size_14,
      marginVertical: widthToDp(3),
    },
    descriptionTextInput: {
      padding: widthToDp(4),
      shadowColor: Color.colorBlack,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3.84,
      shadowOpacity: 0.25,
      elevation: 5,
      backgroundColor: Color.colorWhite,
      borderRadius: widthToDp(1),
      fontSize: FontSize.size_12,
      color: Color.colorSilver,
    },
    portfolioSubmitBtn: {
      backgroundColor: Color.colorIndigo2,
      height: widthToDp(12),
      borderRadius: widthToDp(2),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: widthToDp(5),
    },
    submitText: {
      color: Color.colorWhite,
      fontWeight: 'bold',
    },
    externaleLinkText: {
      color: Color.colorBlack,
      fontWeight: 'bold',
    },
    externalLinkContainer: {
      flexDirection: 'row', // Align link and remove button in a row
      justifyContent: 'space-between', // Space between link text and remove button
      alignItems: 'center', // Center vertically
      marginVertical: 5, // Space between each link
      paddingHorizontal: 10, // Add some padding to the sides
      paddingVertical: 8, // Add padding vertically
      backgroundColor: '#f0f0f0', // Light background color for the container
      borderRadius: 8, // Rounded corners
    },
    // Style for the link text
    linkText: {
      color: '#007AFF', // Blue color for link text
      fontSize: 16, // Font size
      flexShrink: 1, // Prevents the text from overflowing by shrinking it
    },
    // Style for the remove button
    removeLinkText: {
      color: 'red', // Red color for remove button
      fontWeight: 'bold', // Bold text
      paddingLeft: 10, // Padding to separate from the link text
    },
    externalInstruction: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: widthToDp(2),
      marginVertical: widthToDp(1),
    },
    linkInstructionText: {
      fontSize: FontSize.size_10,
    },
    linkText: {
      fontSize: widthToDp(3.5),
      color: Color.colorIndigo,
      fontWeight: '700',
      marginVertical: 5,
    },
  });
  return styles;
};

export default addPortfolioStyles;
