import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TopPage from './pages/top__page';
import Login from './pages/login';
import Signup from './pages/signup';
import PasswordReset from './pages/password_reset';
import { createStackNavigator } from '@react-navigation/stack';
import HostForm from './pages/hostform';
import GuestMatching from './pages/guest_matching';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Top" component={TopPage}  options={{headerShown:false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="SignUp" component={Signup} options={{headerShown:false}}/>
      <Stack.Screen name="PasswordReset" component={PasswordReset} options={{headerShown:false}}/>
      <Stack.Screen name="HostForm" component={HostForm} options={{headerShown:false}}/>
      <Stack.Screen name="GuestMatching" component={GuestMatching} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Top"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
      component={MyStack}
    >
      <Tab.Screen
        name="Top"
        component={MyStack}
        options={{
          tabBarLabel: 'Top',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="google-controller" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={Signup}
        options={{
          tabBarLabel: 'SignUp',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Password Reset"
        component={PasswordReset}
        options={{
          tabBarLabel: 'Password Reset',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      /> */
      /* <Tab.Screen
        name="Host Form "
        component={HostForm}
        options={{
          tabBarLabel: 'Host Form ',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="GuestMatching"
        component={GuestMatching}
        options={{
          tabBarLabel: 'GuestMatching',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
