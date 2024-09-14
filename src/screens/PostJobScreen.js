import React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';

const PostJobScreen = () => {
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
            Post Jobs
          </Text>
          <Button onPress={() => navigation.navigate('ProfileScreenStack')} title="Go to Profile Screen" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostJobScreen;
