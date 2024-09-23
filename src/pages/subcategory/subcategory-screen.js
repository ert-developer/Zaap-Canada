import React from 'react';
import {View, FlatList, SafeAreaView, StyleSheet, Text, ScrollView} from 'react-native';
import JobList from '../../organisms/jobList/jobList';
import {heightArea, heightToDp} from '../../responsive/responsive';
import HeaderComponent from '../../atoms/header/headerComponent';
import {Color, FontFamily, FontSize} from '../../assets/static/globalStyles';

const SubCategoryScreen = ({subCategory, handleJobPress}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent text={`${subCategory}`} />
      <ScrollView style={{backgroundColor: Color.colorWhite}}>
        {subCategory.length > 0 ? (
          <FlatList
            data={subCategory}
            renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noData}> No {subCategory} jobs to display</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: heightArea(20),
    gap: 10,
  },
  noData: {
    fontSize: FontSize.size_18,
    fontWeight: '400',
    fontFamily: FontFamily.helvetica,
    color: Color.colorSilver,
    textAlign: 'center',
  },
  noDataContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightToDp(40),
  },
});

export default SubCategoryScreen;
