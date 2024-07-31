import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styled from 'styled-components/native';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
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
          <SelectedDateText>선택된 날짜: {selectedDate}</SelectedDateText>
        ) : (
          <SelectedDateText>날짜를 선택하세요</SelectedDateText>
        )}
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const SelectedDateText = styled.Text`
  margin-top: 16px;
  font-size: 18px;
  text-align: center;
`;

export default CalendarScreen;
