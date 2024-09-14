import React from 'react';
import {PaymentStyles} from './payment-styles';
import {useMemo} from 'react';

import {View} from 'react-native';
import CustomButton from '../../atoms/button/buttonComponent';

const PaymentScreen = ({handleButtonPress, amount, title, buttonStyle, textStyle}) => {
  const styles = useMemo(() => PaymentStyles(), []);

  return (
    <>
      <CustomButton
        title={`${title} ${amount / 100}`}
        onPress={handleButtonPress}
        style={[styles.customButton, buttonStyle]}
      />
    </>
  );
};
export default React.memo(PaymentScreen);
