import {StyleSheet} from 'react-native';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {Color, FontSize} from '../../assets/static/globalStyles';

const profilePortfolioStyles = () => {
  const styles = StyleSheet.create({
    profileMainContainer: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderStyle: 'solid',
      borderRadius: widthToDp(2),
      margin: widthToDp(2),
      backgroundColor: '#fff',
    },
    emptyProfilePortfolioCon: {
      height: widthToDp(175),
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyProfilePortfolioSvg: {
      marginBottom: widthToDp(3),
    },
    emptyProfilePortfolioHeading: {
      color: Color.colorIndigo2,
      fontSize: widthToDp(5),
      fontWeight: 'bold',
    },
    emptyProfilePortfolioDesc: {
      color: Color.colorSilver,
      marginTop: widthToDp(3),
    },
    allImagesContainer: {
      // borderWidth: 1,
      // borderColor: Color.colorSilver,
      // borderStyle: 'solid',
      // borderRadius: widthToDp(2),
      padding: widthToDp(4),
      // marginTop: widthToDp(3),
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
      // width: widthToDp(80),
      width: widthToDp(85),
      height: widthToDp(10),
      bottom: 0,
      position: 'absolute',
    },
    blurButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 0.001,
      position: 'relative',
    },
    text: {
      // color: 'white',
      fontSize: FontSize.size_16,
      fontWeight: 'bold',
      marginLeft: widthToDp(2),
    },
    linkSvgStyles: {
      marginRight: widthToDp(5),
      // marginLeft: '76%',
      position: 'absolute',
      right: 0,
    },
    activityIndicatorCon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    portfolioModalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: heightToDp(9),
    },
    closeSvg: {
      position: 'absolute',
      top: 60,
      right: 0,
    },
    headerActions: {
      flexDirection: 'row',
      gap: heightToDp(0.5),
      justifyContent: 'flex-end',
      width: heightToDp(43),
      marginTop: heightToDp(2.5),
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: heightToDp(1),
      width: widthToDp(90),
      padding: 5,
      // padding: heightToDp(2),
      // maxHeight: '80%',
    },
    portfolioHeading: {
      fontFamily: 'Roboto',
      color: '#47417D',
      fontWeight: 'bold',
      fontSize: heightToDp(2.1),
      padding: heightToDp(1),
    },
    dashedLine: {
      height: 1,
      width: '100%',
      borderRadius: 1,
      borderWidth: 1,
      borderColor: 'grey',
      borderStyle: 'dashed',
      zIndex: 0,
    },
    sectionTitle: {
      color: '#000000',
      fontFamily: 'Roboto',
      fontSize: heightToDp(2.2),
      marginBottom: heightToDp(1),
      marginLeft: heightToDp(1),
      marginTop: heightToDp(2),
    },
    imagaContainer: {
      paddingBottom: heightToDp(2),
    },
    portfolioImage: {
      height: heightToDp(30),
      width: heightToDp(38),
      borderRadius: heightToDp(1),
      marginRight: heightToDp(1),
    },
    imageListWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    imageListContent: {
      paddingHorizontal: heightToDp(1),
    },
    extranalLinkCon: {borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#DCE4E8', paddingBottom: 10},
    linkInfoContainer: {
      flexDirection: 'row',
      gap: heightToDp(0.5),
      marginLeft: heightToDp(1),
    },
    linkInfoText: {
      color: '#697164',
      fontFamily: 'Roboto',
      fontSize: heightToDp(1.25),
    },
    extranalLinkHead: {color: Color.colorBlack, fontFamily: 'Roboto', fontSize: widthToDp(4.5)},
    extranalLinkInstruction: {color: '#697164', fontFamily: 'Roboto', fontSize: widthToDp(2.5)},
    linkText: {
      color: '#5A2DAF',
      fontFamily: 'Roboto',
      marginLeft: heightToDp(1.5),
      marginTop: heightToDp(0.7),
      marginBottom: heightToDp(0.2),
      textDecorationLine: 'underline',
    },
    descriptionContainer: {
      marginTop: heightToDp(0.4),
      marginBottom: heightToDp(1.5),
    },
    descriptionHead: {color: Color.colorBlack, fontSize: widthToDp(4), fontFamily: 'Roboto'},
    descriptionText: {
      marginLeft: heightToDp(1.2),
      fontFamily: 'Roboto',
      fontSize: heightToDp(1.8),
      color: '#697164',
      fontWeight: '600',
    },
  });
  return styles;
};

export default profilePortfolioStyles;
