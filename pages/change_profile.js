import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, Input } from "react-native-elements";

const change_profile =()=> {
    return(
        <SafeAreaProvider>
            <ScrollView style={{
                marginLeft:5
            }}>
                <Text style={{
                    fontSize:30,
                    marginTop: 50,
                    marginLeft: 10}}>
                    マイページ編集
                </Text>
                {/* <Button
                title="編集"
                style={{
                    width: "15%",
                    marginLeft: "80%",
                    alignItems: 'flex-end',
                    marginTop: 10}}
                /> */}
                <View style={{marginLeft: "18%"}}>
                    <View style={{
                            flexDirection: "row",
                            marginTop:80
                        }}>
                            <Text style={{
                                fontSize:20,
                                marginRight:35,
                                marginLeft:15
                            }}>
                                ユーザー名
                            </Text>
                            <Input 
                                containerStyle={{}}
                                style={{
                                fontSize:20,
                            }}>
                                sample_1234
                            </Input>
                    </View>
                    <View style={{
                            flexDirection: "row",
                            marginTop:25
                        }}>
                            <Text style={{
                                fontSize:20,
                                marginRight:58,
                                marginLeft: 41
                            }}>
                                性別
                            </Text>
                            <Text style={{
                                fontSize:20,
                            }}>
                                無回答
                            </Text>
                    </View>
                    <View style={{
                            flexDirection: "row",
                            marginTop:25
                        }}>
                            <Text style={{
                                fontSize:20,
                                marginRight:15
                            }}>
                                好きなタイトル
                            </Text>
                            <Input style={{
                                fontSize:20,
                            }}>
                                BattleField
                            </Input>
                    </View>
                    <View style={{
                            flexDirection: "row",
                            marginTop:25
                        }}>
                            <Text style={{
                                fontSize:20,
                                marginRight:15
                            }}>
                                プレイスタイル
                            </Text>
                            <Input style={{
                                fontSize:20,
                            }}>
                                キルムーブ
                            </Input>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default change_profile;