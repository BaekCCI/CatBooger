import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
        <Header>
        <HeaderTitle>고양이 코딱지</HeaderTitle>
        <IconWrapper>
        <Icon name="settings-outline" size={32} color="#000" />
        </IconWrapper>
        </Header>
        <ScrollView>
          <Section>
            <SectionHeader>
            </SectionHeader>
            <MenuItem>
              <MenuText>반려동물 관리</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
            <MenuItem>
              <MenuText>공동 육아</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
          </Section>
          <Section>
            <SectionHeader>
              <SectionTitle>커뮤니티</SectionTitle>
            </SectionHeader>
            <MenuItem>
              <MenuText>작성 글 관리</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
          </Section>
          <Section>
            <SectionHeader>
              <SectionTitle>상담</SectionTitle>
            </SectionHeader>
            <MenuItem>
              <MenuText>나의 상담 내역</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
            <MenuItem>
              <MenuText>보유한 상담권</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
            <MenuItem>
              <MenuText>결제 수단 관리</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
            <MenuItem>
              <MenuText>수의사 인증</MenuText>
              <Icon name="chevron-forward-outline" size={24} color="#000" />
            </MenuItem>
          </Section>
          <LogoutButton>
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

const IconWrapper = styled.View`
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
