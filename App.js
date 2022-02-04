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
import { NativeBaseProvider,HStack,Icon,Center,Pressable,Menu,Box } from 'native-base';
import { Feather } from "@expo/vector-icons";
import {SSRProvider} from '@react-aria/ssr';
import AuthContext from './components/my_context';
import * as SecureStore from 'expo-secure-store';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

//スマホ本体の安全な領域に情報を保存する{key:value}
const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
}

//画面下部のナビゲーションバーの設定
const Tab = createBottomTabNavigator();
const MyTabBar = ({ state, descriptors, navigation }) => {
  //メニュー画面を表示するかどうか
  const [menuOpen,menuOpenSet] = React.useState(false);

  //サインアウトボタン用
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
        //iconの名前
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
          //画面下部のナビゲーションバーデザイン
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
      {/* メニュー画面 */}
      <Menu
        w="160"
        isOpen={menuOpen}
        onOpen={()=>menuOpenSet(true)}
        onClose={()=>menuOpenSet(false)}
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

//画面下部のナビゲーションバー
const TopTab = () => {
  return (
    <Tab.Navigator initialRouteName="TopPage" screenOptions={{headerShown:false}} tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="TopPage" component={TopPage } options={{tabBarLabel:"Home"}} />
      <Tab.Screen name="mypage" component={mypage} tabBarLabel="Profile" />
    </Tab.Navigator>
  );
}

//スタックナビゲーション
const Stack = createStackNavigator();
const App = () => {
  //各種情報の保持
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        //ログイン済みの場合、アプリ起動時にユーザー情報の自動読み込み
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            user_token: action.user_token,
            user_id: action.user_id,
            talkroom_id: action.talkroom_id,
            isLoading: false,
          };
        //ログイン時、サインアップ時にユーザー情報の保存
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
  
  //画面読み込み時の処理
  React.useEffect(() => {
    // スマホに保存されている情報を読み込み、stateに情報を登録
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

  //他の画面でも使う関数を保持
  const authContext = React.useMemo(
    () => ({
      //サインインで使用する関数
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
      //サインアウトで使用する関数
      signOut: async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync('user_id');
        await SecureStore.deleteItemAsync('talkroom_id');
        dispatch({ type: 'SIGN_OUT' });
      },
      //ユーザー登録で使用する関数
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
          if (result.token === undefined){
            return {
              status:"error",
              message:result
            }
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
      //ベースになるURL、画像データを読み込むときに使用
      BASE_URL:state.BASE_URL.slice(0,-1),
      //サーバーにGETリクエストを飛ばす関数、引数{url:'リクエストを送るURLのディレクトリ名'} 例：{url:'api/talkroom/'}
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
      //サーバーにPOSTリクエストを飛ばす関数、引数{url:'リクエストを送るURLのディレクトリ名',data:'送るデータ'} 例：{url:'api/talkroom/',data:{example:'aaa'}}
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
      //サーバーにPATCHリクエストを飛ばす関数、引数{url:'リクエストを送るURLのディレクトリ名',data:'送るデータ'} 例：{url:'api/talkroom/',data:{example:'aaa'}}
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
      //ユーザー削除の関数
      user_delete: async () => {
        try {
          const user_token = await SecureStore.getItemAsync('token');
          const user_id = await SecureStore.getItemAsync('user_id');
          await fetch(state.BASE_URL+`accounts/user/${user_id}/`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${user_token}`
            },
          });
          await SecureStore.deleteItemAsync("token");
          await SecureStore.deleteItemAsync('user_id');
          await SecureStore.deleteItemAsync('talkroom_id');
          dispatch({ type: 'SIGN_OUT' });
        } catch (error) {
          console.log(error);
        }
      },
      //パスワードリセットの関数
      password_reset: async (data) => {
        try {
          const response = await fetch(state.BASE_URL+"accounts/user/set_password/", {
            credentials: 'include',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.data)
          });
          const result = await response.json();
          return result;
        } catch (error) {
          console.log(error);
        }
      },
      //トークルームをホストするときの関数
      host_talkroom: async (data) => {
        save("talkroom_id", data.talkroomID);
        dispatch({ type: 'JOIN_TALKROOM', talkroom_id: data.talkroomID });
      },
      //トークルームにゲストとして参加するときの関数
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
      //トークルームを退出するときの関数
      exit_talkroom: async () => {
        const user_token = await SecureStore.getItemAsync('token');
        const talkroom_id = await SecureStore.getItemAsync('talkroom_id');
        try {
          const response = await fetch(state.BASE_URL+`api/talkroom/${talkroom_id}/exit_talkroom/`,{
            credentials: 'include',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${user_token}`
            },
            body: JSON.stringify({})
          });
          const result = await response.text()
          await SecureStore.deleteItemAsync('talkroom_id');
          dispatch({ type: 'EXIT_TALKROOM' });
        } catch (error) {
          return undefined;
        }
      },
    }),
    []
  );
  //アプリ立ち上げ時に画像データをキャッシュする関数
  const cacheResourcesAsync = async() => {
    //キャッシュする画像データの読み込み
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
    ?//ローディング中
    <NativeBaseProvider>
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={console.log("ok")}
        onError={console.warn}
      />
    </NativeBaseProvider>
    ://ローディング終わったあと
    <SSRProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <Stack.Navigator>
              {/* ユーザーがログインしていないとき */}
              {state.user_token == null ? (
                <Stack.Group>
                  <Stack.Screen name="Signup" component={Signup} options={{title:"サインアップ"}}/>
                  <Stack.Screen name="Login" component={Login} options={{title:"ログイン"}}/>
                  <Stack.Screen name="PasswordReset" component={PasswordReset} options={{title:"パスワードリセット"}}/>
                </Stack.Group>
              ) : (
                // ユーザーがログインしているとき
                //トークルームに入っていないとき
                state.talkroom_id == null ? (
                  <Stack.Group>
                    <Stack.Screen name="Top" component={TopTab} options={{headerShown:false,title:"ホーム"}} />
                    <Stack.Screen name="game_detail" component={game_detail} options={{title:"ゲーム詳細"}} />
                    <Stack.Screen name="HostForm" component={HostForm} options={{title:"募集内容"}}/>
                    <Stack.Screen name="GuestMatching" component={GuestMatching} options={{title:"マッチング"}} />
                    <Stack.Screen name="Inquiry" component={Inquiry} options={{title:"お問い合わせ"}}/>
                  </Stack.Group>
                ):(
                //トークルームに入室しているとき
                  <Stack.Group>
                    <Stack.Screen name="talk" component={talk} initialParams={{ talkroom_id: state.talkroom_id, user_id: state.user_id }} options={{ 
                      title: 'トークルーム',
                      headerTitleAlign:"center",
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

export default App;