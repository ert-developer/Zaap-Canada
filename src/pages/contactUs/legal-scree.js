import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {widthToDp} from '../../responsive/responsive';
import {ScrollView} from 'react-native-gesture-handler';
import TermsAndConditions from '../termsandconditions/terms-and-conditions';
import AcceptableUsePolicy from '../termsandconditions/acceptable-use-policy';
import Disclaimer from '../termsandconditions/disclaimer';
import ContractorAgreement from '../termsandconditions/contractor-agreement';
import Enduseraggrement from '../termsandconditions/enduseraggrement';
import PrivacyPolicies from '../termsandconditions/privacy-policy';

const termsList = ['Terms and conditions', 'Privacy Policy', 'Disclaimer', 'Acceptable Use Policy'];

const termsData = {
  'Terms and conditions': <TermsAndConditions />,
  'Privacy Policy': <PrivacyPolicies />,
  Disclaimer: <Disclaimer />,
  'Acceptable Use Policy': <AcceptableUsePolicy />,
};

const LegalScreen = () => {
  const [selectedTerm, setSelectedTerm] = useState('Terms and conditions');

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => setSelectedTerm(item)}>
      <View style={[styles.item, selectedTerm === item && styles.selectedItem]}>
        <Text style={[styles.itemText, selectedTerm === item && styles.selectedItemText]}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.listContainer}> */}
      <FlatList data={termsList} renderItem={renderItem} keyExtractor={item => item} extraData={selectedTerm} />
      {/* </View> */}
      {/* <View style={styles.detailsContainer}> */}
      {selectedTerm ? (
        <View>
          <View>{termsData[selectedTerm]}</View>
        </View>
      ) : (
        <Text style={styles.detailsText}>Select a term to see the details</Text>
      )}
      {/* </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E8E9EB',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    marginBottom: 60,
    padddigBottom: 150,
    height: widthToDp(130),
    width: widthToDp(90),
  },

  item: {
    padding: 10,
    backgroundColor: '#fff',
    borderLeftWidth: 5,
    borderLeftColor: '#E8E9EB',
  },
  selectedItem: {
    borderLeftColor: 'green',
  },
  itemText: {
    fontSize: 16,
  },
  selectedItemText: {
    fontWeight: 'bold',
  },
  detailsContainer: {
    // width: '70%',
    // padding: 20,
  },
  detailsText: {
    // fontSize: 16,
  },
});

export default LegalScreen;
