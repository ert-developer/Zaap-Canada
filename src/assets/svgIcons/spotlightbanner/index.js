import * as React from 'react';
import Svg, {G, Path, Defs} from 'react-native-svg';
export function SpotlightBanner(props) {
  return (
    <Svg width={65} height={40} viewBox="0 0 61 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#filter0_d_880_3336)">
        <Path d="M5 1h51v30H5l5.844-15L5 1z" fill="#FFB24D" />
        <Path d="M5 .75h-.366l.133.34L10.575 16 4.767 30.91l-.133.34H56.25V.75H5z" stroke="#949494" strokeWidth={0.5} />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export function FeaturedBanner(props) {
  return (
    <Svg width={65} height={40} viewBox="0 0 57 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <G filter="url(#filter0_d_217_382)">
        <Path d="M5.5 1h51v21h-51l5.844-10.5L5.5 1z" fill="#008000" />
        <Path
          d="M5.5.75h-.425l.207.372L11.058 11.5 5.282 21.878l-.207.372H56.75V.75H5.5z"
          stroke="#949494"
          strokeWidth={0.5}
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export const NewSpotlightBanner = props => (
  <Svg width={70} height={21} viewBox="0 0 70 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M7 11L0 0H70V21H0L7 11Z" fill="#EEBA2B" />
  </Svg>
);

export const NewFeaturedBanner = props => (
  <Svg width={70} height={21} viewBox="0 0 70 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M7 11L0 0H70V21H0L7 11Z" fill="#5E17EB" />
  </Svg>
);
