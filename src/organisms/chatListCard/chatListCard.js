import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Color} from '../../assets/static/globalStyles';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import CustomText from '../../atoms/text/textComponent';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {setUnreadMessages, clearUnreadMessages} from '../../redux/unreadmessages/action';
import moment from 'moment/moment';
import {envConfig} from '../../assets/helpers/envApi';

export const ChatCard = ({data}) => {
  const {displayName, photoURL, roomId, imageUrl, isServiceProvider} = data;
  const userId = useSelector(state => state.Auth.user.userId);
  const dispatch = useDispatch();
  const [unreadMessages, setUnreadMessagesState] = useState([]);
  const [lastMessageTime, setLastMessageTime] = useState(null);

  const navigation = useNavigation();

  useFocusEffect(() => {
    const checkUnreadMessages = async () => {
      const snapshot = await database().ref(`/${envConfig.message}/${roomId}`).once('value');
      const allMessages = snapshot.val();

      if (allMessages) {
        // Filter messages to only include those sent by the other user (from !== userId)
        const otherUserMessages = Object.values(allMessages).filter(message => message.from !== userId);

        if (otherUserMessages.length > 0) {
          // Sort by sendTime in descending order to get the latest message
          const latestMessage = otherUserMessages.sort((a, b) => new Date(b.sendTime) - new Date(a.sendTime))[0];

          setLastMessageTime(latestMessage.sendTime); // Store the latest message's timestamp
        }
      } else {
        console.warn('No messages found');
      }

      // Check if there are any unread messages sent by the other user
      const unreadMessages = Object.values(allMessages || {}).filter(
        message => message.markasread === false && message.from !== userId,
      );
      setUnreadMessagesState(unreadMessages);
      dispatch(setUnreadMessages(unreadMessages));
    };

    checkUnreadMessages();
  });

  const renderAvatar = () => {
    if (isServiceProvider === false || isServiceProvider === 'no') {
      if (imageUrl) {
        return (
          <View style={styles.avatarContainer}>
            <Image source={{uri: imageUrl}} style={styles.avatarImage} />
          </View>
        );
      } else {
        return <Image source={require('../../assets/default-profile.png')} style={styles.styleImage} />;
      }
    } else {
      return (
        <View style={styles.avatarContainer}>
          <Image source={{uri: photoURL}} style={styles.avatarImage} />
        </View>
      );
    }
  };

  const getLastSeenTime = () => {
    if (!lastMessageTime) return 'Last seen: --'; // Fallback
    return moment(lastMessageTime).fromNow(); // E.g., '3 minutes ago', '4 hours ago'
  };

  const handlePress = async () => {
    // Mark unread messages as read
    const snapshot = await database().ref(`/${envConfig.message}/${roomId}`).once('value');
    const allMessages = snapshot.val();

    Object.keys(allMessages || {}).forEach(async messageKey => {
      const message = allMessages[messageKey];
      if (message.markasread === false && message.from !== userId) {
        await database().ref(`/${envConfig.message}/${roomId}/${messageKey}`).update({markasread: true});
      }
    });

    // Remove the count
    setUnreadMessagesState([]);
    dispatch(clearUnreadMessages());

    // Navigate to chat screen
    navigation.navigate('OneChat', {chatDetail: data});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {renderAvatar()}
      <View style={styles.textContainer}>
        <CustomText style={styles.sender} text={displayName} />
        <CustomText style={styles.timestamp} text={getLastSeenTime()} />
      </View>
      {unreadMessages.length > 0 && (
        <View>
          <CustomText style={styles.count} text={`${unreadMessages.length}`} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: widthToDp(2),
    marginBottom: heightToDp(2),
    borderRadius: 8,
    // marginTop: heightToDp(1),
    borderColor: Color.colorSilver,
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
  avatarContainer: {
    width: widthToDp(12),
    height: widthToDp(12),
    borderRadius: widthToDp(6), // Should be half of the width and height for a perfect circle
    backgroundColor: '#5A2DAF', //
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: widthToDp(3),
    alignSelf: 'center',
  },
  styleImage: {
    width: widthToDp(12),
    height: widthToDp(12),
    borderRadius: widthToDp(6),
    // marginBottom: Margin.m_10,
    justifyContent: 'center',
    resizeMode: 'contain',
    marginRight: 10,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: widthToDp(6), // Match this to the container's radius
    resizeMode: 'cover', // Ensures the image covers the container without stretching
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Color.colorBlack,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  count: {
    fontSize: 12,
    color: '#fff',
    borderRadius: 12, // Half of width/height for a circle
    backgroundColor: Color.colorGreen,
    paddingVertical: 4,
    paddingHorizontal: 8, // Controls padding inside the count
    minWidth: 20, // Ensures a minimum width for the count
    minHeight: 20, // Ensures a minimum height for the count
    textAlign: 'center', // Centers text horizontally
    textAlignVertical: 'center', // Centers text vertically (Android)
    alignSelf: 'center', // Ensures it doesn't take full width of parent
    marginRight: 20,
    overflow: 'hidden',
  },

  redDot: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: 'red',
    marginRight: 10, // Adjust positioning as needed
    justifyContent: 'center',
  },
});
