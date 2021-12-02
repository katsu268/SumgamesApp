import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import talk from './pages/talk';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider,HStack,Icon,Center,Text,Pressable,Menu, Box } from 'native-base';
import { Feather } from "@expo/vector-icons";

import * as SecureStore from 'expo-secure-store';

const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
}

export const AuthContext = React.createContext();

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const [menuOpen,menuOpenSet] = React.useState(false);
  const { signOut } = React.useContext(AuthContext);
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
        <Menu.Item 
          onPress={()=>{
            signOut();
          }}
        >
          ログアウト
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
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            user_token: action.user_token,
            user_id: action.user_id,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            user_token: action.user_token,
            user_id: action.user_id,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            user_token: null,
            user_id: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user_token: null,
      user_id: null,
      BASE_URL: "http://10.250.2.35:8000/",
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        let userToken = await SecureStore.getItemAsync('token');
        let userID = await SecureStore.getItemAsync('user_id');
        dispatch({ type: 'RESTORE_TOKEN', user_token: userToken, user_id: userID });
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      //console.log(userToken);
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        try {
          const response = await fetch(state.BASE_URL+"accounts/api-token-auth/", {
            credentials: 'include',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {"username":`${data.username}`,"password":`${data.password}`}
            )
          });
          const result = await response.json();
          save("token", result.token);
          save("user_id", result.user_id);
          dispatch({ type: 'SIGN_IN', user_token: result.token, user_id: result.user_id });
          return;
        } catch (error) {
          console.error(error);
          return;
        };
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', user_token: 'dummy-auth-token' });
      },
      BASE_URL:state.BASE_URL.slice(0,-1),
      get: async (data) => {
        try {
          const user_token = await SecureStore.getItemAsync('token');
          const response = await fetch(state.BASE_URL+data.url, {
            credentials: 'include',
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${user_token}`
            }
          });
          const result = await response.json();
          return result;
        } catch (error) {
          console.log(error);
        }
      },
      // post: async data => {
      //   fetch(state.BASE_URL+data.url, {
      //     credentials: 'include',
      //     method: 'POST',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //       'Authorization': `Token ${state.user_token}`
      //     },
      //     body: JSON.stringify(data.data)
      //   })
      //   .then((result) => {
      //     return result;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   })
      // },
    }),
    []
  );
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator>
            {state.user_token == null ? (
              <Stack.Group>
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="PasswordReset" component={PasswordReset} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name="Top" component={TopTab} options={{headerShown:false}}/>
                <Stack.Screen name="game_detail" component={game_detail} />
                <Stack.Screen name="HostForm" component={HostForm} />
                <Stack.Screen name="GuestMatching" component={GuestMatching} />
                <Stack.Screen name="talk" component={talk} />
                <Stack.Screen name="Inquiry" component={Inquiry} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
