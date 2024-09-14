import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import BackHeader from '../../../organisms/backheader/back-header';
import {ChatCard} from '../../../organisms/chatListCard/chatListCard';
import styles from '../addedUsers/chat-list-styles';
import {CameraIcon} from '../../../assets/svgIcons/postJob';

const ChatListScreen1 = ({userList, navigate, handleAddUser}) => {
  return (
    <View style={styles.container}>
      <BackHeader text={'Chat'} backIcon={false} />
      <View style={{flex: 1}}>
        <FlashList
          data={userList}
          renderItem={({item}) => <ChatCard data={item} navigate={navigate} />}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
};

export default ChatListScreen1;
