import * as React from "react";
import {Box, Heading, VStack, FormControl, TextArea, Button, Link, Radio, Center, KeyboardAvoidingView } from "native-base";
import AuthContext from '../components/my_context';


const Login = ({navigation}) => {
//   const [type, setType] = React.useState("");
  const [contents, setContents] = React.useState("");
  const { post } = React.useContext(AuthContext);
  const [type, setGender] = React.useState("");
  const type_list = {
    "defect":"不具合報告",
    "addition":"ゲームの追加要望",
    "others":"その他",
  }

  const [isDisabled, setIsDisabled] = React.useState(false);

  React.useEffect(()=>{
      if (type !== ""){
          setIsDisabled(false);
      }else{
          setIsDisabled(true);
      }
  },[type_list]);


  return (
    <KeyboardAvoidingView
      h={{
        base: "600px",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Center flex={1} px="3">
        <Box safeArea p="1" py="8" w="100%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
              お問い合わせ
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
            お問い合わせ内容を入力してください
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>お問い合わせの種類</FormControl.Label>
              <Radio.Group
                  name="mytypeGroup"
                  accessibilityLabel="favorite number"
                  value={type}
                  onChange={(nextValue) => {
                    setGender(nextValue)
                  }}
                >
                  {
                    Object.keys(type_list).map((u,i)=>{
                      return (
                        <Radio key={i} value={u} my={1}>
                          {type_list[u]}
                        </Radio>
                      )
                    })
                  }
            </Radio.Group>
            </FormControl>
            <FormControl>
              <FormControl.Label>お問い合わせ内容</FormControl.Label>
                <TextArea
                    h={20}
                    placeholder="Text Area Placeholder"
                    w={{
                        base: "100%",
                        md: "25%",
                    }}
                />
            </FormControl>
            <Button isDisabled={isDisabled} mt="2" colorScheme="indigo" onPress={() => signIn({ type, contents })}>
              送信
            </Button>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  )
}

export default Login;