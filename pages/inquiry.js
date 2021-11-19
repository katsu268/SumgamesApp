import * as React from "react";
import { Tile, Input, Text, Icon, Button, Card, CheckBox , ListItem, Header, SearchBar } from "react-native-elements";
import { ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RadioButton } from 'react-native-paper';

const Inquiry = () =>{

    const [checked, setChecked] = React.useState(false);

    const [value, setValue] = React.useState('first');

    return (
        <SafeAreaProvider>
            <ScrollView>
                <Text style={{
                    fontSize:30,
                    marginTop: 50,
                    marginLeft: 10,
                    marginBottom: 10,
                    }}>
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
                
                <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                    <RadioButton.Item label="不具合報告" value="first" />
                    <RadioButton.Item label="ゲームの追加要望" value="second" />
                    <RadioButton.Item label="その他" value="third" />
                </RadioButton.Group>


                <Input
                    style={styles.Input}
                    // underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    label="要件内容"
                    labelStyle={{
                        marginTop: 10,
                    }}
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
        marginTop: 5,
        borderWidth: 1,
    }
});
  


export default Inquiry;