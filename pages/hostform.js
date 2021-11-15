import * as React from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { Input, Text, Button, Icon, Header, ButtonGroup } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";




const HostForm = () =>{

    const [
        selectedIndex,
        setSelectedIndex
        ] = React.useState(1);
        const [
        selectedIndexes,
        setSelectedIndexes
        ] = React.useState([]);
    
    
    return (
      <SafeAreaProvider>
        <ScrollView>

            <Text style={{
                    fontSize:30,
                    marginTop: 50,
                    marginLeft: 10,
                    marginBottom: 10,
                    }}>
                    ホストマッチング条件
                </Text>


            <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="ゲームタイトル"
                labelStyle={{}}
                labelProps={{}}
                leftIcon={<Icon name="person" size={20} />}
                leftIconContainerStyle={{}}
                placeholder="ゲームタイトル"
            />

            <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="人数"
                labelStyle={{}}
                labelProps={{}}
                leftIcon={<Icon name="person" size={20} />}
                leftIconContainerStyle={{}}
                placeholder="人数"
            />

            <ButtonGroup
                buttonContainerStyle={{}}
                buttons={["AL", "MA", "FE", "EX"]}
                containerStyle={{}}
                disabledStyle={{}}
                disabledTextStyle={{}}
                disabledSelectedStyle={{}}
                disabledSelectedTextStyle={{}}
                innerBorderStyle={{}}
                onPress={selectedIdx =>
                    setSelectedIndex(selectedIdx)
                }
                selectedButtonStyle={{}}
                selectedIndex={selectedIndex}
                selectedIndexes={selectedIndexes}
                selectedTextStyle={{}}
                textStyle={{}}
            />

            <Input
                style={styles.Input}
                // underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                label="募集内容"
                labelStyle={{
                    marginTop: 10,
                }}
                labelProps={{}}
                placeholder="募集内容"
                height={250}
                justifyContent="flex-start"
            />


            <View style={styles.button}>
                <Button title="送信"
                    style={{
                    justifyContent: "flex-start",
                    // marginRight: 35
                    // width: "25%",
                }}/>
            </View>

        </ScrollView>
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    Input: {
        marginTop: 5,
        borderWidth: 1,
    }
})

export default HostForm;