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
import { collection, doc, getDoc, addDoc, onSnapshot } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { UserContext } from "../../UseContext";

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [otherUserId, setOtherUserId] = useState("");
  const [otherUserName, setOtherUserName] = useState("");
  const route = useRoute(); // route 객체 가져오기4
  //const { userId } = useContext(UserContext);
  let userId = '3634679806';
  const { chatId, name } = route.params || {};


  //console.log("Received doctorId:", doctorId); // doctorId가 잘 전달되었는지 확인용

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const chatDocRef = doc(firestore, "users", userId, "chats", chatId);
        const chatDoc = await getDoc(chatDocRef);
  
        if (chatDoc.exists()) {
          const chatData = chatDoc.data();
          const otherId = chatData.participants.find((participant) => participant !== userId);
          setOtherUserId(otherId);
          setOtherUserName(chatData.participantNames[otherId] || "Unknown User");
        }
      } catch (error) {
        console.error("Error fetching chat details:", error);
      }
    };
  
    fetchChatDetails();
  }, [userId, chatId]);

  useEffect(() => {
    const fetchMessages = () => {
      const messagesCollectionRef = collection(
        firestore,
        "users",
        userId,
        "chats",
        chatId,
        "messages"
      );
  
      const otherMessagesCollectionRef = collection(
        firestore,
        "users",
        otherUserId,
        "chats",
        chatId,
        "messages"
      );
  
      const unsubscribe1 = onSnapshot(messagesCollectionRef, (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages((prevMessages) => {
          const allMessages = [...prevMessages, ...messagesData];
          const uniqueMessages = Array.from(new Set(allMessages.map((msg) => msg.id)))
            .map(id => allMessages.find(msg => msg.id === id));
          return uniqueMessages.sort((a, b) => a.timestamp - b.timestamp);
        });
      });
  
      return () => {
        unsubscribe1();
      };
    };
  
    if (otherUserId) {
      const unsubscribe = fetchMessages();
      return () => unsubscribe();
    }
  }, [userId, chatId, otherUserId]);

  const handleSend = async () => {
    if (inputText.trim() === "") return;
  
    const newMessage = {
      text: inputText,
      timestamp: new Date(),
      sender: userId,
    };
  
    try {
      await addDoc(
        collection(firestore, "users", userId, "chats", chatId, "messages"),
        newMessage
      );
  
      await addDoc(
        collection(firestore, "users", otherUserId, "chats", chatId, "messages"),
        newMessage
      );
  
      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert(error.message);
    }
  };
  

  const renderItem = ({ item }) => {
    const time = item.timestamp
      ? new Date(item.timestamp.toDate()).toLocaleTimeString()
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
