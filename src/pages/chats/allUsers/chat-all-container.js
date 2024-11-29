import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserList} from '../../../redux/chat/chatList/action';

import {generateRoomId} from '../../../utils';
import {logDebug} from '../../../utils/logger/logger';
import ChatListScreen1 from './chat-all-screen';
import {envConfig} from '../../../assets/helpers/envApi';

const ChatListContainerList = ({navigation}) => {
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const user = useSelector(state => state.Auth.user);

  useEffect(() => {
    getUserlist();
  }, []);

  const getUserlist = () => {
    dispatch(
      getUserList(user.userId, response => {
        logDebug(response);
        const filterlList = response.filter(current => current.userId != user.userId);
        logDebug(response);
        setUserList(filterlList);
      }),
    );
  };

  const inChat = data => {
    inchatScreenNavigation(data);
  };

  const inchatScreenNavigation = async data => {
    // Generate a unique room ID
    // const roomId = generateRoomId();

    const snapshot = await database().ref(`/${envConfig.chatlist}/${data.userId}/${user.userId}`).once('value');
    const roomDetails = snapshot.val();
    const roomId = roomDetails?.roomId || generateRoomId();

    // Update chatlist for the current user and the other user
    database()
      .ref(`/${envConfig.chatlist}/${data.userId}/${user.userId}`)
      .update({...user, roomId})
      .then(() => console.log('Data updated for current user'));

    database()
      .ref(`/${envConfig.chatlist}/${user.userId}/${data.userId}`)
      .update({...data, roomId})
      .then(() => console.log('Data updated for other user'));

    alert(data.displayName + ' added to chat');
  };
  const handleAddUser = () => {};

  return (
    <>
      {userList.length > 0 ? (
        <>
          <ChatListScreen1 userList={userList} navigate={inChat} handleAddUser={handleAddUser} />
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'blue'} size="large" />
        </View>
      )}
    </>
  );
};

export default ChatListContainerList;
