import React, {useEffect, useState} from 'react';
import NotificationScreen from './notifications-screen';
import {fetchCollectionDetails, updateDocumentField} from '../../common/collection';
import {useSelector} from 'react-redux';
import { envConfig } from '../../assets/helpers/envApi';

const NotificationContainer = ({onNotificationCheck}) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.Auth.user);
  const userId = user.userId;

  const fetchNotifications = async () => {
    setLoading(true);
    const notifications = await fetchCollectionDetails(envConfig.Notifications);
    const userNotifications = notifications.filter(
      notification => notification.userId === userId && !notification.markasread,
    );
    const sortUserNotifications = userNotifications.sort((a, b) => b.time - a.time);
    // setNotifications(userNotifications);
    setNotifications(sortUserNotifications);
    setLoading(false);
    if (onNotificationCheck) {
      onNotificationCheck(userNotifications.length > 0);
    }
  };

  const markAsRead = async id => {
    await updateDocumentField(envConfig.Notifications, id, {markasread: true});
    fetchNotifications(); // Refresh notifications after marking as read
  };

  const markAllAsRead = async () => {
    const unreadNotificationIds = notifications.map(notification => notification.id);
    await Promise.all(
      unreadNotificationIds.map(id => updateDocumentField(envConfig.Notifications, id, {markasread: true})),
    );
    fetchNotifications(); // Refresh notifications after marking all as read
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationScreen
      notifications={notifications}
      markAsRead={markAsRead}
      markAllAsRead={markAllAsRead}
      loading={loading}
    />
  );
};

export default NotificationContainer;
