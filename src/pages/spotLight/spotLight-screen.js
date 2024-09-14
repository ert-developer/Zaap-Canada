import React, {useMemo} from 'react';
import SpotLightStyles from './spotLight-styles';
import {View, SafeAreaView, StatusBar, ScrollView, FlatList, Text} from 'react-native';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import CustomText from '../../atoms/text/textComponent';
import JobList from '../../organisms/jobList/jobList';
import HeaderComponent from '../../atoms/header/headerComponent';
const SpotLightScreen = ({handleJobPress, spotLigt, navigation}) => {
  const styles = useMemo(() => SpotLightStyles(), []);
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar barStyle="light-content" />
      <HeaderComponent text={'Spotlight Ads'} backgroundColor={'#EEB92B'} color={'#000'} />
      <ScrollView style={{marginTop: 10}} keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          {spotLigt.length > 0 ? (
            <FlatList
              data={spotLigt}
              renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} isSpotlight={true} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noData}>No Spotlight Ads for you to display</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpotLightScreen;
