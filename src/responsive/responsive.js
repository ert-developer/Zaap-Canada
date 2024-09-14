import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');
// W: 393px

const widthToDp = num => {
  let givenWidth = typeof num === 'num' ? num : parseFloat(num);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = num => {
  let givenHeight = typeof num === 'num' ? num : parseFloat(num);
  return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};
const widthArea = num => {
  let givenWidth = typeof num === 'num' ? num : parseFloat(num);

  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100) * 0.2544;
};
const tabView = Dimensions.get('window').height > 1000 ? true : false;

const heightArea = num => {
  let givenWidth = typeof num === 'num' ? num : parseFloat(num);
  return PixelRatio.roundToNearestPixel((height * givenWidth) / 100) * 0.1173;
};
export {widthToDp, heightToDp, widthArea, heightArea, tabView};

// import { PixelRatio, Dimensions } from 'react-native';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const widthPercentageToDP = widthPercent => {
//   const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
//   return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
// };

// const heightPercentageToDP = heightPercent => {
//   const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
//   return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
// };
