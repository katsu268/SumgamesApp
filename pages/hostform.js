import React from "react";
import { View,  } from "react-native";
import { Input, Button, Icon, Header, ButtonGroup } from "react-native-elements";

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
        <View>
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
                buttonStyle={{ width: 420 }}
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

        </View>
    )
}

export default HostForm;