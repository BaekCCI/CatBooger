import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Image, FlatList } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';

const hospitals = [
  {
    name: '올리몰스 동물메디컬센터',
    status: '진료중',
    address: '전주시 덕진구 송천중앙로 213',
    image: 'https://via.placeholder.com/75', // 실제 이미지 URL로 대체하세요
    latitude: 37.78830,
    longitude: -122.4324,
  },
  {
    name: '올리몰스 동물메디컬센터22',
    status: '진료 종료',
    address: '전주시 덕진구 송천중앙로 213',
    image: 'https://via.placeholder.com/75', // 실제 이미지 URL로 대체하세요
    latitude: 37.78825,
    longitude: -122.4324,
  },
  // 필요에 따라 병원 객체를 더 추가하세요
];

const Hospital = ({ navigation }) => {
  const [showMap, setShowMap] = useState(false);

  const onPress = () => navigation.navigate('HospitalDetail');
  const toggleView = () => setShowMap(!showMap);

  const renderHospitalItem = ({ item }) => (
    <HospitalCard key={item.name} onPress={onPress}>
      <HospitalImage source={{ uri: item.image }} />
      <HospitalInfo>
        <HospitalName>{item.name}</HospitalName>
        <HospitalStatus>{item.status}</HospitalStatus>
        <HospitalAddress>{item.address}</HospitalAddress>
      </HospitalInfo>
    </HospitalCard>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Header>
          <SearchInput placeholder="병원을 검색하세요" />
          <MapButton onPress={toggleView}>
            <Icon name={showMap ? "list-outline" : "map-outline"} size={24} color="#000" />
          </MapButton>
        </Header>
        {showMap ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {hospitals.map((hospital, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: hospital.latitude,
                  longitude: hospital.longitude,
                }}
                title={hospital.name}
                description={hospital.address}
              />
            ))}
          </MapView>
        ) : (
          <>
            <Title>근처 동물병원</Title>
            <FlatList
              data={hospitals}
              renderItem={renderHospitalItem}
              keyExtractor={item => item.name}
            />
          </>
        )}
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 3%;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  align-items: center;
  margin: 0 3%;
  padding: 2%;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const MapButton = styled.TouchableOpacity`
  align-items: center;
  margin: 0 3%;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8%;
  margin-bottom: 6%;
  margin-left: 3%;
  margin-right: 3%;
`;

const HospitalCard = styled.TouchableOpacity`
  flex-direction: row;
  padding: 7% 5%;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-bottom: 3%;
`;

const HospitalImage = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 4px;
`;

const HospitalInfo = styled.View`
  margin-left: 6%;
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

export default Hospital;
