import React from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components";
import { HorizontalLine, LikeTag, ScrapeTag } from "./CommunityCommonStyles.jsx";

/**게시물의 내용을 담는 데이터*/
const PostData = {
  title: "사실 우리집 고양이 킬러임",
  content: "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ",
  img: require('../../assets/Comu_active.png'),
  tags: ["고양이", "일상"],
  profileNickName: "괴문서맵게하는집",
  postTime: "2024-05-28 19:17:11",
  likeNumber: 13,
  scrapeNumber: 8
};

/**댓글의 정보를 담는 데이터 */
const Comments = [
  {
    profileNickName: '닉네임',
    content: '댓글내용',
    postTime: '2024-07-26'
  },
  {
    profileNickName: '개냥이',
    content: '저 킬러 이름이 야옹 이군요.',
    postTime: '2024-05-29 14:18:19'
  },
  {
    profileNickName: '얼죽패딩',
    content: '킬러군',
    postTime: '2024-05-30 17:17:43'
  },
];

const CommunityPost = () => {
  return (
    <ScrollView backgroundColor='white'>
      <Post>
        <Title>{PostData.title}</Title>
        <HorizontalLine />
        <PostContent>{PostData.content}</PostContent>

        <View style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <PostImg source={PostData.img} />
        </View>

        <TagsContainer>
          {PostData.tags.map((tag, index) => (
            <Tag key={index}>{'#' + tag}</Tag>
          ))}
        </TagsContainer>
        <PostUnderContainer>
          <PostUnderLeftContainer>
            <ProfileNickName>{PostData.profileNickName}</ProfileNickName>
            <PostedTime>{PostData.postTime}</PostedTime>
          </PostUnderLeftContainer>
          <PostUnderRightContainer>
            <LikeTag likeNumber={PostData.likeNumber}/>
            <ScrapeTag scrapeNumber={PostData.scrapeNumber}/>
          </PostUnderRightContainer>
        </PostUnderContainer>

      </Post>
      <HorizontalLine style={{
        height: 10,
        backgroundColor: '#92B5B1'
      }} />

      <CommentsContainer>
        <CommentsContainerTitle>{'댓글 ' + Comments.length}</CommentsContainerTitle>
        <HorizontalLine />
        {Comments.map((comment, index) => (
          <Comment key={index}>
            <ProfileNickName>{comment.profileNickName}</ProfileNickName>
            <CommentText>{comment.content}</CommentText>
            <PostedTime>{comment.postTime}</PostedTime>
            <HorizontalLine />
          </Comment>
        ))}
      </CommentsContainer>

    </ScrollView>
  );
};

export default CommunityPost;

/**------게시물의 기본 내용을 담을 태그------*/
const Post = styled.View`
  margin: 20px 20px 0px 20px;
`;

/**--게시물의 제목을 담는 태그--*/
const Title = styled.Text`
  font-size: 20px;
`;

/**--게시물의 내용을 담을 태그--*/
const PostContent = styled.Text`
  font-size: 15px;
  margin-bottom: 10px;
`;

/**--게시물에 등록된 사진을 담을 태그--*/
const PostImg = styled.Image`
  border: 2px solid black;
  resize-mode: cover;
  width : 100px;
  height : 100px
`;

/**----게시물의 모든 태그들을 담을 컨테이너----*/
const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5px;
`;

/**--한 게시물 태그의 텍스트를 담을 태그--*/
const Tag = styled.Text`
  color: #139989;
  font-size: 13px;
  margin-right: 5px;
  line-height: 20px;
`;

/**----게시물의 아랫쪽을 담을 태그----*/
const PostUnderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

/**--게시물 아랫쪽 태그의 왼쪽 내용을 담을 태그--*/
const PostUnderLeftContainer = styled.View`
  align-items: flex-start;
`;

/**프로필의 닉네임을 담을 태그 */
const ProfileNickName = styled.Text`
  font-size: 13px;
`;

/**게시물이 등록된 시간을 담을 태그 */
const PostedTime = styled.Text`
  font-size: 13px;
  color: grey;
`;

/**--게시물 아랫쪽 태그의 오른쪽 내용을 담을 태그--*/
const PostUnderRightContainer = styled.View`
  align-items: flex-end;
  flex-direction: row;
  gap : 5px
`;

/**------게시물의 댓글을 담을 태그------*/
const CommentsContainer = styled.View`
`;

/**--게시물의 댓글 수를 표시할 태그--*/
const CommentsContainerTitle = styled.Text`
  margin: 5px 20px;
  font-size: 20px;
`;

/**----게시물의 댓글의 정보를 담을 태그----*/
const Comment = styled.View`
  margin: 0px 20px;
`;

/**--게시물의 댓글 내용을 담을 태그--*/
const CommentText = styled.Text`
  margin: 10px 0px;
  font-size: 14px;
`;
