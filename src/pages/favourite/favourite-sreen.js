import React, {useMemo} from 'react';
import CustomText from '../../atoms/text/textComponent';
import {FlatList, SafeAreaView, ScrollView, StatusBar, View, Image, StyleSheet, Pressable} from 'react-native';
import CustomTouchableOpacity from '../../molecules/touchable-opacity/touchable-opacity-component';
import CardJobs from '../../molecules/job-card/jobCard';
import FavouriteStyles from './favourite-style';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import moment from 'moment';
import HeaderComponent from '../../atoms/header/headerComponent';
import {EmptyFavouriteSVG} from '../../assets/svgIcons/emptyfavouritesvg/empty-favourite-svg';

const FavouriteScreen = ({favouriteItems, handleJobPress, navigation}) => {
  const styles = useMemo(() => FavouriteStyles(), []);
  const renderJobList = ({item}) => {
    const truncateDescription = (text, maxLength) => {
      return text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };
    const timeAgo = moment(item.createdOn).fromNow();

    return (
      <CustomTouchableOpacity key={item?.id} onPress={() => handleJobPress(item)}>
        
        <CardJobs
          key={item?.id}
          image={item?.imageSource}
          title={item?.title}
          description={truncateDescription(item?.description, 100)}
          jobAdType={item.jobAdType}
          price={item?.price}
          item={item}
          timeAgo={timeAgo}
          category={item.category}
          location={item.location}
        />
      </CustomTouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <StatusBar barStyle="light-content" />
      <HeaderComponent text={'Favourites'} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {favouriteItems.length === 0 ? (
            <View style={styles.emptyFavouriteContainer}>
              <EmptyFavouriteSVG />
              <CustomText text="Make Items as Favorites to view here" style={styles.emptyFavouriteText} />
            </View>
          ) : (
            <FlatList
              data={favouriteItems.reverse()}
              renderItem={renderJobList}
              keyExtractor={(item, index) => String(index)}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouriteScreen;
