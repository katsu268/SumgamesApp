import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TopPage from './pages/top__page';
import Login from './pages/login';
import Signup from './pages/signup';
import PasswordReset from './pages/password_reset';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HostForm from './pages/hostform';
import GuestMatching from './pages/guest_matching';
import Inquiry from './pages/inquiry';
import mypage from './pages/mypage';
import game_detail from './pages/game_detail';
import talk from './pages/talk';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, Menu, Box, useDisclose, Text } from 'native-base';

const Tab = createBottomTabNavigator();

function TopTab() {
  return (
    <Tab.Navigator initialRouteName="TopPage" screenOptions={{headerShown:false}}>
      <Tab.Screen name="TopPage" component={TopPage } />
      <Tab.Screen name="mypage" component={mypage} />
      {/* <Tab.Screen name="Notifications" component={Notifications} /> */}
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Top" component={TopTab} options={{headerShown:false}}/>
        <Stack.Screen name="game_detail" component={game_detail} />
        <Stack.Screen name="HostForm" component={HostForm} />
        <Stack.Screen name="GuestMatching" component={GuestMatching} />
        <Stack.Screen name="talk" component={talk} />

        {/* <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
