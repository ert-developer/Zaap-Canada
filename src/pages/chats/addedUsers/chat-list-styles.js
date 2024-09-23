import {StyleSheet} from 'react-native';
import {heightToDp, widthToDp} from '../../../responsive/responsive';
import {Color, FontFamily, Padding} from '../../../assets/static/globalStyles';
import {he} from 'date-fns/locale';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.colorWhite,
    height: '100%',
  },
  textItem: {
    color: 'red',
  },
  row: {flexDirection: 'row'},
  addButton: {
    marginLeft: 'auto',
    position: 'absolute',
    top: '90%',
    left: '90%',
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70%',
  },
  noData: {
    fontSize: widthToDp(5),
    padding: heightToDp(2),
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: FontFamily.helvetica,
    color: Color.colorSilver,
  },
  loaderContainer: {
    height: heightToDp(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
