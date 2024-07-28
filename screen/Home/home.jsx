import React, {useState} from "react";
import { View, Text, ImageBackground, Modal,  TouchableWithoutFeedback} from "react-native";
import styled from "styled-components";


const Home = ({ navigation }) =>{
  const [modalVisible, setIsModalVisible]=useState(false);

    const onPress = () => navigation.navigate('Home');

    const handleModal = () => {
      setIsModalVisible(!modalVisible);
    }
  return (
    <BackGround source={require('../../assets/Home/HomeBG.png')}>
      <StyledView>
        <CalendarBtn>
          <CalendarImg source={require('../../assets/Home/CalendarIcon.png')}/>
        </CalendarBtn>
        <DogBtn>
          <DogImg source={require('../../assets/Home/DogHouse.png')}/>
        </DogBtn>
        <DogBtn align="center">
          <DogImg source={require('../../assets/Home/Dog.png')}/>
        </DogBtn>
      </StyledView>
      <BottomButtonWrapper>
        {!modalVisible && (
          <BottomButtonWrapper>
            <CalendarBtn align="center" onPress={handleModal}>
              <CalendarImg source={require('../../assets/Home/ArrowUp.png')} />
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
              <CalendarImg source={require('../../assets/Home/ArrowDown.png')} />
          </CalendarBtn>
          <Icons>
            < IconBtn>
              <IconImg source={require('../../assets/Home/FeedIcon.png')}/>
              <IconTxt>급여</IconTxt>
            </IconBtn>
            < IconBtn>
              <IconImg source={require('../../assets/Home/MedicineIcon.png')}/>
              <IconTxt>약</IconTxt>
            </IconBtn>
            < IconBtn>
              <IconImg source={require('../../assets/Home/KgIcon.png')}/>
              <IconTxt>체중</IconTxt>
            </IconBtn>
            < IconBtn>
              <IconImg source={require('../../assets/Home/PoopIcon.png')}/>
              <IconTxt>대소변</IconTxt>
            </IconBtn>
          </Icons>
          <Icons>
            < IconBtn>
              <IconImg source={require('../../assets/Home/VaccineIcon.png')}/>
              <IconTxt>예방접종</IconTxt>
            </IconBtn>
            < IconBtn>
              <IconImg source={require('../../assets/Home/BathIcon.png')}/>
              <IconTxt>목욕</IconTxt>
            </IconBtn>
            < IconBtn>
              <IconImg source={require('../../assets/Home/WalkIcon.png')}/>
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

export default Home;


const ModalBack = styled.View`
  flex : 1;
`

const BackGround = styled(ImageBackground)`
  flex : 1;
  width : 100%;
  height:100%;
  resize-mode : cover;
`;

const StyledView = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 20px;
`;

const CalendarBtn = styled.TouchableOpacity`
  width : 50px;
  height : 50px;
  margin : 5px;
  align-self : ${props => props.align || 'flex-start'};
`;
const CalendarImg = styled.Image`
  width : 100%;
  height : 100%;
  resize-mode :center ;
`;
const DogBtn = styled.TouchableOpacity`
  width : 200px;
  height : 200px;
  margin : 10px;
  align-self : ${props => props.align || 'flex-end'};
  border-radius : 100px;
`;
const DogImg = styled.Image`
  width : 100%;
  height : 100%;
  resize-mode : center;
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
  margin-top : auto;
  padding-bottom : 20px;
`;

const Icons = styled.View`
  display : flex;
  flex-direction : row;
  margin: 10px;
`;

const IconBtn = styled.TouchableOpacity`
  width : 65px;
  height : 65px;
  background-color : white;
  border-radius : 20px;
  margin : 0 12px;
  align-items : center;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;
const IconImg = styled.Image`
  width : 45px;
  height : 40px;
  resize-mode : cover;
  margin-top : 5px;
`;
const IconTxt = styled.Text`
  font-size : 12px;
`;