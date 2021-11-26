import { Tile, Button, Text, ThemeProvider, Input, Icon, Slider} from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import sumgames_api from '../components/sumgames_api';

const BASE_URL="http://10.250.1.221:8000"
const game_detail = ({ route,navigation }) =>{
    const { detail } = route.params;
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
                            source={{
                                uri: BASE_URL+detail.image,
                              }}
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
                            caption="FOR ALL GAMERS"
                            featured
                            width={200}
                            height={200}
                        />
                    </View>
                    <View>
                        {detail.platform.map((u,i)=>{
                            return(
                            <Text>{u.platform_name}</Text>
                            );
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