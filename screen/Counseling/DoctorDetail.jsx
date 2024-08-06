import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import DoctorList from "./DoctorList";

import doctors from "./doctors";

import { UserContext } from "../../UseContext";
import { firestore, database } from "../../firebaseConfig";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export default function DoctorDetail({ route }) {
  const navigation = useNavigation();
  //const { userId } = useContext(UserContext); // 현재 사용자의 ID 가져오기
    let userId = 'userId5';
  const [loading, setLoading] = useState(false);

  const [activeButton, setActiveButton] = useState("정보");


  const { id } = route.params;
  const doctor = doctors.find((doc) => doc.id === id);

  if (!doctor) {
    return (
      <View>
        <Text>잘못된 접근입니다.</Text>
      </View>
    );
  }

  const docName = doctor.name;

  const handleCounsel = () => {
    const createChatRoom = async () => {
      if (!doctor || !userId) {
        console.error("Doctor or user ID is missing.");
        return;
      }

      setLoading(true);

      try {
        const userDocRef = doc(firestore, "users", userId);
        const doctorDocRef = doc(firestore, "users", doctor.id);

        // 사용자 및 의사가 이미 존재하는지 확인
        const userDoc = await getDoc(userDocRef);
        const doctorDoc = await getDoc(doctorDocRef);

        if (!userDoc.exists()) {
          // 사용자 문서가 없으면 생성
          await setDoc(userDocRef, { userId: userId }); // userId 추가
        }

        if (!doctorDoc.exists()) {
          // 의사 문서가 없으면 생성
          await setDoc(doctorDocRef, { userId: doctor.id }); // doctor.id 추가
        }

        // 채팅방 생성
        const chatId = `chat${Date.now()}`; // 고유한 채팅방 ID 생성

        // 사용자(userId) 측의 채팅방 생성
        const userChatDocRef = doc(firestore, "users", userId, "chats", chatId);
        const newUserChatRoom = {
          participants: [userId, doctor.id],
          participantNames: {
            [userId]: userId, // userId 저장
            [doctor.id]: doctor.name, // doctor의 이름
          },
          status: "상담중",
        };

        // 의사(doctor.id) 측의 채팅방 생성
        const doctorChatDocRef = doc(
          firestore,
          "users",
          doctor.id,
          "chats",
          chatId
        );
        const newDoctorChatRoom = {
          participants: [doctor.id, userId],
          participantNames: {
            [doctor.id]: doctor.name,
            [userId]: userId, // userId 저장
          },
          status: "상담중",
        };

        // Firestore에 채팅방 추가
        await setDoc(userChatDocRef, newUserChatRoom);
        await setDoc(doctorChatDocRef, newDoctorChatRoom);

        console.log("New chat room created with ID:", chatId);
        Alert.alert("", "상담신청이 완료되었습니다.", [
          {
            text: "확인",
            onPress: () =>
              navigation.navigate("ChatList", { doctorId: doctor.id }),
          },
        ]);
      } catch (error) {
        console.error("Error creating chat room:", error);
        alert("채팅방 생성에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    createChatRoom();
  };

  const handleButton = (category) => {
    setActiveButton(category);
  };

  useEffect(() => {
    if (activeButton === "리뷰") {
      Alert.alert("알림", "리뷰는 데베 구조 보고 구현할 예정");
    }
  }, [activeButton]);

  return (
    <ScrollView>
      <Wrap>
        <DoctorWrap>
          <DoctorLeftWrap>
          <DoctorName>{userId}</DoctorName>
            <DoctorName>{docName}</DoctorName>
            <TextStyling color="gray">{doctor.hospitalId}</TextStyling>
            <Line />

            <TextStyling>{doctor.explain}</TextStyling>
          </DoctorLeftWrap>
          <DoctorRightWrap>
            <DoctorImg source={doctor.imgUri} />
            <CounselBtn onPress={handleCounsel}>
              <ButtonText>상담 신청하기</ButtonText>
            </CounselBtn>
          </DoctorRightWrap>
        </DoctorWrap>
        <CategoryWrap>
          <CategoryBtn
            isActive={activeButton === "정보"}
            onPress={() => handleButton("정보")}
          >
            <CategoryText isActive={activeButton === "정보"}>정보</CategoryText>
          </CategoryBtn>
          <CategoryBtn
            isActive={activeButton === "리뷰"}
            onPress={() => handleButton("리뷰")}
          >
            <CategoryText isActive={activeButton === "리뷰"}>리뷰</CategoryText>
          </CategoryBtn>
        </CategoryWrap>
        {activeButton === "정보" ? (
          <ListWrap>
            <Title>진료 동물</Title>
            <WrapAnimals>
              {doctor.animal.map((animal, index) => (
                <AnimalBox key={index}>
                  <AnimalText>{animal}</AnimalText>
                </AnimalBox>
              ))}
            </WrapAnimals>
            <Line />
            <Title>상담 정보</Title>
            <WrapAnimals>
              <ContentText color="black">금액 </ContentText>
              <ContentText>
                1회 {doctor.Price["1회"]} / 3회 {doctor.Price["3회"]}{" "}
              </ContentText>
            </WrapAnimals>
            <WrapAnimals>
              <ContentText color="black">상담시간 </ContentText>
              <ContentText>{doctor.time} </ContentText>
            </WrapAnimals>
            <Line />
            <Title>경력</Title>
            <ContentText>{doctor.Career}</ContentText>
            <Line />
            <Title>병원 정보</Title>
            <ContentText>{doctor.hospitalId}</ContentText>
          </ListWrap>
        ) : (
          <Title>리뷰는 데베 구조 보고 구현할 예정</Title>
        )}
      </Wrap>
    </ScrollView>
  );
}

const Wrap = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Line = styled.View`
  background-color: #d0d0d0;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "0.5px"};
  margin: 10px 0;
`;
const DoctorWrap = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 8% 5% 20px 5%;
  justify-content: space-between;
  align-items: flex-end;
`;
const DoctorLeftWrap = styled.View`
  display: flex;
  width: 60%;
  height: 100%;
`;
const DoctorRightWrap = styled.View`
  display: flex;
  align-items: flex-end;
`;
const DoctorImg = styled.Image`
  width: 110px;
  height: 110px;
  margin-bottom: 15px;
`;
const DoctorName = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const TextStyling = styled.Text`
  font-size: 13px;
  color: ${(props) => props.color || "black"};
  line-height: 20px;
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
  width: 100%;
  height: 50px;
  flex-direction: row;
`;
const CategoryBtn = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => (props.isActive ? "black" : "#d9d9d9")};
`;
const CategoryText = styled.Text`
  color: ${(props) => (props.isActive ? "black" : "#595959")};
  font-size: 15px;
  margin: 10px;
`;
const ListWrap = styled.View`
  width: 90%;
  margin: 5%;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0;
`;
const WrapAnimals = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const AnimalBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 10px;
  padding: 5px 10px;
  background-color: #efefef;
`;
const AnimalText = styled.Text`
  color: #595959;
  font-size: 15px;
`;
const ContentText = styled.Text`
  color: ${(props) => props.color || "#595959"};
  font-size: 16px;
  margin: 3px;
  line-height: 25px;
`;
