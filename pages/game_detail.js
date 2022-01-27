import { Tile, Button, Text, ThemeProvider, Input, Icon, Slider, Image, Card, Divider } from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthContext from '../components/my_context';
import Loading from '../components/loading';
import { ScrollView, Center, Stack } from 'native-base';
import { marginBottom, marginLeft } from 'styled-system';


const game_detail = ({ route,navigation }) =>{
    const { detail } = route.params;
    const { BASE_URL,get } = React.useContext(AuthContext);
    const [data, setData] = React.useState({});
    const [isLoading, setLoading] = React.useState(true);
    //ホストの割合
    const [rate, setRate] = React.useState(0);

    React.useEffect(() => {
        async function fetchData() {
            const url = `api/gameitem/${detail.id}/`
            const my_data = await get({url});
            if (my_data !== undefined){
                setData(my_data);
            }
            //my_data.hostの値がある時、ホストの割合を算出
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
                            //ゲームイメージを表示
                            <ImageBackground
                                source={{
                                    uri:BASE_URL + detail.image
                                }}
                                resizeMode="cover"
                                style={{width:"100%",height:300}}
                            >
                                {/* ゲームタイトルを表示 */}
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
                    {/* ゲームジャンルを表示 */}
                    <View>
                        <Card containerStyle={{
                            backgroundColor: "#AAB7B8"
                        }}>
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
                                            color: "#000000",
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

                    {/* ゲームのプラットフォームを表示 */}
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
                                    source={require('../assets/images/game02.png')}
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
                    {
                        (rate)
                        ?//ホストが1人以上存在するとき
                        <View style={{flex:1}}>
                            <Text 
                            style={{
                                fontSize: 25,
                                marginTop: 5,
                                marginLeft: 155,
                                // marginBottom: 5,
                            }}
                            >
                            レート
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        fontSize: 25,
                                        marginTop: 25,
                                        marginLeft:10,
                                        marginRight: 10
                                    }}
                                >
                                    ホスト
                                </Text>
                                {/* rateから受け取った割合をスライダーに反映 */}
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
                                    width: "50%", 
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
                                        fontSize: 25,
                                        marginTop: 25,
                                        marginLeft:10,
                                        marginRight: 5
                                    }}
                                >
                                    ゲスト
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                {/* リアルタイムでホスト人数を表示 */}
                                <Text
                                        style={{
                                            fontSize: 30,
                                            marginLeft:150,
                                        }}
                                >
                                        {data.host}    /    {data.guest}
                                </Text>
                                {/* リアルタイムでゲスト人数を表示 */}
                                {/* <Text
                                        style={{
                                            fontSize: 30,
                                            marginLeft:235,
                                        }}
                                >
                                        {data.guest}人
                                </Text> */}
                            </View>

                        </View>
                        ://ホストが0人のとき
                        <View style={{flex:1}}>
                            {/* ホストが存在しないことを知らせる */}
                            <Text
                                style={{
                                    flex:1,
                                    marginTop:20,
                                    fontSize:29,
                                    color:"#ffff00",
                                    backgroundColor:"#000080"
                                }}
                            >
                                現在募集中のホストはいません
                            </Text>
                        </View>
                    }
                    {/* ホストorゲストでの募集、参加を誘導 */}
                    <Text
                    style={{
                        fontSize: 20,
                        marginTop: 25,
                        marginLeft: 110
                    }}
                    >
                        どちらを選びますか？
                    </Text>

                    {/* ホストボタンを表示 */}
                    <View style={{
                        flex:1,
                        marginTop: 30,
                        marginBottom: 100,
                        flexDirection:"row"
                    }}>
                        {/* ホストボタンを表示 */}
                        <View style={{flex:1,paddingRight:20,paddingLeft:40}}>
                            <Button title="ホスト"
                                onPress={() => navigation.navigate('HostForm',{
                                    detail:detail
                                    })}
                            />
                        </View>
                        {/* ゲストボタンを表示 */}
                        <View style={{flex:1,paddingRight:40,paddingLeft:20}}>
                            <Button title="ゲスト"
                                onPress={() => navigation.navigate('GuestMatching',{
                                    game_id:detail.id,
                                    gameName:detail.game_name,
                                    gameImage:detail.image
                                })}
                            />
                        </View>
                    </View>

            </Stack>)
            }
            </ScrollView>
        </SafeAreaProvider>
    )
}



export default game_detail