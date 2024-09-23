import {Dimensions, StyleSheet} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {he} from 'date-fns/locale';
import {act} from 'react-test-renderer';

const {width: screenWidth} = Dimensions.get('window');

function HomeStyles() {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: 'white',
      paddingVertical: 0,
      marginVertical: 0,
    },
    container: {
      paddingHorizontal: Padding.p_8,
      paddingVertical: 0,
      marginVertical: 0,
    },
    container2: {
      paddingHorizontal: Padding.p_8,
    },
    containerFade: {
      backgroundColor: Color.pageBgFade,
    },
    scrollView: {
      marginHorizontal: 0,
    },
    container1: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabInput: {
      borderColor: 'transparent',
      width: widthToDp(78),
      margin: 0,
      padding: 0,
      height: 40, // Set a fixed height if needed
      textAlignVertical: 'center', // Align text vertically if needed
    },
    input: {
      borderColor: 'transparent',
      width: widthToDp(78),
      margin: 0,
      padding: 0,
      height: 40, // Set a fixed height if needed
      textAlignVertical: 'center', // Align text vertically if needed
    },
    row: {
      flex: 1,
      justifyContent: 'space-around',
    },
    rowRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    categorySearch: {
      color: Color.colorIndigo,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_12,
      fontWeight: '700',
      // marginTop: Margin.m_20,
      marginLeft: Margin.m_10,
    },
    searchBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 0,
    },
    searchContainer: {flex: 1},
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: Border.br_16,
      backgroundColor: Color.colorWhite,
      borderWidth: 0.5,
      borderColor: 'transparent',
      // marginVertical: Margin.m_4,
      width: widthToDp(86),
      height: widthToDp(10),
      // marginLeft: Margin.m_12,
      marginTop: Margin.m_4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    searchTexttabSearchBox: {
      flexDirection: 'row',
      borderRadius: Border.br_16,
      backgroundColor: Color.colorWhite,
      borderWidth: 0.5,
      borderColor: 'transparent',
      marginVertical: Margin.m_4,
      width: widthToDp(90),
      height: widthToDp(15),
      marginLeft: Margin.m_12,
      alignItems: 'center',
    },
    shadowLine: {
      marginTop: heightToDp(1),
      paddingTop: heightToDp(0.1),
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.75,
      shadowRadius: 3.85,
      elevation: 1,
      borderRadius: 10,
      width: '100%',
    },
    categories: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: -4,
    },
    catText: {
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      marginRight: Margin.m_20,
      fontSize: FontSize.size_12,
      fontWeight: '400',
    },
    search: {
      // marginTop: heightToDp(2.2),
      marginLeft: Margin.m_4,
    },
    tabSearch: {
      // position: 'absolute',
      // top: Margin.m_40,
      // left: Margin.m_6,
    },
    noDataText: {
      textAlign: 'center',
      marginVertical: 20,
      color: '#ffffff',
      fontSize: 16,
      fontFamily: FontFamily.helvetica,
      fontWeight: '400',
    },
    cat: {
      color: Color.colorIndigo,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_16,
      fontWeight: '700',
      // marginTop: Margin.m_10,
      marginLeft: Margin.m_10,
    },
    seeAllText: {
      marginRight: Margin.m_6,
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: Color.colorIndigo,
      margin: 0,
    },
    categoryList: {flexDirection: 'row', flexWrap: 'wrap'},
    tc: {
      alignItems: 'center',
      justifyContent: 'center',
      // margin: 5,
      width: '33.33%',
      margin: 0,
      padding: 0,
      marginTop: 6,
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: 0,
      marginBottom: 5,
      // marginVertical: Margin.m_6,
      // flex: 1,
    },
    image: {
      width: screenWidth,
      height: 100,
      resizeMode: 'contain',
      borderRadius: 8,
      borderWidth: 2,
      borderColor: Color.colorBlack,
    },
    icon: {marginLeft: 10, marginRight: 10},
    catName: {
      color: 'black',
      fontFamily: FontFamily.helvetica,
      textAlign: 'center',
      fontSize: FontSize.size_10,
    },
    textSpotlight: {
      fontFamily: 'Poppins-Bold',
      marginTop: 20,
      fontSize: 18,
    },
    bannerImage: {
      width: 350,
      height: 200,
      borderWidth: 2,
      borderColor: 'gray',
      margin: 10,
      borderRadius: 25,
      resizeMode: 'contain',
    },
    jobList: {
      padding: 16,
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    checkboxContainer: {
      width: 40,
      alignItems: 'center',
    },
    styleContainer: {
      width: screenWidth * 0.9,
      position: 'relative',
      height: heightToDp(30),
      backgroundColor: Color.colorWhite, // Adjust the background color as needed
      borderRadius: Border.br_8,
      elevation: 3, // Android shadow
      shadowColor: Color.colorBlack, // iOS shadow
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    styleImage: {
      width: 150,
      height: 200,
      borderRadius: 10,
      marginTop: Margin.m_10,
    },
    onText: {
      position: 'absolute',
      top: 80,
      left: 150,
    },
    spotLight: {
      marginHorizontal: 20,
      backgroundColor: Color.colorRed,
    },
    styleTitle: {
      fontSize: FontSize.size_24,
      fontWeight: '700',
      marginBottom: Margin.m_4,
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      marginLeft: Margin.m_22,
    },
    styleDesc: {
      fontSize: FontSize.size_22,
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      marginLeft: Margin.m_22,
      fontWeight: '700',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity or color as needed
    },
    pic: {
      position: 'absolute',
      zIndex: '-1',
    },
    spotText: {},
    tabHeader: {
      marginTop: Margin.m_12,
    },
    moreIconContainer: {
      borderRadius: widthToDp(8),
      backgroundColor: '#e0e0e0',
      alignItems: 'center',
      justifyContent: 'center',
      width: widthToDp(16),
      height: widthToDp(16),
    },
    more: {
      marginBottom: Margin.m_16,
    },
    liveLocation: {
      marginRight: Margin.m_4,
      marginTop: Margin.m_10,
    },
    live: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      // position: 'absolute',
      // right: Margin.m_10,
      // botton: Margin.m_10,
      // top: Margin.m_10,
    },
    li: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 0,
      // flexDirection: 'row',
      // position: 'absolute',
      // right: Margin.m_10,
      // botton: Margin.m_10,
      // top: Margin.m_10,
    },
    liveLocationAndLocationTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: Margin.m_32,
      marginTop: Margin.m_4,
      // borderColor: 'red',
      // borderWidth: 1,
      // borderStyle: 'solid',
    },
    locationSvg: {
      marginRight: Margin.m_8,
      height: 20,
    },
    youAreInText: {
      color: Color.colorIndigo,
      fontFamily: FontFamily.helvetica,
      fontSize: 12,
      fontWeight: '100',
      margin: 0,
      padding: 0,
      // lineHeight: 0, // Adjust line height to remove extra space
    },

    currentLocationText: {
      color: Color.colorIndigo,
      fontFamily: FontFamily.helvetica,
      fontSize: 15,
      fontWeight: '800',
      margin: 0,
      padding: 0,
      lineHeight: 15, // Adjust line height to remove extra space
    },

    notificationSvg: {
      marginRight: Margin.m_10,
    },
    activenotification: {
      width: 30,
      height: 30,
      marginRight: Margin.m_10,
    },
    location: {
      // fontStyle: FontFamily.helvetica,
      // color: Color.colorBlack,
      // marginRight: Margin.m_6,
      // // marginBottom: Margin.m_10,
      color: Color.colorIndigo,
      fontFamily: FontFamily.helvetica,
      fontWeight: 800,
      margin: 0,
      padding: 0,
      fontSize: FontSize.size_18,
    },
    moreLoc: {
      marginTop: Margin.m_12,
    },
    pairContainer: {
      paddingHorizontal: heightToDp(1),
      paddingBottom: heightToDp(3),
    },
    addpadding: {
      padding: 10,
    },
    spotLightTouchCard: {
      // borderWidth: 1,
      // borderColor: 'green',
      // borderStyle: 'solid',
      marginTop: 0,
      marginHorizontal: 0,
      paddingTop: 0,
      paddingHorizontal: 0,
    },
    spotLightCard: {
      borderRadius: heightToDp(2),
      backgroundColor: '#EEB92B',
      // alignItems: 'center',
      // justifyContent: 'center',
      padding: 0,
      margin: 0,
      marginTop: 9,
    },
    spotLightHeadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 0,
      padding: 0,
      paddingVertical: 6,
    },
    spotliteText: {
      flexDirection: 'row',
      fontSize: heightToDp(1.85),
      fontFamily: 'Helvetica',
      fontWeight: '900',
      color: 'black',
    },
    viewAllText: {
      fontSize: heightToDp(1.85),
      fontFamily: 'Helvetica',
      alignItems: 'flex-end',
      color: '#000',
      textDecorationColor: Color.colorBlack,
      textDecorationStyle: 'solid',
      textDecorationLine: 'underline',
      marginRight: 10,
      marginVertical: 0,
    },
  });

  return styles;
}

export default HomeStyles;
