import * as React from "react"
import Svg, { Path, Defs, RadialGradient, Stop } from "react-native-svg"

function WeddingSvgComponent(props) {
  return (
    <Svg
      width={360}
      height={246}
      viewBox="0 0 360 246"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="url(#paint0_radial_1544_8555)" d="M0 0H360V246H0z" />
      <Defs>
        <RadialGradient
          id="paint0_radial_1544_8555"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 309.5 -452.927 0 180 123)"
        >
          <Stop stopColor="#fff" stopOpacity={0.12} />
          <Stop offset={1} stopOpacity={0} />
        </RadialGradient>
      </Defs>
    </Svg>
  )
}

export default WeddingSvgComponent
