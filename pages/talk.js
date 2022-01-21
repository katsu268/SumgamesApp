import React, { useState, useCallback, useEffect, useRef } from 'react'
import { GiftedChat,Send } from 'react-native-gifted-chat'
import { Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { Platform,View } from 'react-native';
import AuthContext from '../components/my_context';
import {Avatar} from 'native-base';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const talk =({ route,navigation })=> {
    const { talkroom_id, user_id } = route.params;
    const { BASE_URL, get, post } = React.useContext(AuthContext);

    //Push通知関連
    // const [expoPushToken, setExpoPushToken] = useState('');
    // const [notification, setNotification] = useState(false);
    // const notificationListener = useRef();
    // const responseListener = useRef();

    //talkroomUI関連
    const [ roomInfo, setRoomInfo] = useState([]);
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

    // useEffect(() => {
    //     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    //     // This listener is fired whenever a notification is received while the app is foregrounded
    //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //         setNotification(notification);
    //     });
    
    //     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //         console.log(response);
    //     });
    
    //     return () => {
    //         Notifications.removeNotificationSubscription(notificationListener.current);
    //         Notifications.removeNotificationSubscription(responseListener.current);
    //     };
    // }, []);

    useEffect(() => {
        async function fetchTalkData() {
            const my_data = await get({url:"api/talk/"});
            for(let u of my_data){
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
                }else{
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
        }
        fetchTalkData();
    }, [])

    useEffect(() => {
        async function fetchTalkroomData() {
            const room_data = await get({url:`api/talkroom/${talkroom_id}/`});
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
                  },
            });
            setRoomInfo(room_data);
        }
        fetchTalkroomData();
    }, [])

    const onSend = useCallback((messages = []) => {
        post({url:"api/talk/",data:{
            "talktext": messages[0]["text"],
            "talkfile": null
        }});
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, [])

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
        }
    };

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
        }
    };

   

    return(
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: user_id
        }}
        placeholder="メッセージを入力"
        timeFormat='H:mm'
        dateFormat='M/D'
        renderSend={(props) => {
            return (
                <Send {...props}>
                    <Icon
                        name='send'
                        type='font-awesome'
                        color='#93c'
                        iconStyle={{paddingRight:14,paddingBottom:12}}
                    />
                </Send>
            );
        }}
        renderUsernameOnMessage={true}
        renderActions={() => {
            return (
                <View style={{flexDirection:"row"}}>
                    <Icon
                        name='camera'
                        type='evilicon'
                        color='#93c'
                        size={30}
                        iconStyle={{paddingLeft:10,paddingBottom:12}}
                        onPress={pickCamera}
                    />
                    <Icon
                        name='image'
                        type='evilicon'
                        color='#93c'
                        size={30}
                        iconStyle={{paddingBottom:12}}
                        onPress={pickImage}
                    />
                </View>
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
        />
    )
}

export default talk;
