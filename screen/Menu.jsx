import React from "react";
import { View, Text} from "react-native";
import styled from "styled-components";

const StyledView = styled.View`
  background: #d8d8d8;
  padding: 10px;
  border-radius: 5px;
`;

const StyledButton = styled.TouchableOpacity`
  border: 1px solid black;
  height : 100px;
    align-items: center;
    font-color : blue;
`;
const BtnText = styled.Text`
    color : blue;
    font-size : 20px;
`;

const Menu = ({ navigation }) =>{

    const onPress = () => navigation.navigate('Home');
  return (

        <StyledView>
            <StyledButton onPress={onPress}>
                <BtnText>title="Go to Home" </BtnText>

            </StyledButton>
            <Text>Menu</Text>
        </StyledView>

  );
}

export default Menu;