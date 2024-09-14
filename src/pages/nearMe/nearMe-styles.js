import {Dimensions, StyleSheet} from 'react-native';
import {Color, FontSize, Border, Padding, Margin, FontFamily} from '../../assets/static/globalStyles';
import {heightArea} from '../../responsive/responsive';

function NearMetyles() {
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 0, // Set a lower zIndex for the map
    },
    autocompleteContainer: {
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: 1,
    },
  });
  return styles;
}
export default NearMetyles;
