import {Dimensions, StyleSheet} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';

function ProviderProfileStyles() {
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: Color.pageBgColor,
      flex: 1,
    },
    container: {
      padding: Padding.p_16,
    },
    containerFade: {
      backgroundColor: Color.pageBgFade,
    },
    scrollView: {
      marginHorizontal: 0,
    },
    titleContainer: {
      marginVertical: Margin.m_10,
    },
    verification: {
      fontFamily: FontFamily.helvetica,
      color: Color.colorBlack,
      fontSize: FontSize.size_22,
      fontStyle: 'normal',
      fontWeight: '700',
    },
    row: {
      flexDirection: 'row',
    },
    content: {
      justifyContent: 'space-between',
    },
    for: {
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_16,
      fontStyle: 'normal',
      fontWight: '700',
      marginLeft: Margin.m_22,
    },
    sp: {
      color: Color.colorIndigo,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_16,
      fontStyle: 'normal',
      fontWeight: '700',
    },
    rowOfIcons: {
      flexDirection: 'row',
      marginTop: Margin.m_10,
      justifyContent: 'space-between',
    },
    iconLabel: {
      textAlign: 'center',
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      // fontSize: FontSize.size_8,
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '300',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      // marginLeft: Margin.m_4,
    },
    iconSvg: {
      borderRadius: Border.br_20,
      borderStartColor: '#EFEFEF',
      marginBottom: Margin.m_10,
      backgroundColor: '#EFEFEF',
      // marginLeft: Margin.m_6,
    },
    label: {
      color: Color.colorIndigo,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_12,
      fontWeight: '700',
      letterSpacing: 1.2,
    },
    textInputStyle: {
      marginTop: Margin.m_8,
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
    textAreaLabel: {
      marginVertical: Margin.m_8,
    },
    saveButton: {
      width: widthToDp(90),
      padding: Padding.p_16,
      backgroundColor: Color.colorYellow,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: Margin.m_16,
      borderRadius: Border.br_16,
    },
    disableButton: {
      backgroundColor: '#D3D3D3',
    },
    indigo: {
      width: widthToDp(90),
      padding: Padding.p_16,
      backgroundColor: Color.colorIndigo,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: Margin.m_16,
      borderRadius: Border.br_16,
    },
    total: {
      padding: Padding.p_10,
      marginBottom: Margin.m_10,
    },
    half: {
      width: widthToDp(40),
      marginBottom: Margin.m_10,
    },
    roww: {
      flexDirection: 'row',
    },
    totalWidth: {
      width: widthToDp(90),
      padding: Padding.p_14,
      backgroundColor: Color.colorIndigo,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: Margin.m_16,
      borderRadius: Border.br_16,
      flexDirection: 'row',
    },
    halfWidth: {
      width: widthToDp(40),
      padding: Padding.p_14,
      backgroundColor: Color.colorIndigo,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: Margin.m_16,
      borderRadius: Border.br_16,
      flexDirection: 'row',
    },

    textButton: {
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_12,
      fontWeight: '700',
      letterSpacing: 0.48,
    },
    textWhite: {
      color: Color.colorWhite,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_12,
      fontWeight: '700',
      letterSpacing: 0.48,
      paddingHorizontal: Padding.p_5,
    },
    infoText: {
      color: Color.colorIndigo,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_10,
      fontWeight: '700',
    },
    header: {
      borderBottomRightRadius: Border.br_16,
      borderBottomLeftRadius: Border.br_16,
      elevation: 5,
      shadowRadius: 5,
      shadowColor: 'rgba(90, 45, 175, 0.1)',
      width: 360,
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      backgroundColor: '#FFF',
    },
    form: {
      marginTop: Margin.m_16,
    },
    textOnlyContainer: {
      marginVertical: Margin.m_8,
    },
    tandc: {
      color: Color.colorBlack,
      textAlign: 'justify',
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_16,
      fontWeight: '300',
      marginBottom: Margin.m_8,
    },
    tandcLabel: {
      textAlign: 'center',
      fontSize: FontSize.size_16,
      marginBottom: Margin.m_10,
    },
    check: {
      color: Color.colorBlack,
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_14,
      fontWeight: '700',
      paddingVertical: Padding.p_5,
    },
    categoryButtonContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    categoryButton: {
      marginBottom: 5,
    },
    iconContainer: {
      backgroundColor: 'transparent',
      borderRadius: widthToDp(6),
      // width: widthToDp(12),
      height: widthToDp(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeCategoryIcon: {
      borderWidth: Border.br_16,
      borderColor: Color.colorBlack,
    },
    select: {
      padding: Padding.p_8,
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
      color: Color.colorBlack,
      marginBottom: Margin.m_10,
    },
    greenTickContainer: {
      paddingBottom: 10,
      bottom: 0,
    },
    imageContainer: {
      width: Dimensions.get('window').width / 4 - 10, // Each image takes one-third of the screen width
      height: Dimensions.get('window').width / 4 - 10, // Height for two rows of images
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      width: '95%',
      height: '95%',
      borderRadius: 5,
    },
    deleteIconContainer: {
      position: 'absolute',
      top: 5,
      right: 10,
      backgroundColor: Color.colorRed,
      padding: Padding.p_2,
      borderRadius: Border.br_50,
    },
    flexContainer: {
      flexDirection: 'row', // Updated to column
      backgroundColor: 'DodgerBlue',
      alignItems: 'center', // Optional: Align items in the center horizontally
    },
    flexItem: {
      padding: 10,
      borderWidth: 1,
      borderColor: 'red',
    },
    show: {
      opacity: 0,
    },
    hide: {
      opacity: 1,
    },
    inputErrorStyles: {
      borderColor: Color.colorRed,
      borderWidth: 5,
    },
    input: {
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
      color: Color.colorBlack,
      marginBottom: Margin.m_10,
    },
    backIcon: {marginLeft: Margin.m_10},
  });
  return styles;
}

export default ProviderProfileStyles;
