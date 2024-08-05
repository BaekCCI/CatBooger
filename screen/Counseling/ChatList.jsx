import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { ref, set, onValue } from "firebase/database";
import { firestore } from "../../firebaseConfig";
import { UserContext } from "../../UseContext";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

/*
const chatData = [
  { id: '1', name: '길동', status: '대기중' },
  { id: '2', name: '홍길동', status: '상담중' },
  { id: '3', name: '홍길동', status: '상담종료' },
];
*/

const ChatList = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([]);
  //const { userId } = useContext(UserContext); // 현재 사용자의 ID 가져오기
  let userId = "userId5";

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        // Firestore의 chats 컬렉션에서 현재 사용자가 참여하는 모든 채팅방 가져오기
        const chatsCollection = collection(firestore, "users", userId, "chats");
        const chatRoomsSnapshot = await getDocs(chatsCollection);

        const chatRoomsData = chatRoomsSnapshot.docs
          .map((chatRoomDoc) => {
            const data = chatRoomDoc.data();
            const otherUserId = data.participants.find(
              (participant) => participant !== userId
            );

            if (!otherUserId) {
              console.error(
                "No other user found in participants for chatRoomDoc:",
                chatRoomDoc.id
              );
              return null;
            }

            // participantNames에서 상대방의 이름을 가져오기
            const otherUserName = data.participantNames
              ? data.participantNames[otherUserId]
              : "Unknown User";

            return {
              id: chatRoomDoc.id,
              otherUserName,
              ...data,
            };
          })
          .filter((room) => room !== null);

        setChatRooms(chatRoomsData);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [userId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("Chatting", {
          chatId: item.id,
          name: item.otherUserName,
        })
      }
    >
      <Image
        source={{ uri: "https://via.placeholder.com/50" }}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.otherUserName}</Text>
        <StatusBadge status={item.status}>
          <StatusText>{item.status}</StatusText>
        </StatusBadge>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 3,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const StatusBadge = styled.View`
  background-color: ${(props) =>
    props.status === "상담중"
      ? "#00C2B2"
      : props.status === "대기중"
      ? "#ddd"
      : "#888"};
  padding: 5px 10px;
  border-radius: 5px;
`;

const StatusText = styled.Text`
  font-size: 14px;
  color: white;
`;

export default ChatList;
