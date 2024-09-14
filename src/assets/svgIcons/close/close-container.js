import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponentClose(props) {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.364 11.207a1 1 0 01-1.414 0L8 6.257l-4.95 4.95a1 1 0 01-1.414-1.414l5.657-5.657a1 1 0 011.414 0l5.657 5.657a1 1 0 010 1.414z"
        fill="#5A2DAF"
      />
    </Svg>
  )
}

export default SvgComponentClose
