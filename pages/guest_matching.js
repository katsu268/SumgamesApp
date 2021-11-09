import * as React from "react";
import { Image, Tile, Input } from "react-native-elements";
import { View, Text, StyleSheet, ScrollView, Button, } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";


const guest_matching = () =>{
    return(
        <SafeAreaProvider>
            <ScrollView>
                <Tile
                    imageSrc={require('../assets/images/apex-image.jpg')}
                    containerStyle={{height:220}}
                />
                <Text
                    style={{fontSize:25}}
                    underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    label="募集条件"
                    labelStyle={{}}
                    labelProps={{}}
                    placeholder="募集条件"
                    justifyContent="flex-start">
                募集条件
                </Text>
                <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="ユーザー名"
                labelStyle={{}}
                labelProps={{}}
                placeholder="ユーザー名"
                />
                <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="ゲームタイトル"
                labelStyle={{}}
                labelProps={{}}
                placeholder="ゲームタイトル"
                />
                <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="募集人数"
                labelStyle={{}}
                labelProps={{}}
                placeholder="募集人数"
                />
                <View style={{ flexDirection: "row" }}>
                    <Button title="参加"/>
                    <Button title="不参加"
                            disabledInputStyle={{
                                backgroundColor: "red"
                            }}
                    />
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default guest_matching;