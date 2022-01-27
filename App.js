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
import { NativeBaseProvider,HStack,Icon,Center,Pressable,Menu,Box,Button,AlertDialog, Image } from 'native-base';
import { Feather,Ionicons } from "@expo/vector-icons";
import {SSRProvider} from '@react-aria/ssr';
import AuthContext from './components/my_context';


import * as SecureStore from 'expo-secure-store';

import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
}

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const [menuOpen,menuOpenSet] = React.useState(false);
  const { signOut,user_delete } = React.useContext(AuthContext);
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
        w="160"
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
            talkroom_id: action.talkroom_id,
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
            talkroom_id: null,
          };
        case 'JOIN_TALKROOM':
          return {
            ...prevState,
            talkroom_id: action.talkroom_id,
          };
        case 'EXIT_TALKROOM':
          return {
            ...prevState,
            talkroom_id: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user_token: null,
      user_id: null,
      talkroom_id: null,
      BASE_URL: "https://sumgames.click/",
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        let userToken = await SecureStore.getItemAsync('token');
        let userID = await SecureStore.getItemAsync('user_id');
        let talkroomID = await SecureStore.getItemAsync('talkroom_id');
        dispatch({ type: 'RESTORE_TOKEN', user_token: userToken, user_id: userID, talkroom_id: talkroomID });
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
          if (result.non_field_errors !== undefined){
            return result.non_field_errors
          }
          save("token", result.token);
          save("user_id", result.user_id);
          dispatch({ type: 'SIGN_IN', user_token: result.token, user_id: result.user_id });
          return;
        } catch (error) {
          console.error(error);
          return;
        };
      },
      signOut: async () => {
        let userToken = await SecureStore.deleteItemAsync("token");
        let userID = await SecureStore.deleteItemAsync('user_id');
        let talkroomID = await SecureStore.deleteItemAsync('talkroom_id');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        try {
          const response = await fetch(state.BASE_URL+"accounts/user/", {
            credentials: 'include',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.data)
          });
          const result = await response.json();
          console.log(result);
          save("token", result.token);
          save("user_id", result.user_id);
          dispatch({ type: 'SIGN_IN', user_token: result.token, user_id: result.user_id });
          return;
        } catch (error) {
          console.error(error);
          return;
        };
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
      post: async (data) => {
        try {
          const user_token = await SecureStore.getItemAsync('token');
          const response = await fetch(state.BASE_URL+data.url, {
            credentials: 'include',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${user_token}`
            },
            body: JSON.stringify(data.data)
          });
          const result = await response.json();
          return result;
        } catch (error) {
          console.log(error);
        }
      },
      patch: async (data) => {
        try {
          const user_token = await SecureStore.getItemAsync('token');
          const response = await fetch(state.BASE_URL+data.url, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${user_token}`
            },
            body: JSON.stringify(data.data)
          });
          const result = await response.json();
          return result;
        } catch (error) {
          console.log(error);
        }
      },
      user_delete: async () => {
        try {
          const user_token = await SecureStore.getItemAsync('token');
          const user_id = await SecureStore.getItemAsync('user_id');
          const response = await fetch(state.BASE_URL+`accounts/user/${user_id}/`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${user_token}`
            },
          });
          let userToken = await SecureStore.deleteItemAsync("token");
          let userID = await SecureStore.deleteItemAsync('user_id');
          let talkroomID = await SecureStore.deleteItemAsync('talkroom_id');
          dispatch({ type: 'SIGN_OUT' });
        } catch (error) {
          console.log(error);
        }
      },
      password_reset: async (data) => {
        try {
          const user_token = await SecureStore.getItemAsync('token');
          const user_id = await SecureStore.getItemAsync('user_id');
          const response = await fetch(state.BASE_URL+`accounts/user/${user_id}/set_password/`, {
            credentials: 'include',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${user_token}`
            },
            body: JSON.stringify(data.data)
          });
          const result = await response.json();
          return result;
        } catch (error) {
          console.log(error);
        }
      },
      host_talkroom: async (data) => {
        save("talkroom_id", data.talkroomID);
        dispatch({ type: 'JOIN_TALKROOM', talkroom_id: data.talkroomID });
      },
      join_talkroom: async (data) => {
        try {
          const user_token = await SecureStore.getItemAsync('token');
          const response = await fetch(state.BASE_URL+`api/talkroom/${data.talkroomID}/join_talkroom/`, {
            credentials: 'include',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${user_token}`
            },
            body: JSON.stringify({})
          });
          const result = await response.json();
          save("talkroom_id", data.talkroomID);
          dispatch({ type: 'JOIN_TALKROOM', talkroom_id: data.talkroomID });
          return result;
        } catch (error) {
          console.log(error);
        }
      },
      
    }),
    []
  );
  const cacheResourcesAsync = async() => {
    const images = [
      require('./assets/images/20211118103410.png'),
      require('./assets/images/apex-image.jpg'),
      require('./assets/images/game01.png'),
      require('./assets/images/gamer.png'),
      require('./assets/images/monst.jpg'),
      require('./assets/gifs/loading_apex.gif'),
      require('./assets/gifs/loading_dora.gif'),
      require('./assets/gifs/loading_genshin.gif'),
      require('./assets/gifs/loading_mario.gif'),
      require('./assets/gifs/loading_pokemon.gif'),
      require('./assets/gifs/loading.gif'),
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    }); 
    return Promise.all(cacheImages);
  }

  return (
    (state.isLoading)
    ?<NativeBaseProvider>
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={console.log("ok")}
        onError={console.warn}
      />
    </NativeBaseProvider>
    :
    <SSRProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <Stack.Navigator>
              {state.user_token == null ? (
                <Stack.Group>
                  <Stack.Screen name="Signup" component={Signup} options={{title:"サインアップ"}}/>
                  <Stack.Screen name="Login" component={Login} options={{title:"ログイン"}}/>
                  <Stack.Screen name="PasswordReset" component={PasswordReset} options={{title:"パスワードリセット"}}/>
                </Stack.Group>
              ) : (
                state.talkroom_id == null ? (
                  <Stack.Group>
                    <Stack.Screen name="Top" component={TopTab} options={{headerShown:false,title:"ホーム"}} />
                    <Stack.Screen name="game_detail" component={game_detail} options={{title:"ゲーム詳細"}} />
                    <Stack.Screen name="HostForm" component={HostForm} options={{title:"募集内容"}}/>
                    <Stack.Screen name="GuestMatching" component={GuestMatching} options={{title:"マッチング"}} />
                    <Stack.Screen name="Inquiry" component={Inquiry} options={{title:"お問い合わせ"}}/>
                  </Stack.Group>
                ):(
                  <Stack.Group>
                    <Stack.Screen name="talk" component={talk} initialParams={{ talkroom_id: state.talkroom_id, user_id: state.user_id }} options={{ 
                      title: 'トークルーム',
                      headerTitleAlign:"center",
                      headerRight: ()=>{
                        const [isOpen, setIsOpen] = React.useState(false);
                        const onClose = () => setIsOpen(false);
                        const cancelRef = React.useRef(null);
                        const { post,exit_talkroom } = React.useContext(AuthContext);
                        return (
                          <Box>
                            <Button leftIcon={<Icon as={Ionicons} name="exit-outline" size="sm" />} mr="1.5" p="1.5" colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
                              退出
                            </Button>
                            <AlertDialog
                              leastDestructiveRef={cancelRef}
                              isOpen={isOpen}
                              onClose={onClose}
                            >
                              <AlertDialog.Content>
                                <AlertDialog.CloseButton />
                                <AlertDialog.Header>このトークルームから退出します。</AlertDialog.Header>
                                <AlertDialog.Body>
                                  退出すると、同じトークルームルームには参加出来ません。
                                  退出しますか？
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                  <Button.Group space={2}>
                                    <Button
                                      variant="unstyled"
                                      colorScheme="coolGray"
                                      onPress={onClose}
                                      ref={cancelRef}
                                    >
                                      キャンセル
                                    </Button>
                                    <Button colorScheme="danger" onPress={async ()=>{
                                      try {
                                        let response = await post({url:`api/talkroom/${state.talkroom_id}/exit_talkroom/`,data:{}});
                                        let talkroomID = await SecureStore.deleteItemAsync('talkroom_id');
                                        dispatch({ type: 'EXIT_TALKROOM' });
                                      } catch (error) {
                                        console.log(error);
                                      }
                                    }}>
                                      退出
                                    </Button>
                                  </Button.Group>
                                </AlertDialog.Footer>
                              </AlertDialog.Content>
                            </AlertDialog>
                          </Box>
                        );
                      },
                    }}/>
                  </Stack.Group>
                )
              )}
            </Stack.Navigator>
          </AuthContext.Provider>
        </NavigationContainer>
      </NativeBaseProvider>
    </SSRProvider>
  );
}
