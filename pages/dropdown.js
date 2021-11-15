import React, {useState} from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

const collapse =({navigation})=> {
    return(
        <SafeAreaProvider>
            <View style={{
                marginTop: 50
            }}>
                <Button 
                    title="マイページ"
                    onPress={() => navigation.navigate('mypage')}
                 />

                <Button 
                    title="お問い合わせ"
                    onPress={() => navigation.navigate('Inquiry')}
                 />
            </View>
        </SafeAreaProvider>
    )
}

export default collapse;