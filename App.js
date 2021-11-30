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
import { NativeBaseProvider,HStack,Icon,Center,Text,Pressable,Menu, Box } from 'native-base';
import { Feather } from "@expo/vector-icons"


const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const [menuOpen,menuOpenSet] = React.useState(false);
  return (
    <HStack alignItems="center" safeAreaBottom="8" pt="1">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const icons = ["home","user"]

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable key={index} flex="1" onPress={onPress} onLongPress={onLongPress}>
            {({ isPressed }) => {
              return (
                <Center>
                  {isFocused?(
                    <HStack bg="primary.500" pr="6" pl="6" pt="2" pb="2" style={{borderRadius:50}}>
                      <Icon
                        as={Feather}
                        name={icons[index]}
                        color="primary.50"
                        _dark={{
                          color: "warmGray.50",
                        }}
                        size="md"
                      />
                    </HStack>
                  ):(
                      <Icon
                        as={Feather}
                        name={icons[index]}
                        color="coolGray.800"
                        _dark={{
                          color: "warmGray.50",
                        }}
                        size="md"
                      />
                  )}
                </Center>
              )
            }}
          </Pressable>
        );
      })}
      <Menu
        w="190"
        isOpen={menuOpen}
        onOpen={()=>{menuOpenSet(true)}}
        onClose={()=>{menuOpenSet(false)}}
        trigger={(triggerProps) => {
          return (
            <Pressable flex="1" {...triggerProps} >
              <Center>
                {menuOpen?(
                  <Box bg="primary.500" pr="6" pl="6" pt="2" pb="2" style={{borderRadius:50}}>
                    <Icon
                      as={Feather}
                      name="menu"
                      color="primary.50"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      size="md"
                    />
                  </Box>
                ):(
                  <Icon
                    as={Feather}
                    name="menu"
                    color="coolGray.800"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    size="md"
                  />
                )}
              </Center>
            </Pressable>
          )
        }}
        placement="top right"
        mb="6"
      >
        <Menu.Item 
          onPress={()=>{
            navigation.navigate('Inquiry');
          }}
        >
          お問い合わせ
        </Menu.Item>
      </Menu>
    </HStack>
  );
}

function TopTab() {
  return (
    <Tab.Navigator initialRouteName="TopPage" screenOptions={{headerShown:false}} tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="TopPage" component={TopPage } options={{tabBarLabel:"Home"}} />
      <Tab.Screen name="mypage" component={mypage} tabBarLabel="Profile" />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Top" component={TopTab} options={{headerShown:false}}/>
          <Stack.Screen name="game_detail" component={game_detail} />
          <Stack.Screen name="HostForm" component={HostForm} />
          <Stack.Screen name="GuestMatching" component={GuestMatching} />
          <Stack.Screen name="talk" component={talk} />
          <Stack.Screen name="Inquiry" component={Inquiry} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
