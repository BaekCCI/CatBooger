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
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import styled from "styled-components/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import { UserContext } from "../../UseContext";
import { ref, set, onValue } from "firebase/database";
import { database } from "../../firebaseConfig";

const Uip = '192.168.1.23';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [schedules, setSchedules] = useState({});
  const [bathingRecords, setBathingRecords] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ title: "", memo: "" });
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [expandedScheduleId, setExpandedScheduleId] = useState(null);
  const [isRecordVisible, setIsRecordVisible] = useState(false); // 기록 탭 상태 관리
  const { userId } = useContext(UserContext);

  const onDayPress = (day) => {
    const adjustedDate = new Date(day.dateString);
    adjustedDate.setDate(adjustedDate.getDate() - 1);
    const adjustedDateString = adjustedDate.toISOString().split('T')[0];
    setSelectedDate(day.dateString);
    setExpandedScheduleId(null);
    fetchBathingRecords(adjustedDateString);
  };

  const fetchSchedules = (date) => {
    const scheduleRef = ref(database, `calendar/${userId}`);
    onValue(scheduleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSchedules((prevSchedules) => ({
          ...prevSchedules,
          [date]: Object.entries(data)
            .filter(([_, event]) => event.date.startsWith(date))
            .map(([id, event]) => ({ ...event, id })),
        }));
      } else {
        setSchedules((prevSchedules) => ({
          ...prevSchedules,
          [date]: [],
        }));
      }
    });
  };

  const fetchBathingRecords = async (date) => {
    try {
      const response = await axios.get(`http://${Uip}:5001/get_bathing_events/${userId}`);
      console.log('Response:', response.data);
      if (response.status === 200) {
        const bathingEvents = response.data;
        const filteredRecords = [];

        Object.values(bathingEvents).forEach(event => {
          Object.values(event.dates).forEach(record => {
            console.log(record);
            if (record.date.startsWith(date)) {
              filteredRecords.push(record);
            }
          });
        });

        console.log('Filtered Records:', filteredRecords); // 로그 출력 추가
        setBathingRecords(filteredRecords);
      } else {
        setBathingRecords([]);
      }
    } catch (error) {
      console.error("Failed to fetch records: ", error.response ? error.response.data : error.message);
      setBathingRecords([]);
    }
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

      updatedSchedules[selectedDate].push({ ...scheduleData, id: newId });

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
    <View>
      <TouchableOpacity onPress={() => setExpandedScheduleId(expandedScheduleId === item.id ? null : item.id)}>
        <ScheduleItem>
          <ScheduleTime>{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</ScheduleTime>
          <ScheduleTitle>{item.title}</ScheduleTitle>
        </ScheduleItem>
      </TouchableOpacity>
      {expandedScheduleId === item.id && (
        <MemoContainer>
          <ScheduleMemo>{item.memo}</ScheduleMemo>
        </MemoContainer>
      )}
    </View>
  );

  const renderRecordItem = ({ item }) => (
    <RecordItem>
      <RecordTime>{new Date(item.date).toLocaleString()}</RecordTime>
      <RecordMemo>{item.memo}</RecordMemo>
    </RecordItem>
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
                keyExtractor={(item) => item.id}
              />
            ) : (
              <NoScheduleText>일정이 없습니다</NoScheduleText>
            )}
            <TouchableOpacity onPress={() => setIsRecordVisible(!isRecordVisible)}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 25}}>기록 {isRecordVisible ? '▲' : '▼'}</Text>
              </View>
            </TouchableOpacity>
            {isRecordVisible && (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                  <Image source={require('../../assets/Home/BathIcon.png')} style={{ width: 30, height: 30 }} />
                  <Text style={{ fontSize: 18, marginLeft: 10 }}>목욕</Text>
                </View>
                {bathingRecords.length > 0 ? (
                  <FlatList
                    data={bathingRecords}
                    renderItem={renderRecordItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : (
                  <NoRecordText>기록이 없습니다.</NoRecordText>
                )}
              </>
            )}
          </>
        ) : (
          <SelectedDateText></SelectedDateText>
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
  margin-bottom : 3%;
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
  border-bottom-width : 1px;
  border-bottom-color: #eee;
`;

const ScheduleTime = styled.Text`
  font-size: 16px;
  color: #555;
  width: 30%;
`;

const ScheduleTitle = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const MemoContainer = styled.View`
  padding: 10px;
  background-color: #f9f9f9;
  border-top-width: 1px;
  border-top-color: #eee;
`;

const ScheduleMemo = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const RecordItem = styled.View`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-vertical: 5px;
`;

const RecordTime = styled.Text`
  font-size: 14px;
  color: #555;
`;

const RecordMemo = styled.Text`
  font-size: 14px;
  color: #333;
`;

const NoRecordText = styled.Text`
  margin-top: 4%;
  font-size: 18px;
  text-align: center;
  color: #888;
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
