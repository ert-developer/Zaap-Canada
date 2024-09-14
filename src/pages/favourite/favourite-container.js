import FavouriteScreen from './favourite-sreen';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook

const FavouritConatiner = () => {
  const favouriteItems = useSelector(state => state.favourite.favouriteItems);
  const navigation = useNavigation(); // Use useNavigation hook to get navigation prop

  const handleJobPress = job => {
    navigation.navigate('JobDeatil', job);
  };

  return <FavouriteScreen favouriteItems={favouriteItems} handleJobPress={handleJobPress} navigation={navigation} />;
};

export default FavouritConatiner;
