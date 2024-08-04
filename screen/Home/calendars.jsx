import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import styled from "styled-components/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { UserContext } from "../../UseContext";
import { ref, set, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [schedules, setSchedules] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ title: "", memo: "" });
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const { userId } = useContext(UserContext);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const fetchSchedules = (date) => {
    const scheduleRef = ref(database, `calendar/${userId}`);
    onValue(scheduleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSchedules((prevSchedules) => ({
          ...prevSchedules,
          [date]: Object.values(data).filter(event => event.date.startsWith(date)),
        }));
      } else {
        setSchedules((prevSchedules) => ({
          ...prevSchedules,
          [date]: [],
        }));
      }
    });
  };

  useEffect(() => {
    if (selectedDate) {
      fetchSchedules(selectedDate);
    }
  }, [selectedDate]);

  const addSchedule = () => {
    if (selectedTime && newSchedule.title) {
      const updatedSchedules = { ...schedules };
      if (!updatedSchedules[selectedDate]) {
        updatedSchedules[selectedDate] = [];
      }

      const newId = Date.now().toString(); // 고유한 ID 생성
      const scheduleData = {
        ...newSchedule,
        date: `${selectedDate}T${selectedTime}:00`, // 선택한 날짜와 입력한 시간을 결합
        notificationTime: new Date().toISOString(), // 일정을 게시한 시간을 ISO 형식으로 변환
      };

      updatedSchedules[selectedDate].push(scheduleData);

      // Firebase에 새 일정 추가
      const scheduleRef = ref(database, `calendar/${userId}/${newId}`);
      set(scheduleRef, scheduleData)
        .then(() => {
          setSchedules(updatedSchedules);
          setNewSchedule({ title: "", memo: "" });
          setSelectedTime(null);
          setModalVisible(false);
          fetchSchedules(selectedDate); // 최신 데이터를 다시 불러옴
        })
        .catch((error) => {
          console.error("Failed to add schedule:", error);
        });
    }
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    setSelectedTime(formattedTime);
    hideTimePicker();
  };

  const renderScheduleItem = ({ item }) => (
    <ScheduleItem>
      <ScheduleTime>{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</ScheduleTime>
      <ScheduleTitle>{item.title}</ScheduleTitle>
      <ScheduleMemo>{item.memo}</ScheduleMemo>
    </ScheduleItem>
  );

  const selectedSchedules = schedules[selectedDate] || [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
          }}
        />
        {selectedDate ? (
          <>
            <Header>
              <AddScheduleItem onPress={() => setModalVisible(true)}>
                <PlusText>+ 추가하기</PlusText>
              </AddScheduleItem>
            </Header>
            {selectedSchedules.length > 0 ? (
              <FlatList
                data={selectedSchedules}
                renderItem={renderScheduleItem}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <NoScheduleText>일정이 없습니다</NoScheduleText>
            )}
          </>
        ) : (
          <SelectedDateText>날짜를 선택하세요</SelectedDateText>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalContainer>
            <ModalView>
              <ModalTitle>새 일정 추가</ModalTitle>
              <TouchableOpacity onPress={showTimePicker} style={styles.input}>
                <Text>{selectedTime ? selectedTime : "시간 선택"}</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="일정 제목"
                value={newSchedule.title}
                onChangeText={(text) =>
                  setNewSchedule({ ...newSchedule, title: text })
                }
                style={styles.input}
              />
              <TextInput
                placeholder="메모"
                value={newSchedule.memo}
                onChangeText={(text) =>
                  setNewSchedule({ ...newSchedule, memo: text })
                }
                style={styles.input}
              />
              <ModalSection>
                <ModalButton onPress={() => setModalVisible(false)}>
                  <ModalButtonText>취소</ModalButtonText>
                </ModalButton>
                <ModalButton onPress={addSchedule}>
                  <ModalButtonText>추가</ModalButtonText>
                </ModalButton>
              </ModalSection>
            </ModalView>
          </ModalContainer>
        </Modal>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 4%;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3%;
  margin-right: 3%;
`;

const SelectedDateText = styled.Text`
  font-size: 18px;
`;

const AddScheduleItem = styled.TouchableOpacity`
  color: #007bff;
`;

const PlusText = styled.Text`
  font-size: 16px;
  color: rgba(47, 106, 176, 1);
`;

const NoScheduleText = styled.Text`
  margin-top: 4%;
  font-size: 18px;
  text-align: center;
  color: #888;
`;

const ScheduleItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 3%;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const ScheduleTime = styled.Text`
  font-size: 16px;
  color: #555;
  width: 20%;
`;

const ScheduleTitle = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const ScheduleMemo = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalView = styled.View`
  width: 80%;
  padding: 5%;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 7%;
  text-align: center;
`;

const ModalSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10%;
`;

const ModalButton = styled.TouchableOpacity`
  padding: 4% 23%;
`;

const ModalButtonText = styled.Text`
  font-size: 16px;
  color: #007bff;
`;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default CalendarScreen;
