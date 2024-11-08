import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList} from 'react-native';
import Collapsible from 'react-native-collapsible';
import SvgComponentClose from '../../assets/svgIcons/close/close-container';
import Opensvg from '../../assets/svgIcons/open/open-container';
import CustomText from '../../atoms/text/textComponent';
import {heightToDp} from '../../responsive/responsive';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getSubCategoryName} from '../../redux/popularcategories-more/action';
const CategoryAccordian = ({selectedCategory, categoryName, SubCategories, renderCategoryIcon}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    // Set the collapsed state based on whether the current category matches the selected category
    setCollapsed(categoryName !== selectedCategory);
  }, [selectedCategory, categoryName]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getSubCatName = subCategoryItem => {
    navigation.navigate('SubCategoryScreen');
    // Dispatch action to handle sub-category selection
    dispatch(getSubCategoryName(subCategoryItem));
  };

  const renderSubCategoryItem = ({item}) => (
    <TouchableOpacity style={styles.subCategoryItem} onPress={() => getSubCatName(item)}>
      <View style={{borderBottomWidth: 1, borderBottomColor: 'lightgray'}}>
        <Text style={styles.subCategoryText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse} style={styles.header}>
        <View style={styles.categoryAndIconCOntainer}>
          {renderCategoryIcon(categoryName)}
          <Text style={styles.categoryName}> {categoryName}</Text>
        </View>

        {collapsed ? <Opensvg /> : <SvgComponentClose />}
      </TouchableOpacity>

      <Collapsible collapsed={collapsed}>
        <ScrollView style={styles.scrollContainer}>
          <View style={{marginTop: 2}}>
            <FlatList
              data={SubCategories}
              renderItem={renderSubCategoryItem}
              keyExtractor={item => item}
              style={styles.scrollContainer}
            />
          </View>
        </ScrollView>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  subCategoryText: {
    fontSize: heightToDp(2),
    color: '#464183',
    padding: 5,
  },
  categoryAndIconCOntainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding: 10,
  },
  categoryName: {
    color: 'black',
  },
});

export default CategoryAccordian;
