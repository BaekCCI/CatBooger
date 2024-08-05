import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Chatting () {

  const route = useRoute();
  const { chatId } = route.params; //ChatList에 있는 chatData객체의 id, 아마 의사 아이디 일듯..?

  const [messages, setMessages] = useState([
    { id: '1', text: '보여?', time: '오후 22:26', sender: 'other' },
    { id: '2', text: '진짜 돼?', time: '오후 22:26', sender: 'me' },
    { id: '3', text: '일단 이거', time: '오후 22:52', sender: 'me' },
    // 추가 메시지 데이터...
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        time: new Date().toLocaleTimeString(),
        sender: 'me',
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText('');
    }
  };

  const renderItem = ({ item }) => (
    <MessageContainer sender={item.sender}>
      <MessageBubble sender={item.sender}>
        <MessageText>{item.text}</MessageText>
      </MessageBubble>
      <MessageTime>{item.time}</MessageTime>
    </MessageContainer>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Container>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          inverted
          contentContainerStyle={{ flexDirection: 'column-reverse' }}
        />
        <InputContainer>
          <TextInput
            style={styles.input}
            placeholder="메시지를 입력하세요."
            value={inputText}
            onChangeText={setInputText}
          />
          <SendButton onPress={handleSend}>
            <SendButtonText>전송</SendButtonText>
          </SendButton>
        </InputContainer>
      </Container>
    </KeyboardAvoidingView>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const MessageContainer = styled.View`
  align-items: ${props => (props.sender === 'me' ? 'flex-end' : 'flex-start')};
  margin: 1% 3%;
`;

const MessageBubble = styled.View`
  background-color: ${props => (props.sender === 'me' ? 'rgba(92, 196, 184, 0.5)' : '#E0E0E0')};
  padding: 2.7%;
  border-radius: 5px;
  max-width: 70%;
`;

const MessageText = styled.Text`
  font-size: 16px;
`;

const MessageTime = styled.Text`
  font-size: 12px;
  color: #888;
  margin-top: 1%;
  margin-right: 1%;
`;

const InputContainer = styled.View`
  flex-direction: row;
  padding: 3%;
  border-top-width: 1px;
  border-top-color: #ccc;
  margin-top: 1%;
`;

const SendButton = styled.TouchableOpacity`
  background-color: rgba(92, 196, 184, 0.7);
  padding: 3%;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 3%;
`;

const SendButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

