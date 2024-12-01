import database from '@react-native-firebase/database';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, FlatList, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import CustomText from '../../../atoms/text/textComponent';
import CustomTouchableOpacity from '../../../molecules/touchable-opacity/touchable-opacity-component';
import ChatStyles from './message-styles';
import {Border, Color, Padding} from '../../../assets/static/globalStyles';
import {Camera} from '../../../assets/svgImage/chat';
import {heightToDp, widthToDp} from '../../../responsive/responsive';
import HeaderComponent from '../../../atoms/header/headerComponent';
import {getUserDetails, postCollectionDetails} from '../../../common/collection';
import {envConfig} from '../../../assets/helpers/envApi';
import moment from 'moment';
import {KeyboardAvoidingView} from 'react-native';
import {PUSH_NOTIFICATION_SERVER_URL} from '@env';

const ChatScreenExample = ({data, allChat}) => {
  const user = useSelector(state => state.Auth.user);
  const serviceProviderDetails = useSelector(state => state.providerverification.providerDetails);

  const {photoURL, imageUrl, isServiceProvider} = data;
  const styles = useMemo(() => ChatStyles(), []);
  const [messages, setMessages] = useState(allChat);
  const [newMessage, setNewMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const scrollViewRef = useRef(null);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // Scroll to the end whenever messages are updated
    flatListRef.current.scrollToEnd({animated: true});
  }, [messages]);

  useEffect(() => {
    fadeIn();
  }, []);

  useEffect(() => {
    // Scroll to the end whenever messages are updated
    scrollViewRef.current.scrollToEnd({animated: true});
  }, [messages]);

  const renderMessage = ({item}) => {
    const messageStyle = {
      opacity: fadeAnim,
      padding: 8,
      alignSelf: item.from == user.userId ? 'flex-end' : 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    };

    const renderAvatar = imageUri => {
      if (imageUri && imageUri !== '') {
        return <Image style={{width: 30, height: 30, borderRadius: 20}} source={{uri: imageUri}} />;
      } else {
        return (
          <Image
            source={require('../../../assets/default-profile.png')}
            style={{width: 30, height: 30, borderRadius: 20}}
          />
        );
      }
    };

    const formattedTime = moment(item.sendTime).format('h:mm A');
    return (
      <Animated.View style={messageStyle}>
        {item.from === user.userId && (
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                backgroundColor: item.from !== user.userId ? '#E6E6E6' : '#5A2DAF',
                padding: Padding.p_14,
                color: item.from !== user.userId ? Color.colorBlack : Color.colorWhite,
                borderRadius: Border.br_16,
                overflow: 'hidden',
                maxWidth: widthToDp(70),
              }}>
              {item.message}
            </Text>
            <Text style={{...styles.timeStamp, textAlign: 'right', marginRight: 5}}> {formattedTime}</Text>
          </View>
        )}
        {/* {item.from !== user.userId ? renderAvatar(imageUrl) : renderAvatar(photoURL)} */}
        {isServiceProvider === false || isServiceProvider === 'no'
          ? item.from !== user.userId
            ? renderAvatar(imageUrl)
            : renderAvatar(serviceProviderDetails[0].imageURL)
          : null}
        {isServiceProvider === true || isServiceProvider === undefined
          ? item.from !== user.userId
            ? renderAvatar(photoURL)
            : renderAvatar(user.imageUrl)
          : null}

        {item.from !== user.userId && (
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                backgroundColor: item.from !== user.userId ? '#E6E6E6' : '#5A2DAF',
                padding: Padding.p_14,
                color: item.from !== user.userId ? Color.colorBlack : Color.colorWhite,
                borderRadius: Border.br_16,
                overflow: 'hidden',
                maxWidth: widthToDp(70),
              }}>
              {item.message}
            </Text>
            <Text style={{...styles.timeStamp, textAlign: 'left', marginLeft: 5}}>{formattedTime}</Text>
          </View>
        )}
      </Animated.View>
    );
  };

  const keyExtractor = (item, index) => index.toString();

  const sendNotification = async messageData => {
    const userId = messageData.to;
    const recicerUser = await getUserDetails(envConfig.User, userId);
    const fcmToken = recicerUser.fcmToken;
    try {
      const response = fetch(`${PUSH_NOTIFICATION_SERVER_URL}/sendNotification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: fcmToken,
          title: 'New Message',
          message: 'You have a new message from ' + user.displayName,
        }),
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
    const data = {
      title: 'New Message',
      message: 'You have a new message from ' + user.displayName + ' in chat',
      userId: userId,
      markasread: false,
      time: new Date(),
      screen: 'Chat',
    };
    postCollectionDetails(envConfig.Notifications, data);
  };

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      roomId: data.roomId,
      message: newMessage,
      from: user.userId,
      to: data.userId,
      typeOfMessage: 'text',
      sendTime: new Date().toISOString(), // Convert date to ISO string
      markasread: false,
    };

    const newReference = database().ref(`/${envConfig.message}/${data.roomId}`).push();

    newReference.set(messageData).then(() => sendNotification(messageData));
    const updatedMessages = [...messages, {id: 1, sender: 'user', message: newMessage}];
    setMessages(updatedMessages);
    setNewMessage('');
    scrollViewRef.current.scrollToEnd({animated: true});
    fadeIn();
  };

  const renderAvatar = () => {
    if (isServiceProvider === false || isServiceProvider === 'no') {
      if (imageUrl) {
        return (
          <View style={styles.avatarContainer}>
            <Image source={{uri: imageUrl}} style={styles.avatarImage} />
          </View>
        );
      } else {
        return <Image source={require('../../../assets/default-profile.png')} style={styles.styleImage} />;
      }
    } else {
      return (
        <View style={styles.avatarContainer}>
          <Image source={{uri: photoURL}} style={styles.avatarImage} />
        </View>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={'height'}
      keyboardVerticalOffset={50} // Adjust based on your UI
    >
      <SafeAreaView style={[styles.safeArea]}>
        <StatusBar barStyle="light-content" />
        <HeaderComponent text={data.displayName} navigateToHome />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}
          contentContainerStyle={{flexGrow: 1}}
          ref={scrollViewRef}>
          <View style={styles.container}>
            <View>
              {renderAvatar()}
              <CustomText text={data.displayName} style={styles.displayName} />
            </View>
            <CustomText
              text={isServiceProvider === false || isServiceProvider === 'no' ? 'Customer' : 'Service Provider'}
              style={styles.date}
            />
            <FlatList
              ref={flatListRef}
              data={allChat}
              renderItem={renderMessage}
              keyExtractor={keyExtractor}
              onContentSizeChange={() => flatListRef.current.scrollToEnd({animated: true})}
            />

            <View style={{alignItems: 'center', paddingBottom: heightToDp(2)}}>
              {data.isDisabled ? <CustomText text={'Chat is Disabled'} style={styles.chatDisable} /> : null}
            </View>
          </View>
        </ScrollView>
        {data.isDisabled ? null : (
          <View style={styles.input}>
            <TextInput
              style={[styles.inputField, {flex: 1}]}
              placeholder="  Type a message..."
              value={newMessage}
              onChangeText={text => setNewMessage(text)}
              editable={!data.isDisabled}
              placeholderTextColor={Color.colorSilver}
              multiline
            />

            {/* Actions: Camera Icon + Send Button */}
            <View style={[styles.row, styles.camsend]}>
              <Camera />
              <CustomTouchableOpacity
                onPress={() => {
                  handleSend();
                }}>
                <CustomText text="Send" style={styles.sendButton} />
              </CustomTouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreenExample;
