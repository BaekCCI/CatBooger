import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { firestore } from "../../firebaseConfig";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";

const Chatting = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  let userId = "userId5"; // 현재 사용자의 ID
  const chatId = route.params.id; // 현재 채팅방의 ID

  useEffect(() => {
    const fetchMessages = () => {
      const chatDocRef = doc(firestore, "users", userId, "chats", chatId);

      // Firestore의 실시간 업데이트를 구독
      const unsubscribe = onSnapshot(chatDocRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data && data.messages) {
            const messagesData = Object.values(data.messages);
            setMessages(messagesData);
          } else {
            setMessages([]); // 메시지가 없는 경우 빈 배열로 설정
          }
        } else {
          console.error("Chat document does not exist");
          setMessages([]);
        }
      });

      // 컴포넌트 언마운트 시 구독 해제
      return unsubscribe;
    };

    const unsubscribe = fetchMessages();
    return () => unsubscribe(); // cleanup 함수로 구독 해제
  }, [userId, chatId]);

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    // Firestore에서 고유한 문서 ID를 생성
    const newMessageId = `msg${Date.now()}`; // 간단한 ID 생성 방법
    const newMessage = {
      id: newMessageId, // 고유한 메시지 ID
      timestamp: new Date(), // 타임스탬프 생성
      text: inputText,
      sender: userId, // 현재 사용자의 userId를 sender로 저장
    };

    try {
      // Firestore에 메시지 추가
      await setDoc(
        doc(firestore, "users", userId, "chats", chatId),
        { [`messages.${newMessageId}`]: newMessage },
        { merge: true }
      );
      setInputText(""); // 메시지 전송 후 입력란 비우기
    } catch (error) {
      console.error("Error sending message:", error);
      alert(error.message); // 에러 처리
    }
  };

  const renderItem = ({ item }) => {
    // 타임스탬프를 사람이 읽을 수 있는 시간으로 변환
    const time = item.timestamp
      ? new Date(item.timestamp).toLocaleTimeString()
      : "";

    return (
      <MessageContainer sender={item.sender === userId ? "me" : "other"}>
        <MessageBubble sender={item.sender === userId ? "me" : "other"}>
          <MessageText>{item.text}</MessageText>
        </MessageBubble>
        <MessageTime>{time}</MessageTime>
      </MessageContainer>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <Container>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={{ flexDirection: "column-reverse" }}
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
  align-items: ${(props) =>
    props.sender === "me" ? "flex-end" : "flex-start"};
  margin: 1% 3%;
`;

const MessageBubble = styled.View`
  background-color: ${(props) =>
    props.sender === "me" ? "rgba(92, 196, 184, 0.5)" : "#E0E0E0"};
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
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default Chatting;
