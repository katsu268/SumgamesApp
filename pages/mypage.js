import React, { Component, useState } from "react";
import { ScrollView, Text, View, Modal, Alert} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, colors, Input, ButtonGroup } from "react-native-elements";

const mypage =()=> {
    const [modalVisible, setModalVisible] = useState(false);

    const [
        selectedIndex,
        setSelectedIndex
        ] = React.useState(1);
        const [
        selectedIndexes,
        setSelectedIndexes
        ] = React.useState([]);

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
                    title="キャンセル"
                    style={{
                        width: "30%",
                        marginLeft: "65%",
                        alignItems: 'flex-end',
                        marginTop: 10}}
                    onPress={() => setModalVisible(!modalVisible)}
                    />
                    <View style={{marginLeft: "10%"}}>
                        <View style={{
                                flexDirection: "row",
                                marginTop:45
                            }}>
                                <Text style={{
                                    fontSize:20,
                                    marginRight:35,
                                    marginLeft:15
                                }}>
                                    ユーザー名
                                </Text>
                                <Input 
                                    containerStyle={{width:200}}
                                    style={{
                                    fontSize:20,
                                    width: 200
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
                                    marginRight:60,
                                    marginLeft: 41
                                }}>
                                    性別
                                </Text>
                                <ButtonGroup
                                    buttonContainerStyle={{}}
                                    buttons={["男性", "女性", "無回答"]}
                                    containerStyle={{width:180}}
                                    disabledStyle={{}}
                                    disabledTextStyle={{}}w
                                    disabledSelectedStyle={{}}
                                    disabledSelectedTextStyle={{}}
                                    innerBorderStyle={{}}
                                    onPress={selectedIdx =>
                                        setSelectedIndex(selectedIdx)
                                    }
                                    selectedButtonStyle={{}}
                                    selectedIndex={selectedIndex}
                                    selectedIndexes={selectedIndexes}
                                    selectedTextStyle={{}}
                                    textStyle={{}}
                                />
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
                                <Input 
                                    containerStyle={{width:200}}
                                    style={{
                                    fontSize:20,
                                    width:200
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
                                <Input 
                                    multiline={true}
                                    containerStyle={{width: 200}}
                                    style={{
                                    fontSize:20,
                                    width: 200,
                                }}>
                                    キルムーブ
                                </Input>
                        </View>
                        <Button
                        title="保存"
                        style={{
                            width: "15%",
                            marginLeft: "35%",
                            marginTop: 15
                        }}
                        onPress={() => setModalVisible(!modalVisible)}
                        />
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