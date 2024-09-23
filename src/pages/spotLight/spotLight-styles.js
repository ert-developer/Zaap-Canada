import {StyleSheet} from 'react-native';
import {Color, FontFamily, FontSize, Margin} from '../../assets/static/globalStyles';
import {heightToDp} from '../../responsive/responsive';

function SpotLightStyles() {
  const styles = StyleSheet.create({
    safeArea: {
      // backgroundColor:"#FFB24D",
      backgroundColor: '#fff',
      flex: 1,
      paddingBottom: heightToDp(10),
    },
    row: {
      flexDirection: 'row',
    },
    backtNtitle: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: Margin.m_10,
    },
    pageTitle: {
      fontSize: FontSize.size_24,
      color: Color.colorBlack,
      fontWeight: '700',
      fontFamily: FontFamily.helvetica,
      marginBottom: Margin.m_8,
    },
    noData: {
      fontSize: FontSize.size_18,
      fontWeight: '400',
      fontFamily: FontFamily.helvetica,
      color: Color.colorSilver,
      flex: 1,
      textAlign: 'center',
    },
    noDataContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: heightToDp(40),
    },
  });
  return styles;
}

export default SpotLightStyles;
