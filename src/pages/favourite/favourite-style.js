import {Dimensions, StyleSheet} from 'react-native';
import {Border, Color, FontFamily, FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {heightToDp, widthArea, widthToDp} from '../../responsive/responsive';

function FavouriteStyles() {
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: Color.colorWhite,
      flex: 1,
    },
    container: {
      borderWidth: 1,
      borderColor: Color.colorSilver,
      borderRadius: widthToDp(2),
      margin: widthToDp(3),
      paddingBottom: widthToDp(1),
    },
    emptyFavouriteContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: widthToDp(171),
    },
    emptyFavouriteText: {
      fontSize: FontSize.size_18,
      fontWeight: '900',
      color: Color.colorIndigo2,
      paddingHorizontal: widthToDp(18),
      textAlign: 'center',
    },
    containerFade: {
      backgroundColor: Color.pageBgFade,
    },
    scrollView: {
      marginHorizontal: 0,
    },
    pageTitle: {
      fontSize: FontSize.size_24,
      color: Color.colorIndigo,
      fontWeight: '700',
      fontFamily: FontFamily.helvetica,
      marginBottom: Margin.m_8,
    },
    row: {flexDirection: 'row'},
  });
  return styles;
}

export default FavouriteStyles;
