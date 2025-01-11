import database from '@react-native-firebase/database';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {PUSH_NOTIFICATION_SERVER_URL} from '@env';
import CustomModelComponent from '../../../atoms/model/model-component';
import ButtonIconLabelComponent from '../../../atoms/buttonIconlabel/buttonIconlabel-component';
import {CameraIcon, GalleryIcon} from '../../../assets/svgIcons/postJob';
import {uploadImage} from '../../../common/camera';
import CustomButton from '../../../atoms/button/buttonComponent';
import storage from '@react-native-firebase/storage';

const ChatScreenExample = ({data, allChat}) => {
  const user = useSelector(state => state.Auth.user);
  const serviceProviderDetails = useSelector(state => state.providerverification.providerDetails);

  const {photoURL, imageUrl, isServiceProvider} = data;
  const styles = useMemo(() => ChatStyles(), []);
  const [modalVisible, setModalVisible] = useState(false);
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
            {item.typeOfMessage === 'text' ? (
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
            ) : (
              <Image
                source={{uri: item.message}}
                style={{width: widthToDp(50), height: heightToDp(20), borderRadius: 10}}
              />
            )}

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
            {item.typeOfMessage === 'text' ? (
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
            ) : (
              <Image
                source={{uri: item.message}}
                style={{width: widthToDp(50), height: heightToDp(20), borderRadius: 10}}
              />
            )}

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

  const handleImage = sourceType => {
    uploadImage(sourceType, handleImageResponse, 1);
  };

  const [imagesLoader, setImagesLoader] = useState(false);

  const handleImageResponse = async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      try {
        setImagesLoader(true); // Start loader

        if (response.assets) {
          // Calculate the number of slots left for new images
          const remainingSlots = 1;
          const newImages = response.assets.slice(0, remainingSlots); // Limit the number of images based on remaining slots
          const imageUrls = [];

          await Promise.all(
            newImages.map(async image => {
              const storageRef = storage().ref(`${envConfig.images}/${Date.now()}-${image.fileName}`);
              await storageRef.putFile(image.uri);
              const downloadURL = await storageRef.getDownloadURL();
              imageUrls.push(downloadURL);
            }),
          );

          const messageData = {
            roomId: data.roomId,
            message: imageUrls[0],
            from: user.userId,
            to: data.userId,
            typeOfMessage: 'img',
            sendTime: new Date().toISOString(), // Convert date to ISO string
            markasread: false,
          };

          const newReference = database().ref(`/${envConfig.message}/${data.roomId}`).push();

          newReference.set(messageData).then(() => sendNotification(messageData));
          const updatedMessages = [...messages, {id: 1, sender: 'user', message: imageUrls[0]}];
          setMessages(updatedMessages);
          setNewMessage('');
          scrollViewRef.current.scrollToEnd({animated: true});
          fadeIn();
          setModalVisible(false);
        }
      } catch (error) {
        console.error('Error uploading image to Firebase:', error);
      } finally {
        setImagesLoader(false); // Stop loader after the process is done
      }
    }
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
      behavior={'padding'}
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
            <View style={styles.row}></View>
            <CustomModelComponent modalVisible={modalVisible} setModalVisible={setModalVisible}>
              <View style={styles.centeredView}>
                {imagesLoader ? (
                  <ActivityIndicator size="large" color={Color.colorIndigo2} /> // Add margin for spacing
                ) : (
                  <View style={styles.modalView}>
                    <CustomText text={'Upload Photo'} style={styles.selectPhotoTitle} />
                    <View style={styles.row}>
                      <ButtonIconLabelComponent handlePress={() => handleImage('camera')} label={'Camera'}>
                        <CameraIcon width="35px" height="35px" />
                      </ButtonIconLabelComponent>

                      <ButtonIconLabelComponent handlePress={() => handleImage('gallery')} label={'gallery'}>
                        <GalleryIcon width="35px" height="35px" />
                      </ButtonIconLabelComponent>
                    </View>
                    <CustomButton
                      title="Cancel"
                      onPress={() => setModalVisible(!modalVisible)}
                      style={styles.cancelButton}
                      textStyle={styles.cancelTextStyle}
                    />
                  </View>
                )}
              </View>
            </CustomModelComponent>
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
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={text => setNewMessage(text)}
              editable={!data.isDisabled}
              placeholderTextColor={Color.colorSilver}
              multiline
            />

            {/* Actions: Camera Icon + Send Button */}
            <View style={[styles.row, styles.camsend]}>
              <TouchableOpacity
                style={[
                  styles.addPhotoButton,
                  imagesLoader && styles.disabledButton, // Optional style when loading
                ]}
                onPress={() => !imagesLoader && setModalVisible(true)} // Disable button if loading
                disabled={false} // Disable interaction
              >
                <Camera />
              </TouchableOpacity>

              <CustomTouchableOpacity
                onPress={() => {
                  handleSend();
                }}
                style={{marginLeft: 10}} // Optional: Add spacing between Camera and Send
              >
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
