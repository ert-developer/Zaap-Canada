import * as React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';
import DevelopmentScreen from '../atoms/developmentScreen/dev-screen';

const MyJobScreen = ({navigation}) => {
  return (
   <DevelopmentScreen text={"My Job Screen"} />
  );
};

export default MyJobScreen;
