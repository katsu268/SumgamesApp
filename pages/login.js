import * as React from "react";
import {Box, Heading, VStack, FormControl, Input, Button, Link, Center, KeyboardAvoidingView, useToast } from "native-base";
import AuthContext from '../components/my_context';

const Login = ({navigation}) => {
  const toast = useToast();
  //ユーザー名
  const [username, setUsername] = React.useState("");
  //パスワード
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);
  return (
    <KeyboardAvoidingView
      h={{
        base: "600px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center flex={1} px="3">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            ようこそ
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            ログインしてください
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              {/* ユーザー名を入力 */}
              <FormControl.Label>ユーザ名</FormControl.Label>
              <Input value={username} onChangeText={(value)=>setUsername(value)} placeholder="ユーザーID" />
            </FormControl>
            <FormControl>
              {/* パスワードを入力 */}
              <FormControl.Label>パスワード</FormControl.Label>
              <Input type="password" value={password} onChangeText={(value)=>setPassword(value)} placeholder="パスワード" />
              {/* パスワード再設定ページに遷移 */}
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
                onPress={()=>{navigation.navigate("PasswordReset")}}
              >
                パスワードを忘れた方はこちら
              </Link>
            </FormControl>
            {/* 入力項目不十分なら押下不可 */}
            <Button isDisabled={username === "" || password === ""} mt="2" colorScheme="indigo" onPress={async () => {
                let result = await signIn({ username, password });
                console.log(result);
                for (const iterator of result) {
                  toast.show({
                    title: iterator,
                    status: "error",
                    placement: "top"
                  });
                }
              }}>
              ログイン
            </Button>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  )
}

export default Login;