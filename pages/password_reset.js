import * as React from "react";
import {Box, Heading, VStack, FormControl, Input, Button, Center, KeyboardAvoidingView, useToast } from "native-base";
import AuthContext from '../components/my_context';

const PasswordReset = () => {
  const toast = useToast();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [Confirmation,setConfirmation] = React.useState("")
  const { password_reset } = React.useContext(AuthContext);
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
            パスワードリセット
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
            新しいパスワードの登録
          </Heading>

          <VStack space={3} mt="5">
            <FormControl isInvalid={username === ""}>
              <FormControl.Label>username</FormControl.Label>
              <Input value={username} onChangeText={(value)=>setUsername(value)} placeholder="Usernameを入力" />
            </FormControl>
            <FormControl isInvalid={password === "" || (password !== "" && Confirmation !== "" && password!==Confirmation)}>
              <FormControl.Label>新しいパスワード</FormControl.Label>
              <Input type="password" value={password} onChangeText={(value)=>setPassword(value)} placeholder="新しいパスワードを入力" />
            </FormControl>
            <FormControl isInvalid={Confirmation === "" || (password !== "" && Confirmation !== "" && password!==Confirmation)}>
              <FormControl.Label>もう一度新しいパスワード</FormControl.Label>
              <Input type="password" value={Confirmation} onChangeText={(value)=>setConfirmation(value)} placeholder="もう一度新しいパスワードを入力" />
            </FormControl>
            <Button isDisabled={username === "" || password === "" || Confirmation === "" || password !== Confirmation} mt="2" colorScheme="indigo" onPress={async () => {
                const result = await password_reset(
                  {
                    "username": username,
                    "password": password
                  }
                );
                console.log(result);
                if (result.status === "success"){
                  toast.show({
                    title: "Success!!",
                    status: "success",
                    description: "パスワードのリセットに成功しました!\nログイン画面からログインしてください。",
                    placement: "top"
                  });
                }else{
                  toast.show({
                    title: "error",
                    status: "error",
                    description: result.data,
                    placement: "top"
                  });
                }
              }}>
              変更
            </Button>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  )
}

export default PasswordReset;