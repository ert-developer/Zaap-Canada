import React, {useEffect, useMemo, useRef} from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import CategoriesListStyles from './categories-list-styles';
import CustomLoader from '../../organisms/customLoader';
import {BackIcon} from '../../assets/svgImage/sideDrawer';
import CategoryAccordian from '../../organisms/categoryaccordian/categoryaccordian';
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
import HeaderComponent from '../../atoms/header/headerComponent';
import {Color} from '../../assets/static/globalStyles';
const CategoryList = ({categoriesData, selectedCategory, navigation, loader}) => {
  const styles = useMemo(() => CategoriesListStyles(), []);

  useEffect(() => {
    if (scrollViewRef.current && selectedCategory) {
      const index = categoriesData.findIndex(item => item.apiName === selectedCategory);
      if (index !== -1) {
        const yOffset = index * 100; // Adjust this value according to your UI needs
        scrollViewRef.current.scrollTo({y: yOffset, animated: true});
      }
    }
  }, [selectedCategory, categoriesData]);

  const scrollViewRef = useRef();

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
      // case 'BEAUTY & WELLNESS MEN':
      //   return <Beauty width={30} height={30} />;
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
      // case 'BEAUTY & WELLNESS WOMEN':
      //   return <Beauty width={30} height={30} />;
      case 'OTHER':
        return <Others width={30} height={30} />;
      default:
        return null;
    }
  };

  const renderCategories = () => {
    return categoriesData.map(item => {
      const sortedSubCategories = item.SubCategories.slice().sort();
      return (
        <CategoryAccordian
          // key={item}
          categoryName={item.apiName}
          SubCategories={sortedSubCategories}
          renderCategoryIcon={renderCategoryIcon}
          selectedCategory={selectedCategory}
          scrollViewRef={scrollViewRef}
          category={item}
          key={item.apiName}
        />
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomLoader visible={loader} />
      <HeaderComponent text={'Choose category'} />
      <ScrollView ref={scrollViewRef} style={{backgroundColor: Color.colorWhite}}>
        {renderCategories()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryList;
