import React, { useState, useEffect, useContext } from "react";
import {View,Text,ImageBackground,Modal,TouchableWithoutFeedback, TouchableHighlight, StyleSheet } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

const uIp = '192.168.1.52';

const userId = 'test';

export default function NickName(){
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [isModified, setIsModified] = useState(false);
  


    useEffect(() => {
        setIsModified(name!=='');
    }, [name]);

    //const { userId } = useContext(UserContext);
    useEffect(() => {
        console.log('userId:', userId, uIp); // userId가 제대로 설정되었는지 확인
      }, [userId]);

    const handleConfirm = async () => {
        /*
        try{
            const response = await axios.post(`http://${uIp}:5001/add_animal`,{
                userId:String(userId),
                name : name,
                birthDate : birth.toISOString(),
                breed : breed,
                gender : gender,
                type : type,             
            });
            console.log('Response: ', response.data);
            if(response.status === 201){
                alert('등록 완료');
                navigation.navigate('MyTabs');
            }else{
                alert('추가실패');
            }
        }catch(error){
            console.error('Error adding defection event:', error.response ? error.response.data : error.message);
        }
            */
    };


    return(
        <MainView>
            <Title>닉네임 설정</Title>
            <StyledView>
            <RowView>
                <TypeTxt>닉네임</TypeTxt>
                <InputWrap>
                    <InputMemo
                        value={name}
                        onChangeText={setName}
                        placeholder="이름을 입력하세요"
                        placeholderTextColor="#d0d0d0"
                    />
                </InputWrap>
            </RowView>
            
            </StyledView>
            <CompleBtn disabled={!isModified} isModified={isModified} onPress={handleConfirm}>
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
    width : 95%;
    justify-content : center;
    align-items : center;
    border: 1px solid #989898;
    border-radius : 10px;
    padding : 5px 10px 30px 10px;
`;

const RowView = styled.View`
    width : 90%;
    height : 30px;
    flex-direction : row;
    align-items : center;
    margin-top : 25px;
`;
const Title = styled.Text`
    font-size : 28px;
    font-weight : bold;
    margin-bottom : 20px;
`;
const TypeTxt = styled.Text`
    font-size : 20px;
    font-weight : semi-bold;
    align-text : center;
    margin-right : 10%;
`;
const InputWrap = styled.View`
    align-self : center;
    border-bottom-width: 1px;
    border-bottom-color: #d9d9d9;
    padding : 0 10px;
    width : 60%;
`;
const InputMemo = styled.TextInput`
    width : 100%;
    font-size: 20px;
    color: black;
`;


const CompleBtn = styled.TouchableOpacity`
    background-color: ${props => props.isModified ? '#139989' : '#d0d0d0'};
    padding : 10px 25px;
    border-radius : 30px;
    box-shadow: ${props => props.isModified ? '3px 3px 3px rgba(0, 0, 0, 0.2)' : '0px 0px 0px rgba(0, 0, 0, 0)'};
    elevation: 5;
    margin-top : 10%;
`;
const CompleTxt = styled.Text`
    color : white;
    font-size : 20px;
    font-weight : bold;
`;

