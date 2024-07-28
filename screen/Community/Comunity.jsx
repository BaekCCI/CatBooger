import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, Pressable, StatusBar, SafeAreaView, Alert} from "react-native";
import styled from "styled-components";
import { HorizontalLine, LikeTag, ScrapeTag } from "./CommunityCommonStyles.jsx";

/** 게시물 데이터 */
const Posts = [
  {
    title: "사실 우리집 고양이 킬러임",
    content: "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ",
    img: { uri: "https://ac-p1.namu.la/20240528sac/48a02548e24db4bade8089a58d4b34244c48cfd0436b894097ec670bdcfd9bac.jpg?expires=1722017549&key=ZnAk61LlLLP9Qb30HFTLhA&type=orig" },
    tags: ["고양이", "일상"],
    profileNickName: "괴문서맵게하는집",
    postTime: "2024-05-28 19:17:11",
    likeNumber: 13,
    scrapeNumber: 8
  },
  {
    title: "사실 우리집 고양이 킬러임",
    content: "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ",
    img: { uri: "https://ac-p1.namu.la/20240528sac/48a02548e24db4bade8089a58d4b34244c48cfd0436b894097ec670bdcfd9bac.jpg?expires=1722017549&key=ZnAk61LlLLP9Qb30HFTLhA&type=orig" },
    tags: ["고양이", "일상"],
    profileNickName: "괴문서맵게하는집",
    postTime: "2024-05-28 19:17:11",
    likeNumber: 13,
    scrapeNumber: 8
  }
];

/** 태그 데이터 */
const initialAnimalTags = [
  { name: "강아지", isSelected: true },
  { name: "고양이", isSelected: false },
  { name: "기타", isSelected: true },
];
const initialCategoryTags = [
  { name: "QnA", isSelected: true },
  { name: "건강", isSelected: false },
  { name: "간식", isSelected: false },
  { name: "일상", isSelected: true },
  { name: "기타", isSelected: false },
];

const Community = ({ navigation }) => {
  const [animalTags, setAnimalTags] = useState(initialAnimalTags);
  const [categoryTags, setCategoryTags] = useState(initialCategoryTags);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTagPress = (tags, setTags, index) => {
    const updatedTags = tags.map((tag, i) =>
      i === index ? { ...tag, isSelected: !tag.isSelected } : tag
    );
    setTags(updatedTags);
  };

  const openFilter = () => {
    setIsModalVisible(true);
  };

  const closeFilter = () => {
    setIsModalVisible(false);
  };

  const MoveToPost = () => navigation.navigate('CommunityContentWindow');

  return (
    <SafeAreaView>
      
      <ScrollView style={{ backgroundColor: 'white' }}>
        <StatusBar/>
        <CommunityContainer>
          <CommunityTopContainer openFilter={openFilter} />
          <HorizontalLine />
          <CommunityTagsContainer
            animalTags={animalTags}
            setAnimalTags={setAnimalTags}
            categoryTags={categoryTags}
            setCategoryTags={setCategoryTags}
            onTagPress={handleTagPress}
          />

          {Posts.map((PostData, index) => (
            <Post key={index}>
              <StyledButton onPress={MoveToPost}>
                <PostTitle>{PostData.title}</PostTitle>
                <PostContent>{PostData.content}</PostContent>
                <PostUnderContent>
                  <LickNameText>{PostData.profileNickName}</LickNameText>
                  <LikeTag likeNumber={PostData.likeNumber} />
                  <ScrapeTag scrapeNumber={PostData.scrapeNumber} />
                </PostUnderContent>
              </StyledButton>
              <HorizontalLine />
            </Post>
          ))}

        {/* 필터 모달 */}
        <Modal 
          visible={isModalVisible} 
          onRequestClose={closeFilter}
          transparent={true}
          animationType="fade">
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <FilterContainer>
              <FilterContent>
                <View style={{flexDirection : 'row', alignItems : 'baseline'}}>
                  <TouchableOpacity onPress={closeFilter}> 
                    <Image source={require("../../assets/community/x_icon.png")} style={{width:20, height : 20}}/>
                  </TouchableOpacity>
                  <Text style={{fontSize:25, textAlign : 'center'}}>
                    필터
                  </Text>
                </View> 

                <HorizontalLine/>

                <Text style={{fontSize : 18}}>동물</Text>
                
                <HorizontalLine/>
                <View style={{ flexDirection: "row", gap: 5 , flexWrap : "wrap"}}>
                  {animalTags.map((tag, index) => (
                      <TouchableOpacity key={index} onPress={() => alert(tag.name + " 선택!")}>
                        <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 5, width: 50, height: 25 }}>
                          <Text style={{ textAlign: 'center' }}>{tag.name}</Text>
                        </View>
                      </TouchableOpacity>
                  ))}
                </View>
                
                <Text style={{fontSize : 18, marginTop : 10}}>카테고리</Text>

                <HorizontalLine/>

                <View style={{ flexDirection: "row", gap: 5, flexWrap : "wrap"}}>
                  {categoryTags.map((tag, index) => (
                      <TouchableOpacity key={index} onPress={() => alert(tag.name + " 선택!")}>
                        <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 5, width: 40, height: 25 }}>
                          <Text style={{ textAlign: 'center' }}>{tag.name}</Text>
                        </View>
                      </TouchableOpacity>
                  ))}
                </View>
                
                <HorizontalLine/>
                <View style={{ gap: 3 }}>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    {animalTags.map((tag, index) => (
                      tag.isSelected ? (
                        <TouchableOpacity key={index} onPress={() => handleTagPress(animalTags, setAnimalTags, index)}>
                          <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 5, width: 50, height: 25 }}>
                            <Text style={{ textAlign: 'center' }}>{tag.name}</Text>
                          </View>
                        </TouchableOpacity>
                      ) : null
                    ))}
                  </View>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    {categoryTags.map((tag, index) => (
                      tag.isSelected ? (
                        <TouchableOpacity key={index} onPress={() => handleTagPress(categoryTags, setCategoryTags, index)}>
                          <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 5, width: 50, height: 25 }}>
                            <Text style={{ textAlign: 'center' }}>{tag.name}</Text>
                 </View>
                        </TouchableOpacity>
                      ) : null
                    ))}
                  </View>
                </View>
              </FilterContent>
            </FilterContainer>
          </View>
        </Modal>
        </CommunityContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

const CommunityTopContainer = ({ openFilter }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    }}
  >
    <Text style={{ fontSize: 30 }}>커뮤니티</Text>
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <TouchableOpacity onPress={() => alert("검색창 실행")}>
        <Image source={require('../../assets/community/search_logo.png')} style={{ width: 25, height: 25 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={openFilter}>
        <Image source={require('../../assets/community/filter_logo.png')} style={{ width: 25, height: 25 }} />
      </TouchableOpacity>
    </View>
  </View>
);

const CommunityTagsContainer = ({ animalTags, setAnimalTags, categoryTags, setCategoryTags, onTagPress }) => (
  <View style={{ gap: 3 }}>
    <View style={{ flexDirection: "row", gap: 5 }}>
      {animalTags.map((tag, index) => (
        tag.isSelected ? (
          <TouchableOpacity key={index} onPress={() => onTagPress(animalTags, setAnimalTags, index)}>
            <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 5, width: 50, height: 25 }}>
              <Text style={{ textAlign: 'center' }}>{tag.name}</Text>
            </View>
          </TouchableOpacity>
        ) : null
      ))}
    </View>
    <View style={{ flexDirection: "row", gap: 5 }}>
      {categoryTags.map((tag, index) => (
        tag.isSelected ? (
          <TouchableOpacity key={index} onPress={() => onTagPress(categoryTags, setCategoryTags, index)}>
            <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 5, width: 50, height: 25 }}>
              <Text style={{ textAlign: 'center' }}>{tag.name}</Text>
            </View>
          </TouchableOpacity>
        ) : null
      ))}
    </View>
  </View>
);

const CommunityContainer = styled.View`
  border-radius: 5px;
  margin: 15px;
`;

const StyledButton = styled.TouchableOpacity`
  font-color: blue;
`;

const Post = styled.View`
  margin: 0px 10px;
`;

const PostTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 3px;
`;

const PostContent = styled.Text`
  font-size: 13px;
  color: #787878;
  margin: 5px 0px;
`;

const PostUnderContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const LickNameText = styled.Text`
  flex-wrap : wrap;
  text-align: center;
  font-size: 13px;
`;

const FilterContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const FilterContent = styled.View`
  width: 70%;
  height : 100%;
  background-color: white;
  padding: 20px;
`;

export default Community;
