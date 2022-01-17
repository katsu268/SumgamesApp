import React, { useState } from "react";
import { ScrollView, Text, View, Modal, Alert, TextInput} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, Radio, NativeBaseProvider, Avatar, Center, TextArea, Icon, Pressable } from "native-base";
import AuthContext from "../components/my_context";
import Loading from "../components/loading";
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';



const mypage =({ route,navigation })=> {
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = React.useState(true);
    const [myData, setmyData] = React.useState([]);
    const { get, patch, BASE_URL, user_delete } = React.useContext(AuthContext);

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

    const [userid, setUserid] = React.useState("");

    React.useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('写真へのアクセスを許可してください');
            }
        }
        })();
    }, []);

    React.useEffect(() => {
          (async () => {
          if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestCameraPermissionsAsync();
              if (status !== 'granted') {
              alert('カメラへのアクセスを許可してください');
              }
          }
          })();
      }, []);

    React.useEffect(() => {
        (async () => {
          let user_id = await SecureStore.getItemAsync('user_id');
          setUserid(user_id);
        })();
    }, []);

      const pickImage = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              base64:true,
              allowsEditing: false,
              quality: 1,
          });
          if (!result.cancelled) {
              let response = await patch({url:`accounts/user/${userid}/`,data:{
                  "image": 'data:image/jpeg;base64,' + result.base64
              }});
          }
      };

    const pickCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          base64:true,
          allowsEditing: false,
          quality: 1,
      });
      if (!result.cancelled) {
          let response = await post({url:"accounts/user/",data:{
              "talktext": "",
              "talkfile": 'data:image/jpeg;base64,' + result.base64
          }});
          let imageMessage = {
              _id: response.id,
              createdAt: response.send_at,
              user: {
                  _id: response.user,
                  name: '',
                  avatar: '',
              },
              image:result.uri
          };
          setMessages(previousMessages => GiftedChat.append(previousMessages, imageMessage))
      }
    };

    const fetchData = async()=>{
          const url = `accounts/user/${userid}/`
          const my_data = await get({url});
          setmyData(my_data);
          setLoading(false);
        }

    React.useEffect(() => {
        fetchData();
      }, []);

      const Edit = async()=>{
          let user_id = await SecureStore.getItemAsync('user_id');
          const url = `accounts/user/${user_id}/`
          {
          let data = {
            "username": `${username}`,
            "first_name": `${firstname}`,
            "last_name": `${lastname}`,
            "gender": `${gender}`,
            "email": `${email}`,
            "introduction": `${introduction}`,
          }
            console.log(data);
            patch({ url:url,data:data });
          };
        }
    

    return(
        <SafeAreaProvider>
            {(isLoading)
            ?<Center flex="1" my="10"><Loading size={150}/></Center>
            :<ScrollView style={{
                marginLeft:5
            }}>
                <Center>
                    <Text style={{
                        fontSize:30,
                        marginTop: 50,
                        marginLeft: 5}}>
                        Profile
                    </Text>
                </Center>
                <Button
                  style={{
                    width: 100,
                    marginLeft: "70%",
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
                >
                    編集
                </Button>
                <Modal
                    animationType = "slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      }}>
                    <ScrollView style={{
                        borderRadius:20,
                        backgroundColor:"white",
                        colorScheme:"white",
                        }}>
                        <Center>
                            <Text style={{
                                fontSize:30,
                                marginTop: 50,
                                marginLeft: 10}}>
                                Edit Profile
                            </Text>
                        </Center>
                        <Button
                                style={{
                                    width: 100,
                                    marginLeft: "70%",
                                    alignItems: 'flex-end',
                                    marginTop: 15
                                }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    Edit();
                                    fetchData();
                                }}
                            >
                                保存
                        </Button>
                        <Center>
                              {(myData.image === "")
                              ?<Avatar
                                  bg="green.500"
                                  size="lg"
                              >
                                  {myData.username.slice(0,1).toUpperCase()}
                              </Avatar>
                              :<Avatar
                                  bg="green.500"
                                  size="lg"
                                  source={{
                                      uri: BASE_URL+"/media/"+myData.image,
                                  }}
                              >
                                  {myData.username.slice(0,1).toUpperCase()}
                              </Avatar>}
                              <Button 
                                style={{position:"absolute", width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(0, 0, 0, 0)' }}
                                onPress={pickImage}>
                                
                              </Button>
                        </Center>
                        <View style={{marginLeft:20}}>
                            <View style={{
                                    marginTop:30
                                }}>
                                    <Text style={{
                                        fontSize:15,
                                        marginRight:45,
                                    }}>
                                        user name
                                    </Text>
                                    <TextInput
                                        value={username}
                                        containerStyle={{width:200}}
                                        style={{
                                            fontSize:25,
                                            paddingLeft:5,
                                            marginLeft:50,
                                            width: 200,
                                            borderRadius:5,
                                            borderColor:"lightgrey",
                                            backgroundColor:"lightgrey"
                                        }}
                                        onChangeText={(value) => {setUsername(value)}}
                                    />
                            </View>
                            <View style={{marginTop:25,flexDirection:"row"}}>
                                <View style={{
                                    flexDirection: "column",
                                }}>
                                    <Text style={{
                                        fontSize:15
                                    }}>
                                        first name
                                    </Text>
                                    <TextInput
                                        value={firstname}
                                        style={{
                                            marginLeft:50,
                                            width:100,
                                            fontSize:25,
                                            borderRadius:5,
                                            borderWidth:1,
                                            borderColor:"lightgrey",
                                            overflow:"hidden",
                                            backgroundColor:"lightgrey",
                                            paddingLeft:5,
                                        }}
                                        onChangeText={(value) => {setFirstname(value)}}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: "column",
                                }}>
                                    <Text style={{
                                        fontSize:15,
                                        marginLeft: 15
                                    }}>
                                        last name
                                    </Text>
                                    <TextInput
                                        value={lastname}
                                        style={{
                                            marginLeft:63,
                                            fontSize:25,
                                            width:100,
                                            borderRadius:5,
                                            borderWidth:1,
                                            borderColor:"lightgrey",
                                            overflow:"hidden",
                                            backgroundColor:"lightgrey",
                                            paddingLeft:5,
                                        }}
                                        onChangeText={(value) => {setLastname(value)}}
                                    />
                                </View>
                            </View>
                            <View style={{
                                    flexDirection: "column",
                                    marginTop:25
                                }}>
                                    <Text style={{
                                        fontSize:15,
                                        marginLeft: 16,
                                    }}>
                                        gender
                                    </Text>
                                    <NativeBaseProvider>
                                        <Radio.Group
                                            name="myRadioGroup"
                                            accessibilityLabel="gender"
                                            value={gender}
                                            onChange={(value) => {
                                                setGender(value)
                                            }}
                                            style={{flexDirection:"row",marginLeft:50}}
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
                                flexDirection: "column",
                                marginTop:20
                            }}>
                                <Text style={{
                                    fontSize:15,
                                    marginLeft: 20
                                }}>
                                    e-mail
                                </Text>
                                <TextInput
                                    value={email}
                                    style={{
                                        marginLeft:50,
                                        width:250,
                                        fontSize:20,
                                        borderRadius:5,
                                        borderWidth:1,
                                        borderColor:"lightgrey",
                                        overflow:"hidden",
                                        backgroundColor:"lightgrey",
                                        paddingLeft:5,
                                    }}
                                    onChangeText={(value) => {setEmail(value)}}
                                />
                            </View>
                            <View style={{
                                flexDirection: "column",
                                marginTop:25
                            }}>
                                <Text style={{
                                    fontSize:15
                                }}>
                                    introduction
                                </Text>
                                <TextArea
                                  value={introduction}
                                    multiline={true}
                                    style={{
                                        marginLeft:50,
                                        width:300,
                                        fontSize:20,
                                        borderRadius:5,
                                        borderWidth:1,
                                        borderColor:"lightgrey",
                                        backgroundColor:"lightgrey",
                                        paddingLeft:5,
                                        }}
                                    onChangeText={(value) => {setIntroduction(value)}}
                                />
                            </View>
                            <Button
                              buttonStyle={{width:100}}
                              style={{
                                  width: 100,
                                  marginLeft: "68%",
                                  alignItems: 'flex-end',
                                  marginTop: 40}}
                              onPress={() => setModalVisible(!modalVisible)}
                          >
                              キャンセル
                          </Button>
                        </View>
                    </ScrollView>
                </Modal>
                <NativeBaseProvider>
                    <Center style={{ marginTop: 20 }}>
                        {(myData.image === "")
                        ?<Avatar
                            bg="green.500"
                            size="lg"
                        >
                            {myData.username.slice(0,1).toUpperCase()}
                        </Avatar>
                        :<Avatar
                            bg="green.500"
                            size="lg"
                            source={{
                                uri: BASE_URL+"/media/"+myData.image,
                            }}
                        >
                            {myData.username.slice(0,1).toUpperCase()}
                        </Avatar>}
                    </Center>
                </NativeBaseProvider>
                <View style={{marginLeft: 15}}>
                    <View style={{
                            marginTop:30
                        }}>
                            <Text style={{
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
                            marginTop:25
                        }}>
                            <Text style={{
                                fontSize:15,
                                marginRight:15,
                                marginLeft:20
                            }}>
                                e-mail
                            </Text>
                            <Text style={{
                                marginLeft:50,
                                width:250,
                                fontSize:20,
                                borderRadius:5,
                                borderWidth:1,
                                borderColor:"lightgrey",
                                overflow:"hidden",
                                backgroundColor:"lightgrey",
                                paddingLeft:5,
                            }}>
                                {myData.email}
                            </Text>
                    </View>
                    <View style={{
                            marginTop:25
                        }}>
                            <Text style={{
                                fontSize:15,
                                marginRight:43,
                            }}>
                                introduction
                            </Text>
                            <Text style={{
                                marginLeft:50,
                                width:300,
                                fontSize:20,
                                borderRadius:5,
                                borderWidth:1,
                                borderColor:"lightgrey",
                                overflow:"hidden",
                                backgroundColor:"lightgrey",
                                paddingLeft:5,
                            }}>
                                {myData.introduction}
                            </Text>
                    </View>
                    <Button
                        style={{
                            marginTop:60,
                            marginLeft:250,
                            width:120,
                            }}
                        colorScheme="red"
                        onPress={()=>{
                          user_delete();
                        }}
                      >
                        ユーザー削除
                    </Button>
                </View>
            </ScrollView>
            }
        </SafeAreaProvider>
    )
}

export default mypage;