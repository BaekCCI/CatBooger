import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StatusBar, SafeAreaView, Alert, Pressable, TextInput, PanResponder } from "react-native";
import styled from "styled-components/native";
import { HorizontalLine } from "./CommunityCommonStyles.jsx";
import {Posts, initialAnimalTags, initialCategoryTags} from './CommunityCommonData.jsx'

const Community = ({ navigation }) => {
  /**이미지 데이터 */
  xIcon = require('../../assets/community/x_icon.png');
  penIcon = require('../../assets/community/pen_icon.png');
  
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
      paddingLeft : '1%',
      paddingRight : '1%',
    }}>
      {/**커뮤니티 제목을 담는 태그 */}
      <Text style={{fontSize: 25, fontWeight:'bold'}}>커뮤니티</Text>
      
      {/**커뮤니티 검색 버튼을담는 태그*/}
      <View style={{ flexDirection: 'row', gap: 10, top : 5}}>
        <TouchableOpacity 
        style = 
        {{
          backgroundColor : isSearchingBoxOpened ? "#4580ff88" : null,
          borderRadius : isSearchingBoxOpened ? 5 : null,
        }}
        onPress={isSearchingBoxOpened ? closeSearching : openSearching}
        >
          <Image source={require('../../assets/community/search_logo.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      {/**커뮤니티 필터 버튼을 담는 태그*/}
        <TouchableOpacity onPress={OpenFilter}>
          <Image source={require('../../assets/community/filter_logo.png')} 
          style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const Tags = animalTags.concat(categoryTags)
  /**커뮤니티 창에서 태그를 띄우는 부분을 담는 태그*/
  const CommunityTagsContainer = () => (
    <View style={{ gap: 3, flexDirection: 'row', flexWrap: 'wrap', marginTop : 10, marginLeft : 5, marginRight : 5}}>
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

  /**좋아요의 개수를 표시할 태그*/
  const LikeTag = ({ likeNumber }) => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Image source={require('../../assets/community/like_logo.png')} style = {{width : 15, height : 15}}/>
        <Text style={{fontSize : 15}}>
          {" " + likeNumber + "     "}
        </Text>
      </View>
    );
  };

  /**스크랩의 개수를 표시할 태그 */
  const ScrapeTag = ({ scrapeNumber }) => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop : '1%'
      }}>
        <Image source={require('../../assets/community/scrape_logo.png')} style = {{width : 15, height : 15}}/>
        <Text style={{fontSize : 15}}>
          {" " + scrapeNumber}
        </Text>
      </View>
    );
  };

  /**게시물을 렌더링하는 함수 */
  const CommunityPosts = (postsData) => {
    // 선택된 태그를 가져옴
    const selectedAnimalTags = getSelectedTags(animalTags);
    const selectedCategoryTags = getSelectedTags(categoryTags);
    // 게시물을 필터링함
    const filteredPosts = filterPosts(postsData, selectedAnimalTags, selectedCategoryTags);

    // 필터링한 게시물들을 보여줌
    return (
      filteredPosts.map((postData, index) => (
        <Post key={index}>
          <StyledButton onPress={() => MoveToPost(postData)} style={{flexDirection:'row', alignItems:'center', gap : 5}}>
            <View style={{flex:3}}>
              <View style={{marginBottom : '3%'}}>
                <PostTitle numberOfLines={1} ellipsizeMode="tail">
                {postData.tags.includes("QnA")
                ? 
                  <Text >Q. {postData.title}</Text>
                : 
                  <Text>{postData.title}</Text>}
                </PostTitle>
              </View>
              
              <PostContent numberOfLines={2} ellipsizeMode="tail">{postData.content}</PostContent>

              <TagsContainer>
                {postData.tags.map((tag, index) => (
                <Tag key={index}>{'#' + tag}</Tag>
                ))}
              </TagsContainer>

              <PostUnderContent>
                <NickNameText>{postData.profileNickName}</NickNameText>
                <View style={{flexDirection:'row', gap : 3, top : 1.5}}>
                  <LikeTag likeNumber={postData.likeNumber} />
                  <ScrapeTag scrapeNumber={postData.scrapeNumber} />
                </View>
              </PostUnderContent>
            </View>

            {postData.img !== "" ? <PostImg source={postData.img}/> : null}
          </StyledButton>

          <HorizontalLine />
        </Post>
      ))
    );
  };

  /**검색 모달창의 열고 닫음에 대한 State*/
  const [isSearchingBoxOpened, setIsSearchingBoxOpened] = useState(false);
  /**검색 모달창을 여는 함수 */
  const  openSearching = () => setIsSearchingBoxOpened(true);
  /**검색 모달창을 닫는 함수 */
  const  closeSearching = () => setIsSearchingBoxOpened(false);
  /**검색창에서 입력한 내용에 대한 State */
  const [searchingText, setSearchingText] = useState("")
  
  /** 검색창 대한 모든 정보를 담은 태그 */
  const SearchingBox = () => {
    return (
      isSearchingBoxOpened 
      ?
        <View style={{
          position:'absolute', bottom : 0, width : '100%',
          borderTopWidth : 3, backgroundColor : '#ffffff', borderColor : '#c2c2c25c'}}>
          <View 
          style={{paddingLeft : 5 ,margin : 10,borderWidth : 2, borderRadius : 10 , 
                  backgroundColor:'#ffffffed', margin : 10, flexDirection : 'row', 
                  width : '95%'}}>
            <ScrollView>
              <TextInput 
              value = {searchingText}
              placeholder="게시물 검색" autoFocus={true} multiline={true} 
              onTextInput={(newText) => setSearchingText(newText)}
              style={{height : 40}}>
              </TextInput>
            </ScrollView>

            <SearchingInputCompleteButton 
              onPress={() => alert("검색 완료!")}
              >
              <Text style={{fontWeight:'bold'}}>
                검색
              </Text>
            </SearchingInputCompleteButton>
          </View>
        </View>
      : null
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
            <View style={{flexDirection: 'row', justifyContent : 'space-between'}}>
              <Text style={{fontSize:25, textAlign: 'center', fontWeight:'bold'}}>
                필터
              </Text>

              <TouchableOpacity onPress={CloseFilter} style={{top : 5}}> 
                <Image source={require("../../assets/community/x_icon.png")} style={{width:30, height: 30}}/>
              </TouchableOpacity>
            </View> 

            <HorizontalLine/>

            <Text style={{fontSize: 18, fontWeight:'bold'}}>동물</Text>
            {/**동물 태그들을 담은 태그 */}
            <HorizontalLine/>
            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap", paddingLeft : 5, paddingRight : 5}}>
              {animalTags.map((tag, index) => (
                <TouchableOpacity key={index} onPress={() => SelectTag(animalTags, setAnimalTags, index)}>
                  <View style={{ borderWidth: 2, borderColor: tag.isSelected ? '#139989' : '#D9D9D9', borderRadius: 5, width: 60, height: 25 }}>
                    <Text style={{ textAlign: 'center', color: tag.isSelected ? '#139989' : '#595959'}}>{tag.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={{fontSize: 18, marginTop: 10, fontWeight:'bold'}}>카테고리</Text>

            <HorizontalLine/>

            {/**카테고리 태그들을 담은 태그 */}
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", paddingLeft : 5, paddingRight : 5}}>
              {categoryTags.map((tag, index) => (
                <TouchableOpacity key={index} onPress={() => SelectTag(categoryTags, setCategoryTags, index)}>
                  <View style={{ borderWidth: 2, borderColor: tag.isSelected ? '#139989' : '#D9D9D9', borderRadius: 5, width: 60, height: 25}}>
                    <Text style={{textAlign: 'center', color: tag.isSelected ? '#139989' : '#595959'}}>{tag.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <HorizontalLine/>

            {/**초기화 버튼을 담은 태그 */}
            <View style={{alignItems:'flex-end'}}>
              <TouchableOpacity onPress={() => ResetTag()}>
                    <Text style={{fontSize : 15, borderBottomWidth : 1}}>
                      필터 초기화
                    </Text>
              </TouchableOpacity>
            </View>

          </FilterContent>
        </FilterContainer>
    </Modal>
  );

  /**글쓰기 버튼에 해당하는 태그 */
  const WritePostButton = () => {
    return(
        <View style={{alignItems : 'center'}}>
          <TouchableOpacity 
          onPress={MoveToWritingPost}
          style={{
            position:'absolute', 
            bottom : 10,
            backgroundColor:'#ffffff',
            flexDirection:'row', 
            justifyContent:'space-around', 
            borderWidth:1,
            borderColor : "#8585856c",
            borderRadius: 50,
            width : '25%',
            }}
            >
            {/* <Image source={penIcon} style={{width:33,height:33}}/> */}
            <View style={{paddingTop : '4%', marginBottom : '7%', flexDirection : 'row'}}>
              <Image source={penIcon} style={{width:20,height:20, marginRight : '13%'}}/> 
                <Text style={{fontWeight : 'bold'}}>
                  글 쓰기
                </Text>
            </View>
          </TouchableOpacity>
        </View>
    )
  }
  
  /**-------------------------------커뮤니티 화면-------------------------------*/
  const MoveToPost = (data) => navigation.navigate('CommunityPost', {postData : data});
  const MoveToWritingPost = () => navigation.navigate('CommunityWritingPost')
  return (
      <View style={{flex : 1}}>
        <SafeAreaView style={{flex : 1}}>
          <ScrollView style={{ backgroundColor: 'white'}} stickyHeaderIndices={[1]}>
            <StatusBar/>

            <View style=
            {{
              backgroundColor:'white', marginLeft : '5%', marginRight : '5%', paddingTop : '5%',
              justifyContent : 'center'
            }}>
              <CommunityTopContainer />
              <HorizontalLine style={{marginBottom : 0, marginTop : '2%'}}/>
              <CommunityTagsContainer />
            </View>

            <CommunityContainer>

            <CommunityPosts postsData={filteredPosts}/>

              <FilterModalTag />
            </CommunityContainer>
          </ScrollView>
        </SafeAreaView>
          <WritePostButton/>
          <SearchingBox/>
      </View>
  );
};

const CommunityContainer = styled.View`
  border-radius: 5px;
  margin: 15px;
  flex : 1;
`;

const StyledButton = styled.TouchableOpacity`
`;

const Post = styled.View`
  margin : 0 1%;
`;

const PostTitle = styled.Text`
  font-size: 18px;
  font-weight : bold
  `;

const PostContent = styled.Text`
  font-size: 14px;
  color: gray;
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
  gap : 10px;
`;

const NickNameText = styled.Text`
  flex-wrap: wrap;
  text-align: center;
  font-size: 14px;
`;

const FilterContainer = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const FilterContent = styled.Pressable`
  width: 90%;
  background-color: white;
  padding: 20px;
  border-radius : 15px;
`;

/**----게시물의 모든 태그들을 담을 컨테이너----*/
const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

/**--한 게시물 태그의 텍스트를 담을 태그--*/
const Tag = styled.Text`
  color: #139989;
  font-size: 12px;
  margin-right: 10px;
  line-height: 20px;
`;

/**게시물 검색 쓰기 완료 버튼에 해당하는 태그 */
const SearchingInputCompleteButton = styled.TouchableOpacity`
    margin : 5px;
    margin-right : 10px;
    width : 40px;
    height: 30px;
    background-color: #6495ED90; 
    border-radius:5px; 
    border-width:1px;
    justify-content:center;
    align-items:center;
`


export default Community;