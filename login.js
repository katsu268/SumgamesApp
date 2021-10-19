import { ThemeProvider, Button } from 'react-native-elements';
import React ,{ Component }from 'react';


const theme = {
  Button: {
    raised: true,
  },
};

// Your App
const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button title="My Button" />
      <Button title="My 2nd Button" />
    </ThemeProvider>
  );
};

export default Login;