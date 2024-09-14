import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import {ChatCard} from '../../../organisms/chatListCard/chatListCard';
import styles from './chat-list-styles';
import HeaderComponent from '../../../atoms/header/headerComponent';
import {ScrollView} from 'react-native';

const ChatListScreen = ({userList, loading}) => {
  return (
    <SafeAreaView>
      <HeaderComponent text={'Inbox'} />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {userList.length === 0 ? (
            <View style={styles.noChatsContainer}>
              <Text style={styles.noData}>{'No chats yet'}</Text>
            </View>
          ) : (
            <FlashList data={userList} renderItem={({item}) => <ChatCard data={item} />} estimatedItemSize={200} />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ChatListScreen;
