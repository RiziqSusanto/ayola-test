import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import {StackNavigationProp} from '@react-navigation/stack';
import RegisterScreen from '../screens/Register';
import OtpScreen from '../screens/Otp';
const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Otp: {email: string; password: string};
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type RegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Registration'
>;
type RegistrationScreenRouteProp = RouteProp<
  RootStackParamList,
  'Registration'
>;

type OtpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;
type OtpScreenRouteProp = RouteProp<RootStackParamList, 'Otp'>;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type {
  RootStackParamList,
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
  LoginScreenNavigationProp,
  RegistrationScreenNavigationProp,
  RegistrationScreenRouteProp,
  OtpScreenNavigationProp,
  OtpScreenRouteProp,
};

const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Registration'}>
        <Stack.Screen
          name={'Login'}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Registration'}
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Otp'}
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
