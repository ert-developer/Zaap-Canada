import * as React from "react"
import Svg, { Path } from "react-native-svg"

 export default BudgetSvgComponent=(props) =>{
  return (
    <Svg
      width={8}
      height={10}
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.667 1.364V.15H0v1.213h2.121c.79 0 1.455.507 1.706 1.212H0v1.212h3.827A1.814 1.814 0 012.121 5H0v1.463l3.385 3.385H5.1L1.463 6.212h.658A3.035 3.035 0 005.09 3.788h1.577V2.576H5.09a2.99 2.99 0 00-.56-1.212h2.137z"
        fill="#5A2DAF"
      />
    </Svg>
  )
}

