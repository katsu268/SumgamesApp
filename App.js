import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
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
// import { Button, Menu, Box, useDisclose, Text } from 'native-base';

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
      <Stack.Screen name="game_detail" component={game_detail} options={{headerShown:false}}/>
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

      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
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

// import {
//   Menu,
//   HamburgerIcon,
//   Box,
//   Pressable,
//   Center,
//   NativeBaseProvider,
// } from "native-base"
// export function Example() {
//   return (
//     <Box h="80%" w="90%" alignItems="flex-start">
//       <Menu
//         w="190"
//         trigger={(triggerProps) => {
//           return (
//             <Pressable accessibilityLabel="More options menu" {...triggerProps}>
//               <HamburgerIcon />
//             </Pressable>
//           )
//         }}
//       >
//         <Menu.Item>Arial</Menu.Item>
//         <Menu.Item>Nunito Sans</Menu.Item>
//         <Menu.Item>Roboto</Menu.Item>
//         <Menu.Item>Poppins</Menu.Item>
//         <Menu.Item>SF Pro</Menu.Item>
//         <Menu.Item>Helvetica</Menu.Item>
//         <Menu.Item isDisabled>Sofia</Menu.Item>
//         <Menu.Item>Cookie</Menu.Item>
//       </Menu>
//     </Box>
//   )
// }

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown:false}}/>
      <SettingsStack.Screen name="mypage" component={mypage} options={{headerShown:false}}/>
      <SettingsStack.Screen name="Inquiry" component={Inquiry} options={{headerShown:false}}/>
    </SettingsStack.Navigator>
  )
}

function SettingsScreen({ navigation }){
  return (
    <SafeAreaProvider>
      <View style={{
          marginTop: 50
      }}>
          <Button 
              title="マイページ"
              onPress={() => navigation.navigate('mypage')}
          />

          <Button 
              title="お問い合わせ"
              onPress={() => navigation.navigate('Inquiry')}
          />
      </View>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
