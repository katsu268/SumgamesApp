import React from "react";
import { View } from "react-native";
import { Input, Button, Icon, Header } from "react-native-elements";
import games from './top__page'


const HostForm = () =>{
    return (
        <View>
            <Header
            backgroundImageStyle={{}}
            barStyle="default"
            centerComponent={{
            text: "SUMGAMES",
            style: { color: "#fff" }
            }}
            centerContainerStyle={{}}
            containerStyle={{ width: '100%' }}
            leftContainerStyle={{}}
            linearGradientProps={{}}
            placement="left"
            rightContainerStyle={{}}
            statusBarProps={{}}
            />

            <Input
            containerStyle={{}}
            disabledInputStyle={{ background: "#ddd" }}
            inputContainerStyle={{}}
            inputStyle={{}}
            label="Game Title"
            labelStyle={{}}
            labelProps={{}}
            leftIcon={<Icon name="person" size={20} />}
            leftIconContainerStyle={{}}
            placeholder="Game Title"
            />

            <Input
            containerStyle={{}}
            disabledInputStyle={{ background: "#ddd" }}
            inputContainerStyle={{}}
            inputStyle={{}}
            label="Counts"
            labelStyle={{}}
            labelProps={{}}
            leftIcon={<Icon name="person" size={20} />}
            leftIconContainerStyle={{}}
            placeholder="Counts"
            />
        </View>
    );
};

export default HostForm;