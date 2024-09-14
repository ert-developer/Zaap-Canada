import * as React from 'react';
import Svg, {Circle, Path, Rect, G, Defs, ClipPath, Mask, Text} from 'react-native-svg';
import {heightToDp} from '../../../responsive/responsive';
import {Color} from '../../static/globalStyles';

export function Call(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.68 1.32l.613-.613a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414L5.5 6.5a.982.982 0 00-.183 1.133 11.293 11.293 0 005.05 5.05.982.982 0 001.133-.184l1.793-1.792a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414l-.613.613a6 6 0 01-7.843.558l-1.208-.907a22.997 22.997 0 01-4.6-4.6l-.907-1.208A6 6 0 012.68 1.32z"
        fill="#464183"
      />
    </Svg>
  );
}

export function IIcon(props) {
  return (
    <Svg width={13} height={12} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M6.5.999a5.001 5.001 0 110 10.002A5.001 5.001 0 016.5.999zm-.002 4.125a.5.5 0 00-.496.443l-.003.058L6 8.375l.002.059a.5.5 0 00.994 0L7 8.375l-.002-2.751-.003-.058a.5.5 0 00-.498-.441l.001-.001zM6.5 3.25a.626.626 0 10.002 1.25.626.626 0 00-.002-1.25z"
        fill="#5A2DAF"
      />
    </Svg>
  );
}
// export const InformationIcon = () => {
//   return (
//     <Svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       width="24"
//       height="24"
//       fill="none"
//       stroke="black"
//       stroke-width="2"
//       stroke-linecap="round"
//       stroke-linejoin="round">
//       <Circle cx="12" cy="12" r="10" />
//       <Text x="12" y="15" textAnchor="middle" font-size="12" fill="black" font-family="Arial" font-weight="bold">
//         i
//       </Text>
//     </Svg>
//   );
// };

export const InformationIcon = props => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M11.0007 1.375C13.5536 1.375 16.0019 2.38913 17.8071 4.1943C19.6122 5.99947 20.6264 8.4478 20.6264 11.0007C20.6264 13.5536 19.6122 16.0019 17.8071 17.8071C16.0019 19.6122 13.5536 20.6264 11.0007 20.6264C8.4478 20.6264 5.99946 19.6122 4.1943 17.8071C2.38913 16.0019 1.375 13.5536 1.375 11.0007C1.375 8.4478 2.38913 5.99947 4.1943 4.1943C5.99946 2.38913 8.4478 1.375 11.0007 1.375ZM12.4444 7.28475C13.1594 7.28475 13.7397 6.78837 13.7397 6.05275C13.7397 5.31712 13.1581 4.82075 12.4444 4.82075C11.7294 4.82075 11.1519 5.31712 11.1519 6.05275C11.1519 6.78837 11.7294 7.28475 12.4444 7.28475ZM12.6961 15.0219C12.6961 14.8748 12.7469 14.4925 12.7181 14.2752L11.5878 15.576C11.3541 15.8221 11.0612 15.9926 10.9237 15.9472C10.8613 15.9243 10.8092 15.8798 10.7767 15.8218C10.7441 15.7639 10.7334 15.6962 10.7463 15.631L12.6301 9.68C12.7841 8.92513 12.3606 8.23625 11.4627 8.14825C10.5153 8.14825 9.12106 9.10938 8.27269 10.329C8.27269 10.4748 8.24519 10.8377 8.27406 11.055L9.40294 9.75288C9.63669 9.5095 9.90894 9.33762 10.0464 9.38437C10.1142 9.40869 10.1697 9.45859 10.2011 9.52338C10.2324 9.58816 10.2371 9.66266 10.2142 9.73088L8.34694 15.653C8.13106 16.346 8.53944 17.0253 9.52944 17.1793C10.9869 17.1793 11.8477 16.2415 12.6974 15.0219H12.6961Z"
      fill="#ABABAB"
    />
  </Svg>
);

export function Lines({color, customWidth}) {
  return (
    <Svg width={customWidth} height={2} viewBox="0 0 360 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M0 1h360" stroke={color} strokeLinecap="round" strokeDasharray="4 4" />
    </Svg>
  );
}

export function MessageIcon(props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 7c0-2.809 0-4.213-.674-5.222A4.002 4.002 0 0014.222.674C13.213 0 11.81 0 9 0H7C4.191 0 2.787 0 1.778.674A4 4 0 00.674 1.778C0 2.787 0 4.19 0 7c0 2.809 0 4.213.674 5.222.292.437.667.812 1.104 1.104.881.589 2.064.663 4.222.673V14l1.106 2.211a1 1 0 001.788 0L10 14v-.001c2.158-.01 3.34-.084 4.222-.673a4.003 4.003 0 001.104-1.104C16 11.213 16 9.81 16 7zM4 8a1 1 0 100-2 1 1 0 000 2zm5-1a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
        fill="#464183"
      />
    </Svg>
  );
}

export function ProfileVerified(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={20.5} cy={20.5} r={18.5} fill="#5A2DAF" stroke="#5A2DAF" strokeWidth={4} />
      <Path
        d="M23.994 13.523c-.76-.821-1.822-1.273-2.994-1.273-1.178 0-2.243.45-3 1.265-.765.824-1.137 1.945-1.05 3.155C17.124 19.058 18.94 21 21 21c2.06 0 3.874-1.942 4.05-4.329.088-1.2-.287-2.317-1.056-3.148zm3.881 16.227h-13.75a1.211 1.211 0 01-.945-.435 1.38 1.38 0 01-.28-1.137c.33-1.829 1.358-3.365 2.975-4.444 1.437-.957 3.257-1.484 5.125-1.484 1.869 0 3.689.527 5.125 1.484 1.617 1.078 2.646 2.615 2.976 4.444a1.38 1.38 0 01-.28 1.137 1.21 1.21 0 01-.946.435z"
        fill="#fff"
      />
    </Svg>
  );
}
export function ProfileVerify(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={20.5} cy={20.5} r={18.5} fill="#D9D9D9" stroke="#5A2DAF" strokeWidth={4} />
      <Path
        d="M23.994 13.523c-.76-.821-1.822-1.273-2.994-1.273-1.178 0-2.243.45-3 1.265-.765.824-1.137 1.945-1.05 3.155C17.124 19.058 18.94 21 21 21c2.06 0 3.874-1.942 4.05-4.329.088-1.2-.287-2.317-1.056-3.148zm3.881 16.227h-13.75a1.211 1.211 0 01-.945-.435 1.38 1.38 0 01-.28-1.137c.33-1.829 1.358-3.365 2.975-4.444 1.437-.957 3.257-1.484 5.125-1.484 1.869 0 3.689.527 5.125 1.484 1.617 1.078 2.646 2.615 2.976 4.444a1.38 1.38 0 01-.28 1.137 1.21 1.21 0 01-.946.435z"
        fill="#000"
      />
    </Svg>
  );
}

export function ReviewIcon(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={16.5} cy={16.5} r={16.5} fill="#EFEFEF" />
      <Path
        d="M12 25.333a2.41 2.41 0 01-1.77-.729 2.41 2.41 0 01-.73-1.77v-2.5H12V8.666h12.5v14.166a2.41 2.41 0 01-.73 1.771 2.41 2.41 0 01-1.77.73H12zm10-1.666c.236 0 .434-.08.594-.24.16-.16.24-.358.24-.594v-12.5h-9.167v10h7.5v2.5c0 .237.08.435.24.595.16.16.357.24.593.239zM14.5 14.5v-1.667H22V14.5h-7.5zm0 2.5v-1.667H22V17h-7.5zM12 23.667h7.5V22h-8.333v.833c0 .237.08.435.24.595.16.16.357.24.593.239zm0 0h-.833H19.5 12z"
        fill="#BCBCBC"
      />
    </Svg>
  );
}

export function TickMark(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 8a8 8 0 1116 0A8 8 0 010 8zm7.543 3.424l4.606-5.758-.832-.665L7.39 9.908 4.608 7.59l-.683.82 3.618 3.015v-.001z"
        fill="#17AB1D"
      />
    </Svg>
  );
}

export function WorkCompleted(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={20.5} cy={20.5} r={18.5} fill="#5A2DAF" stroke="#5A2DAF" strokeWidth={4} />
      <Path
        d="M21 16v-2.5m0 15v-1.667M26.833 21H28.5m-15 0H16m9.714-4.714l.59-.59M15.696 26.304l1.178-1.178m8.25 0l1.178 1.178M15.697 15.697l1.767 1.767"
        stroke="#fff"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function WorkCompleteStarted(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={20.5} cy={20.5} r={18.5} fill="#EFEFEF" stroke="#5A2DAF" strokeWidth={4} />
      <G clipPath="url(#clip0_1544_8240)">
        <Path
          d="M21 11c.918 0 1.803.117 2.656.352a9.455 9.455 0 012.383 1.015c.736.443 1.41.964 2.021 1.563a9.518 9.518 0 011.573 2.021 10.071 10.071 0 011.015 7.705 9.455 9.455 0 01-1.015 2.383c-.443.736-.964 1.41-1.563 2.021a9.518 9.518 0 01-2.021 1.573 10.071 10.071 0 01-7.705 1.015 9.455 9.455 0 01-2.383-1.015 10.954 10.954 0 01-2.021-1.563 9.518 9.518 0 01-1.573-2.021 10.071 10.071 0 01-1.015-7.705 9.455 9.455 0 011.015-2.383c.443-.736.964-1.41 1.563-2.021a9.518 9.518 0 012.021-1.573A10.071 10.071 0 0121 11zm5.889 6.69L25.56 16.36l-6.436 6.436-2.686-2.686-1.328 1.328 4.014 4.014 7.764-7.764z"
          fill="#949494"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1544_8240">
          <Path fill="#fff" transform="translate(11 11)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function WorkCompleteInProgress(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={16.5} cy={16.5} r={16.5} fill="#EFEFEF" />
      <G clipPath="url(#clip0_1544_8107)">
        <Path
          d="M17 7c.918 0 1.803.117 2.656.352a9.457 9.457 0 012.383 1.015c.736.443 1.41.964 2.021 1.563a9.518 9.518 0 011.573 2.021 10.071 10.071 0 011.015 7.705 9.455 9.455 0 01-1.015 2.383c-.443.736-.964 1.41-1.563 2.021a9.518 9.518 0 01-2.021 1.573 10.071 10.071 0 01-7.705 1.015 9.455 9.455 0 01-2.383-1.015 10.956 10.956 0 01-2.022-1.563 9.519 9.519 0 01-1.572-2.021 10.07 10.07 0 01-1.015-7.705 9.457 9.457 0 011.015-2.383c.443-.736.964-1.41 1.563-2.022a9.519 9.519 0 012.021-1.572A10.07 10.07 0 0117 7zm5.889 6.69L21.56 12.36l-6.436 6.436-2.685-2.686-1.329 1.328 4.014 4.014 7.764-7.763z"
          fill="#BCBCBC"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1544_8107">
          <Path fill="#fff" transform="translate(7 7)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function WorkInProgressCompleted(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={20.5} cy={20.5} r={18.5} fill="#5A2DAF" stroke="#5A2DAF" strokeWidth={4} />
      <Path
        d="M21 16v-2.5m0 15v-1.667M26.833 21H28.5m-15 0H16m9.714-4.714l.59-.59M15.696 26.304l1.178-1.178m8.25 0l1.178 1.178M15.697 15.697l1.767 1.767"
        stroke="#fff"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function WorkInProgressStart(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={21} cy={20.5} r={18.5} fill="#EFEFEF" stroke="#5A2DAF" strokeWidth={4} />
      <Path
        d="M21.5 16v-2.5m0 15v-1.667M27.333 21H29m-15 0h2.5m9.714-4.714l.59-.59M16.196 26.304l1.178-1.178m8.25 0l1.178 1.178M16.197 15.697l1.767 1.767"
        stroke="#000"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function WorkInProgress(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={16.5} cy={16.5} r={16.5} fill="#EFEFEF" />
      <Path
        d="M17 12V9.5m0 15v-1.667M22.833 17H24.5m-15 0H12m9.714-4.714l.59-.59M11.696 22.304l1.178-1.178m8.25 0l1.178 1.178M11.697 11.697l1.767 1.767"
        stroke="#BCBCBC"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CloseIcon(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Mask
        id="a"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}>
        <Path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          fill="#fff"
          stroke="#fff"
          strokeWidth={2.66667}
          strokeLinejoin="round"
        />
        <Path
          d="M14.829 9.172l-5.657 5.656m0-5.656l5.657 5.656"
          stroke="#000"
          strokeWidth={2.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Mask>
      <G mask="url(#a)">
        <Path d="M0 0h24v24H0V0z" fill="#F97F0F" />
      </G>
    </Svg>
  );
}

export function ReviewSuccess(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={20.5} cy={20.5} r={18.5} fill="#5A2DAF" stroke="#5A2DAF" strokeWidth={4} />
      <Path
        d="M16 29.333a2.411 2.411 0 01-1.77-.729 2.411 2.411 0 01-.73-1.77v-2.5H16V12.666h12.5v14.166c0 .695-.243 1.285-.73 1.771a2.411 2.411 0 01-1.77.73H16zm10-1.666c.236 0 .434-.08.594-.24.16-.16.24-.358.24-.594v-12.5h-9.167v10h7.5v2.5c0 .236.08.434.24.595.16.16.357.24.593.239zM18.5 18.5v-1.667H26V18.5h-7.5zm0 2.5v-1.667H26V21h-7.5zM16 27.667h7.5V26h-8.333v.833c0 .236.08.434.24.595.16.16.357.24.593.239zm0 0h-.833H23.5 16z"
        fill="#fff"
      />
    </Svg>
  );
}

export function ReviewInProgress(props) {
  return (
    <Svg width={41} height={41} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Circle cx={20.5} cy={20.5} r={18.5} fill="#EFEFEF" stroke="#5A2DAF" strokeWidth={4} />
      <Path
        d="M16 29.333a2.411 2.411 0 01-1.77-.729 2.411 2.411 0 01-.73-1.77v-2.5H16V12.666h12.5v14.166c0 .695-.243 1.285-.73 1.771a2.411 2.411 0 01-1.77.73H16zm10-1.666c.236 0 .434-.08.594-.24.16-.16.24-.358.24-.594v-12.5h-9.167v10h7.5v2.5c0 .236.08.434.24.595.16.16.357.24.593.239zM18.5 18.5v-1.667H26V18.5h-7.5zm0 2.5v-1.667H26V21h-7.5zM16 27.667h7.5V26h-8.333v.833c0 .236.08.434.24.595.16.16.357.24.593.239zm0 0h-.833H23.5 16z"
        fill="#BCBCBC"
      />
    </Svg>
  );
}

export const WorkcompletedSvg = props => (
  <Svg width={41} height={41} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle cx={20.5} cy={20.5} r={18.5} fill="#5A2DAF" stroke="#5A2DAF" strokeWidth={4} />
    <G clipPath="url(#clip0_1542_6210)">
      <Path
        d="M21 11C21.918 11 22.8034 11.1172 23.6562 11.3516C24.5091 11.5859 25.3034 11.9245 26.0391 12.3672C26.7747 12.8099 27.4486 13.3307 28.0605 13.9297C28.6725 14.5286 29.1966 15.2025 29.6328 15.9512C30.069 16.6999 30.4043 17.4974 30.6387 18.3438C30.873 19.1901 30.9935 20.0755 31 21C31 21.918 30.8828 22.8034 30.6484 23.6562C30.4141 24.5091 30.0755 25.3034 29.6328 26.0391C29.1901 26.7747 28.6693 27.4486 28.0703 28.0605C27.4714 28.6725 26.7975 29.1966 26.0488 29.6328C25.3001 30.069 24.5026 30.4043 23.6562 30.6387C22.8099 30.873 21.9245 30.9935 21 31C20.082 31 19.1966 30.8828 18.3438 30.6484C17.4909 30.4141 16.6966 30.0755 15.9609 29.6328C15.2253 29.1901 14.5514 28.6693 13.9395 28.0703C13.3275 27.4714 12.8034 26.7975 12.3672 26.0488C11.931 25.3001 11.5957 24.5026 11.3613 23.6562C11.127 22.8099 11.0065 21.9245 11 21C11 20.082 11.1172 19.1966 11.3516 18.3438C11.5859 17.4909 11.9245 16.6966 12.3672 15.9609C12.8099 15.2253 13.3307 14.5514 13.9297 13.9395C14.5286 13.3275 15.2025 12.8034 15.9512 12.3672C16.6999 11.931 17.4974 11.5957 18.3438 11.3613C19.1901 11.127 20.0755 11.0065 21 11ZM26.8887 17.6895L25.5605 16.3613L19.125 22.7969L16.4395 20.1113L15.1113 21.4395L19.125 25.4531L26.8887 17.6895Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1542_6210">
        <Rect width={20} height={20} fill="white" transform="translate(11 11)" />
      </ClipPath>
    </Defs>
  </Svg>
);



export function MapIconSvg(props) {
  return (
    <Svg width={26} height={27} viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M14.7517 23.5766C17.3953 21.0592 22.0984 15.9161 22.0984 11.1965C22.0984 8.58504 21.1397 6.08058 19.4331 4.23403C17.7265 2.38748 15.4119 1.3501 12.9984 1.3501C10.585 1.3501 8.27035 2.38748 6.56377 4.23403C4.85718 6.08058 3.89844 8.58504 3.89844 11.1965C3.89844 15.9161 8.6001 21.0592 11.2452 23.5766C11.7276 24.0426 12.3517 24.3001 12.9984 24.3001C13.6451 24.3001 14.2692 24.0426 14.7517 23.5766ZM9.9651 11.1965C9.9651 10.326 10.2847 9.49116 10.8535 8.87564C11.4224 8.26013 12.1939 7.91433 12.9984 7.91433C13.8029 7.91433 14.5745 8.26013 15.1433 8.87564C15.7122 9.49116 16.0318 10.326 16.0318 11.1965C16.0318 12.0669 15.7122 12.9017 15.1433 13.5173C14.5745 14.1328 13.8029 14.4786 12.9984 14.4786C12.1939 14.4786 11.4224 14.1328 10.8535 13.5173C10.2847 12.9017 9.9651 12.0669 9.9651 11.1965Z"
        fill="#5A2DAF"
      />
    </Svg>
  );
}
