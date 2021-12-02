import * as React from "react";
import {Box, Heading, VStack, FormControl, Input, Button, Link, Center } from "native-base";
import AuthContext from '../components/my_context';


const Login = ({navigation}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);
  return (
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
          いらっしゃい　待ってたよ
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
          サインアップしなきゃダメだよぉ～💦
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>ユーザ名を教えてね</FormControl.Label>
            <Input value={username} onChangeText={(value)=>setUsername(value)} placeholder="ユーザーID" />
          </FormControl>
          <FormControl>
            <FormControl.Label>パスワードだよぉ～</FormControl.Label>
            <Input type="password" value={password} onChangeText={(value)=>setPassword(value)} placeholder="パスワードリセット" />
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
              忘れちゃったの？？？
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={() => signIn({ username, password })}>
            おっけ～ならここ押してね
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}

export default Login;