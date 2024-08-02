import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RecordList from './RecordList';

const initialSchedules = {
  '2024-08-01': [
    { id: 1, time: '09:30', title: '미용실 가기', icon: '🐶', memo: '기억해요!' },
    { id: 2, time: '10:30', title: '병원 예방접종', icon: '🐱', memo: '중요한 일정!' },
  ],
  '2024-08-02': [
    { id: 3, time: '09:00', title: '출근', icon: '🐶', memo: '아침 출근' },
    { id: 4, time: '18:00', title: '퇴근', icon: '🐱', memo: '저녁 퇴근' },
  ],
  // 추가 일정 데이터
};

const CalendarScreen = ({userId}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [schedules, setSchedules] = useState(initialSchedules);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ time: '', title: '', memo: '' });
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [expandedScheduleId, setExpandedScheduleId] = useState(null);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setExpandedScheduleId(null);
  };

  const renderScheduleItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => setExpandedScheduleId(expandedScheduleId === item.id ? null : item.id)}>
        <ScheduleItem>
          <ScheduleTime>{item.time}</ScheduleTime>
          <ScheduleTitle>{item.title}</ScheduleTitle>
          <ScheduleIcon>{item.icon}</ScheduleIcon>
        </ScheduleItem>
      </TouchableOpacity>
      {expandedScheduleId === item.id && (
        <MemoContainer>
          <MemoText>{item.memo}</MemoText>
        </MemoContainer>
      )}
    </View>
  );

  const selectedSchedules = schedules[selectedDate] || [];

  const addSchedule = () => {
    if (newSchedule.time && newSchedule.title) {
      const updatedSchedules = { ...schedules };
      if (!updatedSchedules[selectedDate]) {
        updatedSchedules[selectedDate] = [];
      }
      const newId = Math.max(...Object.values(schedules).flat().map(schedule => schedule.id)) + 1;
      updatedSchedules[selectedDate].push({ ...newSchedule, id: newId, icon: '🐾' });
      setSchedules(updatedSchedules);
      setNewSchedule({ time: '', title: '', memo: '' });
      setModalVisible(false);
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
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setNewSchedule({ ...newSchedule, time: formattedTime });
    hideTimePicker();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
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
                keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <NoScheduleText>일정이 없습니다</NoScheduleText>
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
                <Text>{newSchedule.time ? newSchedule.time : "시간 선택"}</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="일정 제목"
                value={newSchedule.title}
                onChangeText={(text) => setNewSchedule({ ...newSchedule, title: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="메모"
                value={newSchedule.memo}
                onChangeText={(text) => setNewSchedule({ ...newSchedule, memo: text })}
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
      <RecordList userId={userId} date={selectedDate} />
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

const ScheduleIcon = styled.Text`
  font-size: 24px;
`;

const MemoContainer = styled.View`
  padding: 10px;
  background-color: #f9f9f9;
  border-top-width: 1px;
  border-top-color: #eee;
`;

const MemoText = styled.Text`
  font-size: 16px;
  color: #333;
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
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default CalendarScreen;
