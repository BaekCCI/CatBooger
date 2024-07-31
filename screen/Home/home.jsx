import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

import { ref, set, get, child } from "firebase/database";
import { database } from "../../firebaseConfig";

export default function Home() {
  const [modalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleModal = () => {
    setIsModalVisible(!modalVisible);
  };
  const handleDialog = (info) => {
    navigation.navigate("RecordDialog", { info });
    setIsModalVisible(!modalVisible);
  };
  /*
  useEffect(() => {
    const addSchedule = () => {
      const scheduleRef = ref(database, "calendar/scheduleId1");
      set(scheduleRef, {
        date: "2024-12-31T23:59:59Z",
        memo: "New Year's Eve Party",
        notificationTime: "2024-12-31T20:00:00Z",
        title: "End of Year Celebration",
      })
        .then(() => console.log("일정 추가 성공!"))
        .catch((error) => console.error("일정 추가 실패:", error));
    };

    addSchedule();
  }, []);
*/
  return (
    <BackGround source={require("../../assets/Home/HomeBG.png")}>
      <StyledView>
        <CalendarBtn onPress={() => navigation.navigate('Calendars')}>
          <CalendarImg source={require("../../assets/Home/CalendarIcon.png")} />
        </CalendarBtn>
        <DogBtn>
          <DogImg source={require("../../assets/Home/DogHouse.png")} />
        </DogBtn>
        <DogBtn align="center">
          <DogImg source={require("../../assets/Home/Dog.png")} />
        </DogBtn>
      </StyledView>
      <BottomButtonWrapper>
        {!modalVisible && (
          <BottomButtonWrapper>
            <CalendarBtn align="center" onPress={handleModal}>
              <CalendarImg source={require("../../assets/Home/ArrowUp.png")} />
            </CalendarBtn>
          </BottomButtonWrapper>
        )}
      </BottomButtonWrapper>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <TouchableWithoutFeedback onPress={handleModal}>
          <ModalBack>
            <TouchableWithoutFeedback>
              <ModalView>
                <CalendarBtn align="center" onPress={handleModal}>
                  <CalendarImg
                    source={require("../../assets/Home/ArrowDown.png")}
                  />
                </CalendarBtn>
                <Icons>
                  <IconBtn onPress={() => handleDialog("급여")}>
                    <IconImg
                      source={require("../../assets/Home/FeedIcon.png")}
                    />
                    <IconTxt>급여</IconTxt>
                  </IconBtn>
                  <IconBtn onPress={() => handleDialog("약")}>
                    <IconImg
                      source={require("../../assets/Home/MedicineIcon.png")}
                    />
                    <IconTxt>약</IconTxt>
                  </IconBtn>
                  <IconBtn onPress={() => handleDialog("체중")}>
                    <IconImg source={require("../../assets/Home/KgIcon.png")} />
                    <IconTxt>체중</IconTxt>
                  </IconBtn>
                  <IconBtn onPress={() => handleDialog("대소변")}>
                    <IconImg
                      source={require("../../assets/Home/PoopIcon.png")}
                    />
                    <IconTxt>대소변</IconTxt>
                  </IconBtn>
                </Icons>
                <Icons>
                  <IconBtn onPress={() => handleDialog("예방접종")}>
                    <IconImg
                      source={require("../../assets/Home/VaccineIcon.png")}
                    />
                    <IconTxt>예방접종</IconTxt>
                  </IconBtn>
                  <IconBtn onPress={() => handleDialog("목욕")}>
                    <IconImg
                      source={require("../../assets/Home/BathIcon.png")}
                    />
                    <IconTxt>목욕</IconTxt>
                  </IconBtn>
                  <IconBtn onPress={() => handleDialog("산책")}>
                    <IconImg
                      source={require("../../assets/Home/WalkIcon.png")}
                    />
                    <IconTxt>산책</IconTxt>
                  </IconBtn>
                </Icons>
              </ModalView>
            </TouchableWithoutFeedback>
          </ModalBack>
        </TouchableWithoutFeedback>
      </Modal>
    </BackGround>
  );
}

const ModalBack = styled.View`
  flex: 1;
`;

const BackGround = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const StyledView = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 20px;
`;

const CalendarBtn = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin: 5px;
  align-self: ${(props) => props.align || "flex-start"};
`;
const CalendarImg = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: center;
`;
const DogBtn = styled.TouchableOpacity`
  width: 200px;
  height: 200px;
  margin: 10px;
  align-self: ${(props) => props.align || "flex-end"};
  border-radius: 100px;
`;
const DogImg = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: center;
`;
const BottomButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex: 1;
`;

const ModalView = styled.View`
  justify-content: flex-end; /* 화면 바닥에서 올라오게 설정 */
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: auto;
  padding-bottom: 20px;
`;

const Icons = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const IconBtn = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  background-color: white;
  border-radius: 20px;
  margin: 0 12px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;
const IconImg = styled.Image`
  width: 45px;
  height: 40px;
  resize-mode: cover;
  margin-top: 5px;
`;
const IconTxt = styled.Text`
  font-size: 12px;
`;
