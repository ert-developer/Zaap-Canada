import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList, Dimensions, Image, StyleSheet} from 'react-native';
import {Color, Margin} from '../../assets/static/globalStyles';
import {widthToDp} from '../../responsive/responsive';
import {Banner1, Banner2, Banner3, Banner4, Banner5} from '../../assets/svgImage/homeBanner/prev.js';

// Import PNG images
// const Banner1 = require('../../assets/svgImage/homeBanner/Banner1.png');
// const Banner2 = require('../../assets/svgImage/homeBanner/Banner2.png');
// const Banner3 = require('../../assets/svgImage/homeBanner/Banner3.png');
// const Banner4 = require('../../assets/svgImage/homeBanner/Banner4.png');
// const Banner5 = require('../../assets/svgImage/homeBanner/Banner5.png');

const {width} = Dimensions.get('window');

const Carousel = () => {
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useRef(viewableItems => {
    if (viewableItems.viewableItems.length > 0) {
      setActiveIndex(viewableItems.viewableItems[0].index);
    }
  });

  const data = [Banner1, Banner2, Banner3, Banner4, Banner5];

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const renderBanner = ({item: BannerComponent}) => <BannerComponent style={styles.bannerComponent} />;

  // const renderBanner = ({item}) => {
  //   return <Image source={item} style={styles.bannerComponent} />;
  // };

  const renderCircles = () => {
    return (
      <View style={styles.circleContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.circle, {backgroundColor: index === activeIndex ? Color.colorIndigo2 : '#ccc'}]}
          />
        ))}
      </View>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length > 0) {
        const nextIndex = (activeIndex + 1) % data.length;
        flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
        setActiveIndex(nextIndex);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [activeIndex, data.length]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToAlignment="start"
        scrollEventThrottle={16}
        renderItem={renderBanner}
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
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 5,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  bannerComponent: {
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 5,
    width: widthToDp(85),
    height: 160, // Adjust height as needed
    resizeMode: 'center',
    // backgroundColor: 'red',
  },
});

export default Carousel;
