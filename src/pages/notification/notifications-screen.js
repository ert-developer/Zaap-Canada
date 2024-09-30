import React, {useState} from 'react';
import {View, ActivityIndicator, ScrollView, TouchableOpacity, Text} from 'react-native';
import CustomText from '../../atoms/text/textComponent';
import HeaderComponent from '../../atoms/header/headerComponent';
import notificationstyles from './notification-styles';
import {formatDistanceToNow} from 'date-fns';
import {heightToDp, widthToDp} from '../../responsive/responsive';
import {useNavigation} from '@react-navigation/native';

const NotificationScreen = ({notifications, markAsRead, markAllAsRead, loading}) => {
  const styles = notificationstyles();
  const navigation = useNavigation();

  const [expandedNotification, setExpandedNotification] = useState(null);

  const handleNotificationPress = notification => {
    console.log('Notification pressed:', notification);
    if (notification.screen) {
      navigation.navigate(notification.screen, notification.params || {});
    }
  };

  const toggleMessage = id => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>
          <ActivityIndicator size="large" color="#0000ff" />;
        </Text>
      </View>
    );
  }

  return (
    <>
      <HeaderComponent text="Notifications" />
      <ScrollView>
        <View>
          {notifications.length === 0 ? (
            <View style={styles.container}>
              <CustomText text="Currently no Notifications Available" style={styles.noText} />
            </View>
          ) : (
            <>
              <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
                <Text style={styles.markAllButtonText}>Mark All as Read</Text>
              </TouchableOpacity>
              {notifications.map(notification => {
                let timeAgo;
                try {
                  timeAgo = formatDistanceToNow(new Date(notification.time.seconds * 1000), {addSuffix: true});
                } catch (error) {
                  console.error('Error parsing date:', error);
                  timeAgo = 'Invalid date';
                }

                const isExpanded = expandedNotification === notification.id;
                const truncatedMessage =
                  notification.message.length > 30
                    ? `${notification.message.substring(0, 30)}...`
                    : notification.message;

                return (
                  <View key={notification.id} style={styles.notificationContainer}>
                    <TouchableOpacity key={notification.id} onPress={() => handleNotificationPress(notification)}>
                      <CustomText text={notification.title} style={styles.title} />
                      <View style={styles.messageRow}>
                        <TouchableOpacity onPress={() => toggleMessage(notification.id)}>
                          <Text style={styles.message}>{isExpanded ? notification.message : truncatedMessage}</Text>
                        </TouchableOpacity>
                        <Text style={styles.time}>{timeAgo}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => markAsRead(notification.id)} style={styles.button}>
                      <Text style={styles.buttonText}>Mark as Read</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default NotificationScreen;
