import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Opensvg(props) {
  return (
    <Svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.136 5.793a1 1 0 011.414 0l4.95 4.95 4.95-4.95a1 1 0 011.414 1.414l-5.657 5.657a1 1 0 01-1.414 0L2.136 7.207a1 1 0 010-1.414z"
        fill="#5A2DAF"
      />
    </Svg>
  )
}

export default Opensvg
