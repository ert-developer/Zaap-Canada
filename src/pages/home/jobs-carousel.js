import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList, Dimensions, StyleSheet} from 'react-native';
import {Color, Margin} from '../../assets/static/globalStyles';
import JobList from '../../organisms/jobList/jobList';
import {heightToDp} from '../../responsive/responsive';

const {width} = Dimensions.get('window');

const JobCarousel = ({data, handleJobPress}) => {
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const pairs = [];
  for (let i = 0; i < data.length; i += 2) {
    pairs.push([data[i], data[i + 1]]);
  }

  const onViewRef = useRef(viewableItems => {
    if (viewableItems.viewableItems.length > 0) {
      setActiveIndex(viewableItems.viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const renderPair = ({item}) => (
    <View style={styles.pairContainer}>
      <JobList item={item[0]} handleJobPress={handleJobPress} />
      {item[1] && <JobList item={item[1]} handleJobPress={handleJobPress} />}
    </View>
  );

  const renderCircles = () => {
    return (
      <View style={styles.circleContainer}>
        {pairs.map((_, index) => (
          <View
            key={index}
            style={[styles.circle, {backgroundColor: index === activeIndex ? Color.colorIndigo2 : '#ccc'}]}
          />
        ))}
      </View>
    );
  };

  // Use below to add automatic sliding
  useEffect(() => {
    if (pairs.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % pairs.length;
        flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
        setActiveIndex(nextIndex);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval); // Clear the interval on component unmount
    }
  }, [activeIndex, pairs.length]);

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={pairs}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToAlignment="start"
        scrollEventThrottle={16}
        renderItem={renderPair}
        decelerationRate="fast"
        pagingEnabled
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      {renderCircles()}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    maxHeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pairContainer: {
    paddingVertical: 0,
    width: width * 0.9,
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: -2,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default JobCarousel;
