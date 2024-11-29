export const SET_UNREAD_MESSAGES = 'SET_UNREAD_MESSAGES';
export const CLEAR_UNREAD_MESSAGES = 'CLEAR_UNREAD_MESSAGES';
export const FETCH_UNREAD_MESSAGES = 'FETCH_UNREAD_MESSAGES';

import database from '@react-native-firebase/database';
import {envConfig} from '../../assets/helpers/envApi';

export const fetchUnreadMessages = userId => {
  return async dispatch => {
    try {
      const snapshot = await database().ref(`/${envConfig.chatlist}/${userId}`).once('value');
      const chatList = snapshot.val() || {};

      let unreadMessages = [];

      // Loop through each chat room to check for unread messages
      for (let key in chatList) {
        const chatRoom = chatList[key];
        const roomId = chatRoom.roomId;

        if (!roomId) {
          continue; // Skip if there's no roomId
        }

        const roomSnapshot = await database().ref(`/${envConfig.message}/${roomId}`).once('value');
        const messages = roomSnapshot.val();

        // Filter out unread messages
        const roomUnreadMessages = Object.values(messages || {}).filter(
          message => message.markasread === false && message.from !== userId,
        );

        if (roomUnreadMessages.length > 0) {
          unreadMessages = [...unreadMessages, ...roomUnreadMessages];
        }
      }

      dispatch({
        type: FETCH_UNREAD_MESSAGES,
        payload: unreadMessages,
      });
    } catch (error) {
      console.error('Error fetching unread messages:', error);
    }
  };
};

export const setUnreadMessages = messages => ({
  type: SET_UNREAD_MESSAGES,
  payload: messages,
});

export const clearUnreadMessages = () => ({
  type: CLEAR_UNREAD_MESSAGES,
});
