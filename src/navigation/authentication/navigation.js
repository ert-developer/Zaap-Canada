// navigation.js
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import PostAuthStack from './post-auth/post-auth-stack';
import PreAuthStack from './pre-auth/pre-auth-stack';

const NavigationStack = () => {
  const AuthUser = useSelector(state => state.Auth);
  const {isLogIn} = AuthUser;

  return (
    <NavigationContainer key={isLogIn ? 'post-auth' : 'pre-auth'}>
      {isLogIn ? <PostAuthStack /> : <PreAuthStack />}
    </NavigationContainer>
  );
};

export default NavigationStack;
