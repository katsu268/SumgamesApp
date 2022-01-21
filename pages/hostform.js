import * as React from "react";
import {Box, Heading, VStack, FormControl, Button, Center, ScrollView, Select, CheckIcon, Radio, TextArea, HStack, Checkbox, Pressable } from "native-base";
import { Tile } from 'react-native-elements';
import AuthContext from '../components/my_context';

const HostForm = ({ route,navigation }) => {
    const { detail } = route.params;
    const { BASE_URL, post, host_talkroom } = React.useContext(AuthContext);
    //募集人数
    const [recruit_num, setRecruitNum] = React.useState("1");
    const gender = {
        "AL":"誰でも",
        "MA":"男性のみ",
        "FE":"女性のみ",
    };
    //募集性別
    const [recruit_gender, setRecruitGender] = React.useState("AL");
    //募集プラットフォーム
    const [recruit_platform, setRecruitPlatform] = React.useState(()=>{
        const default_platform = [];
        detail.platform.map((u,i)=>{
            default_platform.push(u.id);
        })
        return default_platform;
    });

    //プラットフォームの全選択
    const select_all_platform = ()=>{
        const default_platform = [];
        detail.platform.map((u,i)=>{
            default_platform.push(u.id);
        })
        setRecruitPlatform(default_platform);
    };

    //プラットフォームの選択全解除
    const unselect_all_platform = ()=>{
        setRecruitPlatform([]);
    };
    //募集内容
    const [recruit_context, setRecruitContext] = React.useState("");

    const create_talkroom = async ()=>{
        const data = {
            "game": detail.id,
            "recruit_platform": recruit_platform,
            "recruit_num": Number(recruit_num),
            "recruit_gender": recruit_gender,
        }
        if (recruit_context === "") {
            data["recruit_context"] = "誰でも気軽に参加してください。";
        }else{
            data["recruit_context"] = recruit_context;
        }
        const response = await post({url:"api/talkroom/",data});
        host_talkroom({talkroomID:response.id})
    };

    const [isDisabled, setIsDisabled] = React.useState(false);

    React.useEffect(()=>{
        if (recruit_platform.length){
            setIsDisabled(false);
        }else{
            setIsDisabled(true);
        }
    },[recruit_platform]);

    return (
        <ScrollView>
            <Tile
                title={detail.game_name}
                imageSrc={{
                    uri:BASE_URL+detail.image
                }}
                titleStyle={{
                    fontSize:30,
                    fontWeight:'700',
                    letterSpacing:1.5
                }}
                imageContainerStyle={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                }}
                featured
                caption={detail.detail}
                height={230}
            />
            <Center flex={1} px="3">
                <Box safeArea w="90%" maxW="290" >
                    <Heading
                        size="lg"
                        fontWeight="600"
                        color="coolGray.800"
                        _dark={{
                        color: "warmGray.50",
                        }}
                    >
                        募集条件
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
                        マッチングの条件を入力してください
                    </Heading>
        
                    <VStack space={3} my="5">
                        <FormControl>
                            <FormControl.Label>募集人数</FormControl.Label>
                            <Select
                                selectedValue={recruit_num}
                                minWidth="200"
                                accessibilityLabel="Choose Service"
                                placeholder="Choose Service"
                                _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) => setRecruitNum(itemValue)}
                            >
                                {[...Array(50).keys()].map((u,i)=>{
                                    return (
                                        <Select.Item key={i} label={String(u+1)} value={String(u+1)} />
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>募集性別</FormControl.Label>
                            <Radio.Group
                                name="myRadioGroup"
                                accessibilityLabel="favorite number"
                                value={recruit_gender}
                                onChange={(nextValue) => {
                                    setRecruitGender(nextValue)
                                }}
                            >
                            {
                                Object.keys(gender).map((u,i)=>{
                                return (
                                    <Radio key={i} value={u} my={1}>
                                        {gender[u]}
                                    </Radio>
                                )
                                })
                            }
                            </Radio.Group>
                        </FormControl>
                        <FormControl>
                            <HStack space={3} alignItems="center" mb="3">
                                <FormControl.Label>募集プラットフォーム</FormControl.Label>
                                <Pressable onPress={select_all_platform}>
                                    <Center h="7" w="auto" bg="primary.500" px="2" rounded="md" shadow={3} >全選択</Center>
                                </Pressable>
                                <Pressable onPress={unselect_all_platform}>
                                    <Center h="7" w="auto" bg="secondary.500" px="2" rounded="md" shadow={3} >全解除</Center>
                                </Pressable>
                            </HStack>
                            <Checkbox.Group
                                onChange={setRecruitPlatform}
                                value={recruit_platform}
                                accessibilityLabel="プラットフォームを選んでください。"
                            >
                                <HStack space={3} alignItems="center" style={{flexWrap:"wrap"}}>
                                    {detail.platform.map((u,i)=>{
                                        return (
                                            <Checkbox key={i} value={u.id} my="1">
                                                {u.platform_name}
                                            </Checkbox>
                                        )
                                    })}
                                </HStack>
                            </Checkbox.Group>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>募集内容</FormControl.Label>
                            <TextArea
                                h={20}
                                placeholder="誰でも気軽に参加してください。"
                                value={recruit_context}
                                onChangeText={(context)=>{setRecruitContext(context)}}
                                w={{
                                    base: "100%",
                                    md: "25%",
                                }}
                            />
                        </FormControl>
                        <Button isDisabled={isDisabled} mt="2" colorScheme="indigo" onPress={()=>{create_talkroom()}}>
                            募集
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </ScrollView>
    )
}

export default HostForm;