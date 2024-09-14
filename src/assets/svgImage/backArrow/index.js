import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const BackArrowSVG = props => (
  <Svg width={38} height={38} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle cx={15} cy={15} r={15} fill="#EDEEEF" />
    <Path
      d="M9.66797 15L8.96086 14.2929L8.25376 15L8.96086 15.7071L9.66797 15ZM19.668 16C20.2203 16 20.668 15.5523 20.668 15C20.668 14.4477 20.2203 14 19.668 14V16ZM12.9609 10.2929L8.96086 14.2929L10.3751 15.7071L14.3751 11.7071L12.9609 10.2929ZM8.96086 15.7071L12.9609 19.7071L14.3751 18.2929L10.3751 14.2929L8.96086 15.7071ZM9.66797 16H19.668V14H9.66797V16Z"
      fill="#84888C"
    />
  </Svg>
);
