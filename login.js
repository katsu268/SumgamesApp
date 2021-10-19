import { ThemeProvider, Button, Input, Icon } from 'react-native-elements';
import React ,{ Component }from 'react';
import { View } from 'react-native';


// Your App
const Login = () => {
  return (
    <View>
        <Input
        containerStyle={{}}
        disabledInputStyle={{ background: "#ddd" }}
        inputContainerStyle={{}}
        errorMessage="Oops! that's not correct."
        errorStyle={{}}
        errorProps={{}}
        inputStyle={{}}
        label="User Form"
        labelStyle={{}}
        labelProps={{}}
        leftIcon={<Icon name="person" size={20} />}
        leftIconContainerStyle={{}}
        rightIcon={<Icon name="close" size={20} />}
        rightIconContainerStyle={{}}
        placeholder="Enter Name"
        />
        <Input
        containerStyle={{}}
        disabledInputStyle={{ background: "#ddd" }}
        inputContainerStyle={{}}
        errorMessage="Oops! that's not correct."
        errorStyle={{}}
        errorProps={{}}
        inputStyle={{}}
        label="Password Form"
        labelStyle={{}}
        labelProps={{}}
        leftIcon={<Icon name="build_circle" size={20} />}
        leftIconContainerStyle={{}}
        rightIcon={<Icon name="close" size={20} />}
        rightIconContainerStyle={{}}
        placeholder="Enter Password"
        />
    </View>

  );
};

export default Login;