import * as React from "react";
import {Box, Heading, VStack, FormControl, Input, Button, Center, Text, Link, HStack} from "native-base";
import { AuthContext } from "../App";

const Signup = ({navigation}) => {
  const { signUp } = React.useContext(AuthContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_again, setPasswordAgain] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("MA");
  const gender_list = {
    "MA":"男性",
    "FE":"女性",
    "EX":"その他",
  }

  const [validationResult, setValidationResult] = React.useState(false);
  const [validationPassword, setValidationPassword] = React.useState(true);
  const validation = ()=>{
    if (username === "" || email === "" || password === "" || password_again === "" ){
      setValidationResult(false);
    }else{
      setValidationResult(true);
    };
    if (password == password_again){
      setValidationPassword(true);
    }else{
      setValidationPassword(false);
    };
    console.log(`validationResult : ${validationResult}`);
    console.log(`validationPassword: ${validationPassword}`);
    console.log(`${password}: ${password_again}`);
    if (validationResult && validationPassword){
      let data = {
        "username": `${username}`,
        "password": `${password}`,
        "first_name": "",
        "last_name": "",
        "email": `${email}`,
        "gender": `${gender}`,
        "introduction": "",
        "image": null
      }
      signUp({ data });
    };
  }

  return (
    <Center flex={1} px="3">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          ようこそ
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          サインアップしてください
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>ユーザー名</FormControl.Label>
            <Input value={username} onChangeText={(value)=>setUsername(value)} placeholder="ユーザーID" />
            <FormControl.HelperText _text={{fontSize: 'xs',color:"red.600"}}>
              ＊ログイン時に使用します
            </FormControl.HelperText>
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={(value)=>setEmail(value)} placeholder="Email" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" value={password} onChangeText={(value)=>setPassword(value)} placeholder="パスワード"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" value={password_again} onChangeText={(value)=>setPasswordAgain(value)} placeholder="もう一度入力してください" />
            {validationPassword?(
              <FormControl.HelperText _text={{fontSize: 'xs',color:"red.600"}}>
              </FormControl.HelperText>
            ):(
              <FormControl.HelperText _text={{fontSize: 'xs',color:"red.600"}}>
                ＊同じパスワードを入力してください。
              </FormControl.HelperText>
            )}
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={()=>{validation()}}>
            Sign up
          </Button>
        </VStack>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            すでにアカウントをお持ちですか？
          </Text>
          <Link
            _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm",
            }}
            onPress={()=>{navigation.navigate("Login")}}
          >
            ログインはこちら
          </Link>
        </HStack>
      </Box>
    </Center>
  )
}

export default Signup;