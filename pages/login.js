import * as React from "react"
import {Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider,} from "native-base"
export const Example = () => {
  return (
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
          <FormControl.Label>ユーザIDを教えてね</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>パスワードだよぉ～</FormControl.Label>
          <Input type="password" />
          <Link
            _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500",
            }}
            alignSelf="flex-end"
            mt="1"
          >
            忘れちゃったの？？？
          </Link>
        </FormControl>
        <Button mt="2" colorScheme="indigo">
        おっけ～ならここ押してね
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            新しい人？.{" "}
          </Text>
          <Link
            _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm",
            }}
            href="#"
          >
            おっけ～ならここ押してね
          </Link>
        </HStack>
      </VStack>
    </Box>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  )
}
