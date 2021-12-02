import React, { useState } from "react";
import { ScrollView, Text, View, Modal, Alert, TextInput} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import { Radio, NativeBaseProvider, Avatar } from "native-base";
import { flex, flexDirection } from "styled-system";

const mypage =()=> {
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = React.useState(true);
    const [myData, setmyData] = React.useState([]);
    // React.useEffect(() => {
    //   sumgames_api("accounts/user/")
    //   .then((user_data) => setmyData(user_data));
    // }, []);

    const gender_list = {
        "MA":"男性",
        "FE":"女性",
        "EX":"その他"
    }

    const [username, setUsername] = React.useState(myData.username);
    const [firstname, setFirstname] = React.useState(myData.firstname);
    const [lastname, setLastname] = React.useState(myData.lastname);
    const [gender, setGender] = React.useState(myData.gender);
    const [email, setEmail] = React.useState(myData.email);
    const [introduction, setIntroduction] = React.useState(myData.introduction);

    const [Inputheigt, setInputheight] = React.useState(0);

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
                buttonStyle={{width:80}}
                style={{
                    width: 120,
                    marginLeft: "65%",
                    alignItems: 'flex-end',
                    marginTop: 10}}
                onPress={() => {
                        setModalVisible(true);
                        setUsername(myData.username);
                        setFirstname(myData.firstname);
                        setLastname(myData.lastname);
                        setGender(myData.gender);
                        setEmail(myData.email);
                        setIntroduction(myData.introduction);
                    }
                }
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
                        buttonStyle={{width:100}}
                        style={{
                            width: 100,
                            marginLeft: "70%",
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
                                        marginRight:45,
                                        marginLeft:15
                                    }}>
                                        ユーザー名
                                    </Text>
                                    <TextInput
                                        value={username}
                                        containerStyle={{width:200}}
                                        style={{
                                        fontSize:20,
                                        width: 180,
                                        borderBottomWidth: 1,
                                        }}
                                        onChangeText={(value) => {setUsername(()=>{return username===value})}}
                                    />
                            </View>
                            <View style={{
                                flexDirection: "row",
                                marginTop:25
                            }}>
                                <Text style={{
                                    fontSize:20,
                                    marginRight:50,
                                    marginLeft: 15
                                }}>
                                    first name
                                </Text>
                                <TextInput
                                    value={firstname}
                                    style={{
                                    fontSize:20,
                                    width: 180,
                                    borderBottomWidth: 1,
                                    }}
                                    onChangeText={(value) => {setFirstname(()=>{return firstname===value})}}
                                />
                            </View>
                            <View style={{
                                flexDirection: "row",
                                marginTop:25
                            }}>
                                <Text style={{
                                    fontSize:20,
                                    marginRight:50,
                                    marginLeft: 16
                                }}>
                                    last name
                                </Text>
                                <TextInput
                                    value={lastname}
                                    style={{
                                        fontSize:20,
                                        width: 180,
                                        borderBottomWidth:1,
                                    }}
                                    onChangeText={(value) => {setLastname(()=>{return lastname===value})}}
                                />
                            </View>
                            <View style={{
                                    flexDirection: "row",
                                    marginTop:25
                                }}>
                                    <Text style={{
                                        fontSize:20,
                                        marginRight:60,
                                        marginLeft: 41,
                                        marginTop: 10
                                    }}>
                                        性別
                                    </Text>
                                    <NativeBaseProvider>
                                        <Radio.Group
                                            name="myRadioGroup"
                                            accessibilityLabel="gender"
                                            value={gender}
                                            onChange={(value) => {
                                                setGender(value)
                                            }}
                                            style={{flexDirection:"row"}}
                                            >
                                            <Radio value="MA" my={1} style={{marginRight:5}}>
                                                男性
                                            </Radio>
                                            <Radio value="FE" my={1} style={{marginRight:5}}>
                                                女性
                                            </Radio>
                                            <Radio value="EX" my={1}>
                                                無回答
                                            </Radio>
                                        </Radio.Group>
                                    </NativeBaseProvider>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                marginTop:20
                            }}>
                                <Text style={{
                                    fontSize:20,
                                    marginRight:25
                                }}>
                                    メールアドレス
                                </Text>
                                <TextInput
                                    value={email}
                                    style={{
                                    fontSize:20,
                                    borderBottomWidth: 1,
                                    width:180,
                                    }}
                                    onChangeText={(value) => {setEmail(()=>{return email===value})}}
                                />
                            </View>
                            <View style={{
                                flexDirection: "row",
                                marginTop:25
                            }}>
                                <Text style={{
                                    fontSize:20,
                                    marginRight:50,
                                    marginLeft: 25
                                }}>
                                    自己紹介
                                </Text>
                                <TextInput
                                    value={introduction}
                                    multiline={true}
                                    onContentSizeChange={(event) => {
                                        if(event.nativeEvent.contentSize.height <= 300) {
                                            setInputheight(event.nativeEvent.contentSize.height);
                                        } else {
                                            setInputheight(300);
                                        }
                                    }}
                                    style={{
                                        fontSize:20,
                                        borderBottomWidth:1,
                                        width:190
                                        }}
                                    onChangeText={(value) => {setIntroduction(()=>{return introduction===value})}}
                                />
                            </View>
                            <Button
                                title="保存"
                                style={{
                                    width: 80,
                                    marginLeft: "35%",
                                    marginTop: 35
                                }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);

                                }}
                            />
                        </View>
                    </ScrollView>
                </Modal>
                <NativeBaseProvider>
                    <Avatar
                        value={myData.image}
                    />
                </NativeBaseProvider>
                <View style={{marginLeft: 15}}>
                    <View style={{
                            marginTop:40
                        }}>
                            <Text style={{
                                fontSize:20,
                                marginRight:35,
                                fontSize:15
                            }}>
                                user name
                            </Text>
                            <Text style={{
                                fontSize:25,
                                borderWidth:1,
                                paddingLeft:5,
                                marginLeft:50,
                                width: 200,
                                borderRadius:5,
                                borderColor:"lightgrey",
                                overflow:"hidden",
                                backgroundColor:"lightgrey"
                            }}>
                                {myData.username}
                            </Text>
                    </View>
                    <View style={{marginTop:25,flexDirection:"row"}}>
                        <View style={{
                                flexDirection:"column"
                            }}>
                                <Text style={{
                                    fontSize:15
                                }}>
                                    first name
                                </Text>
                                <Text style={{
                                    marginLeft:50,
                                    width:100,
                                    fontSize:25,
                                    borderRadius:5,
                                    borderWidth:1,
                                    borderColor:"lightgrey",
                                    overflow:"hidden",
                                    backgroundColor:"lightgrey",
                                    paddingLeft:5,
                                }}>
                                    {myData.firstname}
                                </Text>
                        </View>
                        <View style={{flexDirection:"column"}}>
                            <Text style={{
                                fontSize:15,
                                marginLeft: 15
                            }}>
                                last name
                            </Text>
                            <Text style={{
                                marginLeft:63,
                                fontSize:25,
                                width:100,
                                borderRadius:5,
                                borderWidth:1,
                                borderColor:"lightgrey",
                                overflow:"hidden",
                                backgroundColor:"lightgrey",
                                paddingLeft:5,
                            }}>
                                {myData.lastname}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                            marginTop:25
                        }}>
                            <Text style={{
                                fontSize:15,
                                marginRight:58,
                                marginLeft:18
                            }}>
                                gender
                            </Text>
                            <Text style={{
                                marginLeft:50,
                                width:80,
                                fontSize:20,
                                borderRadius:5,
                                borderWidth:1,
                                borderColor:"lightgrey",
                                overflow:"hidden",
                                backgroundColor:"lightgrey",
                                paddingLeft:5,
                            }}>
                                {gender_list[myData.gender]}
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
                                e-mail
                            </Text>
                            <Text style={{
                                fontSize:20,
                            }}>
                                {myData.email}
                            </Text>
                    </View>
                    <View style={{
                            flexDirection: "row",
                            marginTop:25
                        }}>
                            <Text style={{
                                fontSize:20,
                                marginRight:43,
                                marginLeft: 20
                            }}>
                                introduction
                            </Text>
                            <Text style={{
                                fontSize:20,
                            }}>
                                {myData.introduction}
                            </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default mypage;