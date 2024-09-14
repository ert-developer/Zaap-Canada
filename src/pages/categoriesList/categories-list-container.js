import React, {useEffect, useState} from 'react';
import CategoryList from './categories-list-screen';
import CustomLoader from '../../organisms/customLoader';
import {fetchCollectionDetails} from '../../common/collection';
import {envConfig} from '../../assets/helpers/envApi';
import firestore from '@react-native-firebase/firestore';

import {useRef} from 'react';
const CategoriesListContainer = ({navigation, route}) => {
  const [categoriesData, setCategoriesData] = useState([]);

  const {selectedCategory} = route.params;
  const scrollViewRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLaoding] = useState(false);
  const [featured, setFeatured] = useState([]);
  const toggleCategory = categoryName => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  // const sortedCategories = categories.slice().sort((a, b) => a.name.localeCompare(b.name));
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetchFreeFeatured();
    // dispatch(fetchSpotlightJobs());
  }, []);

  const fetchFreeFeatured = async () => {
    try {
      const querySnapshot = await firestore()
        .collection(envConfig.Jobs)
        // .orderBy('createdOn', 'desc')
        .where('jobAds.type', '!=', 'SPOTLIGHT')
        // .orderBy('createdOn', 'asc')
        .get();

      const fetchedJobs = [];
      querySnapshot.forEach(documentSnapshot => {
        fetchedJobs.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });

      setFeatured(fetchedJobs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    navigation.navigate('popular', {selectedCategories});
  };

  const renderPopular = category => {
    navigation.navigate('JobsList', {featured, category, navigation});
  };

  const fetchCategoriedData = async () => {
    setLoader(true);
    try {
      const snapshot = await firestore().collection(envConfig.Categories).orderBy('name').get();
      const categoryData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategoriesData(categoryData);
      setLoader(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategoriedData();
  }, []);

  return (
    <>
      <CategoryList
        toggleCategory={toggleCategory}
        selectedCategories={selectedCategories}
        setLaoding={setLaoding}
        navigation={navigation}
        handleSearch={handleSearch}
        renderPopular={renderPopular}
        categoriesData={categoriesData}
        selectedCategory={selectedCategory}
        scrollViewRef={scrollViewRef}
        loader={loader}
      />
    </>
  );
};

export default CategoriesListContainer;
