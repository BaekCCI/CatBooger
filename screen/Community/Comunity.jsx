import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StatusBar, SafeAreaView, Alert, Pressable, TextInput } from "react-native";
import styled from "styled-components/native";
import { HorizontalLine, LikeTag, ScrapeTag } from "./CommunityCommonStyles.jsx";

// 게시물 데이터
const Posts = [
  {
    title: "개시물 제목",
    content: "게시물 내용",
    img: null,
    tags: ["강아지", "간식", "일상"],
    profileNickName: "글쓴이 닉네임",
    postTime: "게시 시간",
    likeNumber: '좋아요 수',
    scrapeNumber: '스크랩 수'
  },
  {
    title: "개시물 제목",
    content: "게시물 내용",
    img: {uri : "data:image/webp;base64,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"},
    tags: ["강아지", "간식", "일상"],
    profileNickName: "글쓴이 닉네임",
    postTime: "게시 시간",
    likeNumber: '좋아요 수',
    scrapeNumber: '스크랩 수'
  },
  {
    title: "개시물 제목이라고 하기에는 너무길어어어엉어어어어어엉",
    content: "게시물 내용",
    img: {uri : "data:image/webp;base64,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"},
    tags: ["강아지", "일상"],
    profileNickName: "글쓴이 닉네임",
    postTime: "게시 시간",
    likeNumber: '좋아요 수',
    scrapeNumber: '스크랩 수'
  },
  {
    title: "사실 우리집 고양이 킬러임영웅 콘서트",
    content: "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ 대충 더 추가적인 텍스트 야라라랍",
    img: { uri: "https://ac-p1.namu.la/20240528sac/48a02548e24db4bade8089a58d4b34244c48cfd0436b894097ec670bdcfd9bac.jpg?expires=1722017549&key=ZnAk61LlLLP9Qb30HFTLhA&type=orig" },
    tags: ["고양이", "QnA"],
    profileNickName: "괴문서맵게하는집",
    postTime: "2024-05-28 19:17:11",
    likeNumber: 13,
    scrapeNumber: 8
  },
  {
    title: "사실 우리집 고양이 킬러임",
    content: "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ",
    img: null,
    tags: ["강아지"],
    profileNickName: "괴문서맵게하는집",
    postTime: "2024-05-28 19:17:11",
    likeNumber: 13,
    scrapeNumber: 8
  }
];

/**이미지 데이터 */
xIcon = require('../../assets/community/x_icon.png');
penIcon = require('../../assets/community/pen_icon.png');

// 태그 데이터
const initialAnimalTags = [
  { name: "강아지", isSelected: false },
  { name: "고양이", isSelected: false },
];
const initialCategoryTags = [
  { name: "QnA", isSelected: false },
  { name: "건강", isSelected: false },
  { name: "간식", isSelected: false },
  { name: "일상", isSelected: false },
];

const Community = ({ navigation }) => {
  const [animalTags, setAnimalTags] = useState(initialAnimalTags);
  const [categoryTags, setCategoryTags] = useState(initialCategoryTags);
  /**태그를 눌렀을 때, 태그가 활성화 되어있는 상태면 끄고, 비활성화 된 상태면 키는 함수 */
  const SelectTag = (tags, setTags, index) => {
    const updatedTags = tags.map((tag, i) =>
      i === index ? { ...tag, isSelected: !tag.isSelected } : tag
    );
    setTags(updatedTags);
  };
  /**태그 초기화 버튼에 해당하는 기능을 담은 함수 */
  const ResetTag = () => {
    const resetAnimalTags = animalTags.map((tag) => ({ ...tag, isSelected: false }));
    setAnimalTags(resetAnimalTags);

    const resetCategoryTags = categoryTags.map((tag) => ({ ...tag, isSelected: false }));
    setCategoryTags(resetCategoryTags);
  };
  

  /**커뮤니티의 상단 부분을 담는 태그 */
  const CommunityTopContainer = () => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {/**커뮤니티 제목을 담는 태그 */}
      <Text style={{fontSize: 25, fontWeight:'bold'}}>커뮤니티</Text>
      
      {/**커뮤니티 검색 버튼을담는 태그*/}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity onPress={openSearching}>
          <Image source={require('../../assets/community/search_logo.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      {/**커뮤니티 필터 버튼을 담는 태그*/}
        <TouchableOpacity onPress={OpenFilter}>
          <Image source={require('../../assets/community/filter_logo.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  /**커뮤니티 창에서 태그를 띄우는 부분을 담는 태그*/
  const CommunityTagsContainer = () => (
    <View style={{ gap: 3, flexDirection: 'row', flexWrap: 'wrap'}}>
      {/**동물 태그들을 띄우는 태그 */}
      <View style={{ flexDirection: "row", gap: 5 }}>
        {animalTags.map((tag, index) => (
          tag.isSelected && (
            <TouchableOpacity key={index} onPress={() => SelectTag(animalTags, setAnimalTags, index)}>
              <View style={{ borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, width: 60, height: 25, flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                <Text style={{ textAlign: 'center', color:'#595959' }}>{tag.name}</Text>
                <Image source={xIcon} style={{width:15, height:15}}/>
              </View>
            </TouchableOpacity>
          )
        ))}
      </View>

      {/**카테고리 태그들을 띄우는 태그 */}
      <View style={{ flexDirection: "row", gap: 5}}>
        {categoryTags.map((tag, index) => (
          tag.isSelected && (
            <TouchableOpacity key={index} onPress={() => SelectTag(categoryTags, setCategoryTags, index)}>
              <View style={{ borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 5, width: 60, height: 25, flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                <Text style={{ textAlign:'center', color:'#595959'}}>{tag.name}</Text>
                <Image source={xIcon} style={{width:15, height:15}}/>
              </View>
            </TouchableOpacity>
          )
        ))}
      </View>
    </View>
  );

  /**활성화된 태그들을 가져오는 함수 */
  const getSelectedTags = (tags) => tags.filter(tag => tag.isSelected).map(tag => tag.name);

  /**게시물 데이터를 필터링하는 함수 */
  const filterPosts = () => {
    const selectedAnimalTags = getSelectedTags(animalTags);
    const selectedCategoryTags = getSelectedTags(categoryTags);

    // 모든 태그가 비활성화된 경우 모든 게시물을 반환
    if (selectedAnimalTags.length === 0 && selectedCategoryTags.length === 0) {
      return Posts;
    }

    // 활성화된 태그와 일치하는 게시물을 필터링
    return Posts.filter(post =>
      post.tags.some(tag => selectedAnimalTags.includes(tag) || selectedCategoryTags.includes(tag))
    );
  };

  /**필터링된 게시물 데이터를 반환 */
  const filteredPosts = filterPosts();

  /**게시물을 렌더링하는 함수 */
  const PostsTag = (postData) => {
    // 선택된 태그를 가져옴
    const selectedAnimalTags = getSelectedTags(animalTags);
    const selectedCategoryTags = getSelectedTags(categoryTags);
    // 게시물을 필터링함
    const filteredPosts = filterPosts(Posts, selectedAnimalTags, selectedCategoryTags);
    return (
      filteredPosts.map((postData, index) => (
        <Post key={index}>
          <StyledButton onPress={MoveToPost} style={{flexDirection:'row', alignItems:'center', gap: 5}}>
            <View style={{flex:3}}>
              <PostTitle numberOfLines={1} ellipsizeMode="tail">
                {postData.tags.includes("QnA")? 
                    <Text >Q. {postData.title}</Text>
                : <Text>{postData.title}</Text>}
              </PostTitle>
              <PostContent numberOfLines={2} ellipsizeMode="tail">{postData.content}</PostContent>
              <TagsContainer>
                {postData.tags.map((tag, index) => (
                  <Tag key={index}>{'#' + tag}</Tag>
                ))}
              </TagsContainer>
              <PostUnderContent>
                <NickNameText>{postData.profileNickName}</NickNameText>
                <LikeTag likeNumber={postData.likeNumber} />
                <ScrapeTag scrapeNumber={postData.scrapeNumber} />
              </PostUnderContent>
            </View>

            {postData.img !== null ? <PostImg source={postData.img}/> : null}
          </StyledButton>
          <HorizontalLine />
        </Post>
      ))
    );
  };

  /**검색 모달창의 열고 닫음에 대한 State*/
  const [isSearchingOpened, setIsSearchingOpened] = useState(false);
  /**검색 모달창을 여는 함수 */
  const  openSearching = () => setIsSearchingOpened(true);
  /**검색 모달창을 닫는 함수 */
  const  closeSearching = () => setIsSearchingOpened(false);
  /** 검색 모달창에 대한 태그 */
  const SearchingModalTag = () => {
    return (
      <Modal
        visible={isSearchingOpened}
        onRequestClose={closeSearching}
        transparent={true}
        animationType="fade"
      >
        <Pressable
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={closeSearching}
        >
          <Pressable
            style={{ backgroundColor: 'white', width: '70%', height: '80%' }}
          >
            <TouchableOpacity onPress={closeSearching}>
              <Text>
                검색창 닫기
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    )
  }


  /**필터 모달창의 열고 닫음에 대한 State */
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  /**필터 모달창을 여는 함수 */
  const OpenFilter = () => setIsFilterOpened(true);
  /**필터 모달창을 닫는 함수 */
  const CloseFilter = () => setIsFilterOpened(false);
  /**필터 모달창에 해당하는 태그 */
  const FilterModalTag = () => (
    <Modal 
      visible={isFilterOpened} 
      onRequestClose={CloseFilter}
      transparent={true}
      animationType="fade"
    >
        <FilterContainer onPress={CloseFilter}>
          <FilterContent>
            {/**제목에 해당하는 태그 */}
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <TouchableOpacity onPress={CloseFilter}> 
                <Image source={require("../../assets/community/x_icon.png")} style={{width:20, height: 20}}/>
              </TouchableOpacity>
              <Text style={{fontSize:25, textAlign: 'center', fontWeight:'bold'}}>
                필터
              </Text>
            </View> 

            <HorizontalLine/>

            <Text style={{fontSize: 18, fontWeight:'bold'}}>동물</Text>
            {/**동물 태그들을 담은 태그 */}
            <HorizontalLine/>
            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap"}}>
              {animalTags.map((tag, index) => (
                <TouchableOpacity key={index} onPress={() => SelectTag(animalTags, setAnimalTags, index)}>
                  <View style={{ borderWidth: 2, borderColor: tag.isSelected ? '#139989' : '#D9D9D9', borderRadius: 5, width: 50, height: 25 }}>
                    <Text style={{ textAlign: 'center', color: tag.isSelected ? '#139989' : 'black'}}>{tag.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={{fontSize: 18, marginTop: 10, fontWeight:'bold'}}>카테고리</Text>

            <HorizontalLine/>

            {/**카테고리 태그들을 담은 태그 */}
            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap"}}>
              {categoryTags.map((tag, index) => (
                <TouchableOpacity key={index} onPress={() => SelectTag(categoryTags, setCategoryTags, index)}>
                  <View style={{ borderWidth: 2, borderColor: tag.isSelected ? '#139989' : '#D9D9D9', borderRadius: 5, width: 40, height: 25 }}>
                    <Text style={{ textAlign: 'center', color: tag.isSelected ? '#139989' : 'black'}}>{tag.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <HorizontalLine/>

            {/** 필터창 내에서 선택한 태그들을 보게 해주는 태그 */}
            <View style={{ gap: 3, flexDirection: 'row', flexWrap: 'wrap'}}>
            {/** 선택한 동물 태그들을 보여줌 */}
              <View style={{ flexDirection: "row", gap: 5 }}>
                {animalTags.map((tag, index) => (
                  tag.isSelected && (
                    <TouchableOpacity key={index} onPress={() => SelectTag(animalTags, setAnimalTags, index)}>
                      <View style={{ borderWidth: 1, borderColor: '#139989', borderRadius: 5, backgroundColor: '#139989', width: 60, height: 25, flexDirection:'row', alignItems :'center', justifyContent:'space-evenly'}}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>{tag.name}</Text>
                        <Image source={xIcon} style={{width:15, height:15}}/>
                      </View>
                    </TouchableOpacity>
                  )
                ))}
              </View>
          
            {/** 선택한 카테고리 태그들을 보여줌 */}
              <View style={{ flexDirection: "row", gap: 5, flexWrap:'wrap'}}>
                {categoryTags.map((tag, index) => (
                  tag.isSelected && (
                    <TouchableOpacity key={index} onPress={() => SelectTag(categoryTags, setCategoryTags, index)}>
                      <View style={{ borderWidth: 1, borderColor: 'green', borderRadius: 5, backgroundColor: '#139989', width: 60, height: 25, flexDirection :'row', alignItems :'center', justifyContent:'space-evenly'}}>
                        <Text style={{ textAlign: 'center', color: 'white'}}>{tag.name}</Text>
                        <Image source={xIcon} style={{width:15, height:15}}/>
                      </View>
                    </TouchableOpacity>
                  )
                ))}
              </View>

            </View>
            
            {/**초기화 버튼을 담은 태그 */}
            <View style={{alignItems:'center', justifyContent : 'flex-end', flex : 1}}>
              <TouchableOpacity onPress={() => ResetTag()}>
                <View style={{borderWidth :2, borderColor:'#D9D9D9', borderRadius : 5, padding : 2, marginBottom : 20}}>
                  <Text style={{fontSize : 20, color : '#595959'}}>
                    초기화
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

          </FilterContent>
        </FilterContainer>
    </Modal>
  );

  /**글쓰기 버튼에 해당하는 태그 */
  const WritePostButton = () => {
    return(
      <TouchableOpacity
      onPress={() => alert("글쓰기 창")}
      style={{
        position:'absolute', 
        bottom:20, right:20, 
        backgroundColor:'#ffffff90',
        flexDirection:'row', 
        justifyContent:'space-around', 
        borderWidth:1, 
        borderRadius:5, 
        padding : 1}}
        >
        <Image source={penIcon} style={{width:40,height:40}}/>
      </TouchableOpacity>
    )
  }
  
  /**-------------------------------커뮤니티 화면-------------------------------*/
  const MoveToPost = () => navigation.navigate('CommunityPost');
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{ backgroundColor: 'white'}}>
        <StatusBar />
        
        <CommunityContainer>
          <CommunityTopContainer />
          <HorizontalLine />
          <CommunityTagsContainer />

          <PostsTag postData={filteredPosts}/>

          <SearchingModalTag />
          <FilterModalTag />
        </CommunityContainer>
      </ScrollView>

      <WritePostButton/>
    </SafeAreaView>
  );
};

const CommunityContainer = styled.View`
  border-radius: 5px;
  margin: 15px;
`;

const StyledButton = styled.TouchableOpacity`
`;

const Post = styled.View`
  margin: 0px 10px;
`;

const PostTitle = styled.Text`
  font-size: 17px;
`;

const PostContent = styled.Text`
  font-size: 13px;
  color: #787878;
  margin: 5px 0px;
`;

/**--게시물에 등록된 사진을 담을 태그--*/
const PostImg = styled.Image`
  border: 2px solid #78787850;
  border-radius : 10px;
  width : 75px;
  height : 75px;
  flex:1;
`;


const PostUnderContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const NickNameText = styled.Text`
  flex-wrap: wrap;
  text-align: center;
  font-size: 13px;
`;

const FilterContainer = styled.Pressable`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const FilterContent = styled.Pressable`
  width: 70%;
  height: 100%;
  background-color: white;
  padding: 20px;
`;

/**----게시물의 모든 태그들을 담을 컨테이너----*/
const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

/**--한 게시물 태그의 텍스트를 담을 태그--*/
const Tag = styled.Text`
  color: #139989;
  font-size: 13px;
  margin-right: 5px;
  line-height: 20px;
`;


export default Community;