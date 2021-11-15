import * as React from "react";
import { View, TextInput, StyleSheet, Alert, Text } from "react-native";
import { Input, Icon, Header, ButtonGroup, Button } from "react-native-elements";
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
        <ScrollView style={{marginTop:50}}>
            <Text style={{
                fontSize: 25,
                marginLeft: 10,
                marginBottom: 15
            }}>募集条件入力</Text>
            <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="ゲーム名"
                labelStyle={{}}
                labelProps={{}}
                leftIcon={<Icon name="person" size={20} />}
                leftIconContainerStyle={{}}
                placeholder="ゲーム名"
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

            <View style={{
                flexDirection: "row",
                justifyContent: "center"
            }}>
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
                        // 101以上でタイトルの改行を防げる
                        width: 101,
                        marginLeft: 90
                    }}
                />
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