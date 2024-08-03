import React, { useContext } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { basicProfilePicture, currentUserId, PostsContext, PostsProvider, usersProfile } from '../Community/CommunityCommonData';
import { HorizontalLine } from '../Community/CommunityCommonStyles';


const CommentedPostsManagementScreen = ({ navigation }) => {
  /**커뮤니티 공용 데이터 */
  const {Posts, AddPost, UpdatePost, DeletePost} = useContext(PostsContext)
  
  /**좋아요의 개수를 표시할 태그*/
  const LikeTag = ({ likeNumber }) => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Image source={require('../../assets/community/like_logo.png')} style = {{width : 15, height : 15}}/>
        <Text style={{fontSize : 15}}>
          {likeNumber}
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
          {scrapeNumber}
        </Text>
      </View>
    );
  };


  /**왜 안가지지? */
  const MoveToPost = (postDataId) => navigation.navigate('../Community/CommunityPost', {postDataId : postDataId});
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Container>
          <Title>댓글단 글 목록</Title>
          <HorizontalLine/>

          {Posts.filter((post) => usersProfile[currentUserId].CommentedPostsId.includes(post.id))
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

                <PostUnderContent>
                <NickNameText>
                  {usersProfile[postData.writerID] 
                    ? usersProfile[postData.writerID].nickName 
                    : 'Unknown User'}
                </NickNameText>
                <View style={{flexDirection:'row', gap : 5, top : 1.5}}>
                  <LikeTag likeNumber={postData.likeNumber} />
                  <ScrapeTag scrapeNumber={postData.scrapeNumber} />
                </View>
              </PostUnderContent>

              </View>
              {postData.img !== "" ? <PostImg source={postData.img}/> : null}
            </PostButton>
          </Post>
        ))}
        </Container> 
      </SafeAreaView>
    </ScrollView>
  );
};

const CommentedPostsManagementScreenWithPostsProvider = ({ navigation }) => {
  return(
    <PostsProvider>
      <CommentedPostsManagementScreen navigation={navigation}/>
    </PostsProvider>
  )
}

export default CommentedPostsManagementScreenWithPostsProvider;

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
