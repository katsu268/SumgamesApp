import { Tile, Button, ThemeProvider, Input, Icon,} from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const game_detail = () =>{
    return(
        <SafeAreaProvider>
            <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 50, 

                }}>
                    <View styles={StyleSheet.Image}>
                        <Image
                            transitionDuration={1000}
                            source={require('../assets/images/monst.jpg')}
                            style={{ 
                                alignItems: 'flex-start',
                                width: 150, 
                                height: 150,
                                marginTop: 100
                            }}
                        />
                    </View>
                    <View styles={StyleSheet.Tile}>
                        <Tile
                            title="ゲームの基本情報"
                        　　featured
                            style={{
                                alignItems: 'flex-end',
                                width: 100,
                            }}
                        />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaProvider>
    )
}



export default game_detail