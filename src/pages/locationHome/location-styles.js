import {Dimensions, StyleSheet} from 'react-native';
import {Color, FontSize, Border, Padding, Margin, FontFamily} from '../../assets/static/globalStyles';
import {heightArea} from '../../responsive/responsive';

function LocationStyles() {
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
    row: {
      flexDirection: 'row',
    },
    titleText: {
      fontFamily: FontFamily.helvetica,
      fontSize: FontSize.size_24,
      color: Color.colorBlack,
      fontWeight: '700',
    },
    // search: {
    //     position: 'absolute',
    //     top: 10,
    // },
  });
  return styles;
}
export default LocationStyles;
