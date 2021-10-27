import { Tile, Button, ThemeProvider, Input, Icon } from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

//WebBrowser.maybeCompleteAuthSession();

//const request = new AuthRequest({ },{ });
//const result = await request.promptAsync(discovery, { useProxy: true });
//const config = {};
//const discovery = useAutoDiscovery('http://localhost:8000');
//AuthSession.makeRedirectUri({ useProxy: true })
// Your App
const Login = () => {
  //const [request, response, promptAsync] = useAuthRequest({}, {});
  return (
    <SafeAreaProvider>
      <ScrollView>
      <Tile
          imageSrc={require('../assets/images/gamer.jpg')}
          title="SUMGAMES"
          titleStyle={{
            fontSize:40,
            fontWeight:'700',
          }}
          featured
          caption="FOR ALL GAMERS"
          height={200}
        />

        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          inputContainerStyle={{}}
          errorMessage="Oops! that's not correct."
          errorStyle={{}}
          errorProps={{}}
          inputStyle={{}}
          label="User Form"
          labelStyle={{}}
          labelProps={{}}
          leftIcon={<Icon name="person" size={20} />}
          leftIconContainerStyle={{}}
          rightIcon={<Icon name="close" size={20} />}
          rightIconContainerStyle={{}}
          placeholder="Enter Name"
        />
        <Input
          containerStyle={{}}
          disabledInputStyle={{ background: "#ddd" }}
          inputContainerStyle={{}}
          errorMessage="Oops! that's not correct."
          errorStyle={{}}
          errorProps={{}}
          inputStyle={{}}
          label="Password Form"
          labelStyle={{}}
          labelProps={{}}
          leftIcon={<Icon name="build" size={20} />}
          leftIconContainerStyle={{}}
          rightIcon={<Icon name="close" size={20} />}
          rightIconContainerStyle={{}}
          placeholder="Enter Password"
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
          onPress={() => alert("ログインが成功しました。")}
          title="Login"
          titleProps={{}}
          titleStyle={{ marginHorizontal: 5 }}
        />
        <Button
          buttonStyle={{ width: 250 }}
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
          onPress={() => alert("パスワード変更用ページに遷移します。")}
          title="Forgot Password"
          titleProps={{}}
          titleStyle={{ marginHorizontal: 5 }}
        />

      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Login;