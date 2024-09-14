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
          {/* <View style={[styles.row, styles.backtNtitle]}>
            <BackIcon onPress={() => navigation.navigate('HomeScreen')} />
            <View style={styles.row}>
              {cat ? (
                <CustomText style={styles.pageTitle} text={cat} />
              ) : (
                <CustomText style={styles.pageTitle} text="SEARCHED JOBS" />
              )}
            </View>
          </View> */}
          {/* {catJobs && (
            <FlatList
              data={catJobs}
              renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} />}
              keyExtractor={item => item.id}
            />
          )} */}
          {/* {cat === 'BEAUTY & WELLNESS' && (
            <FlatList
              data={sortedBeauty}
              renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} />}
              keyExtractor={item => item.id}
            />
          )} */}
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
