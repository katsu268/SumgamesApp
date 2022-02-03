import * as React from "react";
import {Box, Heading, VStack, FormControl, Input, Button, Center, Text, Link, HStack, Radio, ScrollView, KeyboardAvoidingView, WarningOutlineIcon,useToast } from "native-base";
import AuthContext from '../components/my_context';

const ErrorMessage = (props) => {
  return (
    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
      {props.errormessage}
    </FormControl.ErrorMessage>
  )
}

const Signup = ({navigation}) => {
  const toast = useToast();
  const { signUp } = React.useContext(AuthContext);
  //ユーザー名
  const [username, setUsername] = React.useState("");
  //パスワード
  const [password, setPassword] = React.useState("");
  //パスワード(確認)
  const [password_again, setPasswordAgain] = React.useState("");
  //メール
  const [email, setEmail] = React.useState("");
  //性別
  const [gender, setGender] = React.useState("MA");
  //性別リスト
  const gender_list = {
    "MA":"男性",
    "FE":"女性",
    "EX":"その他",
  }

  const [validationResult, setValidationResult] = React.useState(false);
  const [validationPassword, setValidationPassword] = React.useState(true);
  const validation = async()=>{
    //入力項目が十分であるかチェック
    if (username === "" || email === "" || password === "" || password_again === "" ){
      setValidationResult(false);
    }else{
      setValidationResult(true);
      //パスワードと確認用パスワードが一致しているかチェック
      if (password === password_again){
        setValidationPassword(true);
      }else{
        setValidationPassword(false);
      };
    };
    //入力項目十分、かつ、パスワードが一致していれば、入力された値をdataに入れる
    if (validationResult && validationPassword){
      let data = {
        "username": `${username}`,
        "password": `${password}`,
        "email": `${email}`,
        "gender": `${gender}`,
      }
      const result = await signUp({ data });
      if (result.status === "error"){
        for (const key in result.message) {
          toast.show({
            title: key,
            status: "error",
            description: result.message[key],
            placement: "top"
          });
        }
      }
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
                {/* ユーザー名を入力 */}
                <FormControl.Label>ユーザー名</FormControl.Label>
                <Input value={username} onChangeText={(value)=>setUsername(value)} placeholder="ユーザーID" />
                <ErrorMessage errormessage="入力必須エリアです！"></ErrorMessage>
                <FormControl.HelperText _text={{fontSize: 'xs',color:"red.600"}}>
                  ＊ログイン時に使用します
                </FormControl.HelperText>
              </FormControl>
              <FormControl>
                {/* ラジオボタンで性別を指定(男性/女性/その他) */}
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
                {/* メールアドレスを入力 */}
                <FormControl.Label>Email</FormControl.Label>
                <Input value={email} onChangeText={(value)=>setEmail(value)} placeholder="Email" />
                {/* 未入力時エラー */}
                <ErrorMessage errormessage="入力必須エリアです！"></ErrorMessage>
              </FormControl>
              <FormControl isInvalid={password===""}>
                {/* パスワードを入力 */}
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" value={password} onChangeText={(value)=>setPassword(value)} placeholder="パスワード"/>
                {/* 未入力時エラー */}
                <ErrorMessage errormessage="入力必須エリアです！"></ErrorMessage>
              </FormControl>
              <FormControl isInvalid={password_again===""}>
                {/* 確認用パスワードを入力 */}
                <FormControl.Label>Password ＊確認</FormControl.Label>
                <Input type="password" value={password_again} onChangeText={(value)=>setPasswordAgain(value)} placeholder="もう一度入力してください" />
                {/* 未入力時エラー */}
                <ErrorMessage errormessage="入力必須エリアです！"></ErrorMessage>
                {validationPassword?(
                  <FormControl.HelperText _text={{fontSize: 'xs',color:"red.600"}}>
                  </FormControl.HelperText>
                ):(
                  // パスワードと確認用パスワードが不一致のときエラー
                  <FormControl.HelperText _text={{fontSize: 'xs',color:"red.600"}}>
                    ＊同じパスワードを入力してください。
                  </FormControl.HelperText>
                )}
              </FormControl>
              {/* 入力項目不十分なら押下不可 */}
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
              {/* サインアップ済みユーザーをログインページに誘導 */}
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