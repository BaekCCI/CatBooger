import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const hospitals = [
  {
    name: '올리몰스 동물메디컬센터',
    status: '진료중',
    address: '전주시 덕진구 송천중앙로 213',
    image: 'https://via.placeholder.com/50', // 실제 이미지 URL로 대체하세요
  },
  {
    name: '올리몰스 동물메디컬센터',
    status: '진료 종료',
    address: '전주시 덕진구 송천중앙로 213',
    image: 'https://via.placeholder.com/50', // 실제 이미지 URL로 대체하세요
  },
  // 필요에 따라 병원 객체를 더 추가하세요
];

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          <SearchInput placeholder="병원을 검색하세요" />
          <MapButton>
            <Icon name="map-outline" size={24} color="#000" />
          </MapButton>
        </Header>
        <Title>근처 동물병원</Title>
        <ScrollView>
          {hospitals.map((hospital, index) => (
            <HospitalCard key={index}>
              <HospitalImage source={{ uri: hospital.image }} />
              <HospitalInfo>
                <HospitalName>{hospital.name}</HospitalName>
                <HospitalStatus>{hospital.status}</HospitalStatus>
                <HospitalAddress>{hospital.address}</HospitalAddress>
              </HospitalInfo>
            </HospitalCard>
          ))}
        </ScrollView>
        <Footer>
          <FooterIcon name="medkit-outline" size={24} />
          <FooterIcon name="chatbubble-outline" size={24} />
          <FooterIcon name="home-outline" size={24} />
          <FooterIcon name="people-outline" size={24} />
          <FooterIcon name="menu-outline" size={24} />
        </Footer>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const MapButton = styled.TouchableOpacity`
  margin-left: 8px;
`;

const Title = styled.Text`
  margin: 16px 0;
  font-size: 18px;
  font-weight: bold;
`;

const HospitalCard = styled.View`
  flex-direction: row;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const HospitalImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 4px;
`;

const HospitalInfo = styled.View`
  margin-left: 16px;
  flex: 1;
`;

const HospitalName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const HospitalStatus = styled.Text`
  color: #777;
`;

const HospitalAddress = styled.Text`
  color: #777;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 16px;
  border-top-width: 1px;
  border-top-color: #eee;
`;

const FooterIcon = styled(Icon)`
  color: #777;
`;

export default App;
