import {View, Text, Pressable} from 'react-native';
import React from 'react';
import BackIcon from '../../assets/svgIcons/common';
import CustomText from '../../atoms/text/textComponent';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {widthToDp} from '../../responsive/responsive';
import {FontSize, Margin, Padding} from '../../assets/static/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {Call} from '../../assets/svgImage/chat';

const BackHeader = ({text, backIcon}) => {
  const navigation = useNavigation();

  const navigationBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.callback]}>
        {true && (
          <View style={styles.partone}>
            <TouchableOpacity onPress={navigationBack}>
              <BackIcon />
            </TouchableOpacity>
          </View>
        )}
        <CustomText style={styles.text} text={text} />
        {/* <Call style={styles.call} /> */}
      </View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Padding.p_16,
  },
  partone: {
    marginRight: widthToDp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: FontSize.size_24,
    fontWeight: 'bold',
  },
  row: {flexDirection: 'row'},
  callback: {justifyContent: 'space-between'},
  call: {marginLeft: widthToDp(50)},
});
