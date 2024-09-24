import {Color, FontFamily, FontSize} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';

const {StyleSheet} = require('react-native');

const portfolioStyles = () => {
  const styles = StyleSheet.create({
    portfolioMainContainer: {
      margin: widthToDp(2),
      marginBottom: widthToDp(20),
      backgroundColor: 'white',
    },
    portfolioBtnsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    portfolioBtns: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      width: widthToDp(45),
      height: widthToDp(12),
      borderRadius: widthToDp(2),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    portfolioBtnsText: {
      fontWeight: '800',
      marginRight: widthToDp(1),
    },
    activeBtn: {
      backgroundColor: Color.colorIndigo2,
    },
    activeText: {
      color: Color.colorWhite,
    },
    emptyPortfolioContainer: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      justifyContent: 'center',
      alignItems: 'center',
      height: heightToDp(80),
      borderRadius: widthToDp(1),
      marginTop: widthToDp(3),
      padding: widthToDp(3),
    },
    emptyPortfolioHeadText: {
      color: Color.colorIndigo2,
      fontSize: FontSize.size_18,
      paddingHorizontal: widthToDp(15),
      textAlign: 'center',
      marginVertical: widthToDp(3),
    },
    emptyPortfolioDescritpionText: {
      textAlign: 'center',
      fontSize: FontSize.size_14,
    },
    portfolioAddBtn: {
      backgroundColor: Color.colorIndigo2,
      width: widthToDp(30),
      height: widthToDp(10),
      borderRadius: widthToDp(1),
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: widthToDp(4),
    },
    addBtnText: {
      color: Color.colorWhite,
      fontWeight: 'bold',
    },
    allImagesContainer: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      borderRadius: widthToDp(2),
      padding: widthToDp(5),
      marginTop: widthToDp(3),
    },

    emptyProfilePortfolioCon: {
      height: widthToDp(145),
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyProfilePortfolioSvg: {
      marginBottom: widthToDp(3),
    },
    emptyProfilePortfolioHeading: {
      color: Color.colorIndigo2,
      fontSize: widthToDp(4.5),
      fontWeight: '700',
    },
    emptyProfilePortfolioDesc: {
      color: Color.colorSilver,
      marginTop: widthToDp(2.5),
      textAlign: 'center',
      fontWeight: '500',
    },

    imageContainer: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      borderRadius: widthToDp(5),
      // width: widthToDp(88),
      height: widthToDp(50),
      position: 'relative',
      marginVertical: widthToDp(3),
      overflow: 'hidden',
    },
    image: {
      width: widthToDp(85),
      height: widthToDp(49),
      borderRadius: widthToDp(5),
    },
    blurView: {
      width: widthToDp(85),
      height: widthToDp(10),
      bottom: 0,
      position: 'absolute',
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
    },
    blurButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 0.001,
      position: 'relative',
    },
    text: {
      color: 'white',
      fontSize: FontSize.size_18,
      fontWeight: 'bold',
      marginLeft: widthToDp(2),
      marginTop: 7,
    },
    linkSvgStyles: {
      marginRight: widthToDp(5),
      // marginLeft: '76%',
      position: 'absolute',
      right: 0,
    },
    popupImageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: widthToDp(3),
    },
    popupImage: {
      width: widthToDp(30),
      height: widthToDp(25),
      borderRadius: widthToDp(2),
      // margin: widthToDp(2),
    },
    externaleLinkText: {
      color: Color.colorBlack,
      fontWeight: 'bold',
    },
    externalInstruction: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: widthToDp(2),
      marginVertical: widthToDp(1),
    },
    linkInstructionText: {
      fontSize: FontSize.size_10,
      marginLeft: widthToDp(1),
    },
    linkText: {
      fontSize: FontSize.size_10,
      marginLeft: widthToDp(6),
    },
    popupMainContainer: {
      shadowColor: Color.colorBlack,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 3.84,
      shadowOpacity: 0.25,
      elevation: 5,
    },
    popEditDeleteContainer: {
      marginLeft: 'auto',
      marginVertical: widthToDp(3),
    },
    popEditDeleteBtns: {
      flexDirection: 'row',
    },
    popupHeadingContainer: {
      borderBottomWidth: 1,
      borderStyle: 'dashed',
      borderBottomColor: Color.colorSilver,
    },
    popupHeading: {
      color: Color.colorIndigo2,
      fontSize: FontSize.size_18,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
    },
    popupImageHeading: {
      color: Color.colorBlack,
      fontSize: FontSize.size_18,
    },
  });
  return styles;
};

export default portfolioStyles;
