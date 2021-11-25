import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat,Send } from 'react-native-gifted-chat'
import { Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { Platform,View } from 'react-native';

const talk =()=> {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([{
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 1,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
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
            allowsEditing: false,
            quality: 1
        });
        if (!result.cancelled) {
            let imageMessage = {
                _id: 2,
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
                image:result.uri
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, imageMessage));
        }
    };

    const pickCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            // presentStyle:UIImagePickerPresentationStyle.FullScreen
        });
        if (!result.cancelled) {
            let imageMessage = {
                _id: 3,
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
                image:result.uri
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, imageMessage))
        }
    };

    return(
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: 1
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
        />
    )
}

export default talk;
