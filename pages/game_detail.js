import { Tile, Button, Text, ThemeProvider, Input, Icon, Slider} from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import sumgames_api from '../components/sumgames_api';


const BASE_URL="http://10.250.2.106:8000"
const game_detail = ({ navigation }) =>{
    const detail = {
        "id": "5451b171-1e0d-4c62-bcb9-08383b518b14",
        "game_name": "The Plane Effect - サラリーマン -",
        "detail": "",
        "image": "/media/images/default.png",
        "genre": [
            {
                "id": "213663d1-d974-47db-97f2-89bc3ae07acd",
                "genrename": "パズル"
            },
            {
                "id": "7daa8200-453c-427f-ab07-98ffdebbcd55",
                "genrename": "アクション"
            }
        ],
        "tags": [],
        "platform": [
            {
                "id": "bef95416-890e-4f94-aed1-89cd3b7c9565",
                "platform_name": "Switch"
            },
            {
                "id": "ece965a1-9f52-47d0-a791-3499fcf7a586",
                "platform_name": "PS5"
            }
        ]
    }
    return(
        <SafeAreaProvider>
            <ScrollView>

                <Text style={{
                    fontSize:30,
                    marginTop: 50,
                    marginLeft: 10,
                    marginBottom: 5,
                    }}>
                    ゲーム詳細
                </Text>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 40,
                }}>
                    <View>
                        <Image
                            transitionDuration={1000}
                            source={{uri: BASE_URL+detail.image}}
                            style={{ 
                                alignItems: 'flex-start',
                                width: 100, 
                                height: 100,
                                marginTop: 5,
                                marginLeft: 30
                            }}
                        />
                    </View>
                    <View>
                        <Tile
                            containerStyle={{
                                marginLeft: 30,
                                marginBottom: 5,
                            }}
                            title={detail.game_name}
                            featured
                            width={200}
                            height={200}
                        />

                        {detail.platform.map((u,i)=>{
                            return (
                                <Text key={i}>{u.platform_name}</Text>
                            )
                        })}
                    </View>
                </View>

                <Text 
                    style={{
                        fontSize: 20,
                        marginTop: 5,
                        marginLeft: 180,
                        // marginBottom: 5,
                    }}
                    >
                    割合
                </Text>

                <View style={{ flexDirection: 'row' }}>
                    <Text
                        style={{
                            fontSize: 20,
                            marginTop: 25,
                            marginLeft: 20
                        }}
                    >
                        ホスト
                    </Text>
                    <Slider
                        animationType="timing"
                        disabled
                        maximumTrackTintColor="#ccc"
                        maximumValue={100}
                        minimumTrackTintColor="#222"
                        minimumValue={0}
                        onSlidingComplete={() =>
                            console.log("onSlidingComplete()")
                        }
                        onSlidingStart={() =>
                            console.log("onSlidingStart()")
                        }
                        onValueChange={value =>
                            console.log("onValueChange()", value)
                        }
                        orientation="horizontal"
                        step={1}
                        style={{ 
                            width: "60%", 
                            height: 80, 
                            marginLeft: 5,
                            marginRight: 5
                        }}
                        thumbStyle={{ height: 20, width: 20 }}
                        thumbProps={{
                            children: (
                            <Icon
                                name="heartbeat"
                                type="font-awesome"
                                size={20}
                                reverse
                                containerStyle={{ 
                                    bottom: 20, 
                                    right: 20,
                                }}
                                color="#f50"
                            />
                            )
                        }}
                        thumbTintColor="#0c0"
                        thumbTouchSize={{ width: 40, height: 40 }}
                        trackStyle={{ height: 10, borderRadius: 20 }}
                        value={50}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            marginTop: 25
                        }}
                    >
                        ゲスト
                    </Text>
                </View>

                <Text
                    style={{
                        fontSize: 20,
                        marginTop: 25,
                        marginLeft: 110
                    }}
                >
                    どちらを選びますか？
                </Text>

                <View style={{
                    flexDirection: "row",
                    marginTop: 30,
                }}>
                    <Button title="ホスト"
                        style={{
                            justifyContent: "flex-start",
                            marginRight: 25,
                            marginLeft: "25%",
                            }}
                        onPress={() => navigation.navigate('HostForm')}
                    />
                    <Button title="ゲスト"
                        style={{
                            justifyContent: "flex-end",
                            marginLeft: 65,
                            marginLeft: "25%",
                            }}
                        onPress={() => navigation.navigate('GuestMatching')}
                    />
                </View>



            </ScrollView>
        </SafeAreaProvider>
    )
}


export default game_detail