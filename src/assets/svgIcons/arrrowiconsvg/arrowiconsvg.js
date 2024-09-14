import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowSvgComponent(props) {
  return (
    <Svg
      width={9}
      height={14}
      viewBox="0 0 9 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.918.636a1 1 0 000 1.414L5.868 7l-4.95 4.95a1 1 0 001.414 1.414L7.99 7.707a1 1 0 000-1.414L2.332.636a1 1 0 00-1.414 0z"
        fill="#000"
      />
    </Svg>
  )
}

export default ArrowSvgComponent
