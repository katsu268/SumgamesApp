import { Tile, Button, ThemeProvider, Input, Icon, Slider} from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const talk =()=> {
    return(
        <View style={{
            marginTop: 50
        }}>
            <Text>
                Hello, World!!
            </Text>
        </View>
    )
}

export default talk;
