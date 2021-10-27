import * as React from "react";
import { Tile,Icon, Card, ListItem } from "react-native-elements";
import { ScrollView, View, Text ,Button} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

const games = [
  {
    name: 'ApexLegends',
    img_uri: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop191x100.1200w.jpg',
    genre:'FPS',
    detail:'test',
    platform:'PC',
  },
  {
    name: 'ApexLegends',
    img_uri: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop191x100.1200w.jpg',
    genre:'FPS',
    detail:'test',
    platform:'PC',
  },
  {
    name: 'ApexLegends',
    img_uri: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop191x100.1200w.jpg',
    genre:'FPS',
    detail:'test',
    platform:'PC',
  },
  {
    name: 'ApexLegends',
    img_uri: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop191x100.1200w.jpg',
    genre:'FPS',
    detail:'test',
    platform:'PC',
  },
  {
    name: 'ApexLegends',
    img_uri: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop191x100.1200w.jpg',
    genre:'FPS',
    detail:'test',
    platform:'PC',
  },
  {
    name: 'ApexLegends',
    img_uri: 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-featured-image-16x9.jpg.adapt.crop191x100.1200w.jpg',
    genre:'FPS',
    detail:'test',
    platform:'PC',
  },
 ]
 

const TopPage = ({navigation}) => {
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
        <ScrollView horizontal={true}>
          {games.map((u,i)=>{
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