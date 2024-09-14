import * as React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Profile Screen
          </Text>
          <Button onPress={() => navigation.navigate('HomeScreenStack')} title="Back to Home" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
