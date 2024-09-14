import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export function SpotLightBanner(props) {
  return (
    <Svg
      width={61}
      height={40}
      viewBox="0 0 61 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_230_446)">
        <Path d="M5 1h51v30H5l5.844-15L5 1z" fill="#5A2DAF" />
        <Path
          d="M5 .75h-.366l.133.34L10.575 16 4.767 30.91l-.133.34H56.25V.75H5z"
          stroke="#949494"
          strokeWidth={0.5}
        />
      </G>
      <Defs></Defs>
    </Svg>
  )
}


