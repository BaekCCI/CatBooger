import React, { useState, useEffect } from "react";
import {View,Text,ImageBackground,Modal,TouchableWithoutFeedback, TouchableHighlight, StyleSheet } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";


export default function AddAnimal(){
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [birth,setBirth] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [type, setType] = useState('');

    return(
        <MainView>
            <Title>반려동물 등록</Title>
            <StyledView>
            <RowView>
                <TypeTxt>동물 이름</TypeTxt>
                <InputWrap>
                    <InputMemo
                        value={name}
                        onChangeText={setName}
                        placeholder="이름을 입력하세요"
                        placeholderTextColor="#d0d0d0"
                    />
                </InputWrap>
            </RowView>
            <RowView>
                <TypeTxt>종</TypeTxt>
                <InputWrap>
                    <InputMemo
                        value={type}
                        onChangeText={setType}
                        placeholder="이름을 입력하세요"
                        placeholderTextColor="#d0d0d0"
                    />
                </InputWrap>
            </RowView>
            <RowView>
                <TypeTxt>성별</TypeTxt>
                <InputWrap>
                    <InputMemo
                        value={gender}
                        onChangeText={setGender}
                        placeholder="이름을 입력하세요"
                        placeholderTextColor="#d0d0d0"
                    />
                </InputWrap>
            </RowView>
            <RowView>
                <TypeTxt>중성화 여부</TypeTxt>
                <InputWrap>
                    <InputMemo
                        value={breed}
                        onChangeText={setBreed}
                        placeholder="이름을 입력하세요"
                        placeholderTextColor="#d0d0d0"
                    />
                </InputWrap>
            </RowView>
            <RowView>
                <TypeTxt>생년월일</TypeTxt>
                <InputWrap>
                    <InputMemo
                        value={birth}
                        onChangeText={setBirth}
                        placeholder="이름을 입력하세요"
                        placeholderTextColor="#d0d0d0"
                    />
                </InputWrap>
            </RowView>
            </StyledView>
            <CompleBtn>
                <CompleTxt>완료하기</CompleTxt>
            </CompleBtn>
            </MainView>

    );
}

const MainView = styled.View`
    width : 100%;
    height : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
`;
const StyledView = styled.View`
    width : 90%;
    justify-content : center;
    align-items : center;
    border: 1px solid #989898;
    border-radius : 10px;
    padding : 5px 10px 30px 10px;
`;
const Line = styled.View`
    background-color : #d0d0d0;
    width : 90%;
    height : 1px;
    align-self : center;
    margin : 10px 0 ;
`;
const RowView = styled.View`
    width : 90%;
    height : 30px;
    flex-direction : row;
    align-items : center;
    margin-top : 25px;
    justify-content : space-between;
`;
const Title = styled.Text`
    font-size : 28px;
    font-weight : bold;
    margin-bottom : 20px;
`;
const TypeTxt = styled.Text`
    font-size : 18px;
    font-weight : semi-bold;
    align-text : center;
    width : 95px;
`;
const InputWrap = styled.View`
    align-self : center;
    border-bottom-width: 1px;
    border-bottom-color: #d9d9d9;
    padding : 0 10px;
    width : 200px;
`;
const InputMemo = styled.TextInput`
    width : 100%;
    font-size: 15px;
    color: black;
`;
const CompleBtn = styled.TouchableOpacity`
    background-color : #139989;
    padding : 10px 25px;
    border-radius : 30px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
    elevation: 5;
    margin-top : 10%;
`;
const CompleTxt = styled.Text`
    color : white;
    font-size : 20px;
    font-weight : bold;
`;

