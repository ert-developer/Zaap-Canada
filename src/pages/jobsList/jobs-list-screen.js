import {FlatList, ScrollView, View, SafeAreaView, StatusBar, Text} from 'react-native';
import {useMemo} from 'react';
import JobsListStyles from './jobs-list-styles';
import CustomText from '../../atoms/text/textComponent';
import JobList from '../../organisms/jobList/jobList';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import HeaderComponent from '../../atoms/header/headerComponent';

const JobsList = ({handleJobPress, filterdJobs, navigation, cat}) => {
  const styles = useMemo(() => JobsListStyles(), []);
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar barStyle="light-content" />
      <HeaderComponent text={cat} />
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          {filterdJobs.length > 0 ? (
            <FlatList
              data={filterdJobs}
              renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} />}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noData}> No {cat.toLowerCase()} jobs to display </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobsList;
