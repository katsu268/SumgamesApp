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
import Inquiry from './pages/inquiry';
import mypage from './pages/mypage';
import game_detail from './pages/game_detail';
import dropdown from './pages/dropdown';
import talk from './pages/talk';

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
      <Stack.Screen name="mypage" component={mypage} options={{headerShown:false}}/>
      <Stack.Screen name="game_detail" component={game_detail} options={{headerShown:false}}/>
      <Stack.Screen name="Inquiry" component={Inquiry} options={{headerShown:false}}/>
      <Stack.Screen name="dropdown" component={dropdown} options={{headerShown:false}}/>
      <Stack.Screen name="talk" component={talk} options={{headerShown:false}}/>
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
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="talk"
        component={talk}
        options={{
          tabBarLabel: 'talk',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="message-processing-outline" color={color} size={26} />
          )
        }}
      />
      

      {/* <Tab.Screen
        name="game_detail"
        component={game_detail}
        options={{
          tabBarLabel: 'game_detail',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="google-controller" color={color} size={26} />
          ),
        }}
      /> */}


      {/* <Tab.Screen
        name="GuestMatching"
        component={GuestMatching}
        options={{
          tabBarLabel: 'GuestMatching',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="Inquiry"
        component={Inquiry}
        options={{
          tabBarLabel: 'Inquiry',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="phone" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="mypage"
        component={mypage}
        options={{
          tabBarLabel: 'mypage',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="HostForm"
        component={HostForm}
        options={{
          tabBarLabel: 'HostForm',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="dropdown"
        component={dropdown}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
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
