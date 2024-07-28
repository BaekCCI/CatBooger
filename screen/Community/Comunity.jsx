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
  { name: "고양이", isSelected: true },
];
const initialCategoryTags = [
  { name: "QnA", isSelected: true },
  { name: "건강", isSelected: true },
  { name: "간식", isSelected: true },
  { name: "일상", isSelected: true },
];

const Community = ({ navigation }) => {
  const [animalTags, setAnimalTags] = useState(initialAnimalTags);
  const [categoryTags, setCategoryTags] = useState(initialCategoryTags);

  const [isFilterOpened, setisFilterOpened] = useState(false);
  const openFilter = () => {
    setisFilterOpened(true);
  };
  const closeFilter = () => {
    setisFilterOpened(false);
  };

  /**커뮤니티 창에서 태그를 누르면 태그를 비활성화 상태로 바꾸는 함수 */
  const SelectTag = (tags, setTags, index) => {
    const updatedTags = tags.map((tag, i) =>
      i === index ? { ...tag, isSelected: !tag.isSelected } : tag
    );
    setTags(updatedTags);
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
    <View style={{ gap: 3, flexDirection : 'row', flexWrap : 'wrap' }}>
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
  
  /**필터 모달창에 해당하는 태그 */
  const FilterModalTag = () => {
    return(
      <Modal 
            visible={isFilterOpened} 
            onRequestClose={closeFilter}
            transparent={true}
            animationType="fade">
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <FilterContainer>
                <FilterContent>
                  {/**모달창 윗 부분 */}
                  <View style={{flexDirection : 'row', alignItems : 'baseline'}}>
                    <TouchableOpacity onPress={closeFilter}> 
                      <Image source={require("../../assets/community/x_icon.png")} style={{width:20, height : 20}}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:25, textAlign : 'center'}}>
                      필터
                    </Text>
                  </View> 

                  <HorizontalLine/>

                  {/**동물 태그 부분 */}
                  <Text style={{fontSize : 18}}>동물</Text>
                  
                  <HorizontalLine/>
                  <View style={{ flexDirection: "row", gap: 5 , flexWrap : "wrap"}}>
                    {animalTags.map((tag, index) => (
                        <TouchableOpacity key={index} onPress={() => {SelectTag(animalTags, setAnimalTags, index)}}>
                          <View style={{ borderWidth: 2,borderColor: tag.isSelected ? '#139989' : '#D9D9D9', borderRadius: 5, width: 50, height: 25 }}>
                            <Text style={{ textAlign: 'center', color : tag.isSelected ? '#139989' : 'black'}}>{tag.name}</Text>
                          </View>
                        </TouchableOpacity>
                    ))}
                  </View>
                  
                  {/**카테고리 태그 부분 */}
                  <Text style={{fontSize : 18, marginTop : 10}}>카테고리</Text>

                  <HorizontalLine/>
                  
                  <View style={{ flexDirection: "row", gap: 5, flexWrap : "wrap"}}>
                    {categoryTags.map((tag, index) => (
                        <TouchableOpacity key={index} onPress={() => SelectTag(categoryTags, setCategoryTags, index)}>
                          <View style={{ borderWidth: 2, borderColor: tag.isSelected ? '#139989' : '#D9D9D9', borderRadius: 5, width: 40, height: 25 }}>
                            <Text style={{ textAlign: 'center', color : tag.isSelected ? '#139989' : 'black'}}>{tag.name}</Text>
                          </View>
                        </TouchableOpacity>
                    ))}
                  </View>
                  
                  {/**선택 태그 확인 부분 */}
                  <HorizontalLine/>
                  <View style={{ gap: 3, flexDirection : 'row', flexWrap : 'wrap'}}>
                    {/**동물 태그 */}
                    <View style={{ flexDirection: "row", gap: 5 }}>
                      {animalTags.map((tag, index) => (
                        tag.isSelected ? (
                          <TouchableOpacity key={index} onPress={() => SelectTag(animalTags, setAnimalTags, index)}>
                            <View style={{ borderWidth: 1, borderColor: '#139989', borderRadius: 5, backgroundColor : '#139989',width: 50, height: 25 }}>
                              <Text style={{ textAlign: 'center', color : 'white' }}>{tag.name}</Text>
                            </View>
                          </TouchableOpacity>
                        ) : null
                      ))}
                    </View>
                    
                    {/**카테고리 태그*/}
                    <View style={{ flexDirection: "row", gap: 5 }}>
                      {categoryTags.map((tag, index) => (
                        tag.isSelected ? (
                          <TouchableOpacity key={index} onPress={() => SelectTag(categoryTags, setCategoryTags, index)}>
                            <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 5, backgroundColor : '#139989',width: 50, height: 25 }}>
                              <Text style={{ textAlign: 'center', color : 'white'}}>{tag.name}</Text>
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

    )
    
  }

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
            onTagPress={SelectTag}
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

        <FilterModalTag/>

        </CommunityContainer>
      </ScrollView>
    </SafeAreaView>
  );
};


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
