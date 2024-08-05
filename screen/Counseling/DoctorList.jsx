import React , { useState }from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import doctors from "./doctors";


const DoctorCard = ({id, name, imgUri, star, review, adopt, explain, time}) => {
    const navigation = useNavigation();

    const navigate2Detail = () => {
        navigation.navigate('DoctorDetail',{id});
    };


    return(
        <DoctorWrap onPress= {()=>navigate2Detail()}>
            <ProfileImg source= {imgUri!==''? imgUri : require('../../assets/DefaultProfile.png')} />
            <DoctorRight>
                <DoctorTop>
                    <TextTop>{name}</TextTop>
                    <Star source={require('../../assets/Star.png')}/>
                    <TextTop>{star}</TextTop>
                </DoctorTop>
                    <TextBottom numberOfLines={2}>{explain}</TextBottom>
                    <TextBottom color="#595959" >상담시간 {time}</TextBottom>
            </DoctorRight>
        </DoctorWrap>

    )
}


const handleCategory = (category, setActiveCategory, setDoctorList) => {
    setActiveCategory(category);

    if (category === '리뷰') {
        setDoctorList([...doctors].sort((a, b) => parseFloat(b.review) - parseFloat(a.review)));
    } else if (category === '별점') {
        setDoctorList([...doctors].sort((a, b) => parseFloat(b.star) - parseFloat(a.star)));
    } else if (category === '채택') {
        setDoctorList([...doctors].sort((a, b) => parseFloat(b.adopt) - parseFloat(a.adopt)));
    } else {
        setDoctorList(doctors);
    }
  };

  const recommendDoc = [...doctors].sort((a, b) => parseFloat(b.adopt) - parseFloat(a.adopt)).slice(0, 2);


export default function DoctorList() {

    const [activeCategory, setActiveCategory] = useState('기본'); //정렬 버튼 상태
    const [doctorList, setDoctorList] = useState(doctors); //doctorList 정렬

    return (
        <ScrollView>
        <Wrap>
            <TopView>
                <TittleText>검정콩 Pick</TittleText>
            </TopView>
            {recommendDoc
                .slice(0, 2)
                .map((doctor, index)=>(
                <React.Fragment key={index}><DoctorCard
                    key={index}
                    id = {doctor.id}
                    name={doctor.name}
                    imgUri={doctor.imgUri}
                    star={doctor.star}
                    explain={doctor.explain}
                    time={doctor.time} />
                <Line /></React.Fragment>
            ))}
            <Line height = '10px'/>
            <TittleAll>
                <TextAll>전체보기</TextAll>
                <Line height = "1px"/>
            </TittleAll>
            <CategoryWrap>
                <CategoryBox 
                    isActive={activeCategory === '기본'} 
                    onPress={() => handleCategory('기본', setActiveCategory, setDoctorList)}>
                    <CategoryText>기본순</CategoryText>
                </CategoryBox>
                <CategoryBox 
                    isActive={activeCategory === '리뷰'} 
                    onPress={() => handleCategory('리뷰', setActiveCategory, setDoctorList)}>
                    <CategoryText>리뷰 많은 순</CategoryText>
                </CategoryBox>
                <CategoryBox 
                    isActive={activeCategory === '별점'} 
                    onPress={() => handleCategory('별점', setActiveCategory, setDoctorList)}>
                    <CategoryText>별점 높은 순</CategoryText>
                </CategoryBox>
                <CategoryBox 
                    isActive={activeCategory === '채택'} 
                    onPress={() => handleCategory('채택', setActiveCategory, setDoctorList)}>
                    <CategoryText>채택순</CategoryText>
                </CategoryBox>
            </CategoryWrap>
            {doctorList.map((doctor, index)=>(
                <React.Fragment key={index}><DoctorCard
                    key={index}
                    id = {doctor.id}
                    name={doctor.name}
                    imgUri={doctor.imgUri}
                    star={doctor.star}
                    explain={doctor.explain}
                    time={doctor.time} />
                <Line /></React.Fragment>
            ))}
            
        </Wrap>
        </ScrollView>
    );
  }

  const Wrap = styled.View`
    display : flex;
    align-items : center;
    width : 100%;
    height : 100%;
    background-color : white;
`;

const Line = styled.View`
    background-color : #d0d0d0;
    width : ${props => props.width || '100%'};
    height : ${props => props.height || '0.3px'};
`;
//검정콩 Pick
const TopView = styled.View`
    display : flex;
    justify-content : center;
    width : 90%;
    height : 60px;
    margin : 20px 0;
    background-color : #68BEB4;
    border-radius : 10px;
    padding : 0 20px;
`;
const TittleText = styled.Text`
    font-size : 20px;
    font-weight : 800;
    color : white;
    text-shadow-color: rgba(0,0,0,0.25);
    text-shadow-offset: 3px 3px;
    text-shadow-radius: 4px;
`;
//의사
const DoctorRight = styled.View`
  display : flex;
  flex-direction : column;
  margin-right : 80px;
`;
const DoctorWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100px;
  padding : 25px;
  margin : 10px 0;
`;

const ProfileImg = styled.Image`
    width : 75px;
    height : 75px;
    margin-right : 20px;
`;
const DoctorTop = styled.View`
    display : flex;
    flex-direction : row;
    align-items : center;
`;
const TextTop = styled.Text`
    font-size : 18px;
    font-weight : bold;

`;
const Star = styled.Image`
    width : 18px;
    height : 18px; 
    margin : 0 5px;
`;
const TextBottom = styled.Text`
    font-size : 13px;
    margin-top : 2px;
    color : ${props => props.color || 'black'};
`;
//전체보기 style
const TittleAll = styled.View`
    display : flex;
    align-items : start;
    width : 90%;
    margin-top : 20px;
`;
const TextAll = styled.Text`
    font-size : 20px;
    font-weight : bold;
    margin : 10px;
`;
const CategoryWrap = styled.View`
    display : felx;
    flex-direction : row;
`;
const CategoryBox = styled(TouchableOpacity)`
    background-color: ${props => props.isActive ? '#cbe9e5' : '#EFEFEF'};
    height : 25px;
    border-radius : 20px;
    margin: 7px;
    align-items : center;
    justify-content : center;
    padding : 0 15px;
`;
const CategoryText = styled.Text`
    font-size : 12px;
    font-weight : 600;
`