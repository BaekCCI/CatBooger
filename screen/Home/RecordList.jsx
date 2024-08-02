import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import styled from 'styled-components/native';
import database from '@react-native-firebase/database';

const RecordList = ({ userId, date }) => {
  const [records, setRecords] = useState([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const userRef = database().ref(`checklists/${userId}`);
      userRef.once('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          const allRecords = [];

          // 모든 유형의 기록을 결합
          ['bathing', 'defecation', 'feeding', 'medication', 'vaccination', 'walking', 'weight'].forEach(type => {
            if (data[type]) {
              Object.values(data[type]).forEach(record => {
                record.dates.forEach(recordDate => {
                  if (new Date(recordDate.date).toDateString() === new Date(date).toDateString()) {
                    allRecords.push({ type, ...recordDate });
                  }
                });
              });
            }
          });

          setRecords(allRecords);
        }
      });
    };

    if (userId && date) {
      fetchRecords();
    }
  }, [userId, date]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.header}>기록 {expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expanded && (
        <FlatList
          data={records}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <RecordItem>
              <RecordType>{item.type}</RecordType>
              <RecordMemo>{item.memo}</RecordMemo>
            </RecordItem>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

const RecordItem = styled.View`
  margin-bottom: 10px;
`;

const RecordType = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

const RecordMemo = styled.Text`
  font-size: 14px;
  margin-left: 10px;
`;

export default RecordList;
