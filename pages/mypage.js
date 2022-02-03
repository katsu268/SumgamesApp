import * as React from "react";
import { ScrollView, Text, Modal, Alert, TextInput} from "react-native";
import { Button, Radio, NativeBaseProvider, Avatar, Center, TextArea, Icon,Pressable, AlertDialog,View } from "native-base";
import AuthContext from "../components/my_context";
import Loading from "../components/loading";
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from "@expo/vector-icons"

const mypage =()=> {
    const [modalVisible, setModalVisible] = React.useState(false);
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

    const [isOpen,setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const fetchData = async()=>{
        setLoading(true);
        let user_id = await SecureStore.getItemAsync('user_id');
        const url = `accounts/user/${user_id}/`
        const my_data = await get({url});
        setmyData(my_data);
        setLoading(false);
    }

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64:true,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.cancelled) {
            let user_id = await SecureStore.getItemAsync('user_id');
            await patch({url:`accounts/user/${user_id}/`,data:{
                "image": 'data:image/jpeg;base64,' + result.base64
            }});
            fetchData();
        }
    };

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
        patch({ url:url,data:data });
        fetchData();
        };
    }
    
    return(
        <NativeBaseProvider>
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
                setFirstname(myData.first_name);
                setLastname(myData.last_name);
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
                            }}
                        >
                            保存
                    </Button>
                    <Center>
                        <Pressable onPress={pickImage}>
                            {(myData.image === null)
                            ?<Avatar bg="green.500" size="2xl" >
                                {myData.username.slice(0,1).toUpperCase()}
                                <Avatar.Badge>
                                    <Icon
                                        as={Entypo}
                                        name="camera"
                                        color="coolGray.800"
                                        _dark={{
                                            color: "warmGray.50",
                                        }}
                                    />
                                </Avatar.Badge>
                            </Avatar>
                            :<Avatar
                                bg="green.500"
                                size="2xl"
                                source={{ uri: BASE_URL+myData.image }}
                            >
                                {myData.username.slice(0,1).toUpperCase()}
                                <Avatar.Badge>
                                    <Icon
                                        as={Entypo}
                                        name="camera"
                                        color="coolGray.800"
                                        _dark={{
                                            color: "warmGray.50",
                                        }}
                                    />
                                </Avatar.Badge>
                            </Avatar>}
                        </Pressable>
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
            <Center style={{ marginTop: 20 }}>
                {(myData.image === null)
                ?<Avatar
                    bg="green.500"
                    size="2xl"
                >
                    {myData.username.slice(0,1).toUpperCase()}
                </Avatar>
                :<Avatar
                    bg="green.500"
                    size="2xl"
                    source={{ uri: BASE_URL+myData.image }}
                >
                    {myData.username.slice(0,1).toUpperCase()}
                </Avatar>}
            </Center>
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
                                {myData.first_name}
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
                            {myData.last_name}
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
                <View>
                    <Button
                        style={{
                            marginTop:60,
                            marginLeft:250,
                            width:120,
                            }}
                        colorScheme="red"
                        onPress={()=>{setIsOpen(true)}}
                        >
                        ユーザー削除
                    </Button>
                    <AlertDialog
                        leastDestructiveRef={cancelRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Header>ユーザーを削除します。</AlertDialog.Header>
                        <AlertDialog.Body>
                            完全にユーザー情報が削除され、元には戻せません。
                            本当に削除しますか？
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                            <Button
                                variant="unstyled"
                                colorScheme="coolGray"
                                onPress={onClose}
                                ref={cancelRef}
                            >
                                キャンセル
                            </Button>
                            <Button colorScheme="danger" onPress={()=>user_delete()}>
                                削除
                            </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
                </View>
            </View>
        </ScrollView>
        }
        </NativeBaseProvider>
    )
}

export default mypage;