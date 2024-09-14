import React, {useMemo} from 'react';
import {FlatList, ScrollView, View, SafeAreaView, StatusBar} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import JobList from '../../organisms/jobList/jobList';
import JobSearchtStyles from './searchJobs-styles';
import {BackIcon} from '../../assets/svgImage/sideDrawer';

const SearchJobs = ({filterdJobs, category, navigation, handleJobPress}) => {
  const styles = useMemo(() => JobSearchtStyles(), []);
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={[styles.row, styles.backtNtitle]}>
            <BackIcon onPress={() => navigation.navigate('HomeScreen')} />
            <CustomText style={styles.pageTitle} text={category} />
          </View>
          <FlatList
            data={filterdJobs}
            renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchJobs;
