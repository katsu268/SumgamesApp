import * as React from "react";
import TinderCard from 'react-tinder-card'
import styled from 'styled-components'
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    HStack,
    Stack,
    ZStack,
    Avatar,
    NativeBaseProvider,
    Badge,
    IconButton,
    Icon,
    AlertDialog,
    Button,
} from "native-base"
import { ImageBackground } from "react-native";
import AuthContext from '../components/my_context';
import Loading from '../components/loading';
import { Entypo } from "@expo/vector-icons"

const CardContainer = styled.View`
    width: 100%;
    max-width: 360px;
    height: 440px;
`
const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex:1;
`
const Card = styled.View`
    position: absolute;
    width: 100%;
    max-width: 360px;
    height: 440px;
    shadow-color: black;
    shadow-opacity: 0.2;
    shadow-radius: 20px;
    border-radius: 20px;
    resize-mode: cover;
`


const guest_matching = ({ navigation, route }) =>{
    const { game_id,gameName,gameImage } = route.params;
    const { BASE_URL, get } = React.useContext(AuthContext);
    const [ tinder_cards, setTinderCards] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [childRefs, setchildRefs] = React.useState([]);
    const alreadyRemoved = []
    let [ cardsMemory,setCardsMemory] = React.useState([]);

    const fetchRoomDatas = async (id) => {
        const my_data = await get({url:`api/talkroom/?game_id=${id}`});
        setTinderCards(my_data);
        setCardsMemory(my_data);
        setLoading(false);
    }

    React.useEffect(()=>{
        navigation.setOptions({
            title: gameName
        });
        fetchRoomDatas(game_id);
    },[])

    React.useEffect(()=>{
        setchildRefs(Array(tinder_cards.length).fill(0).map(i => React.createRef()));
    },[tinder_cards])

    const onSwipe = (direction,id) => {
        alreadyRemoved.push(id)
    }
    
    const onCardLeftScreen = (id) => {
        let charactersState = cardsMemory.filter(room => room.id !== id);
        setTinderCards(charactersState);
        setCardsMemory(charactersState);
    }

    const swipe = (dir) => {
        const cardsLeft = tinder_cards.filter(room => !alreadyRemoved.includes(room.id))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
            const index = tinder_cards.map(room => room.id).indexOf(toBeRemoved); // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir); // Swipe the card!
        }
    }

    return(
        // <NativeBaseProvider config={config}>
        <NativeBaseProvider>
            <Box flex={1}>
                <ImageBackground source={{uri:BASE_URL+gameImage}} resizeMode="repeat" style={{flex: 1,justifyContent: "center"}}>
                    {
                        isLoading
                        ?(
                            <Center flex={1}>
                                <Loading size={300} />
                            </Center>
                        )
                        :(
                            (tinder_cards.length)
                            ?(
                                <Container>
                                    <CardContainer>
                                        {tinder_cards.map((u,i)=>{
                                            return (
                                                <TinderCard ref={childRefs[i]} key={u.id} onSwipe={(direction)=>onSwipe(direction,u.id)} onCardLeftScreen={() => onCardLeftScreen(u.id)} preventSwipe={['up', 'down']} >
                                                    <Card>
                                                        <Box
                                                            bg="gray.50"
                                                            p="12"
                                                            rounded="xl"
                                                            _text={{
                                                                fontSize: 'md',
                                                                fontWeight: 'medium',
                                                                color: 'warmGray.50',
                                                                textAlign: 'center',
                                                            }}
                                                            flex={1}
                                                        >
                                                            <Stack p="2" space={3}>
                                                                <Stack space={2}>
                                                                    <Heading size="md" ml="-1">
                                                                        <Avatar.Group size="16" max={5}>
                                                                            {
                                                                                (u.host_user.image === null)
                                                                                ?<Avatar
                                                                                    bg="pink.600"
                                                                                >
                                                                                    {u.host_user.username.slice(0,1).toUpperCase()}
                                                                                </Avatar>
                                                                                :<Avatar
                                                                                    bg="pink.600"
                                                                                    source={{
                                                                                        uri: BASE_URL+u.host_user.image,
                                                                                    }}
                                                                                >
                                                                                    {u.host_user.username.slice(0,1).toUpperCase()}
                                                                                </Avatar>
                                                                            }
                                                                            {u.guest_user.map((user,j)=>{
                                                                                return (
                                                                                    (user.image === null)
                                                                                    ?<Avatar
                                                                                        key={j}
                                                                                        bg="cyan.500"
                                                                                    >
                                                                                        {user.username.slice(0,1).toUpperCase()}
                                                                                    </Avatar>
                                                                                    :<Avatar
                                                                                        key={j}
                                                                                        bg="cyan.500"
                                                                                        source={{
                                                                                            uri: BASE_URL+user.image,
                                                                                        }}
                                                                                    >
                                                                                        {user.username.slice(0,1).toUpperCase()}
                                                                                    </Avatar>
                                                                                );
                                                                            })}
                                                                        </Avatar.Group>
                                                                    </Heading>
                                                                    <Text
                                                                        fontSize="xs"
                                                                        _light={{
                                                                        color: "violet.500",
                                                                        }}
                                                                        _dark={{
                                                                        color: "violet.400",
                                                                        }}
                                                                        fontWeight="500"
                                                                        ml="-0.5"
                                                                        mt="-1"
                                                                    >
                                                                        あと
                                                                        <Text bold fontSize="lg" >{Number(u.recruit_num) - u.guest_user.length}</Text>
                                                                        人募集中！！！
                                                                    </Text>
                                                                </Stack>
                                                                <Stack>
                                                                    <Badge colorScheme="success" variant="outline">募集プラットフォーム</Badge>
                                                                    <HStack space={3} alignItems="center" style={{flexWrap:"wrap"}} mt={2}>
                                                                        {u.recruit_platform.map((paltform,k)=>{
                                                                        return (
                                                                            <Center key={k} h="5" w="auto" bg="emerald.500" pr="1" pl="1" rounded="md" shadow={3} mb="2" >{paltform}</Center>
                                                                        )
                                                                        })}
                                                                    </HStack>
                                                                </Stack>
                                                                <Stack>
                                                                    <Badge colorScheme="info" variant="outline" mb={1}>募集内容</Badge>
                                                                    <Text fontWeight="400">
                                                                        {u.recruit_context}
                                                                    </Text>
                                                                </Stack>
                                                            </Stack>
                                                        </Box>
                                                    </Card>
                                                </TinderCard>
                                            );
                                        })}
                                    </CardContainer>
                                    <HStack alignItems="center" maxWidth={360}>
                                        <Center flex={1}>
                                            <IconButton
                                                icon={<Icon as={Entypo} name="emoji-sad" />}
                                                borderRadius="full"
                                                _icon={{
                                                    color: "blue.500",
                                                    size: "md",
                                                }}
                                                _hover={{
                                                    bg: "blue.600:alpha.20",
                                                }}
                                                _pressed={{
                                                    bg: "blue.600:alpha.20",
                                                    _ios: {
                                                    _icon: {
                                                        size: "2xl",
                                                    },
                                                    },
                                                }}
                                                _ios={{
                                                    _icon: {
                                                    size: "2xl",
                                                    },
                                                }}
                                                onPress={() => swipe('left')}
                                            />
                                        </Center>
                                        <Center flex={1}>
                                            <IconButton
                                                icon={<Icon as={Entypo} name="emoji-happy" />}
                                                borderRadius="full"
                                                _icon={{
                                                    color: "rose.500",
                                                    size: "md",
                                                }}
                                                _hover={{
                                                    bg: "rose.600:alpha.20",
                                                }}
                                                _pressed={{
                                                    bg: "rose.600:alpha.20",
                                                    _icon: {
                                                    name: "emoji-flirt",
                                                    },
                                                    _ios: {
                                                    _icon: {
                                                        size: "2xl",
                                                    },
                                                    },
                                                }}
                                                _ios={{
                                                    _icon: {
                                                    size: "2xl",
                                                    },
                                                }}
                                                onPress={() => swipe('right')}
                                            />
                                        </Center>
                                    </HStack>
                                </Container>
                            )
                            :(
                                <Center flex={1}>
                                    <AlertDialog
                                        isOpen={true}
                                    >
                                        <AlertDialog.Content>
                                        <AlertDialog.Header>現在、募集中のホストがいません。</AlertDialog.Header>
                                        <AlertDialog.Body>
                                            現在、募集中のホストがいません。
                                            あなたがホストユーザーとなって、仲間を募集しましょう！
                                        </AlertDialog.Body>
                                        <AlertDialog.Footer>
                                            <Button.Group space={2}>
                                            <Button
                                                variant="unstyled"
                                                colorScheme="coolGray"
                                                onPress={()=>{
                                                    setLoading(true);
                                                    fetchRoomDatas(game_id);
                                                }}
                                            >
                                                もう一度検索する
                                            </Button>
                                            <Button colorScheme="danger" onPress={()=>navigation.goBack()}>
                                                ゲーム詳細へ戻る
                                            </Button>
                                            </Button.Group>
                                        </AlertDialog.Footer>
                                        </AlertDialog.Content>
                                    </AlertDialog>
                                </Center>
                            )
                        )
                    }
                </ImageBackground>
            </Box>
        </NativeBaseProvider>
    )
}

export default guest_matching;