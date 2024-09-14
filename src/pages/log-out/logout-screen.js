import React, {useMemo} from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../../atoms/text/textComponent';
import LogoutStyles from './logout-styles';
import CustomButton from '../../atoms/button/buttonComponent';

const LogOut = ({navigation,handleLogout}) => {
  const styles = useMemo(() => LogoutStyles(), []);
  <SafeAreaView style={styles.safeArea}>
    <StatusBar barStyle="light-content" />
    <View style={styles.container}>
      <CustomButton
        onPress={handleLogout}
        title="Logout"
        style={styles.logout}
        textStyle={styles.logoutText}
      />
    </View>
  </SafeAreaView>;
};

export default LogOut;
