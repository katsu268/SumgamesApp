import * as React from "react";
import { Tile } from 'react-native-elements';
import { NativeBaseProvider, Pressable, ScrollView, Heading, Button, Box, Image, Stack, HStack, Text, Icon, AspectRatio, Center, Divider, Input, SearchIcon, IconButton} from 'native-base';
import Loading from "../components/loading";
import AuthContext from '../components/my_context';
import { Ionicons } from "@expo/vector-icons";


const TopPage = ({navigation}) => {
  const [isLoading, setLoading] = React.useState(false);
  const [isFetching,setIsFetching] = React.useState(true);
  const [data, setData] = React.useState([]);
  const { get } = React.useContext(AuthContext);
  const { BASE_URL } = React.useContext(AuthContext);
  
  //検索バーで使用
  const [value, setValue] = React.useState("");
  const [searchedData, setSearchedData] = React.useState([]);
  
  //キーワードを元にゲームを検索し、結果を変数にセット
  const searchGame = async () => {
    setLoading(true);
    const url = `api/gameitem/?search=${value}`;
    const searched_data = await get({url});
    setSearchedData(searched_data);
    setLoading(false);
    return;
  }

  //ランキングを取得
  const fetchData = async() => {
    setIsFetching(true);
    const url = "api/gameitem/"
    const my_data = await get({url});
    if (my_data !== undefined){
      setData(my_data);
    }
    setIsFetching(false);
  }

  //ページ読み込み時の処理
  React.useEffect(() => {
    fetchData();
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
          <Input returnKeyType="search" value={value} onChangeText={(value)=>setValue(value)} m="2" size="2xl" variant="rounded" placeholder="ゲームを検索" InputLeftElement={<SearchIcon ml="3" color="muted.400" size="4"/>} InputRightElement={<Button isDisabled={value===""} h="full" px="4" onPress={searchGame}>検索</Button>}/>
        </Box>
          {isLoading?(
            <Center flex="1" my="10"><Loading size={150}/></Center>
          ):(
            //検索結果
            <ScrollView horizontal={true}>
              {searchedData.map((u,i)=>{
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
                      </Box>
                      <Stack p="4" space={3}>
                        <Stack space={2}>
                          <Heading size="md" ml="-1">
                            {u.game_name}
                          </Heading>
                          <HStack space={3} alignItems="center" style={{flexWrap:"wrap"}}>
                            {u.genre.map((u,i)=>{
                              return (
                                <Center key={i} h="5" w="auto" bg="primary.500" pr="1" pl="1" rounded="md" shadow={3} mb="2">{u.genrename}</Center>
                              )
                            })}
                            {u.tags.map((u,i)=>{
                              return (
                                <Center key={i} h="5" w="auto" bg="secondary.500" pr="1" pl="1" rounded="md" shadow={3} mb="2">{u.tag_name}</Center>
                              )
                            })}
                          </HStack>
                          <HStack space={3} alignItems="center" style={{flexWrap:"wrap"}}>
                            {u.platform.map((u,i)=>{
                              return (
                                <Center key={i} h="5" w="auto" bg="emerald.500" pr="1" pl="1" rounded="md" shadow={3} mb="2" >{u.platform_name}</Center>
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
          )}
        
        <HStack alignItems="center" maxWidth={360}>
          <Heading pt="2" pl="5" size="xl" letterSpacing="1.5">ランキング</Heading>
          {/* ランキング再読み込みボタン */}
          <Center pt="2">
            <IconButton
              icon={<Icon as={Ionicons} name="reload"/>}
              borderRadius="full"
              _icon={{
                color: "primary.500",
                size: "md",
              }}
              _hover={{
                  bg: "blue.600:alpha.20",
              }}
              _pressed={{
                  bg: "blue.600:alpha.20",
                  _ios: {
                  _icon: {
                      size: "md",
                  },
                  },
              }}
              _ios={{
                  _icon: {
                  size: "md",
                  },
              }}
              onPress={fetchData}
            />
          </Center>
        </HStack>
        <Divider my="2" />
        {isFetching?(
          <Center flex="1" my="10"><Loading size={150}/></Center>
        ):(
          // ランキング
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
                        <HStack space={3} alignItems="center" style={{flexWrap:"wrap"}}>
                          {u.genre.map((u,i)=>{
                            return (
                              <Center key={i} h="5" w="auto" bg="primary.500" pr="1" pl="1" rounded="md" shadow={3} mb="2">{u.genrename}</Center>
                            )
                          })}
                          {u.tags.map((u,i)=>{
                            return (
                              <Center key={i} h="5" w="auto" bg="secondary.500" pr="1" pl="1" rounded="md" shadow={3} mb="2">{u.tag_name}</Center>
                            )
                          })}
                        </HStack>
                        <HStack space={3} alignItems="center" style={{flexWrap:"wrap"}}>
                          {u.platform.map((u,i)=>{
                            return (
                              <Center key={i} h="5" w="auto" bg="emerald.500" pr="1" pl="1" rounded="md" shadow={3} mb="2" >{u.platform_name}</Center>
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
        )}
        <Divider my="3" />
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default TopPage;