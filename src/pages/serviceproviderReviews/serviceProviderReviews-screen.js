import React from 'react';
import {View, SafeAreaView, ScrollView, FlatList, StyleSheet} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import HeaderComponent from '../../atoms/header/headerComponent';
import moment from 'moment';
import {Color, FontSize} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {Rating} from 'react-native-ratings';
import {EmptyPortfolioSVG} from '../../assets/svgImage/portfolio/portfolio';

const ServiceProviderReviewsScreen = ({feedbackData, firstLetter}) => {
  const renderFeedbackItem = ({item, index}) => {
    const feedbackdate = item.feedBackDate;
    const formattedDate = moment(feedbackdate).format('DD/MM/YYYY');

    return (
      <View style={styles.feedBackContainer}>
        <View style={styles.feedbackNameContainer}>
          <View style={styles.feedbackNameLogo}>
            <CustomText text={firstLetter[index]} style={styles.feedbackName} />
          </View>
          <CustomText text={item.customerName} style={styles.logoName} />
        </View>
        <View style={styles.dateAndStarsContainer}>
          <Rating
            type="star"
            ratingCount={5}
            startingValue={item.startRating}
            imageSize={15}
            readonly
            style={styles.rating}
          />
          <CustomText text={formattedDate} style={styles.dateText} />
        </View>
        <CustomText text={item.feedback} style={styles.feedBackDescription} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponent text={'Reviews'} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {feedbackData.length > 0 ? (
          <FlatList
            data={feedbackData}
            renderItem={renderFeedbackItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <EmptyPortfolioSVG style={styles.emptyProfilePortfolioSvg} />
            <CustomText text="No reviews yet" style={styles.emptyText} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollViewContent: {
    paddingVertical: heightToDp(1),
  },
  feedBackContainer: {
    marginTop: heightToDp(1.5),
    padding: heightToDp(1.5),
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: widthToDp(5),
  },
  feedBackDescription: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#555',
  },
  feedbackNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightToDp(1),
  },
  logoName: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Helvetica',
    color: '#000',
    marginLeft: widthToDp(3),
  },
  feedbackNameLogo: {
    backgroundColor: '#D9D9D9',
    height: heightToDp(6),
    width: heightToDp(6),
    borderRadius: heightToDp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackName: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Helvetica',
  },
  dateAndStarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightToDp(1),
  },
  rating: {
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#888',
  },
  flatListContent: {
    paddingBottom: heightToDp(5),
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: heightToDp(25),
  },
  emptyText: {
    color: Color.colorIndigo2,
    fontSize: FontSize.size_18,
    marginVertical: heightToDp(2),
    fontWeight: 'bold',
  },
});

export default ServiceProviderReviewsScreen;
