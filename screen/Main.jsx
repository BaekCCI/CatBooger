import React, { useState, useEffect, useContext } from "react";
import {View,Text,ImageBackground,Modal,TouchableWithoutFeedback, TouchableHighlight, StyleSheet } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from '../UseContext';

import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

async function getToken() {
  const token = await SecureStore.getItemAsync('authToken');
  console.log("Token: ", token);
  return token;
}

export default function Main(){
    const navigation = useNavigation();
    const { setUserId } = useContext(UserContext);

    useEffect(() => {
        const checkLogin = async () => {
            const token = await SecureStore.getItemAsync('authToken');
            const uid = await SecureStore.getItemAsync('uid');

            if(uid == null){
                console.log("uid : null");
            }
            else if (token) {
                setUserId(uid);
                console.log("Token: ", token);
                console.log("UID: ", uid);
                navigation.navigate('Login');
            } else {
                console.log("로그인 필요");
            }
        }
        checkLogin();
    }, []);

    return(
        <MainView>
            <CenterView>
            <LogoImg source={require('../assets/Home_active.png')}/>
            </CenterView>
            <LoginBtn onPress={() => navigation.navigate('Login')}>
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