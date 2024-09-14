import CustomText from '../../atoms/text/textComponent';
import {View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import BackIcon from '../../assets/svgIcons/common';
import React, {useMemo} from 'react';
import JobList from '../../organisms/jobList/jobList';
import AllJobStyles from './alljobs-style';
const generateRandomKey = () => {
  return Math.random().toString(36).substring(7);
};
const AllJobsScreen = ({allJobs, fetchMoreJobs, loading, GoBack, handleJobPress}) => {
  const styles = useMemo(() => AllJobStyles(), []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View style={styles.backButtonContainer}>
          <BackIcon onPress={GoBack} />
          <CustomText text={'ALL JOBS'} style={styles.pageTitle} />
        </View>
        <FlatList
          data={allJobs}
          // renderItem={RenderAlljobs}
          keyExtractor={() => generateRandomKey()}
          onEndReached={fetchMoreJobs}
          renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} />}
          ListFooterComponent={loading && <ActivityIndicator size="large" color="blue" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllJobsScreen;