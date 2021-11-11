import { Tile, Button, ThemeProvider, Input, Icon, Image } from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const game_detail = () =>{
    return(
        <SafeAreaProvider>
            <ScrollView>
                <Tile
                    imageSrc={require('../assets/images/apex-image.jpg')}
                    containerStyle={{
                        marginTop: 50,
                        height:165}}
                />
                <Image
                    source={{ uri: "../assets/images/apex-image.jpg" }}
                    style={{ width: 200, height: 200 }}
                />

            </ScrollView>
        </SafeAreaProvider>
    )
}

export default game_detail