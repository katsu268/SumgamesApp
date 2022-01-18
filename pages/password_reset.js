import * as React from "react";
import {Box, Heading, VStack, FormControl, Input, Button, Link, Center, KeyboardAvoidingView } from "native-base";
import AuthContext from '../components/my_context';
import ErrorMessage from './signup';


const Login = ({navigation}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessages, setErrorMessages] = React.useState([]);
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
            <FormControl isInvalid={errorMessages===[]}>
              <FormControl.Label>Email</FormControl.Label>
              <Input value={username} onChangeText={(value)=>setUsername(value)} placeholder="Emailを入力" />
            </FormControl>
            <FormControl isInvalid={errorMessages===[]}>
              <FormControl.Label>新しいパスワード</FormControl.Label>
              <Input type="password" value={password} onChangeText={(value)=>setPassword(value)} placeholder="新しいパスワードを入力" />
            </FormControl>
            <FormControl isInvalid={errorMessages==[]}>
              <FormControl.Label>再度新しいパスワードを入力</FormControl.Label>
              <Input type="password" value={password} onChangeText={(value)=>setPassword(value)} placeholder="再度新しいパスワードを入力" />
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={async () => {
                let result = await signIn({ username, password });
                console.log(result);
              }}>
              登録
            </Button>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  )
}

export default Login;