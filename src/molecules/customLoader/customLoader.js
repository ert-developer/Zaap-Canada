import React from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';
import styles from './styles';
import {Color} from '../../assets/static/globalStyles';

const CustomLoader = ({
  visible = false,
  size = 'large',
  containerStyle,
  color,
  indicatorStyle,
  textStyle,
  textContent,
  animation,
  onRequestClose,
}) => {
  const spinner = (
    <View style={[styles.container, containerStyle]} key={`spinner_${Date.now()}`}>
      <View style={styles.background}>
        <ActivityIndicator
          color={Color.colorIndigo2}
          size={size}
          style={[styles.activityIndicator, {...indicatorStyle}]}
        />
        <View style={[styles.textContainer, {...indicatorStyle}]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      animationType={animation}
      onRequestClose={onRequestClose}
      supportedOrientations={['landscape', 'portrait']}
      transparent
      statusBarTranslucent
      visible={visible}>
      {spinner}
    </Modal>
  );
};

export default CustomLoader;
