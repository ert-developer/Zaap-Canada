import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LocationSymbolSvgComponent(props) {
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
        d="M6.001 3.875a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-.875 1.5a.875.875 0 111.75 0 .875.875 0 01-1.75 0zM9.241 8l-2.513 2.678a1 1 0 01-1.456 0L2.76 8l-.005-.005-.005-.006a4.25 4.25 0 116.5 0l-.005.006L9.24 8zm-.477-.405a3.625 3.625 0 10-5.529 0l.078.091 2.414 2.563a.376.376 0 00.546 0l2.414-2.563.077-.09z"
        fill="#5A2DAF"
        stroke="#5A2DAF"
        strokeWidth={0.7}
      />
    </Svg>
  )
}

export default LocationSymbolSvgComponent
