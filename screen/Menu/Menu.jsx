import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from './../../firebaseConfig';

const auth = getAuth(app);
const firestore = getFirestore(app);

const MenuScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchUserNickname = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          setNickname(userDoc.data().nickname);
        }
      }
    };

    fetchUserNickname();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "네",
          onPress: async () => {
            try {
              await signOut(auth);
              navigation.navigate('Login'); // 로그아웃 후 로그인 화면으로 이동
            } catch (error) {
              console.error(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
        <Header>
          <HeaderTitle>{nickname || '고양이 코딱지'}</HeaderTitle>
          <IconWrapper onPress={() => navigation.navigate('ChangeProfile')}>
            <Icon name="settings-outline" size={32} color="#000" />
          </IconWrapper>
        </Header>
        <ScrollView>
          <Section>
            <SectionHeader>
            </SectionHeader>
            <MenuItem onPress={() => navigation.navigate('PetManagement')}>
              <MenuText>반려동물 관리</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
            <MenuItem onPress={() => navigation.navigate('SharedParenting')}>
              <MenuText>공동 육아</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
          </Section>
          <Section>
            <SectionHeader>
              <SectionTitle>커뮤니티</SectionTitle>
            </SectionHeader>
            <MenuItem onPress={() => navigation.navigate('PostManagement')}>
              <MenuText>작성 글 관리</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
          </Section>
          <Section>
            <SectionHeader>
              <SectionTitle>상담</SectionTitle>
            </SectionHeader>
            <MenuItem onPress={() => navigation.navigate('ConsultationHistory')}>
              <MenuText>나의 상담 내역</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
            <MenuItem onPress={() => navigation.navigate('OwnedConsultations')}>
              <MenuText>보유한 상담권</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
            <MenuItem onPress={() => navigation.navigate('PaymentMethods')}>
              <MenuText>결제 수단 관리</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
            <MenuItem onPress={() => navigation.navigate('VetCertification')}>
              <MenuText>수의사 인증</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
          </Section>
          <LogoutButton onPress={handleLogout}>
            <LogoutText>로그아웃</LogoutText>
          </LogoutButton>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 5%;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 5%;
`;

const HeaderTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;

const IconWrapper = styled.TouchableOpacity`
  padding-top: 4%;
`;

const Section = styled.View`
  margin-bottom: 7%;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5%;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4% 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const MenuText = styled.Text`
  font-size: 16px;
`;

const LogoutButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 5% 0;
`;

const LogoutText = styled.Text`
  font-size: 16px;
  color: red;
`;

export default MenuScreen;
