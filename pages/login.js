import { Tile, Button, ThemeProvider, Input, Icon } from 'react-native-elements';
import React ,{ Component }from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
const Login = ({ navigation }) => {
  //const [request, response, promptAsync] = useAuthRequest({}, {});
  return (
    <SafeAreaProvider>
      <ScrollView>

      <Text style={{
        fontSize:30,
        marginTop: 50,
        marginLeft: 10,
        marginBottom: 10,
        }}>
        ログイン
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

          <View style={{
            flexDirection: "row",
            }}>
              <Button title="ログイン"
                buttonStyle={{ width:100 }}
                containerStyle={{ margin:5 }}
                style={{
                    justifyContent: "flex-start",
                }}
                onPress={() => navigation.navigate('Top')}
                />
          </View>

          <View style={{
            flexDirection: "row",
            }}>
              <Button title="サインアップ"
                buttonStyle={{ width:120 }}
                containerStyle={{ margin:5 }}
                style={{
                    justifyContent: "center",
                }}
                type="clear"
                onPress={() => navigation.navigate('SignUp')}
                />
          </View>

          <View style={{
            flexDirection: "row",
            }}>
              <Button title="パスワードリセット"
                buttonStyle={{ width:168 }}
                containerStyle={{ margin:5 }}
                style={{
                    justifyContent: "center",
                }}
                type="clear"
                onPress={() => navigation.navigate('PasswordReset')}
                />
          </View>

      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Login;