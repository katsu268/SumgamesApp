import * as React from "react";
import { Tile, Input, Text, Icon, Button, Card, CheckBox , ListItem, Header, SearchBar } from "react-native-elements";
import { ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

const Inquiry = () =>{

    const [checked, setChecked] = React.useState(false);

    return (
        <SafeAreaProvider>
            <ScrollView>
                <Text 
                  h1
                >
                    お問い合わせ
                </Text>
                <Input
                    containerStyle={{}}
                    disabledInputStyle={{ background: "#ddd" }}
                    inputContainerStyle={{}}
                    errorMessage="Oops! that's not correct."
                    errorStyle={{}}
                    errorProps={{}}
                    inputStyle={{}}
                    label="ユーザー名"
                    labelStyle={{}}
                    labelProps={{}}
                    leftIcon={<Icon name="person" size={20} />}
                    leftIconContainerStyle={{}}
                    rightIcon={<Icon name="close" size={20} />}
                    rightIconContainerStyle={{}}
                    placeholder="ユーザー名"
                />
              <View style={styles.container}>
                <CheckBox
                    left
                    checked={checked}
                    checkedColor="#0F0"
                    checkedTitle="Great!"
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle={{ width: "50%" }}
                    onIconPress={() => setChecked(!checked)}
                    onLongIconPress={() =>
                        console.log("onLongIconPress()")
                    }
                    onLongPress={() => console.log("onLongPress()")}
                    onPress={() => console.log("onPress()")}
                    size={25}
                    textStyle={{}}
                    title="不具合報告"
                    titleProps={{}}
                    uncheckedColor="#0080ff"
                />
                <CheckBox
                    left
                    checked={checked}
                    checkedColor="#0F0"
                    checkedTitle="Great!"
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle={{ width: "50%" }}
                    onIconPress={() => setChecked(!checked)}
                    onLongIconPress={() =>
                        console.log("onLongIconPress()")
                    }
                    onLongPress={() => console.log("onLongPress()")}
                    onPress={() => console.log("onPress()")}
                    size={25}
                    textStyle={{}}
                    title="ゲームの追加要望"
                    titleProps={{}}
                    uncheckedColor="#0080ff"
                />
                <CheckBox
                    left
                    checked={checked}
                    checkedColor="#0F0"
                    checkedTitle="Great!"
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    containerStyle={{ width: "50%" }}
                    onIconPress={() => setChecked(!checked)}
                    onLongIconPress={() =>
                        console.log("onLongIconPress()")
                    }
                    onLongPress={() => console.log("onLongPress()")}
                    onPress={() => console.log("onPress()")}
                    size={25}
                    textStyle={{}}
                    title="その他"
                    titleProps={{}}
                    uncheckedColor="#0080ff"
                />
              </View>
                <Input
                    style={styles.Input}
                    // underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    label="要件内容"
                    labelStyle={{}}
                    labelProps={{}}
                    placeholder="要件内容"
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
    container: {
    //   flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    Input: {
        borderWidth: 1,
    }
});
  


export default Inquiry;