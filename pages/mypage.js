import React, { Component, useState } from "react";
import { ScrollView, Text, View, Modal, Alert} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, colors, Input } from "react-native-elements";
// import { background } from "native-base/lib/typescript/theme/styled-system";
// import { Modal } from "react-native-paper";

const mypage =()=> {
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <SafeAreaProvider>
            <ScrollView style={{
                marginLeft:5
            }}>
                <Text style={{
                    fontSize:30,
                    marginTop: 50,
                    marginLeft: 10}}>
                    マイページ
                </Text>
                <Button
                title="編集"
                style={{
                    width: "15%",
                    marginLeft: "80%",
                    alignItems: 'flex-end',
                    marginTop: 10}}
                onPress={() => setModalVisible(true)}
                />
                <Modal
                    animationType = "slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      }}>
                <ScrollView style={{
                marginLeft:5,
                backgroundColor:"white"
                    }}>
                    <Text style={{
                        fontSize:30,
                        marginTop: 50,
                        marginLeft: 10}}>
                        マイページ編集
                    </Text>
                    <Button
                    title="保存"
                    style={{
                        width: "15%",
                        marginLeft: "80%",
                        alignItems: 'flex-end',
                        marginTop: 10}}
                    onPress={() => setModalVisible(!modalVisible)}
                    />
                    <View style={{marginLeft: "5%"}}>
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
                                // marginTop:5
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
                                marginTop:5
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
            </Modal>
                <View style={{marginLeft: "18%"}}>
                    <View style={{
                            flexDirection: "row",
                            marginTop:40
                        }}>
                            <Text style={{
                                fontSize:20,
                                marginRight:35,
                                marginLeft:15
                            }}>
                                ユーザー名
                            </Text>
                            <Text style={{
                                fontSize:20,
                            }}>
                                sample_1234
                            </Text>
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
                            <Text style={{
                                fontSize:20,
                            }}>
                                BattleField
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
                                プレイスタイル
                            </Text>
                            <Text style={{
                                fontSize:20,
                            }}>
                                キルムーブ
                            </Text>
                    </View>
                </View>
            </ScrollView>
         
        </SafeAreaProvider>
    )
}

export default mypage;