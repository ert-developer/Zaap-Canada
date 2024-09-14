import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PersonSvgComponent(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.92 6.055a4.504 4.504 0 012.575 3.856.562.562 0 11-1.124.053 3.375 3.375 0 00-6.742 0 .563.563 0 01-1.124-.053 4.503 4.503 0 012.573-3.856 3 3 0 113.843 0zM7.876 3.75a1.875 1.875 0 10-3.75 0 1.875 1.875 0 003.75 0z"
        fill="#5A2DAF"
      />
    </Svg>
  )
}

export default PersonSvgComponent
