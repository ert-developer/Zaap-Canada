import {StyleSheet} from 'react-native';
import {heightToDp, widthToDp} from '../../../responsive/responsive';
import {Color, FontFamily, Padding} from '../../../assets/static/globalStyles';
import {he} from 'date-fns/locale';

const screenWidth = widthToDp(100);
const screenHeight = heightToDp(105);

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 32,
    minHeight: screenHeight - 190,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    margin: 16,
    paddingVertical: 10,
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
    backgroundColor: '#FFFFFF',
  },
});

export default styles;
