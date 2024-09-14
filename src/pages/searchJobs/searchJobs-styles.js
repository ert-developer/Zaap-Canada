import {StyleSheet} from 'react-native';
import {Color, FontFamily, FontSize, Margin} from '../../assets/static/globalStyles';

function JobSearchtStyles() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    jobList: {
      padding: 16,
      marginTop: 40,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    },
    pageText: {
      marginHorizontal: 20,
      fontSize: 16,
    },
    image: {
      width: 200,
      height: 150,
      borderWidth: 1.5,
      borderColor: 'gray',
    },
    title: {
      fontSize: 20,
      fontFamily: 'Poppins-Bold',
    },
    sideH: {
      color: 'blue',
      fontSize: 10,
      fontFamily: 'Poppins-Regular',
    },
    searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 8,
      borderRadius: 8,
      marginLeft: 40,
      marginTop: 30,
      width: 310,
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
      color: Color.colorIndigo,
      fontWeight: '700',
      fontFamily: FontFamily.helvetica,
      marginBottom: Margin.m_8,
      marginTop: Margin.m_4,
    },
  });
  return styles;
}

export default JobSearchtStyles;
