import * as React from "react";
import { Tile } from 'react-native-elements';
import { NativeBaseProvider, Pressable, ScrollView, Heading, Button, Box, Image, Stack, HStack, Text, AspectRatio, Center, Divider, Input, SearchIcon} from 'native-base';
import Loading from "../components/loading";
import { AuthContext } from "../App";

const TopPage = ({navigation}) => {
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const { get } = React.useContext(AuthContext);
  const { BASE_URL } = React.useContext(AuthContext);
  
  //検索バーで使用
  const [value, setValue] = React.useState("");
  const [searchedData, setSearchedData] = React.useState([]);
  const searchGame = () => {
    // setLoading(true);
    // let url = `api/gameitem/?search=${value}`;
    // get({url})
    // .then((game_data) => setSearchedData(game_data))
    // .finally(()=>{setLoading(false)});
    // return;
  }

  React.useEffect(async () => {
    const url = "api/gameitem/"
    const my_data = await get({url});
    setData(my_data);
  }, []);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Tile
          imageSrc={require('../assets/images/gamer.png')}
          titleStyle={{
            fontSize:40,
            fontWeight:'700',
          }}
          featured
          height={300}
        />
        <Box>
          <Input returnKeyType="search" value={value} onChangeText={(value)=>setValue(value)} m="2" size="2xl" variant="rounded" placeholder="ゲームを検索" InputLeftElement={<SearchIcon ml="3" color="muted.400" size="4"/>} InputRightElement={<Button h="full" onPress={searchGame}>検索</Button>}/>
        </Box>
        <ScrollView horizontal={true}>
          {isLoading?(
            <Box flex="1"><Loading size={100}/></Box>
          ):(
            searchedData.map((u,i)=>{
              return (
                <Pressable 
                  key={i}
                  ml="5"
                  mt="1"
                  w="260"
                  h="380"
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
                  _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700",
                  }}
                  _web={{
                    shadow: 2,
                    borderWidth: 0,
                  }}
                  _light={{
                    backgroundColor: "gray.50",
                  }}
                  onPress={()=>{
                    navigation.navigate('game_detail', {
                      detail:u
                    });
                  }}
                  >
                    <Box>
                      <AspectRatio w="100%" ratio={16 / 9}>
                        <Image
                          source={{
                            uri: BASE_URL+u.image,
                          }}
                          alt="image"
                        />
                      </AspectRatio>
                      <Center
                        bg="violet.500"
                        _dark={{
                          bg: "violet.400",
                        }}
                        _text={{
                          color: "warmGray.50",
                          fontWeight: "700",
                          fontSize: "xs",
                        }}
                        position="absolute"
                        bottom="0"
                        px="3"
                        py="1.5"
                      >
                        {i+1}
                      </Center>
                    </Box>
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Heading size="md" ml="-1">
                          {u.game_name}
                        </Heading>
                        <HStack space={3} alignItems="center">
                          {u.genre.map((u,i)=>{
                            return (
                              <Center key={i} h="5" w="auto" bg="primary.500" pr="1" pl="1" rounded="md" shadow={3} >{u.genrename}</Center>
                            )
                          })}
                          {u.tags.map((u,i)=>{
                            return (
                              <Center key={i} h="5" w="auto" bg="secondary.500" pr="1" pl="1" rounded="md" shadow={3} >{u.tag_name}</Center>
                            )
                          })}
                        </HStack>
                        <HStack space={3} alignItems="center">
                          {u.platform.map((u,i)=>{
                            return (
                              <Center key={i} h="5" w="auto" bg="emerald.500" pr="1" pl="1" rounded="md" shadow={3} >{u.platform_name}</Center>
                            )
                          })}
                        </HStack>
                      </Stack>
                      <Text fontWeight="400">
                        {u.detail}
                      </Text>
                    </Stack>
                </Pressable>
              )
            })
          )}
        </ScrollView>
        <Box>
          <Heading pt="2" pl="5" size="xl" letterSpacing="1.5">ランキング</Heading>
        </Box>
        <Divider my="2" />
        <ScrollView horizontal={true}>
          {data.map((u,i)=>{
            return (
              <Pressable 
                key={i}
                ml="5"
                mt="1"
                w="260"
                h="380"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700",
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: "gray.50",
                }}
                onPress={()=>{
                  navigation.navigate('game_detail', {
                    detail:u
                  });
                }}>
                  <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                      <Image
                        source={{
                          uri: BASE_URL+u.image,
                        }}
                        alt="image"
                      />
                    </AspectRatio>
                    <Center
                      bg="violet.500"
                      _dark={{
                        bg: "violet.400",
                      }}
                      _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs",
                      }}
                      position="absolute"
                      bottom="0"
                      px="3"
                      py="1.5"
                    >
                      {i+1}
                    </Center>
                  </Box>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1">
                        {u.game_name}
                      </Heading>
                      <HStack space={3} alignItems="center">
                        {u.genre.map((u,i)=>{
                          return (
                            <Center key={i} h="5" w="auto" bg="primary.500" pr="1" pl="1" rounded="md" shadow={3} >{u.genrename}</Center>
                          )
                        })}
                        {u.tags.map((u,i)=>{
                          return (
                            <Center key={i} h="5" w="auto" bg="secondary.500" pr="1" pl="1" rounded="md" shadow={3} >{u.tag_name}</Center>
                          )
                        })}
                      </HStack>
                      <HStack space={3} alignItems="center">
                        {u.platform.map((u,i)=>{
                          return (
                            <Center key={i} h="5" w="auto" bg="emerald.500" pr="1" pl="1" rounded="md" shadow={3} >{u.platform_name}</Center>
                          )
                        })}
                      </HStack>
                    </Stack>
                    <Text fontWeight="400">
                      {u.detail}
                    </Text>
                  </Stack>
              </Pressable>
            )
          })}
        </ScrollView>
        <Divider my="3" />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default TopPage;