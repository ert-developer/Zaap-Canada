import database from '@react-native-firebase/database';
import {logDebug} from '../../../utils/logger/logger';
import {envConfig} from '../../../assets/helpers/envApi';

export const getUserList = (userId, callback) => {
  return async dispatch => {
    try {
      database()
        .ref(`/${envConfig.users}`)
        .once('value')
        .then(snapshot => {
          const listUser = Object.values(snapshot.val());
          console.log('listUserlistUser------------------------------------------------', snapshot.val());

          callback(listUser);
          logDebug(snapshot.val());
        });
    } catch (error) {
      console.error(error);
    }
  };
};

export const addUserToChat = userData => {
  return async dispatch => {
    try {
      const reference = database()
        .ref(`/${envConfig.users}/${userData.userId}`)
        .set(userData)
        .then(response => {
          // alert("success");
        })
        .catch(error => {
          console.error(error);
          alert('error');
        });
      console.log(reference);
    } catch (error) {
      console.error(error);
    }
  };
};

export const getChatList = (id, callback) => {
  try {
    database()
      .ref(`/${envConfig.chatlist}/${id}`)
      .on('value', snapshot => {
        const data = snapshot.val();
        // Check if data is not null or undefined
        if (data != null) {
          callback(Object.values(data));
          // console.log('User data: ', data);
        } else {
          // Handle the case where data is null or undefined
          console.log('Data is null or undefined');
          // You might want to call the callback with an empty array or handle it differently
          callback([]);
        }
      });
  } catch (err) {
    console.log(err);
    callback([]);
  }
};
