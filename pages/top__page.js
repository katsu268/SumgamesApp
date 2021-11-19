import * as React from "react";
import { Tile,Icon, Card, ListItem, Header, SearchBar } from "react-native-elements";
import { ScrollView, View, Text ,Button} from 'react-native';
//import { NativeBaseProvider, Text, Box } from 'native-base';
import { SafeAreaProvider } from "react-native-safe-area-context";
import sumgames_api from "../components/sumgames_api"
// import { Platform } from "react-native"
// import {KeyboardAvoidingView, useBreakpointValue, VStack, NativeBaseProvider} from "native-base"


const TopPage = ({navigation}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    sumgames_api("http://127.0.0.1:8000/api/gameitem/")
    .then((game_data) => setData(game_data));
  }, []);
  
  //検索バーで使用
  const [value, setValue] = React.useState("");

  // const isLargeScreen = useBreakpointValue({
  //   base: false,
  //   sm: false,
  //   md: false,
  //   lg: true,
  // })

  return (
    // <NativeBaseProvider>
    <SafeAreaProvider>
        <ScrollView>
          <Tile
            imageSrc={require('../assets/images/gamer.jpg')}
            title="SUMGAMES"
            titleStyle={{
              fontSize:40,
              fontWeight:'700',
            }}
            featured
            caption="FOR ALL GAMERS"
            height={300}
            onPress={() => navigation.navigate('Login')}
          />
          <View>
            <Text style={{fontSize:24,paddingTop:10,paddingLeft:10,fontWeight:'600'}}>
              ランキング
            </Text>
          </View>
          <ScrollView horizontal={true}>
            {data.map((u,i)=>{
              return (
                <Card key={i} containerStyle={{width:220}}>
                  <Card.Title>{u.game_name}</Card.Title>
                  <Card.Divider/>
                  <Card.Image source={{ uri: u.image }}>
                  </Card.Image>
                  <View>
                    <Button
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='Matching' 
                      onPress={() => navigation.navigate('game_detail')}
                      />
                  </View>
                </Card>
              )
            })}
          </ScrollView>

          {/* <KeyboardAvoidingView
            h={{
              base: "400px",
              lg: "auto",
            }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <VStack p="6" flex="1" justifyContent="flex-end"> */}
            <SearchBar
              platform="ios"
              onChangeText={(newVal) => setValue(newVal)}
              onClearText={() => console.log(onClearText())}
              placeholder="Game Title here..."
              placeholderTextColor="#888"
              cancelButtonTitle="Cancel"
              onCancel={() => console.log(onCancel())}
              value={value}
            />
            {/* </VStack>
          </KeyboardAvoidingView> */}
        </ScrollView>
    </SafeAreaProvider>
    // </NativeBaseProvider>
  );
};

export default TopPage;