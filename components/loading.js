import { StyleSheet, View,Image} from 'react-native';
import React from 'react';


const Loading = (props)=>{
  return (
    <View style={styles.container}>
      <Image
          source={ require('../assets/gifs/loading_mario.gif')}
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