import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BlackRupeeSvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M8.5 3.5v-1H3v1h1.75c.651 0 1.2.419 1.407 1H3v1h3.157a1.497 1.497 0 01-1.407 1H3v1.207L5.793 10.5h1.414l-3-3h.543a2.503 2.503 0 002.449-2H8.5v-1H7.199a2.466 2.466 0 00-.462-1H8.5z"
        fill="#000"
      />
    </Svg>
  );
}

export default BlackRupeeSvgComponent;
