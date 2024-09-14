import {StyleSheet, Platform, ScrollView} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';

function CategoriesListStyles() {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      shadowColor: Color.colorBlack,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    catNmae: {fontSize: FontSize.size_12, fontWeight: '700', marginLeft: 10},
    row: {flexDirection: 'row'},
    titleText: {
      fontSize: FontSize.size_22,
      color: Color.colorIndigo,
      fontWeight: '700',
      fontFamily: FontFamily.helvetica,
    },
    titleTextView: {
      position: 'absolute',
      top: 8,
      left: 50,
    },
    artistIcon: {
      marginRight: Margin.m_16,
    },
    // scrollView: {padding: Padding.p_16, backgroundColor: 'white'},
    categoryContainer: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    catName: {
      fontSize: FontSize.size_12,
      fontWeight: '700',
      marginLeft: Margin.m_20,
    },
    searchButton: {
      backgroundColor: Color.colorIndigo,
      padding: Padding.p_10,
      margin: Margin.m_10,
      borderRadius: Border.br_8,
      alignItems: 'center',
      marginBottom: Margin.m_22,
      // width: widthToDp(40),
    },
    searchButtonText: {
      color: Color.colorWhite,
      fontSize: FontSize.size_14,
      fontWeight: '700',
    },
    catRow: {flexDirection: 'row', marginTop: Margin.m_16, justifyContent: 'space-between', alignItems: 'center'},
    checkBox: {marginLeft: Margin.m_10},
    categoryName: {color: Color.colorBlack, marginTop: Margin.m_10, marginLeft: Margin.m_16},
    iconStyle: {
      marginRight: Margin.m_10,
    },
    // rowContainer: {marginTop: Margin.m_22, padding: Padding.p_10},
  });
  return styles;
}

export default CategoriesListStyles;
