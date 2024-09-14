import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ReadMoreText = ({ text = '' }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const wordLimit = 30;
  const words = text.split(' ');
  const truncatedText = words.slice(0, wordLimit).join(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {showFullText ? (
          text
        ) : (
          <>
            {truncatedText}
            {words.length > wordLimit && '...'}
            {words.length > wordLimit && !showFullText && (
              <Text style={styles.readMore} onPress={toggleText}>
                {' Read More'}
              </Text>
            )}
          </>
        )}
      </Text>
      {showFullText && words.length > wordLimit && (
        <TouchableOpacity onPress={toggleText}>
          <Text style={styles.readMore}>Read Less</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
  readMore: {
    color: 'blue',
    fontSize: 14,
  },
});

export default ReadMoreText;
