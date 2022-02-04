import React, { useState, useCallback, useEffect, useRef,useLayoutEffect } from 'react'
import { GiftedChat,Send } from 'react-native-gifted-chat'
import Loading from "../components/loading";
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import AuthContext from '../components/my_context';
import {Avatar,Center,Button,AlertDialog,Icon,Box,IconButton,HStack,useToast} from 'native-base';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Ionicons,EvilIcons,FontAwesome,Feather } from "@expo/vector-icons";

//通知方法の設定
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

//Push通知を送信する
const sendPushNotification = async(token=[],title="hello",body="This is test",data={test:"test"},type="new_message") => {
    const message = {
      to: token,
      sound: 'default',
      title: title,
      body: body,
      data: {
        type:type,
        contents:data
      }
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
}

//自分のExpoPushTokenを取得
const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('プッシュ通知の許可をしてください！');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('プッシュ通知には物理デバイスを使用する必要があります');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
}

//トーク画面
const talk =({ route,navigation })=> {
    const toast = useToast();
    const { talkroom_id, user_id } = route.params;
    const { BASE_URL, get, post, exit_talkroom } = React.useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);

    //Push通知関連
    const [expoPushToken, setExpoPushToken] = useState([]);
    const notificationListener = useRef();
    const responseListener = useRef();

    //talkroomUI関連
    const [ user_info, setUserInfo] = useState([]);
    //メッセージの初期化
    const [messages, setMessages] = useState([
        {
            _id: 1,
            text: 'マナーを守って交流しましょう！',
            createdAt: new Date().getTime(),
            system: true
        },
        {
            _id: 0,
            text: 'トークルームを作成しました',
            createdAt: new Date().getTime(),
            system: true
        },
    ]);

    //ユーザーのアバターを生成(写真があれば写真を採用)
    const UserAvatar = (props)=>{
        return (
            (props.user_image === "")
            ?<Avatar
                bg="green.500"
                size="8"
            >
                {props.user_name.slice(0,1).toUpperCase()}
            </Avatar>
            :<Avatar
                bg="green.500"
                size="8"
                source={{
                    uri: BASE_URL+"/media/"+props.user_image,
                }}
            >
                {props.user_name.slice(0,1).toUpperCase()}
            </Avatar>
        )
    }

    //トークデータを取得
    const fetchTalkData = async () => {
        const my_data = await get({url:"api/talk/"});
        if (my_data === undefined){
            exit_talkroom()
        }
        //トークデータの初期化
        setMessages([
            {
                _id: 1,
                text: 'マナーを守って交流しましょう！',
                createdAt: new Date().getTime(),
                system: true
            },
            {
                _id: 0,
                text: 'トークルームを作成しました',
                createdAt: new Date().getTime(),
                system: true
            },
        ])
        for(let u of my_data){
            //トークデータがテキストの場合
            if (u.talkfile === null){
                setMessages(previousMessages => GiftedChat.append(previousMessages,
                    {
                        _id: u.id,
                        text: u.talktext,
                        createdAt: u.send_at,
                        user: {
                            _id: u.user.user_id,
                            name: u.user.user_name,
                            avatar: u.user.user_image,
                        },
                    })
                )
            }
            //トークデータが画像データの場合
            else{
                setMessages(previousMessages => GiftedChat.append(previousMessages,
                    {
                        _id: u.id,
                        image: BASE_URL+u.talkfile,
                        createdAt: u.send_at,
                        user: {
                            _id: u.user.user_id,
                            name: u.user.user_name,
                            avatar: u.user.user_image,
                        },
                    })
                )
            }
        };
        if(isLoading){
            setLoading(false);
        }
    }

    //トークルームデータの取得
    const fetchTalkroomData = async (my_token=null) => {
        const room_data = await get({url:`api/talkroom/${talkroom_id}/`});
        // トークルームがなかった場合退出
        if (room_data === undefined){
            exit_talkroom();
        }else{
            //ユーザーのアバターをセット
            navigation.setOptions({
                headerLeft: ()=>{
                    return (
                        <Avatar.Group size="10" max={3} ml="3">
                            {(room_data.host_user.user_image === "")
                            ?<Avatar
                                bg="green.500"
                            >
                                {room_data.host_user.user_name.slice(0,1).toUpperCase()}
                            </Avatar>
                            :<Avatar
                                bg="green.500"
                                source={{
                                    uri: BASE_URL+"/media/"+room_data.host_user.user_image,
                                }}
                            >
                                {room_data.host_user.user_name.slice(0,1).toUpperCase()}
                            </Avatar>}
                            {room_data.guest_user.map((u,i)=>{
                                return (
                                    (u.user_image === "")
                                    ?<Avatar
                                        key={i}
                                        bg="green.500"
                                    >
                                        {u.user_name.slice(0,1).toUpperCase()}
                                    </Avatar>
                                    :<Avatar
                                        key={i}
                                        bg="green.500"
                                        source={{
                                            uri: BASE_URL+"/media/"+u.user_image,
                                        }}
                                    >
                                        {u.user_name.slice(0,1).toUpperCase()}
                                    </Avatar>
                                );
                            })}
                        </Avatar.Group>
                    )
                }
            });
            // ユーザー情報のセット
            let userInfo = {};
            if (room_data.host_user.user_id === user_id){
                userInfo = {
                    _id: user_id,
                    name: room_data.host_user.user_name,
                    avatar: room_data.host_user.user_image,
                }
            }else{
                for (const user of room_data.guest_user){
                    if (user.user_id === user_id){
                        userInfo = {
                            _id: user_id,
                            name: user.user_name,
                            avatar: user.user_image,
                        }
                        break;
                    }
                }
            }
            setUserInfo(userInfo);

            //通知を送るトークルームメンバーのトークンをセット
            let expo_tokens = room_data.expo_tokens.filter((token)=>{return token!== my_token});
            setExpoPushToken(expo_tokens);
            //トークルームに初めて入室した時に通知を送信
            if (my_token!==null){
                sendPushNotification(token=expo_tokens,title="新しいユーザーが入室しました。",body="新しいメッセージがあります。",data={user_expo_token:my_token,username:userInfo.name},type="user_join");
                fetchTalkData();
            }
        }
    }
    
    const post_expo_token = async (token) => {
        await post({url:"accounts/expo-push-token/",data:{"expo_token": token}});
        fetchTalkroomData(token);
    }

    
    //画面右上退出ボタン
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
    }
    const cancelRef = useRef(null);
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>{
                //トークルームの右上に表示する退出ボタン
                return (
                  <HStack>
                    <IconButton
                        icon={<Icon as={Feather} name="phone-call" />}
                        _icon={{
                            color: "muted.400",
                            size: "sm"
                        }}
                        _hover={{
                            bg: "muted.600:alpha.20"
                        }}
                        _pressed={{
                            bg: "muted.600:alpha.20",
                            _icon: {
                            name: "phone-call"
                            },
                            _ios: {
                                _icon: {
                                    size: "sm"
                                }
                            }
                        }}
                        _ios={{
                            _icon: {
                                size: "sm"
                            }
                        }}
                        mr={2}
                    />
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
                            <Button colorScheme="danger" onPress={()=>{
                                sendPushNotification(token=expoPushToken,title="user exit",body="user exit",data={username:user_info.name},type="user_exit");
                                exit_talkroom();
                            }}>
                              退出
                            </Button>
                          </Button.Group>
                        </AlertDialog.Footer>
                      </AlertDialog.Content>
                    </AlertDialog>
                  </HStack>
                );
            },
        })
    })

    //通知の設定
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => post_expo_token(token));
        // このリスナーは、アプリがフォアグラウンドになっているときに通知を受信するたびに起動されます
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            const data = notification.request.content.data
            if (data.type === "new_message") {
                fetchTalkData();
                //setMessages(previousMessages => GiftedChat.append(previousMessages, data.contents));
            }else if (data.type === "user_join") {
                fetchTalkroomData();
                toast.show({
                    title: `${data.contents.username}が入室しました。`,
                    status: "info",
                    placement: "top"
                });
            }else if (data.type === "user_exit") {
                fetchTalkroomData();
                toast.show({
                    title: `${data.contents.username}が退出しました。`,
                    status: "info",
                    placement: "top"
                });
            }
        });
    
        // このリスナーは、ユーザーが通知をタップまたは操作するたびに起動されます（アプリがフォアグラウンド、バックグラウンド、または強制終了されたときに機能します）
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
    
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    //送信ボタンが押された時の処理
    const onSend = useCallback((messages = []) => {
        if(messages[0]["text"].length < 201){
            post({url:"api/talk/",data:{
                "talktext": messages[0]["text"],
                "talkfile": null
            }});
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        }
    }, [])

    //写真フォルダーへのアクセス許可を求める
    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('写真へのアクセスを許可してください');
            }
        }
        })();
    }, []);

    //カメラへのアクセス許可を求める
    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
            alert('カメラへのアクセスを許可してください');
            }
        }
        })();
    }, []);

    //写真を選択
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64:true,
            allowsEditing: false,
            quality: 1,
        });
        if (!result.cancelled) {
            let response = await post({url:"api/talk/",data:{
                "talktext": "",
                "talkfile": 'data:image/jpeg;base64,' + result.base64
            }});
            let imageMessage = {
                _id: response.id,
                createdAt: response.send_at,
                user: {
                    _id: response.user,
                    name: '',
                    avatar: '',
                },
                image:result.uri
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, imageMessage));
            let format_message = imageMessage;
            format_message.user = user_info;
            sendPushNotification(token=expoPushToken,title="new message",body="新しいメッセージがあります。",data=format_message);
        }
    };

    //カメラで写真を撮影
    const pickCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64:true,
            allowsEditing: false,
            quality: 1,
        });
        if (!result.cancelled) {
            let response = await post({url:"api/talk/",data:{
                "talktext": "",
                "talkfile": 'data:image/jpeg;base64,' + result.base64
            }});
            let imageMessage = {
                _id: response.id,
                createdAt: response.send_at,
                user: {
                    _id: response.user,
                    name: '',
                    avatar: '',
                },
                image:result.uri
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, imageMessage))
            let format_message = imageMessage;
            format_message.user = user_info;
            sendPushNotification(token=expoPushToken,title="new message",body="新しいメッセージがあります。",data=format_message);
        }
    };

    return(
        (isLoading)
        ?(
            <Center flex={1}>
                <Loading size={150}/>
            </Center>
        )
        :(
            <GiftedChat
            messages={messages}
            onSend={(messages) => {
                onSend(messages);
                let format_message = messages;
                format_message[0].user = user_info;
                sendPushNotification(token=expoPushToken,title="new message",body="新しいメッセージがあります。",data=format_message);
            }}
            user={{
                _id: user_id
            }}
            placeholder="メッセージを入力"
            timeFormat='H:mm'
            dateFormat='M/D'
            renderSend={(props) => {
                return (
                    <Send {...props}>
                        <Icon as={FontAwesome} name="send" color='#93c' size="sm" mb={2.5} mr={3}/>
                    </Send>
                );
            }}
            renderUsernameOnMessage={true}
            renderActions={() => {
                return (
                    <Box style={{flexDirection:"row"}}>
                        <IconButton 
                            icon={<Icon as={EvilIcons} name="camera" />}
                            _icon={{
                                color: "#93c",
                                size: "md"
                            }}
                            _hover={{
                                bg: "orange.600:alpha.20"
                            }}
                            _pressed={{
                                bg: "orange.600:alpha.20",
                                _icon: {
                                name: "camera"
                                },
                                _ios: {
                                    _icon: {
                                        size: "md"
                                    }
                                }
                            }}
                            _ios={{
                                _icon: {
                                    size: "md"
                                }
                            }}
                            onPress={pickCamera}
                            p={1}
                            ml={1}
                            mb={0.5}
                        />
                        <IconButton 
                            icon={<Icon as={EvilIcons} name="image" />}
                            _icon={{
                                color: "#93c",
                                size: "md"
                            }}
                            _hover={{
                                bg: "orange.600:alpha.20"
                            }}
                            _pressed={{
                                bg: "orange.600:alpha.20",
                                _icon: {
                                name: "image"
                                },
                                _ios: {
                                    _icon: {
                                        size: "md"
                                    }
                                }
                            }}
                            _ios={{
                                _icon: {
                                    size: "md"
                                }
                            }}
                            onPress={pickImage}
                            p={1}
                            mb={0.5}
                        />
                    </Box>
                )
            }}
            alignTop={true}
            textInputStyle={{
                backgroundColor:"#e5e5e5",
                borderRadius:20,
                overflow: 'hidden',
                marginRight:5,
                paddingLeft:10,
                paddingTop:6,
                paddingBottom:6,
                lineHeight:20,
            }}
            renderAvatar={(props)=>{
                return (
                    <UserAvatar user_name={props.currentMessage.user.name} user_image={props.currentMessage.user.avatar} />
                );
            }}
            lightboxProps={{
                springConfig:{ tension: 30, friction: 7,useNativeDriver: false }
            }}
            renderLoading={()=>{return (<Center flex="1" my="10"><Loading size={150}/></Center>)}}
            />
        )
    )
}

export default talk;
