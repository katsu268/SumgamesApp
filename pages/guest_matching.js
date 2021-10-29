import { Button } from "react-native-elements/dist/buttons/Button"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"


const guest_matching = () =>{
    <SafeAreaProvider>
        <ScrollView>
            <Image source={{ uri:'../assets/images/apex-image.jpg'}} />
            <Text underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                label="募集条件"
                labelStyle={{}}
                labelProps={{}}
                placeholder="募集条件"
                height={150}
                justifyContent="flex-start">
            募集条件
            </Text>
            <Button title="参加"/>
            <Button title="不参加"/>
        </ScrollView>
    </SafeAreaProvider>
}