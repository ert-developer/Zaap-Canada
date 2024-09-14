import React from 'react';
import {View, FlatList, SafeAreaView, StyleSheet, Text, ScrollView} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import BackIcon from '../../assets/svgIcons/common';
import JobList from '../../organisms/jobList/jobList';
import {heightArea, heightToDp} from '../../responsive/responsive';
import HeaderComponent from '../../atoms/header/headerComponent';
import {Color, FontFamily, FontSize, Margin} from '../../assets/static/globalStyles';

const SubCategoryScreen = ({subCategory, handleJobPress, navigationBack}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent text={'Sub Categories'} />
      <ScrollView style={{backgroundColor: Color.colorWhite}}>
        {subCategory.length > 0 ? (
          <FlatList
            data={subCategory}
            renderItem={({item}) => <JobList item={item} handleJobPress={handleJobPress} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noData}> No jobs to display for this sub-category</Text>
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
    fontWeight: '500',
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
