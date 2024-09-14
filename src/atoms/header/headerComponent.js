import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BackArrowSVG} from '../../assets/svgImage/backArrow';
import CustomText from '../text/textComponent';
import {Color, FontSize, Padding} from '../../assets/static/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {widthToDp} from '../../responsive/responsive';

const HeaderComponent = ({text, navigateToHome, setScreenType, screenType, backgroundColor, color}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (screenType !== 'job-form' && screenType !== undefined) {
      setScreenType('job-form');
      return;
    }

    if (navigateToHome) {
      navigation.navigate('HomeScreen');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.headerContainer, {backgroundColor: backgroundColor || Color.colorWhite}]}>
      <TouchableOpacity onPress={handlePress} style={styles.backBtnSvg}>
        <BackArrowSVG />
      </TouchableOpacity>
      <CustomText text={text} style={[styles.header, {color: color || Color.colorIndigo2}]} />
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  headerContainer: {
    margin: 0,
    padding: Padding.p_14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderBottomColor: Color.colorSilver,
    borderBottomWidth: 0.65,
    // flex: 0.05,
    position: 'relative',
  },

  backBtnSvg: {
    position: 'absolute',
    // left: widthToDp(3),
    left: '5%',
  },
  header: {
    color: Color.colorIndigo2,
    fontSize: FontSize.size_22,
    fontWeight: '700',
    textAlign: 'center',
  },
});
