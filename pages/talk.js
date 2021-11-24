import React, { useState, useCallback, useEffect } from 'react'
// import { GiftedChat,Send } from 'react-native-gifted-chat'
import { Icon } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { Stack,Center } from 'native-base';

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

    const [image, setImage] = useState(null);

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1
        });
        if (!result.cancelled) {
            setImage(result.uri);
            let imageMessage = {
                _id: 2,
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
                image:image
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
                <Stack direction="row">
                    <Center size="1">
                        <Icon
                            name='send'
                            type='font-awesome'
                            color='#93c'
                            iconStyle={{paddingRight:14,paddingBottom:12}}
                            onPress={pickImage}
                        />
                    </Center>
                    <Center size="1">
                        <Icon
                            name='image'
                            type='evilicon'
                            color='#93c'
                            iconStyle={{paddingRight:14,paddingBottom:12}}
                            onPress={pickImage}
                        />
                    </Center>
                </Stack>
            )
        }}
        />
    )
}

export default talk;
