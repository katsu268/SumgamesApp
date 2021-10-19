import * as React from "react";
import { Header, Icon } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

const TopPage = () => {
  return (
    <Header
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: "SUMGAMES",
        style: { color: "#fff" }
      }}
      centerContainerStyle={{}}
      containerStyle={{ width: 350 }}
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="left"
      rightContainerStyle={{}}
      statusBarProps={{}}
    />
  );
};

export default TopPage;