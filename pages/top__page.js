import * as React from "react";
import { Tile,Icon, Card, ListItem, Header, SearchBar } from "react-native-elements";
import { ScrollView, View, Text ,Button} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

const BASE_URL = 'http://10.250.1.240:8000/'
let url = 'https://api.bitflyer.com/v1/ticker'

const TopPage = ({navigation}) => {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const getRanking = async () => {
    try {
      const response = await fetch(url, {
        mode: 'cors',
        credentials: 'include'
      });
      const json = await response.json();
      setData(json.datas);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(()=>{
    getRanking();
    console.log(data)
  });

  //検索バーで使用
  const [value, setValue] = React.useState("");
  
  
  getRanking()
  return (
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
        {/* <ScrollView horizontal={true}>
          {data.map((u,i)=>{
            return (
              <Card key={i} containerStyle={{width:220}}>
                <Card.Title>{u.product_code}</Card.Title>
                <Card.Divider/>
                <View>
                  <Text>
                      {u.tick_id} {u.ltp}
                  </Text>
                  <Text style={{marginBottom: 10}}>
                    {u.timestamp}
                  </Text>
                  <Button
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Matching' />
                </View>
              </Card>
            )
          })} */}
          {/* {data.map((u,i)=>{
            return (
              <Card key={i} containerStyle={{width:220}}>
                <Card.Title>{u.name}</Card.Title>
                <Card.Divider/>
                <Card.Image source={{ uri: u.img_uri }}>
                </Card.Image>
                <View>
                  <Text>
                      {u.genre} {u.platform}
                  </Text>
                  <Text style={{marginBottom: 10}}>
                    {u.detail}
                  </Text>
                  <Button
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Matching' />
                </View>
              </Card>
            )
          })} */}
        </ScrollView>
          <View>
            <SearchBar
              platform="ios"
              containerStyle={{
                
              }}
              inputContainerStyle={{}}
              inputStyle={{}}
              leftIconContainerStyle={{}}
              rightIconContainerStyle={{}}
              loadingProps={{}}
              onChangeText={newVal => setValue(newVal)}
              onClearText={() => console.log(onClearText())}
              placeholder="Game Title here..."
              placeholderTextColor="#888"
              cancelButtonTitle="Cancel"
              cancelButtonProps={{}}
              onCancel={() => console.log(onCancel())}
              value={value}
            />
          </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default TopPage;