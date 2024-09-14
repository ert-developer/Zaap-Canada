import {SafeAreaView, FlatList} from 'react-native';
import HeaderComponent from '../../atoms/header/headerComponent';
import JobList from '../../organisms/jobList/jobList';

const NearMeJobsScreen = ({nearMeJobs, handleJobPress}) => {
  return (
    <SafeAreaView>
      <HeaderComponent text={'Near Me Jobs'} />
      <FlatList
        data={nearMeJobs}
        renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} />}
        keyExtractor={(item, index) => String(index)}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default NearMeJobsScreen;
