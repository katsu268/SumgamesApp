import { Tile, Button, Text, ThemeProvider, Input, Icon, Image } from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


// Your App
const Signup = () => {
  return (
    <SafeAreaProvider>
      <ScrollView>

        <Text style={{
          fontSize:30,
          marginTop: 50,
          marginLeft: 10,
          marginBottom: 10,
          }}>
          サインアップ
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
          placeholder="ユーザー名を入力"
        />

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
          leftIcon={<Icon name="build" size={20} />}
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
          label="パスワード"
          labelStyle={{}}
          labelProps={{}}
          leftIcon={<Icon name="build" size={20} />}
          leftIconContainerStyle={{}}
          rightIcon={<Icon name="close" size={20} />}
          rightIconContainerStyle={{}}
          placeholder="パスワードを入力"
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
          label="パスワード(確認)"
          labelStyle={{}}
          labelProps={{}}
          leftIcon={<Icon name="build" size={20} />}
          leftIconContainerStyle={{}}
          rightIcon={<Icon name="close" size={20} />}
          rightIconContainerStyle={{}}
          placeholder="パスワード(確認)を入力"
          secureTextEntry={true}
        />

        <View style={{ flexDirection: 'row' }}>
        <Button
          buttonStyle={{ 
            width: 150,
           }}
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
          onPress={() => alert("サインアップが成功しました。")}
          title="サインアップ"
          titleProps={{}}
          titleStyle={{ marginHorizontal: 5 }}
        />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Signup;