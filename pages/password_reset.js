import { Tile, Button, ThemeProvider, Input, Icon } from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


// Your App
const PasswordReset = () => {
  return (
    <SafeAreaProvider>
      <ScrollView>

        <Text style={{
          fontSize:30,
          marginTop: 50,
          marginLeft: 10,
          marginBottom: 10,
          }}>
          パスワードリセット
        </Text>


        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          inputContainerStyle={{}}
          errorMessage="Oops! that's not correct."
          errorStyle={{}}
          errorProps={{}}
          inputStyle={{}}
          label="メールアドレス"
          labelStyle={{}}
          labelProps={{}}
          leftIcon={<Icon name="person" size={20} />}
          leftIconContainerStyle={{}}
          rightIcon={<Icon name="close" size={20} />}
          rightIconContainerStyle={{}}
          placeholder="メールアドレスを入力"
        />
        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          inputContainerStyle={{}}
          errorMessage="Oops! that's not correct."
          errorStyle={{}}
          errorProps={{}}
          inputStyle={{}}
          label="新しいパスワード"
          labelStyle={{}}
          labelProps={{}}
          leftIcon={<Icon name="build" size={20} />}
          leftIconContainerStyle={{}}
          rightIcon={<Icon name="close" size={20} />}
          rightIconContainerStyle={{}}
          placeholder="新しいパスワードを入力"
          secureTextEntry={true}
        />
        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          inputContainerStyle={{}}
          errorMessage="Oops! that's not correct."
          errorStyle={{}}
          errorProps={{}}
          inputStyle={{}}
          label="新しいパスワード(確認)"
          labelStyle={{}}
          labelProps={{}}
          leftIcon={<Icon name="build" size={20} />}
          leftIconContainerStyle={{}}
          rightIcon={<Icon name="close" size={20} />}
          rightIconContainerStyle={{}}
          placeholder="新しいパスワード(確認)を入力"
          secureTextEntry={true}
        />
        <Button
          buttonStyle={{ width: 150 }}
          containerStyle={{ margin: 5 }}
          disabledStyle={{
            borderWidth: 2,
            borderColor: "#00F"
          }}
          disabledTitleStyle={{ color: "#00F" }}
          icon={<Icon name="build" size={15} color="#0FF" />}
          iconContainerStyle={{ background: "#000" }}
          loadingProps={{ animating: true }}
          loadingStyle={{}}
          onPress={() => alert("パスワード変更用メールを送信しました。")}
          title="変更"
          titleProps={{}}
          titleStyle={{ marginHorizontal: 5 }}
        />
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default PasswordReset;