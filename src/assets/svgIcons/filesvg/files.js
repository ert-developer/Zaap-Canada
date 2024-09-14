import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FileSvgComponent(props) {
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
        d="M7 1.5v2a.5.5 0 00.5.5h2"
        stroke="#5A2DAF"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.5 8.5h3m-3-2h3m1 4h-5a1 1 0 01-1-1v-7a1 1 0 011-1H7L9.5 4v5.5a1 1 0 01-1 1z"
        stroke="#5A2DAF"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default FileSvgComponent
