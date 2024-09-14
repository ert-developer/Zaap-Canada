import {Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

const ButtonIconComponent = ({onPress, style, iconName, size, color}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Icon name={iconName} size={size} color={color} />
    </Pressable>
  );
};

export default ButtonIconComponent;
