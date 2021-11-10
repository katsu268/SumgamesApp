import React from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, Input } from "react-native-elements";

const mypage =()=> {
    return(
        <SafeAreaProvider>
            <ScrollView>
                <Text style={{
                    fontSize:30,
                    marginTop: 50}}>
                    マイページ
                </Text>
                <Button
                title="編集"
                style={{
                    width: "15%",
                    marginLeft: "80%",
                    alignItems: 'flex-end'}}/>
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
                label="募集人数"
                labelStyle={{}}
                labelProps={{}}
                placeholder="募集人数"
                />
                <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="性別"
                labelStyle={{}}
                labelProps={{}}
                placeholder="性別"
                />
                <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="好きなタイトル"
                labelStyle={{}}
                labelProps={{}}
                placeholder="好きなタイトル"
                />
                <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="プレイスタイル"
                labelStyle={{}}
                labelProps={{}}
                placeholder="プレイスタイル"
                />
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default mypage;

// InputはTextの可能性あり