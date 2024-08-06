import React, { useState, useEffect, useContext, useCallback } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { WebView } from 'react-native-webview';
import { UserContext } from '../../UseContext';
import { useFocusEffect } from '@react-navigation/native'; // 추가

const uIp = '192.168.44.204';

const MenuScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState('');
  const { userId } = useContext(UserContext);

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
              const token = await SecureStore.getItemAsync('authToken');
              console.log(token);
              if (token) {
                await SecureStore.deleteItemAsync('uid');
                await SecureStore.deleteItemAsync('authToken');
              }
              console.log('delete');
              navigation.navigate('KakaoLogout');
            } catch (error) {
              console.error(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const fetchNickname = async () => {
    try {
      const response = await axios.get(`http://${uIp}:5000/nickname/${String(userId)}`);
      setNickname(response.data);
    } catch (error) {
      console.error("Error fetching nickname:", error);
      setNickname(userId); // 에러가 발생하면 userId를 닉네임으로 설정
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNickname();
    }, [])
  );
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
      <ScrollView>
        <Header>
        <HeaderTitle>{nickname}</HeaderTitle>
        <IconWrapper onPress={() => navigation.navigate('NickName')}>
        <Icon name="settings-outline" size={32} color="#000" />
        </IconWrapper>
        </Header>
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

function KakaoLogout({navigation}) {
  const key = CLIENT_ID;
  const uri = LOGOUT_REDIRECT;
  const api = `https://kauth.kakao.com/oauth/logout?client_id=${key}&logout_redirect_uri=${uri}`;

  return(
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <WebView
        style={{flex: 1, width: '100%'}}
        source={{ uri: api }}
        onNavigationStateChange={(e) => {
          if (e.url.startsWith(uri)) {
            // 로그아웃 후 리다이렉트 URI로 돌아왔을 때 추가 작업 처리
            console.log("Logout redirect successful", e.url);
            // 예: 로그아웃 후 로그인 화면으로 이동
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            });
          }
        }}
      />
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
export { KakaoLogout };
