import SubCategoryScreen from './subcategory-screen';
import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getDocs, collection, where, query, doc} from 'firebase/firestore';
import {db} from '../../../firebaseDb';
import {useNavigation} from '@react-navigation/native';
const SubCategoryContainer = () => {
  const subcatname = useSelector(state => state.subCategory.SubCategoryName);
  const navigation = useNavigation();
  // console.log("subcatname----subcatname--",subcatname)
  const [subCategory, setSubCategory] = useState('');
  const handleSubCategoryName = async () => {
    try {
      const q = query(collection(db, 'Jobs_dev'), where('data.subCategory', 'array-contains', subcatname));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());
      data.map((item, index) => {
        item.id = querySnapshot.docs[index].id;
      });
      setSubCategory(data);
    } catch (error) {
      console.error('Error fetching Completed Jobs data:', error);
    }
  };
  useEffect(() => {
    handleSubCategoryName();
  }, [subcatname]);

  const handleJobPress = item => {
    const {
      data: {category, jobTitle, jobDescription, salary, startdate, starttime, subCategory},
      imageUrls,
      postedBy,
      locationDesc,
      jobAds,
      area,
      location,
      address,
      userName,
      id,
      createdOn,
    } = item;
    navigation.navigate('JobDeatil', {
      imageSource: imageUrls[0],
      category: category,
      title: jobTitle,
      description: jobDescription,
      price: salary,
      location: locationDesc?.description,
      postedBy: postedBy,
      id: id,
      jobAdType: jobAds.type,
      createdOn: createdOn,
      starttime: starttime,
      startdate: startdate,
      subCategory: subCategory,
      images: imageUrls,
      area: area,
      lat: location.lat,
      lng: location.lng,
      address: address,
      userName: userName,
    });
  };

  const navigationBack = () => {
    navigation.goBack();
  };
  return (
    <SubCategoryScreen subCategory={subCategory} handleJobPress={handleJobPress} navigationBack={navigationBack} />
  );
};

export default SubCategoryContainer;
