import React, {useMemo} from 'react';
import {FlatList, ScrollView, View, SafeAreaView, StatusBar} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import JobList from '../../organisms/jobList/jobList';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import MoreStyles from './moreJobs-styles';

const MoreJobs = ({navigation, catJobs, handleJobPress}) => {
  const styles = useMemo(() => MoreStyles(), []);
  return (
    <View>
      <SafeAreaView style={[styles.safeArea]}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={[styles.row, styles.backtNtitle]}>
              <BackIcon onPress={() => navigation.navigate('HomeScreen')} />
            </View>
            <FlatList
              data={catJobs}
              renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} />}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MoreJobs;
