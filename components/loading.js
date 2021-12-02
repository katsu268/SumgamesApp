import { StyleSheet, View,Image} from 'react-native';
import React from 'react';

const Loading = (props)=>{
  const gifList = [
    require('../assets/gifs/loading_mario.gif'),
    require('../assets/gifs/loading_pokemon.gif'),
    require('../assets/gifs/loading_genshin.gif'),
    require('../assets/gifs/loading_dora.gif'),
    require('../assets/gifs/loading.gif'),
    require('../assets/gifs/loading.gif'),
    require('../assets/gifs/loading_apex.gif'),
    require('../assets/gifs/loading_apex.gif'),
    require('../assets/gifs/loading_apex.gif'),
  ];
  const loading_random = () => {
    return Math.floor(Math.random() * gifList.length);
  };
  return (
    <View style={styles.container}>
      <Image
          source={gifList[loading_random()]}
          style={{width: props.size, height: props.size,borderRadius:50}}
          />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
  flex:1, 
  flexDirection: 'row',
  justifyContent : 'center',
  alignItems : 'center'
  },
});
export default Loading;
