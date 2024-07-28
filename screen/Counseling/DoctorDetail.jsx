import React , { useState }from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import DoctorList from "./DoctorList";

import doctors from "./doctors";

export default function DoctorDetail({ route }){
    const navigation = useNavigation();

    const [activeButton, setActiveButton] = useState('정보');

    const { id } = route.params;
    const doctor = doctors.find(doc => doc.id === id);
    if (!doctor) {
        return (
            <View>
                <Text>잘못된 접근입니다.</Text>
            </View>
        );
    }

    const onPress = () => navigation.navigate('Home');
    const handleButton = (category, setActiveButton) => {
        setActiveButton(category);
    };

    return (
        <ScrollView>
        <Wrap>
            <DoctorWrap>
                <DoctorLeftWrap>
                    <DoctorName>{doctor.name}</DoctorName>
                    <TextStyling color="gray">{doctor.hospital}</TextStyling>
                    <Line/>

                    <TextStyling>{doctor.explain}</TextStyling>

                </DoctorLeftWrap>
                <DoctorRightWrap>
                    <DoctorImg source={require('../../assets/DefaultProfile.png')}/> 
                    <CounselBtn
                        onPress= {()=>onPress()}>
                        <ButtonText>상담 신청하기</ButtonText>
                    </CounselBtn>
                </DoctorRightWrap>
            </DoctorWrap>
            <CategoryWrap>
                <CategoryBtn
                    isActive={activeButton === '정보'} 
                    onPress={() => handleButton('정보', setActiveButton)}>
                     <CategoryText isActive={activeButton === '정보'} >정보</CategoryText>
                </CategoryBtn>
                <CategoryBtn
                    isActive={activeButton === '리뷰'} 
                    onPress={() => handleButton('리뷰', setActiveButton)}>
                     <CategoryText isActive={activeButton === '정보'} >리뷰</CategoryText>
                </CategoryBtn>
            </CategoryWrap>
                {activeButton === '정보'?(
                    <ListWrap>
                        <Title>진료 동물</Title>
                        <WrapAnimals>
                            {doctor.animal.map((animal, index) => (
                                <AnimalBox key={index}>
                                    <AnimalText>{animal}</AnimalText>
                                </AnimalBox>
                            ))}
                        </WrapAnimals>
                        <Line/>
                        <Title>상담 정보</Title>
                        <WrapAnimals>
                            <ContentText color="black">금액 </ContentText>
                            <ContentText>1회 {doctor.Price["1회"]} / 3회 {doctor.Price["3회"]} </ContentText>
                        </WrapAnimals>
                        <WrapAnimals>
                            <ContentText color="black">상담시간 </ContentText>
                            <ContentText>{doctor.time} </ContentText>
                        </WrapAnimals>
                        <Line/>
                        <Title>경력</Title>
                        <ContentText>{doctor.Career}</ContentText>
                        <Line/>
                        <Title>병원 정보</Title>
                    
                    </ListWrap>
                    
                    

                ):(
                    <Title>리뷰는 데베 구조 보고 구현할 예정</Title>

                )}

        </Wrap>
        </ScrollView>
        
        
    );
}

const Wrap = styled.View`
    display : flex;
    align-items : center;
    width : 100%;
`;
const Line = styled.View`
    background-color : #d0d0d0;
    width : ${props => props.width || '100%'};
    height : ${props => props.height || '0.5px'};
    margin : 10px 0;
`;
const DoctorWrap = styled.View`
    display : flex;
    flex-direction : row;
    width : 100%;
    padding : 8% 5% 20px 5%;
    justify-content: space-between;
    align-items: flex-end;
`;
const  DoctorLeftWrap = styled.View`
    display : flex;
    width : 60%;
    height:100%;
`;
const  DoctorRightWrap = styled.View`
    display : flex;
    align-items : flex-end;
`;
const DoctorImg = styled.Image`
    width : 110px;
    height : 110px;
    margin-bottom : 15px;
`;
const DoctorName = styled.Text`
    font-size : 25px;
    font-weight : bold;
    margin-bottom : 5px;
`;
const TextStyling = styled.Text`
    font-size : 13px;
    color : ${props => props.color || 'black'};
    line-height : 20px;
`;
const CounselBtn = styled.TouchableOpacity`
  background-color: #139989;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  elevation: 5;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
const CategoryWrap = styled.View`
    width : 100%;
    height:50px;
    flex-direction: row
`;
const CategoryBtn = styled.TouchableOpacity`
    display : flex;
    flex : 1;
    align-items : center;
    justify-content : flex-end;
    border-bottom-width: 1px;
    border-bottom-color:  ${props => props.isActive ? 'black' : '#d9d9d9'};
`;
const CategoryText = styled.Text`
    color : ${props => props.isActive ? 'black' : '#595959'};
    font-size : 15px;
    margin : 10px;
`;
const ListWrap = styled.View`
    width : 90%;
    margin : 5%;
`;
const Title = styled.Text`
    font-weight: bold;
    font-size : 20px;
    margin: 10px 0;
`;
const WrapAnimals = styled.View`
    display : flex;
    flex-direction : row;
    width : 100%;
`;
const AnimalBox = styled.View`
    display : flex;
    justify-content : center;
    align-items : center;
    border-radius : 5px;
    margin : 10px;
    padding : 5px 10px;
    background-color : #EFEFEF;
`;
const AnimalText = styled.Text`
    color : #595959;
    font-size : 15px;
`
const ContentText = styled.Text`
    color : ${props => props.color || '#595959'};
    font-size : 16px;
    margin: 3px;
    line-height : 25px;
`