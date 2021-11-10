import * as React from "react";
import { Image, Tile, Input, Button } from "react-native-elements";
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";


const guest_matching = () =>{
    return(
        <SafeAreaProvider>
            <ScrollView>
                {/* 募集ゲームの画像 */}
                <Tile
                    imageSrc={require('../assets/images/apex-image.jpg')}
                    containerStyle={{
                        marginTop: 50,
                        height:265}}
                />
                {/* 募集条件全体 */}
                <View style={{marginLeft:5}}>
                    {/* 募集条件タイトル */}
                    <Text
                        style={{fontSize:30}}
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
                    {/* ユーザー名欄 */}
                    <View style={{
                        flexDirection: "row",
                        marginTop:10
                    }}>
                        <Text style={{
                            fontSize:20,
                            marginRight:46,
                            marginLeft:26
                        }}>
                            ユーザー名
                        </Text>
                        <Text style={{
                            fontSize:20,
                        }}>
                            sample_1234
                        </Text>
                    </View>
                    {/* ゲーム名欄 */}
                    <View style={{
                        flexDirection: "row",
                        marginTop:10
                    }}>
                        <Text style={{
                            fontSize:20,
                            marginLeft:31.5,
                            marginRight:56
                        }}>
                            ゲーム名
                        </Text>
                        <Text style={{
                            fontSize:20,
                        }}>
                            Apex Legends
                        </Text>
                    </View>
                    {/* 募集人数欄 */}
                    <View style={{
                        flexDirection: "row",
                        marginTop:10
                    }}>
                        <Text style={{
                            fontSize:20,
                            marginLeft:31.5,
                            marginRight:56
                        }}>
                            募集人数
                        </Text>
                        <Text style={{
                            fontSize:20,
                        }}>
                            2
                        </Text>
                    </View>
                    {/* 募集人数欄 */}
                    <View style={{
                        flexDirection: "row",
                        marginTop:10
                    }}>
                        <Text style={{
                            fontSize:20,
                            // marginLeft:6,
                            marginRight:20
                        }}>
                            プラットフォーム
                        </Text>
                        <Text style={{
                            fontSize:20,
                        }}>
                            PC
                        </Text>
                    </View>
                    {/* その他条件 */}
                    <View style={{
                        flexDirection: "row",
                        marginTop:10
                    }}>
                        <Text style={{
                            fontSize:20,
                            marginLeft:26,
                            marginRight:43
                        }}>
                            その他条件
                        </Text>
                        <Text style={{
                            fontSize:20,
                        }}>
                            エンジョイ勢です
                        </Text>
                    </View>
                </View>
                {/* 参加不参加ボタン */}
                <View style={{
                    flexDirection: "row",
                    marginTop:20,
                    marginLeft: "26%"}}>
                    <Button title="参加"
                            style={{
                                justifyContent: "flex-start",
                                marginRight: 35
                                }}/>
                    <Button title="不参加"
                            style={{
                                justifyContent: "flex-end",
                                marginLeft: 65,
                                }}/>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default guest_matching;