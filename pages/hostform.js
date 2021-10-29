import * as React from "react";
import { View, Button, TextInput, StyleSheet, Alert } from "react-native";
import { Input, Icon, Header, ButtonGroup } from "react-native-elements";
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
            <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="Game Title"
                labelStyle={{}}
                labelProps={{}}
                leftIcon={<Icon name="person" size={20} />}
                leftIconContainerStyle={{}}
                placeholder="Game Title"
            />

            <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="Counts"
                labelStyle={{}}
                labelProps={{}}
                leftIcon={<Icon name="person" size={20} />}
                leftIconContainerStyle={{}}
                placeholder="Counts"
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
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                label="募集条件"
                labelStyle={{}}
                labelProps={{}}
                placeholder="募集条件"
            />

            <View style={styles.fixToText}>
                <Button
                    title="募集"
                    onPress={() => Alert.alert('Left button pressed')}
                />
            </View>

        </ScrollView>
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    textArea: {
      height: 150,
      borderWidth: 1,
      justifyContent: "flex-start"
    },
    fixToText: {
        // flex: 1,
        // justifyContent: 'center',
        // marginHorizontal: 16,
        flex: 1,
        marginHorizontal: 16,
        //ボタンの範囲のみタッチ可能にできる！！
        flexDirection: 'row',
        justifyContent: 'center',
    },
})

export default HostForm;