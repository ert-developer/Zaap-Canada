// PostAuthStack.js
import {createStackNavigator} from '@react-navigation/stack';

import LoginContainer from '../../../pages/login/login-container';
const Stack = createStackNavigator();

const PreAuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={LoginContainer} />
    </Stack.Navigator>
  );
};

export default PreAuthStack;
