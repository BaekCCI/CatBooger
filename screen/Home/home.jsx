import React, { useState, useEffect } from "react";
import {View,Text,ImageBackground,Modal,TouchableWithoutFeedback, TouchableHighlight, StyleSheet } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

import { ref, set, get, child, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";

export default function Home() {
  const [modalVisible, setIsModalVisible] = useState(false);
  const [walkModal, setWalkModal] = useState(false);
  const [isWalkStart, setIsWalkStart] = useState(false);
  const navigation = useNavigation();

  const handleModal = () => {
    setIsModalVisible(!modalVisible);
  };
  const handleDialog = (info) => {
    if(info==='산책'){
      setIsModalVisible(!modalVisible);
      setWalkModal(!walkModal);
    }else{
      navigation.navigate("RecordDialog", { info });
      setIsModalVisible(!modalVisible);
    }
  };
  const handleWalk = () => {
    navigation.navigate("WalkRecord", { info: '산책', time: '00:00:00' });
    setWalkModal(false);
  };
  const handleStartWalk=()=>{
    setIsWalkStart(true);
    setWalkModal(false);
  }
  
  /*
//   useEffect(() => {
// <<<<<<< login
//     const checkConnection = async () => {
//       // try {
//         const dbRef = ref(database, ".info/connected");

//         onValue(dbRef, (snapshot)=> {
//           const isConnected = snapshot.val();
//           if (isConnected === true) {
//             console.log("Firebase 연결 성공");
//           } else {
//             console.log("Firebase 연결 실패");
//           }
//         }, (error) => {
//           console.error("Firebase 연결 오류: ", error);
//         }
//       );


// =======
//     const addSchedule = () => {
//       const scheduleRef = ref(database, "calendar/scheduleId1");
//       set(scheduleRef, {
//         date: "2024-12-31T23:59:59Z",
//         memo: "New Year's Eve Party",
//         notificationTime: "2024-12-31T20:00:00Z",
//         title: "End of Year Celebration",
//       })
//         .then(() => console.log("일정 추가 성공!"))
//         .catch((error) => console.error("일정 추가 실패:", error));
// >>>>>>> master
//     };

//     addSchedule();
//   }, []);
*/
  return (
    <BackGround source={require("../../assets/Home/HomeBG.png")}>
      <StyledView>
        <RowView>
        <CalendarBtn onPress={() => navigation.navigate('Calendars')}>
          <CalendarImg source={require("../../assets/Home/CalendarIcon.png")} />
        </CalendarBtn>
        {isWalkStart && (
          <TimerView setIsWalkStart={setIsWalkStart}/>
        )}
        </RowView>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={walkModal}
        onRequestClose={() => setWalkModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setWalkModal(false)}>
        <ModalBack>
          <TouchableWithoutFeedback onPress={() => {}}>
            <WalkModalView>
              <RowView>
                <BackBtn onPress={() => setWalkModal(false)}>
                  <BackImg source={require('../../assets/Home/ArrowLeft.png')}/>
                </BackBtn>
                <AddWalkBtn onPress={handleWalk}>
                  <AddWaltTxt>+ 기록 추가</AddWaltTxt>
                </AddWalkBtn>
              </RowView>
              <StartMsg>주인님 산책해요!</StartMsg>
              <StartBtn onPress={handleStartWalk}>
                <StartBtnTxt>기록 시작하기</StartBtnTxt>
              </StartBtn>
            </WalkModalView>
          </TouchableWithoutFeedback>
        </ModalBack>
      </TouchableWithoutFeedback>
      </Modal>
    </BackGround>
  );
}
const TimerView=({ setIsWalkStart })=>{
  const [start,setStart] = useState(true);
  const [time, setTime] = useState("00:00:00");
  const [finishRecord, setFinishRecord]=useState(false);
  const navigation = useNavigation();

  const toggleStopwatch=()=>{
    setStart(!start);
    setFinishRecord(!finishRecord);

  }
  const handleModal =()=>{
    setFinishRecord(!finishRecord);
    navigation.navigate("WalkRecord", { info: '산책', time: time });
    setIsWalkStart(false);
  }
  const handleCancel =()=>{
    setIsWalkStart(false);
  }

  return (
    <View>
      <TouchableHighlight onPress={toggleStopwatch}>
        <Stopwatch
          start={start}
          options={options}
          getTime={(time) => {
            setTime(time);
          }}
        />
      </TouchableHighlight>
      <Modal
        animationType="slide"
        transparent={true}
        visible={finishRecord}
        onRequestClose={toggleStopwatch}
      >
        <TouchableWithoutFeedback onPress={toggleStopwatch}>
        <ModalBack>
          <TouchableWithoutFeedback onPress={() => {}}>
            <FinishModalView>
              <AddWalkBtn marginBottom='5px;' alignSelf='flex-end' onPress={handleCancel}>
                <AddWaltTxt>기록 취소하기</AddWaltTxt>
              </AddWalkBtn>
              <StartMsg size = '22px'>산책을 종료하시겠습니까?</StartMsg>
              <RowView justifyContent='center'>
                <FinishBtn backgroundColor='#C0C0C0' onPress={toggleStopwatch}>
                  <StartBtnTxt size='18px'>뒤로가기</StartBtnTxt>
                </FinishBtn>
                <FinishBtn onPress={handleModal}>
                  <StartBtnTxt size='18px'>종료하기</StartBtnTxt>
                </FinishBtn>
                </RowView>
            </FinishModalView>
          </TouchableWithoutFeedback>
        </ModalBack>
      </TouchableWithoutFeedback>
      </Modal>
    </View>
    
  );
}
const options = {
  container: {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : 'rgba(0,0,0,0.4)',
    borderRadius : 10,
    padding : 10,
    width : 120,
  },
  text: {
    fontSize: 18,
    color: '#FFF',
  }
};
const FinishModalView=styled.View`
  width : 85%;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  margin: auto;
  border-radius : 10px;
  padding : 20px 5px 10px 5px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;
const FinishBtn = styled.TouchableOpacity`
  background-color : ${(props)=>props.backgroundColor || '#139989'};
  padding : 10px 20px;
  border-radius : 10px;
  margin : 20px 10px 0 10px;
`;
const WalkModalView = styled.View`
  width : 100%;
  height: 220px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  margin: auto;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;
const RowView = styled.View`
  flex-direction : row;
  align-items : center;
  width : 100%;
  justify-content: ${(props)=> props.justifyContent || 'space-between'};
  margin-bottom : 20px;
`;
const BackBtn = styled.TouchableOpacity`
  width : 40px;
  height : 40px;
  align-self : flex-start;
`;
const BackImg = styled.Image`
  width : 100%;
  height : 100%;
`;
const AddWalkBtn = styled.TouchableOpacity`
  margin-right : 10px;
  margin-bottom : ${(props)=>props.marginBottom || '0'};
  align-self : ${(props)=>props.alignSelf || 'auto'};
`;
const AddWaltTxt =styled.Text`
  color : #2F6AB0;
  font-size : 16px;
`;
const StartMsg = styled.Text`
  font-size : ${(props)=> props.size || '25px'};
  font-weight : bold;
`;
const StartBtn = styled.TouchableOpacity`
  background-color : #F6D663;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  elevation: 5;
  margin-top : 25px;
  justify-content : center;
  padding : 10px 20px;
`;
const StartBtnTxt = styled.Text`
  color : white;
  font-size : ${(props)=>props.size || '20px'};
  font-weight : bold;
  text-align : center;
`
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
