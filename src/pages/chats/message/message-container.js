import React, {useEffect, useState} from 'react';
import ChatScreenExample from './message-screen';
import database from '@react-native-firebase/database';
import {envConfig} from '../../../assets/helpers/envApi';

const ChatContainer = props => {
  const data = props.route.params.chatDetail;

  const [allChat, setAllChat] = useState([]);

  useEffect(() => {
    const onChildAdd = database()
      .ref(`/${envConfig.message}/${data.roomId}`)
      .on('child_added', snapshot => {
        setAllChat(state => [...state, snapshot.val()]);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/${envConfig.message}/${data.roomId}`).off('child_added', onChildAdd);
  }, [data.roomId]);

  return <ChatScreenExample data={data} allChat={allChat} />;
};

export default ChatContainer;
