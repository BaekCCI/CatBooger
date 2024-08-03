import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';

const hospitalDetails = [
  {
    name: '올리몰스 동물메디컬센터',
    status: '진료중',
    openingHours: '매일 09:00 ~ 18:00',
    address: '전주시 덕진구 송천중앙로 213',
    image: 'https://via.placeholder.com/800x400',
    ratingCount: 103,
    phonenumber: '010-0000-0000',
    // 데이터베이스 정보들 불려와야함
  }
]

const HospitalDetail = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {hospitalDetails.map((hospitalDetail, index) => (
        <ScrollView key={index}>
          <Header>
            <HospitalImage source={{ uri: hospitalDetail.image }} />
          </Header>
          <Content>
            <Rating>
              <Icon name="star" size={20} color="#ffd700" />
              <Icon name="star" size={20} color="#ffd700" />
              <Icon name="star" size={20} color="#ffd700" />
              <Icon name="star" size={20} color="#ffd700" />
              <Icon name="star-outline" size={20} color="#ffd700" />
              <RatingCount>({hospitalDetail.ratingCount})</RatingCount>
              <Spacer />
              <HeartButton>
              <Icon name="heart-outline" size={24} color="#000" />
              </HeartButton>
            </Rating>
            <HospitalName>{hospitalDetail.name}</HospitalName>
            <PhoneNumber>
              <Icon name="call-outline" size={20} color="#777" />
              <PhoneNumberText>{hospitalDetail.phonenumber}</PhoneNumberText>
            </PhoneNumber>
            <Status>
              <Icon name="time-outline" size={20} color="#777" />
              <StatusText>{hospitalDetail.status}</StatusText>
            </Status>
            <OpeningHours>{hospitalDetail.openingHours}</OpeningHours>
            <Address>
              <Icon name="location-outline" size={20} color="#777" />
              <AddressText>{hospitalDetail.address}</AddressText>
            </Address>
            <MapContainer>
              <MapView
                style={{ height: 200 }}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                  title={hospitalDetail.name}
                  description={hospitalDetail.address}
                />
              </MapView>
            </MapContainer>
          </Content>
        </ScrollView>
        ))}
    </SafeAreaView>
  );
};

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HospitalImage = styled.Image`
  width: 100%;
  height: 200px;
`;

const Content = styled.View`
  padding: 5%;
`;

const Rating = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingCount = styled.Text`
  margin-left: 3%;
  color: #777;
`;

const Spacer = styled.View`
  flex: 1;
`;

const HeartButton = styled.TouchableOpacity`
  padding-right: 0px;
`;

const HospitalName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 4%;
`;

const PhoneNumber = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5%;
`;

const PhoneNumberText = styled.Text`
  font-size: 16px;
  margin-left: 2%;
  color: #777;
`;

const Status = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10%;
`;

const StatusText = styled.Text`
  margin-left: 2%;
  color: #777;
`;

const OpeningHours = styled.Text`
  margin-top: 1%;
  margin-left: 8%;
  font-size: 12px;
  color: #777;
`;

const Address = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4%;
`;

const AddressText = styled.Text`
  margin-left: 2%;
  color: #777;
`;

const MapContainer = styled.View`
  margin-top: 7%;
  height: 200px;
  border-radius: 7px;
  overflow: hidden;
`;

export default HospitalDetail;
