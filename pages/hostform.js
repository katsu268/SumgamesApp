import * as React from "react";
<<<<<<< HEAD
import { View, TextInput, StyleSheet, Alert, Text } from "react-native";
import { Input, Icon, Header, ButtonGroup, Button } from "react-native-elements";
=======
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { Input, Text, Button, Icon, Header, ButtonGroup } from "react-native-elements";
>>>>>>> fe2143292f6e4e7c88ac0fdf7733820df97bfa36
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
<<<<<<< HEAD
        <ScrollView style={{marginTop:50}}>
            <Text style={{
                fontSize: 25,
                marginLeft: 10,
                marginBottom: 15
            }}>募集条件入力</Text>
=======
        <ScrollView>

            <Text style={{
                    fontSize:30,
                    marginTop: 50,
                    marginLeft: 10,
                    marginBottom: 10,
                    }}>
                    ホストマッチング条件
                </Text>


>>>>>>> fe2143292f6e4e7c88ac0fdf7733820df97bfa36
            <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
<<<<<<< HEAD
                label="ゲーム名"
=======
                label="ゲームタイトル"
>>>>>>> fe2143292f6e4e7c88ac0fdf7733820df97bfa36
                labelStyle={{}}
                labelProps={{}}
                leftIcon={<Icon name="person" size={20} />}
                leftIconContainerStyle={{}}
<<<<<<< HEAD
                placeholder="ゲーム名"
=======
                placeholder="ゲームタイトル"
>>>>>>> fe2143292f6e4e7c88ac0fdf7733820df97bfa36
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

            <Text style={{
                marginLeft: 10,
                fontSize: 16
            }}>性別</Text>
            <ButtonGroup
                buttonContainerStyle={{}}
                buttons={["男性", "女性", "無回答"]}
                containerStyle={{
                    marginBottom: 25
                }}
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

<<<<<<< HEAD
            <View style={styles.fixToText}>
                <Button
                    title="募集"
                    onPress={() => Alert.alert('Left button pressed')}
                    style={{
                        width: 70,
                        marginLeft: 20
                    }}
                />

                <Button
                    title="キャンセル"
                    onPress={() => Alert.alert('Right button pressed')}
                    style={{
                        width: 95,
                        marginLeft: 90
                    }}
                />
=======

            <View style={styles.button}>
                <Button title="送信"
                    style={{
                    justifyContent: "flex-start",
                    // marginRight: 35
                    // width: "25%",
                }}/>
>>>>>>> fe2143292f6e4e7c88ac0fdf7733820df97bfa36
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