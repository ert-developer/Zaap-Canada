import {RadioButton} from 'react-native-paper';

const CircleCheckbox = ({value, color}) => {
  return <RadioButton.Android value={value} color={color} />;
};

export default CircleCheckbox;
