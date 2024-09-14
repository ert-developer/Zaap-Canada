import {StyleSheet} from 'react-native';
import {Border, Color, Margin} from '../../../assets/static/globalStyles';
import {heightArea, heightToDp, widthToDp} from '../../../responsive/responsive';

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: Color.colorSilver,
    borderStyle: 'solid',
    margin: widthToDp(3),
    borderRadius: widthToDp(4),
    backgroundColor: Color.colorWhite,
    height: '100%',
  },
  activeNotification: {
    height: 40,
    width: 35,
  },
  tabBar: {
    height: heightToDp(8),
    borderTopLeftRadius: heightToDp(5),
    borderTopRightRadius: heightToDp(5),
    // borderBottomLeftRadius: Border.br_45,
    // borderBottomRightRadius: Border.br_45,
    // marginBottom: Margin.m_10,
    // marginHorizontal: Margin.m_10,
    backgroundColor: Color.colorWhite,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowOpacity: 0.24,
    shadowRadius: 14.86,
    elevation: 18,
  },
  tabBarLabel: {
    marginBottom: heightArea(15),
    color: Color.colorIndigo,
  },
  tabBarIcon: {
    // marginTop: Margin.m_10,
  },
  postJob: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: Color.colorIndigo,
    width: widthToDp(16),
    height: widthToDp(16),
    borderRadius: widthToDp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
