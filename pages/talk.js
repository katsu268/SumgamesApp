import { View, Text } from "react-native";
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat,Send } from 'react-native-gifted-chat'
import { Icon } from 'react-native-elements'

const talk =()=> {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([{
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ])
    }, [])
    
        const onSend = useCallback((messages = []) => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        }, [])
    return(
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: 1,
        }}
        timeFormat='H:mm'
        renderSend={(props)=>{
            return (
                <Send props>
                    <Icon
                        name='send'
                        type='font-awesome'
                        color='#f50'
                    />
                </Send>
            )
        }}
        />
    )
}

export default talk;
