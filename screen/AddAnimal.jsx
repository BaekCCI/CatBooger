import React, { useState, useEffect, useContext } from "react";
import {View,Text,ImageBackground,Modal,TouchableWithoutFeedback, TouchableHighlight, StyleSheet } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import axios from 'axios';

const uIp = "172.30.1.26";
const userId = '3634679806';

export default function AddAnimal(){
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [birth,setBirth] = useState(new Date());
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [type, setType] = useState('');
    const [isModified, setIsModified] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleDatePiker =(date) => {
        setBirth(date);
        hideDatePicker();
    }

    useEffect(() => {
        setIsModified(name!=='' && breed!=='' && gender!=='' && type!=='');
    }, [name, breed, gender, type]);

    //const { userId } = useContext(UserContext);
    useEffect(() => {
        console.log('userId:', userId, UIp); // userId가 제대로 설정되었는지 확인
      }, [userId]);

    const handleConfirm = async () => {
        try{
            const response = await axios.post(`http://${UIp}:5001/add_animal`,{
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
            }else{
                alert('추가실패');
            }
        }catch(error){
            console.error('Error adding defection event:', error.response ? error.response.data : error.message);
        }
    };

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
                <PickerWrap>
                <RNPickerSelect
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: '강아지', value: 'dog' },
                        { label: '고양이', value: 'cat' },
                        // 필요한 경우 다른 옵션을 추가하세요
                    ]}
                    placeholder={{
                        label: "종을 선택하세요",
                        value: null,
                        color: "#d0d0d0"
                    }}
                    value={type}
                    style={pickerSelectStyles}

                />
                </PickerWrap>
            </RowView>
            <RowView>
                <TypeTxt>성별</TypeTxt>
                <PickerWrap>
                <RNPickerSelect
                    onValueChange={(gender) => setGender(gender)}
                    items={[
                        { label: '암컷', value: 'female' },
                        { label: '수컷', value: 'male' },
                        // 필요한 경우 다른 옵션을 추가하세요
                    ]}
                    placeholder={{
                        label: "성별을 선택하세요",
                        value: null,
                        color: "#d0d0d0"
                    }}
                    value={gender}
                    style={pickerSelectStyles}

                />
                </PickerWrap>
            </RowView>
            <RowView>
                <TypeTxt>중성화 여부</TypeTxt>
                <PickerWrap>
                <RNPickerSelect
                    onValueChange={(breed) => setBreed(breed)}
                    items={[
                        { label: '예', value: 'yes' },
                        { label: '아니오', value: 'no' },
                        { label: '모름', value: 'unKnown' },
                        // 필요한 경우 다른 옵션을 추가하세요
                    ]}
                    placeholder={{
                        label: "중성화 여부를 선택하세요",
                        value: null,
                        color: "#d0d0d0"
                    }}
                    value={breed}
                    style={pickerSelectStyles}

                />
                </PickerWrap>
            </RowView>
            <RowView>
                <TypeTxt>생년월일</TypeTxt>
                <PickerWrap>
                    <DatePickerButton onPress={showDatePicker}>
                        <DatePickerText>{moment(birth).format('YYYY-MM-DD')}</DatePickerText>
                    </DatePickerButton>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDatePiker}
                        onCancel={hideDatePicker}
                        maximumDate={new Date()}
                        locale="ko"
                    />
                </PickerWrap>
            </RowView>
            </StyledView>
            <CompleBtn disabled={!isModified} isModified={isModified} onPress={handleConfirm}>
                <CompleTxt>완료하기</CompleTxt>
            </CompleBtn>
            </MainView>

    );
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        borderBottomWidth : 1,
        borderBottomColor : '#d9d9d9',
        paddingBottom : 5,
        paddingLeft : 5,
    },
    inputAndroid: {
        fontSize: 10,
        fontWeight : 'bold',
        textAlign: 'center',
    },
  });


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
    font-size : 15px;
    font-weight : semi-bold;
    align-text : center;
`;
const InputWrap = styled.View`
    align-self : center;
    border-bottom-width: 1px;
    border-bottom-color: #d9d9d9;
    padding : 0 10px;
    width : 65%;
`;
const PickerWrap = styled.View`
    align-self : center;
    width : 65%;
`
const InputMemo = styled.TextInput`
    width : 100%;
    font-size: 15px;
    color: black;
`;


const DatePickerButton = styled.TouchableOpacity`
    justify-content: center;
    border-bottom-width: 1px;
    border-bottom-color: #d9d9d9;
    padding-bottom : 2px;
`;

const DatePickerText = styled.Text`
    font-size: 16px;
    color: #000;
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

