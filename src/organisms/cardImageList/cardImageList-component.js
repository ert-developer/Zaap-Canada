import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import CardJobs from '../../molecules/job-card/jobCard'; // Ensure the path is correct

const CardImageListComponent = ({formData, jobPostScreen}) => {
  const handleJobPostScreenClick = () => {
    if (jobPostScreen) {
      jobPostScreen();
    }
  };

  const image =
    formData.images.length > 0
      ? {uri: formData.images[0]}
      : {uri: 'https://res.cloudinary.com/dbtmnaluh/image/upload/v1720422769/Default_image_qkg5fw.jpg'};

  return (
    <Pressable onPress={handleJobPostScreenClick}>
      <View style={styles.cardList}>
        <CardJobs
          image={image.uri}
          title={formData.jobTitle}
          description={formData.description}
          price={formData.salary}
          jobAdType={formData.advertisement.type}
          timeAgo={formData.startdate}
          category={formData.categories}
          location={formData.location.description}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardList: {
    marginVertical: 5,
  },
});

export default CardImageListComponent;
