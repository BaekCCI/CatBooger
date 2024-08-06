import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
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
import { collection, doc, addDoc, onSnapshot } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { UserContext } from "../../UseContext";

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const route = useRoute(); // route 객체 가져오기4
  const { userId } = useContext(UserContext);
  const { chatId, name, doctorId } = route.params || {};
  console.log("Received doctorId:", doctorId); // doctorId가 잘 전달되었는지 확인용

  useEffect(() => {
    // Firestore의 메시지 데이터를 실시간으로 구독하는 함수
    const fetchMessages = () => {
      const messagesCollectionRef = collection(
        firestore,
        "users",
        userId,
        "chats",
        chatId,
        "messages"
      );

      // Firestore의 실시간 업데이트를 구독
      const unsubscribe = onSnapshot(messagesCollectionRef, (snapshot) => {
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

    const newMessage = {
      text: inputText,
      timestamp: new Date(), // 타임스탬프 생성
      sender: userId, // 현재 사용자의 userId를 sender로 저장
    };

    try {
      // Firestore에 메시지 추가
      await addDoc(
        collection(firestore, "users", userId, "chats", chatId, "messages"),
        newMessage
      );

      // Firestore에 의사(doctorId) 측의 메시지 추가
      await addDoc(
        collection(firestore, "users", doctorId, "chats", chatId, "messages"),
        newMessage
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
