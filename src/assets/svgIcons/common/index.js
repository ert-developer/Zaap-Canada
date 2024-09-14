import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackIcon(props) {
  return (
    <Svg
      width={11}
      height={18}
      viewBox="0 0 11 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2 9l7.071-7.071M2 9l7 7"
        stroke="#000"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default BackIcon

