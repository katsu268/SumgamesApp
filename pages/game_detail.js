import { Tile, Button, Text, ThemeProvider, Input, Icon, Slider, Image, Card, Divider } from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthContext from '../components/my_context';
import Loading from '../components/loading';
import { ScrollView, Center, Stack } from 'native-base';


const game_detail = ({ route,navigation }) =>{
    const { detail } = route.params;
    const { BASE_URL,get } = React.useContext(AuthContext);
    const [data, setData] = React.useState({});
    const [isLoading, setLoading] = React.useState(true);
    const [rate, setRate] = React.useState(0);

    React.useEffect(() => {
        async function fetchData() {
            const url = `api/gameitem/${detail.id}/`
            const my_data = await get({url});
            if (my_data !== undefined){
                setData(my_data);
            }
            if (my_data.host){
                setRate(Math.floor(my_data.host/(my_data.host+my_data.guest)*100));
            }
            setLoading(false);
        }
        fetchData();
      }, []);

    
    return(
        <SafeAreaProvider>
            <ScrollView flex={1}>
            {
            (isLoading)
            ?(
                <Center flex={1}>
                    <Loading size={150}/>
                </Center>
            )
            :(
            <Stack flex={1}>
                <Tile
                    ImageComponent={()=>{
                        return(
                            <ImageBackground
                                source={{
                                    uri:BASE_URL + detail.image
                                }}
                                resizeMode="cover"
                                style={{width:"100%",height:300}}
                            >
                                <Text style={{
                                    color: "white",
                                    fontSize: 26,
                                    lineHeight: 44,
                                    fontWeight: "normal",
                                    textAlign: "center",
                                    marginTop: 120,
                                    backgroundColor: "#000000c0"
                                }}>
                                    {detail.game_name}
                                </Text>
                            </ImageBackground>
                        );
                    }}
                    featured
                    height={300}
                />
                    <View>
                        <Card containerStyle={{
                            backgroundColor: "#AAB7B8"
                        }}>
                            {/* <Card.Title>ジャンル</Card.Title> */}
                            <Text
                                style={{
                                    fontSize: 15,
                                    marginLeft: 140,
                                    marginBottom: 10,
                                    color:"#FFF",
                                }}
                            >
                                ジャンル
                            </Text>
                            <Divider
                                style={{ marginBottom: 15 }}
                                color="#000000"
                                orientation="horizontal"
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={require('../assets/images/game01.png')}
                                    style={{ width: 180, height: 200 }}
                                />
                                <Divider
                                    style={{ margin: 10 }}
                                    color="#000000"
                                    orientation="vertical"
                                />
                                <View>
                                {detail.genre.map((u,i)=>{
                                    return (
                                        <Text
                                            key = {i}
                                            style={{
                                            // marginLeft: 30,
                                            color: "#000000",
                                            // backgroundColor: "#000000c0",
                                            fontSize: 20,
                                            }}
                                        >
                                            {u.genrename}
                                        </Text>
                                    )
                                })}
                                </View>
                            </View>
                        </Card>
                    </View>


                    <View>
                    <Card containerStyle={{
                            backgroundColor: "#87ceeb"
                        }}>
                            {/* <Card.Title>プラットフォーム</Card.Title> */}
                            <Text
                                style={{
                                    fontSize: 15,
                                    marginLeft: 110,
                                    marginBottom: 10,
                                    color:"#FFF",
                                }}
                            >
                                プラットフォーム
                            </Text>
                            <Divider
                                style={{ marginBottom: 15 }}
                                color="#000000"
                                orientation="horizontal"
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={require('../assets/images/game01.png')}
                                    style={{ width: 180, height: 200 }}
                                />
                                <Divider
                                    style={{ margin: 10 }}
                                    color="#000000"
                                    orientation="vertical"
                                />
                                <View>
                                {detail.platform.map((u,i)=>{
                                    return (
                                        <Text
                                            key = {i}
                                            style={{
                                            // marginLeft: 30,
                                            color: "#000000",
                                            // backgroundColor: "#000000c0",
                                            fontSize: 20,
                                            }}
                                        >
                                            {u.platform_name}
                                        </Text>
                                    )
                                })}
                                </View>
                            </View>
                        </Card>

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
                        ホスト:{data.host}
                    </Text>
                    <Slider
                        animationType="timing"
                        disabled
                        maximumTrackTintColor="#ccc"
                        maximumValue={100}
                        minimumTrackTintColor="#222"
                        minimumValue={0}
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
                        value={rate}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            marginTop: 25
                        }}
                    >
                        ゲスト:
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
                    marginBottom: 100,
                }}>
                    <Button title="ホスト"
                        style={{
                            justifyContent: "flex-start",
                            marginRight: 25,
                            marginLeft: "25%",
                            }}
                        onPress={() => navigation.navigate('HostForm',{
                            detail:detail
                          })}
                    />
                    <Button title="ゲスト"
                        style={{
                            justifyContent: "flex-end",
                            marginLeft: 65,
                            marginLeft: "25%",
                            }}
                        onPress={() => navigation.navigate('GuestMatching',{
                            game_id:detail.id,
                            gameName:detail.game_name,
                            gameImage:detail.image
                        })}
                    />
                </View>
            </Stack>)
            }
            </ScrollView>
        </SafeAreaProvider>
    )
}



export default game_detail