import { StatusBar } from 'expo-status-bar';
import React ,{ Component }from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/login';
import TopPage from './pages/top__page';
import HostForm from './pages/hostform';

const Stack = createNativeStackNavigator();


class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Top" component={TopPage} />
          <Stack.Screen name="Host" component={HostForm} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Login"
        onPress={() =>
          navigation.navigate('Login')
        }
      />
      <Button
        title="Top"
        onPress={() =>
          navigation.navigate('Top')
        }
      />
      <Button
        title="Host"
        onPress={() =>
          navigation.navigate('Host')
        }
      />
    </View>
  );
};

export default App;
