import {Color, FontSize, Border, Padding, Margin, FontFamily} from '../../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../../responsive/responsive';
import {Dimensions, StyleSheet} from 'react-native';

function MyJobStyles() {
  const styles = StyleSheet.create({
    previousJobs: {
      height: heightToDp(35),
      marginTop: 30,
    },
    myJobsContainer: {
      height: heightToDp(35),
    },
    //  drop Dowm Styles
    firstPicker: {
      width: '40%',
    },
    inputWrapper: {
      padding: Padding.p_1,
    },
    input: {
      // height: 48,
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
      fontSize: FontSize.size_16,
      color: Color.colorSilver,
    },
    label: {
      color: Color.colorIndigo,
      fontWeight: '700',
      fontSize: FontSize.size_14,
      marginBottom: Margin.m_4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inputContainer: {
      marginVertical: Margin.m_16,
    },
    column: {
      flex: 1,
    },
    // flatlist styes
    frameParent: {
      padding: heightToDp(1.7),
      paddingTop: heightToDp(2.5),
      paddingLeft: heightToDp(2),
      paddingRight: heightToDp(3),
      backgroundColor: 'white',
      // paddingBottom: heightToDp(5),
      // backgroundColor: 'white',
    },
    myJobsHeading: {
      fontSize: 12,
      letterSpacing: 2.4,
      fontWeight: '300',
      fontFamily: 'Helvetica',
      color: '#5a2daf',
      textAlign: 'left',
      paddingTop: 5,
      paddingBottom: 10,
    },
    noData: {
      fontSize: FontSize.size_16,
      fontWeight: '400',
      fontFamily: FontFamily.helvetica,
      color: Color.colorSilver,
      flex: 1,
      textAlign: 'center',
    },
    noDataContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: heightToDp(33),
    },
  });
  return styles;
}

export default MyJobStyles;
