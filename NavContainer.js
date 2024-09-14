import React from 'react';
import {Image, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './pages/home/home-container';
import ChatScreen from './screens/ChatScreen';
import PostJobScreen from './screens/PostJobScreen';
import NearByMeScreen from './screens/NearByMeScreen';
import MyJobScreen from './screens/MyJobScreen';
import ProfileScreen from './screens/ProfileScreen';
import CategoryList from './screens/categories';
import JobList from './screens/jobsList';
import ChatContainer from './pages/chats/chat-container';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabBarIcon = (focused, iconSource) => (
  <Image
    source={iconSource}
    style={{
      width: 20,
      height: 20,
      tintColor: focused ? '#1d8dde' : 'black',
    }}
  />
);

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => TabBarIcon(focused, require('./assets/checkbox.png')),
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatContainer}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({focused}) => TabBarIcon(focused, require('./assets/checkbox.png')),
        }}
      />
      <Tab.Screen
        name="PostJobScreen"
        component={PostJobScreen}
        options={{
          tabBarLabel: 'Post Job',
          tabBarIcon: ({focused}) => TabBarIcon(focused, require('./assets/checkbox.png')),
        }}
      />
      <Tab.Screen
        name="NearByMeScreen"
        component={NearByMeScreen}
        options={{
          tabBarLabel: 'Near Me',
          tabBarIcon: ({focused}) => TabBarIcon(focused, require('./assets/checkbox.png')),
        }}
      />

      <Tab.Screen
        name="MyJobScreen"
        component={MyJobScreen}
        options={{
          tabBarLabel: 'My Jobs',
          tabBarIcon: ({focused}) => TabBarIcon(focused, require('./assets/checkbox.png')),
        }}
      />
    </Tab.Navigator>
  );
};
const HomeScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="JobsList" component={JobList} />
    </Stack.Navigator>
  );
};

const ProfileScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfilePage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const NavContainer = () => {
  return (
    <>
      <Drawer.Navigator>
        {/* With Bottom Tab */}
        <Drawer.Screen
          name="HomeScreenStack"
          options={{
            drawerLabel: 'Home',
            title: 'Zaap',
          }}
          component={HomeScreenStack}
        />

        {/* Without Bottom Tab */}
        <Drawer.Screen
          name="ProfileScreenStack"
          options={{
            drawerLabel: 'My Profile',
            title: 'Profile',
          }}
          component={ProfileScreenStack}
        />
        {/* <Drawer.Screen
        name="CategoryList"
        options={{
          drawerLabel: 'CategoryList',
          title: 'CategoryList',
        }}
        component={CategoryList}
      />
      <Drawer.Screen
        name="JobsList"
        options={{
          drawerLabel: 'JobsList',
          title: 'JobsList',
        }}
        component={JobList}
      /> */}
      </Drawer.Navigator>
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="JobsList" component={JobList} />
    </>
  );
};

export default NavContainer;
