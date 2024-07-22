import React from "react";
import { View, Text, Button } from "react-native";

const Main = ({ navigation }) => {

        const onPress = () => navigation.navigate('Start');

  return (
    <View>
      <Text>hello !</Text>
      <Button title="Go to Start" onPress={onPress}></Button>
    </View>
  );
}

export default Main;