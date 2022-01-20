import * as React from "react";
import {Box, Heading, VStack, FormControl, Input, Button, Center, Text, Link, HStack, Radio, ScrollView, KeyboardAvoidingView, WarningOutlineIcon,} from "native-base";
import AuthContext from '../components/my_context';

const ErrorMessage = (props) => {
  return (
    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
      {props.errormessage}
    </FormControl.ErrorMessage>
  )
}

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
      if (password === password_again){
        setValidationPassword(true);
      }else{
        setValidationPassword(false);
      };
    };
    if (validationResult && validationPassword){
      let data = {
        "username": `${username}`,
        "password": `${password}`,
        "email": `${email}`,
        "gender": `${gender}`,
      }
      signUp({ data });
    };
  }

  return (
    <KeyboardAvoidingView
      h={{
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
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
              <FormControl isInvalid={username===""}>
                <FormControl.Label>ユーザー名</FormControl.Label>
                <Input value={username} onChangeText={(value)=>setUsername(value)} placeholder="ユーザーID" />
                <ErrorMessage errormessage="入力必須エリアです！"></ErrorMessage>
                <FormControl.HelperText _text={{fontSize: 'xs',color:"red.600"}}>
                  ＊ログイン時に使用します
                </FormControl.HelperText>
              </FormControl>
              <FormControl>
                <FormControl.Label>性別</FormControl.Label>
                <Radio.Group
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={gender}
                  onChange={(nextValue) => {
                    setGender(nextValue)
                  }}
                >
                  {
                    Object.keys(gender_list).map((u,i)=>{
                      return (
                        <Radio key={i} value={u} my={1}>
                          {gender_list[u]}
                        </Radio>
                      )
                    })
                  }
                </Radio.Group>
              </FormControl>
              <FormControl isInvalid={email===""}>
                <FormControl.Label>Email</FormControl.Label>
                <Input value={email} onChangeText={(value)=>setEmail(value)} placeholder="Email" />
                <ErrorMessage errormessage="入力必須エリアです！"></ErrorMessage>
              </FormControl>
              <FormControl isInvalid={password===""}>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" value={password} onChangeText={(value)=>setPassword(value)} placeholder="パスワード"/>
                <ErrorMessage errormessage="入力必須エリアです！"></ErrorMessage>
              </FormControl>
              <FormControl isInvalid={password_again===""}>
                <FormControl.Label>Password ＊確認</FormControl.Label>
                <Input type="password" value={password_again} onChangeText={(value)=>setPasswordAgain(value)} placeholder="もう一度入力してください" />
                <ErrorMessage errormessage="入力必須エリアです！"></ErrorMessage>
                {validationPassword?(
                  <FormControl.HelperText _text={{fontSize: 'xs',color:"red.600"}}>
                  </FormControl.HelperText>
                ):(
                  <FormControl.HelperText _text={{fontSize: 'xs',color:"red.600"}}>
                    ＊同じパスワードを入力してください。
                  </FormControl.HelperText>
                )}
              </FormControl>
              <Button isDisabled={username === "" || email === "" || password === "" || password_again === "" || password !== password_again} mt="2" colorScheme="indigo" onPress={()=>{validation()}}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Signup;