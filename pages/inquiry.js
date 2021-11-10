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
                    underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    label="要件内容"
                    labelStyle={{}}
                    labelProps={{}}
                    placeholder="要件内容"
                    height={150}
                    justifyContent="flex-start"
                />
              <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => alert("送信が完了しました。")}
                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>送信</Text>
                </TouchableOpacity>
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
      backgroundColor: "#157DEC",
      // padding: 10,
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 5,
      marginTop: 1,
      marginBottom: 5,
      marginLeft: 600,
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    }, 
  });
  


export default Inquiry;