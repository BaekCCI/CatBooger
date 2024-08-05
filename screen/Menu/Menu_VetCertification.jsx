import React, {useState, useEffect, useContext}  from 'react';
import { SafeAreaView, View, Text, Alert  } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function PetManagementScreen(){
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [num, setNum] = useState('');

  const [imgUri, setImgUri] = useState('');
  const [isModified, setIsModified] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Check if there are any changes in the input or counts
    setIsModified(name !== '' && birth !=='' && email !=='' && num !=='' && imgUri !=='');
  }, [name, birth, email, num, imgUri]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImgUri(result.assets[0].uri);
    }
  };

  const handleComplete =()=>{
    Alert.alert('','인증 완료 후 메일이 발송됩니다.');
    navigation.navigate('Menu');
    
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
        <Title>수의사 인증</Title>
        <RowView>
          <Type>이름</Type>
          <InputWrap>
            <InputMemo
              value={name}
              onChangeText={setName}
            />
          </InputWrap>
        </RowView>
        <RowView>
          <Type>생년월일 6자리</Type>
          <InputWrap>
            <InputMemo
              value={birth}
              onChangeText={setBirth}
              placeholder="00000"              
              placeholderTextColor="#d0d0d0"
              keyboardType="numeric" 
            />
          </InputWrap>        
        </RowView>
        <RowView>
          <Type>이메일</Type>
          <InputWrap>
            <InputMemo
              value={email}
              onChangeText={setEmail}
              placeholder="example"              
              placeholderTextColor="#d0d0d0"
              keyboardType="email-address"
            />
          </InputWrap>      
        </RowView>
        <RowView>
          <Type>면허번호</Type>
          <InputWrap>
            <InputMemo
              value={num}
              onChangeText={setNum}
              placeholder="00000"              
              placeholderTextColor="#d0d0d0"
              keyboardType="numeric" 
            />
          </InputWrap>        
        </RowView>
        <RowView>
          <Type>면허증 이미지 등록</Type>
        </RowView>
        <RowView margin ='5px 0'>
          <UproadBtn onPress={pickImage}>
            <LinkView>
              <LinkImg source={require('../../assets/LinkIcon.png')}/>
            </LinkView>
            <TxtWrap>
              <LinkTxt numberOfLines={2} ellipsizeMode="tail">{imgUri ? imgUri : '이미지를 선택하세요'}</LinkTxt>
            </TxtWrap>
          </UproadBtn>
        </RowView>
        <CompleteBtn disabled={!isModified} isModified={isModified} onPress={handleComplete}>
          <CompleText >완료하기</CompleText>
        </CompleteBtn>

        

      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  width : 100%;
  padding :5%;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin : 10px 0;
`;

const Line = styled.View`
    background-color : #d0d0d0;
    width : 100%;
    height : 1px;
    align-self : center;
    margin : 10px 0 ;
`;


const Type = styled.Text`
  font-size : 15px;
  font-weight : bold;
  min-width : 60px;
  margin-right :10px;
  color : gray;
`;

const RowView = styled.View`
    width : 100%;
    display : flex;
    flex-direction : row;
    align-items : center;
    margin : ${props => props.margin || '15px 0'};
    padding : 0 2%;
`;

const InputWrap = styled.View`
    align-self : center;
    border-bottom-width: 1px;
    border-bottom-color: #787878;
    padding : 0 10px;
    min-width : 110px;
    margin : 0 5px;
`;
const InputMemo = styled.TextInput`
    width : 100%;
    font-size: 15px;
    color: black;
    text-align : center;
`;
const UproadBtn = styled.TouchableOpacity`
  height : 40px;
  width : 80%;
  border : 1px solid #d0d0d0;
  flex-direction : row;
  align-items : center;
  border-radius : 10px;
`;
const LinkView = styled.View`
  background-color : #d0d0d0;
  width : 40px;
  height : 40px;
  justify-content : center;
  align-items:center;
  margin-right : 10px;
  border-radius : 10px 0 0 10px;
`;
const LinkImg = styled.Image`
  width : 20px;
  height : 20px;
`;
const TxtWrap = styled.View`
  width : 70%;
`
const LinkTxt = styled.Text`
  color : gray;
  font-size : 13px;
`;
const CompleteBtn = styled.TouchableOpacity`
    width :120px;
    height : 40px;
    background-color: ${props => props.isModified ? '#139989' : '#d9d9d9'};
    align-self : center;
    border-radius : 10px;
    justify-content : center;
    align-items : center;
    margin-top : 20px;
    margin-bottom : 30px;
`;
const CompleText = styled.Text`
    font-size:20px;
    font-weight : bold;
    color : white;
`;