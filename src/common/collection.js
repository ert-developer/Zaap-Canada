import firestore from '@react-native-firebase/firestore';

// To get collection data
export const fetchCollectionDetails = async collectionName => {
  try {
    const querySnapshot = await firestore().collection(collectionName).get();
    const collectionData = [];
    querySnapshot.forEach(documentSnapshot => {
      collectionData.push({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      });
    });
    return collectionData;
  } catch (error) {
    console.error(error);
  }
};

// To save the data in a collection, With userID or without userID
export const postCollectionDetails = async (collectionName, data, userID) => {
  try {
    let response;
    if (userID) {
      response = await firestore().collection(collectionName).doc(userID).set(data);
    } else {
      response = await firestore().collection(collectionName).add(data);
    }
    return response;
  } catch (error) {
    console.error('Error adding data to Firestore:', error);
  }
};

//currently using this for update profile
export const updateCollectionDetails = async (collectionName, data, userID) => {
  try {
    let response;
    if (userID) {
      response = await firestore().collection(collectionName).doc(userID).update(data);
    } else {
      throw new Error('userID is required for updating a document.');
    }
    return response;
  } catch (error) {
    console.error('Error updating data in Firestore:', error);
  }
};

export const updateDocumentField = async (collection, docId, data) => {
  await firestore().collection(collection).doc(docId).update(data);
};
// Function to get user details based on userID
export const getUserDetails = async (collectionName, userID) => {
  try {
    const documentSnapshot = await firestore().collection(collectionName).doc(userID).get();

    if (documentSnapshot.exists) {
      // Document exists, return its data
      return {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      };
    } else {
      // Document does not exist
      console.log(`User with userID ${userID} not found.`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user details from Firestore:', error);
    throw error;
  }
};

// Function to get expiredJobs based on userID
export const getExpiredJobs = async collectionName => {
  try {
    const querySnapshot = await firestore()
      .collection(collectionName)
      // .where('candidateUserId', '==', userID)
      .where('isExpired', '==', true)
      .get();
    const expiredJobs = [];
    querySnapshot.forEach(documentSnapshot => {
      expiredJobs.push({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      });
    });
    return expiredJobs;
  } catch (error) {
    console.error('Error fetching expired jobs from Firestore:', error);
    throw error;
  }
};

export const getJobDetails = async (collectionName, jobID) => {
  try {
    const documentSnapshot = await firestore().collection(collectionName).doc(jobID).get();
    if (documentSnapshot) {
      // console.log('Found document snapshot', documentSnapshot.data());
      return {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      };
    } else {
      console.log(`Job with jobID ${jobID} not found.`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching job details from Firestore:', error);
    throw error;
  }
};

export const getJobDetailsForCompleted = async collectionName => {
  try {
    // Reference the collection
    const collectionRef = firestore().collection(collectionName);

    // Fetch all documents in the collection
    const querySnapshot = await collectionRef.get();

    // Create an array to hold the documents' data
    const documents = [];

    // Iterate over each document in the query snapshot
    querySnapshot.forEach(doc => {
      // Push the document data to the array
      documents.push({id: doc.id, ...doc.data()});
    });

    // Log the documents array for debugging purposes

    // Return the documents array
    return documents;
  } catch (error) {
    // Log an error message if fetching the documents fails
    console.error(`Error fetching documents from collection ${collectionName}:`, error);
    return [];
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    await firestore().collection(collectionName).doc(docId).delete();
  } catch (error) {
    console.error(`Error deleting document with ID ${docId} from collection ${collectionName}:`, error);
    throw error;
  }
};
