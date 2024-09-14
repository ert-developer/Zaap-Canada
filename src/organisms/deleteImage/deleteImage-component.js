import {View} from 'react-native';
import React from 'react';
import CustomImage from '../../atoms/image/imageComponent';
import ButtonIconComponent from '../../atoms/buttonIcon/buttonIcon-component';

const DeleteCustomImage = ({containerStyle, imgSource, imageStyle, handleDeleteImage, deleteIconContainerStyle, imageIndex}) => {
  return (
    <View style={containerStyle}>
      <CustomImage source={{uri: imgSource}} style={imageStyle} />
      <ButtonIconComponent
        onPress={() => handleDeleteImage(imageIndex)}  // Pass the image index to the handleDeleteImage function
        style={deleteIconContainerStyle}
        iconName={'circle-with-cross'}
        size={18}
        color="white"
      />
    </View>
  );
};

export default DeleteCustomImage;
