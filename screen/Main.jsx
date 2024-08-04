import React, { useState, useEffect } from "react";
import {View,Text,ImageBackground,Modal,TouchableWithoutFeedback, TouchableHighlight, StyleSheet } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";


export default function Main(){
    const navigation = useNavigation();

    return(
        <MainView>
            <CenterView>
            <LogoImg source={require('../assets/Home_active.png')}/>
            </CenterView>
            <LoginBtn onPress={() => navigation.navigate('AddAnimal')}>
                <LoginTxt>시작하기</LoginTxt>
            </LoginBtn>
        </MainView>
    );
}

const MainView = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const LogoImg = styled.Image`
    width : 150px;
    height : 150px;

`;
const LogoTxt = styled.Text`
    font-size : 30px;
    font-weight : bold;
`;

const LoginBtn = styled.TouchableOpacity`
    background-color : #139989;
    padding : 10px 20px;
    border-radius : 10px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
    elevation: 5;
    position: absolute;
    bottom: 15%;
`;
const LoginTxt = styled.Text`
    color : white;
    font-size : 24px;
    font-weight : semi-bold;
`;