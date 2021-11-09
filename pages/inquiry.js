import * as React from "react";
import { Tile, Input, Text, Icon, Card, ListItem, Header, SearchBar } from "react-native-elements";
import { ScrollView, View ,Button} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

const Inquiry = () =>{
    return (
        <SafeAreaProvider>
            <ScrollView>
                <Text h1 >
                    お問い合わせ
                </Text>
                <Input
                    containerStyle={{}}
                    disabledInputStyle={{ background: "#ddd" }}
                    inputContainerStyle={{}}
                    errorMessage="Oops! that's not correct."
                    errorStyle={{}}
                    errorProps={{}}
                    inputStyle={{}}
                    label="User Form"
                    labelStyle={{}}
                    labelProps={{}}
                    leftIcon={<Icon name="person" size={20} />}
                    leftIconContainerStyle={{}}
                    rightIcon={<Icon name="close" size={20} />}
                    rightIconContainerStyle={{}}
                    placeholder="Enter Name"
                />

            </ScrollView>
        </SafeAreaProvider>
    )
}

export default Inquiry;