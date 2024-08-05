import React, { useState, useContext, useEffect } from "react";
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
import { UserContext } from "../../UseContext";
import { collection, doc, setDoc, query, onSnapshot } from "firebase/firestore";

/*
const Chatting = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "보여?", time: "오후 22:26", sender: "other" },
    { id: "2", text: "진짜 돼?", time: "오후 22:26", sender: "me" },
    { id: "3", text: "일단 이거", time: "오후 22:52", sender: "me" },
    // 추가 메시지 데이터...
  ]);
*/

const Chatting = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const { userId } = useContext(UserContext);
  userId = "userId5"; // 현재 사용자의 ID
  const chatId = route.params.id; // 현재 채팅방의 ID

  useEffect(() => {
    // Firestore의 메시지 데이터를 실시간으로 구독하는 함수
    const fetchMessages = () => {
      const messagesRef = collection(
        firestore,
        "users",
        userId,
        "chats",
        chatId,
        "messages"
      );
      const q = query(messagesRef);

      // Firestore의 실시간 업데이트를 구독
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
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
    const messageId = doc(
      collection(firestore, "users", userId, "chats", chatId, "messages")
    ).id;

    const newMessage = {
      // Firestore에 맞는 구조로 수정
      id: messageId, // 고유한 메시지 ID
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: inputText,
      sender: userId, // 현재 사용자의 userId를 sender로 저장
    };

    try {
      // Firestore에 메시지 추가
      await setDoc(
        doc(firestore, "users", userId, "chats", chatId, "messages", messageId),
        newMessage
      );
      setInputText(""); // 메시지 전송 후 입력란 비우기
    } catch (error) {
      alert(error.message); // 에러 처리
    }
  };

  const renderItem = ({ item }) => {
    // Firestore의 Timestamp 객체를 사람이 읽을 수 있는 시간으로 변환
    const time = item.timestamp
      ? item.timestamp.toDate().toLocaleTimeString()
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
