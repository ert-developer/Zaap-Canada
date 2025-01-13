import React, {useEffect, useRef} from 'react';
import {FlatList, SafeAreaView} from 'react-native';

import {Color} from '../../assets/static/globalStyles';
import {
  Architect,
  Cleaner,
  Construction,
  Cook,
  Drivers,
  Electrician,
  Fitness,
  InteriorDesigner,
  Mechanic,
  Packers,
  Painter,
  PetService,
  Security,
  Taxes,
  Translation,
  Tutor,
} from '../../assets/svgImage/categories';
import {
  Appliance,
  Beauty,
  Delivery,
  Entertainers,
  Events,
  Others,
  Photographers,
  Tech,
  VideoMakers,
} from '../../assets/svgImage/popularCategories';
import HeaderComponent from '../../atoms/header/headerComponent';
import CategoryAccordian from '../../organisms/categoryaccordian/categoryaccordian';
import CustomLoader from '../../organisms/customLoader';
import {heightToDp} from '../../responsive/responsive';

const CategoryList = ({categoriesData, selectedCategory, loader}) => {
  const flatListRef = useRef();

  useEffect(() => {
    if (selectedCategory && flatListRef.current) {
      const index = categoriesData.findIndex(item => item.apiName === selectedCategory);
      if (index !== -1) {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5, // Center the selected item
        });
      }
    }
  }, [selectedCategory, categoriesData]);

  const renderCategoryIcon = category => {
    switch (category) {
      case 'PACKERS & MOVERS':
        return <Packers width={30} height={30} />;
      case 'APPLIANCE REPAIR':
        return <Appliance width={30} height={30} />;
      case 'ARCHITECT':
        return <Architect width={30} height={30} />;
      case 'DRIVERS':
        return <Drivers width={30} height={30} />;
      case 'CLEANER':
        return <Cleaner width={30} height={30} />;
      case 'SECURITY GUARDS':
        return <Security width={30} height={30} />;
      case 'BEAUTY & WELLNESS':
        return <Beauty width={30} height={30} />;
      case 'VIDEO MAKERS':
        return <VideoMakers width={30} height={30} />;
      case 'ENTERTAINERS':
        return <Entertainers width={30} height={30} />;
      case 'MECHANIC':
        return <Mechanic width={30} height={30} />;
      case 'PLUMBERS':
        return <Mechanic width={30} height={30} />;
      case 'ELECTRICIAN':
        return <Electrician width={30} height={30} />;
      case 'PET SERVICES':
        return <PetService width={30} height={30} />;
      case 'COOK':
        return <Cook width={30} height={30} />;
      case 'CONSTRUCTION':
        return <Construction width={30} height={30} />;
      case 'FITNESS':
        return <Fitness width={30} height={30} />;
      case 'TUTOR':
        return <Tutor width={30} height={30} />;
      case 'TECH & DESIGN':
        return <Tech width={30} height={30} />;
      case 'TAXES':
        return <Taxes width={30} height={30} />;
      case 'INTERIOR DESIGNER':
        return <InteriorDesigner width={30} height={30} />;
      case 'PAINTER':
        return <Painter width={30} height={30} />;
      case 'EVENTS':
        return <Events width={30} height={30} />;
      case 'LANGUAGE TRANSLATION':
        return <Translation width={30} height={30} />;
      case 'PHOTOGRAPHER':
        return <Photographers width={30} height={30} />;
      case 'DELIVERY':
        return <Delivery width={30} height={30} />;
      case 'OTHER':
        return <Others width={30} height={30} />;
      default:
        return null;
    }
  };

  // Render individual category items
  const renderCategoryItem = ({item}) => {
    const sortedSubCategories = item.SubCategories.slice().sort();
    return (
      <CategoryAccordian
        categoryName={item.apiName}
        SubCategories={sortedSubCategories}
        renderCategoryIcon={renderCategoryIcon}
        selectedCategory={selectedCategory}
        category={item}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.colorWhite}}>
      <CustomLoader visible={loader} />
      <HeaderComponent text={'Choose category'} />
      <FlatList
        ref={flatListRef}
        data={categoriesData}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.apiName}
        contentContainerStyle={{paddingBottom: heightToDp(40), backgroundColor: Color.colorWhite}}
        showsVerticalScrollIndicator={false}
        initialNumToRender={categoriesData.length} // Render all initially
        onScrollToIndexFailed={info => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          }, 500);
        }}
      />
    </SafeAreaView>
  );
};

export default CategoryList;
