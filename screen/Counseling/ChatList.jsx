import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const chatData = [
  { id: '1', name: '길동', status: '대기중' },
  { id: '2', name: '홍길동', status: '상담중' },
  { id: '3', name: '홍길동', status: '상담종료' },
];

const ChatList = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Chatting', { chatId: item.id, name: item.name })}>
      <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <StatusBadge status={item.status}>
          <StatusText>{item.status}</StatusText>
        </StatusBadge>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 3,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const StatusBadge = styled.View`
  background-color: ${props => (props.status === '상담중' ? '#00C2B2' : props.status === '대기중' ? '#ddd' : '#888')};
  padding: 5px 10px;
  border-radius: 5px;
`;

const StatusText = styled.Text`
  font-size: 14px;
  color: white;
`;

export default ChatList;
