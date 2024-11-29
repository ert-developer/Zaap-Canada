import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getChatList} from '../../../redux/chat/chatList/action';
import ChatListScreen from './chat-list-screen';
import {useNavigation} from '@react-navigation/native';

const ChatListContainer = () => {
  const providerStatus = useSelector(state => state.providerverification.providerDetails);
  const isVerified = providerStatus[0]?.isverified;

  const userDetails = useSelector(state => state.Auth.user);
  const {userId} = userDetails;
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserlist();
  }, []);

  const getUserlist = () => {
    setLoading(true);
    getChatList(
      userId,
      response => {
        setChatList(response);
        setLoading(false);
      },
      error => {
        console.log('error at loading chats', error);
        setLoading(false);
      },
    );
  };

  const handleAddUser = () => {
    navigation.navigate('ListAll');
  };

  const navigation = useNavigation();

  return <ChatListScreen userList={chatList} handleAddUser={handleAddUser} isVerified={isVerified} loading={loading} />;
};

export default ChatListContainer;
