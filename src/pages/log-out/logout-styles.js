import {Dimensions, StyleSheet} from 'react-native';

function LogoutStyles() {
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: '#262b2f',
    },
    container: {
      height: Dimensions.get('window').height,
      backgroundColor: '#262b2f',
    },
  });
  return styles;
}

export default LogoutStyles;
