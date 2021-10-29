import * as React from "react";
import { Input, Icon, ButtonGroup } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const HostForm = () =>{

    const [
        selectedIndex,
        setSelectedIndex
      ] = React.useState(1);
      const [
        selectedIndexes,
        setSelectedIndexes
      ] = React.useState([]);

    return (
      <SafeAreaProvider>
        <ScrollView>
            <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="Game Title"
                labelStyle={{}}
                labelProps={{}}
                leftIcon={<Icon name="person" size={20} />}
                leftIconContainerStyle={{}}
                placeholder="Game Title"
            />

            <Input
                containerStyle={{}}
                disabledInputStyle={{ background: "#ddd" }}
                inputContainerStyle={{}}
                inputStyle={{}}
                label="Counts"
                labelStyle={{}}
                labelProps={{}}
                leftIcon={<Icon name="person" size={20} />}
                leftIconContainerStyle={{}}
                placeholder="Counts"
            />

            <ButtonGroup
                buttonContainerStyle={{}}
                buttons={["male", "female", "Non-binary"]}
                containerStyle={{}}
                disabledStyle={{}}
                disabledTextStyle={{}}
                disabledSelectedStyle={{}}
                disabledSelectedTextStyle={{}}
                innerBorderStyle={{}}
                onPress={selectedIdx =>
                    setSelectedIndex(selectedIdx)
                }
                selectedButtonStyle={{}}
                selectedIndex={selectedIndex}
                selectedIndexes={selectedIndexes}
                selectedTextStyle={{}}
                textStyle={{}}
            />

            <Input
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                label="募集条件"
                labelStyle={{}}
                labelProps={{}}
                placeholder="募集条件"
                height={150}
                justifyContent="flex-start"
            />

        </ScrollView>
      </SafeAreaProvider>
    )
}

export default HostForm;