import * as React from "react";
import { Tile,Icon, Card, ListItem } from "react-native-elements";
import { ScrollView, View, Text ,Button} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

const BASE_URL = 'http://127.0.0.1:8000/'

const TopPage = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const getRanking = async () => {
    try {
      const response = await fetch(BASE_URL+'game/ranking/',{ method: 'POST' });
      const json = await response.json();
      setData(json.datas);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
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
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default TopPage;