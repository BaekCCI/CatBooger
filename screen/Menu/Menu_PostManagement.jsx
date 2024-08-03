import React, { useContext } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { basicProfilePicture, currentUserId, PostsContext, PostsProvider, usersProfile } from '../Community/CommunityCommonData';
import { HorizontalLine } from '../Community/CommunityCommonStyles';


const PetManagementScreen = ({ navigation }) => {
  /**커뮤니티 공용 데이터 */
  const {Posts, AddPost, UpdatePost, DeletePost} = useContext(PostsContext)
  
  /**왜 안가지지? */
  const MoveToPost = (postDataId) => navigation.navigate('../Community/CommunityPost', {postDataId : postDataId});
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Container>
          <Title>작성 글 관리</Title>
          <HorizontalLine/>
        </Container>

          {Posts.filter((post) => usersProfile[currentUserId].writtenPostsId.includes(post.id))
          .map((postData, index) => (
          <Post key={index}>
            <PostButton onPress={() => alert("게시물 이동")} style={{flexDirection:'row', alignItems:'center', gap : 5}}>
              <View style={{flex:3}}>
                <View style={{marginBottom : '1%'}}>
                  <PostTitle numberOfLines={1} ellipsizeMode="tail">
                  {postData.isQuestion
                  ? 
                    <Text>
                        <Text style={{color : postData.isQuestionSolved ? '#23C6B3' : '#989898'}}>Q.</Text>
                        <Text>{postData.title}</Text>
                    </Text>
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

              </View>
              {postData.img !== "" ? <PostImg source={postData.img}/> : null}
            </PostButton>
          </Post>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

const PetManagementScreenWithPostsProvider = ({ navigation }) => {
  return(
    <PostsProvider>
      <PetManagementScreen navigation={navigation}/>
    </PostsProvider>
  )
}

export default PetManagementScreenWithPostsProvider;

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const PostButton = styled.TouchableOpacity`
`;

const Post = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 4,
})`
  padding: 5%;
  margin: 1% 0;
  background-color: white;
  border-radius: 10px;
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
  gap : 5px;
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

const NickNameText = styled.Text`
  flex-wrap: wrap;
  text-align: center;
  font-size: 14px;
`;
