import React, { useState, useSyncExternalStore } from "react";
import { View, ScrollView, Touchable, TouchableOpacity, Image, Modal,Text,TextInput } from "react-native";
import styled from "styled-components";
import { HorizontalLine, LikeTag, ScrapeTag } from "./CommunityCommonStyles.jsx";
import { SafeAreaView } from "react-native-safe-area-context";

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

/**이미지 데이터 */
commentIcon = require('../../assets/community/comment_icon.png')
sendCommentIcon = require('../../assets/community/send_comment_icon.png')

const CommunityPost = () => {
  /**댓글 쓰기 버튼에 해당하는 태그 */
  const WriteCommentButton = () => {
    return(
      isWriteCommentOpened ? 
      <View style={{position:"absolute", bottom:0, width : '100%', padding : 20, gap : 10 }}>
            <TouchableOpacity
            onPress={CloseWriteComment}
            style={{
              backgroundColor:'#0004ff90',
              alignSelf : 'flex-end',
              borderWidth:1, 
              borderRadius:5, 
              padding : 1,
            }}
              >
              <Image source={commentIcon} style={{width:40,height:40}}/>
            </TouchableOpacity>

            <View flexDirection="row" 
                  style={{
                  flex:1, 
                  borderWidth : 1, 
                  borderRadius:5, 
                  backgroundColor:'#ffffffdc', 
                  paddingLeft:5}}>
                <ScrollView >

                  <TextInput multiline={true} style={{height:40}} autoFocus={true} placeholder="댓글 작성"/>

                </ScrollView>
                  <TouchableOpacity 
                  onPress={() => alert("댓글 등록!")}
                  style={{width:50, height:30, backgroundColor:'#0004ff90', borderRadius:5, borderWidth:1, margin:5, justifyContent:'cneter', alignItems:'center'}}>
                    <Image source={sendCommentIcon} style={{width:25, height:25}} resizeMode="contain"/>
                  </TouchableOpacity>
            </View>
      </View>
      :
        <TouchableOpacity
        onPress={OpenWriteComment}
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
          <Image source={commentIcon} style={{width:40,height:40}} />
        </TouchableOpacity>
    )
  }

  /**댓글 쓰기 창의 열고 닫힘을 확인하는 state */
  const [isWriteCommentOpened, setIsWriteCommentOpened] = useState(false);
  const OpenWriteComment = () => setIsWriteCommentOpened(true);
  const CloseWriteComment = () => setIsWriteCommentOpened(false);

  /**--------------------Post창의 메인 화면--------------------*/
  return (
    <View>
      <ScrollView backgroundColor='white'>
        <Post>
          <PostTitle>{PostData.title}</PostTitle>
          <HorizontalLine />

          <PostContent>{PostData.content}</PostContent>

          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
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

      <WriteCommentButton/>
    </View>
  );
};

export default CommunityPost;

/**------게시물의 기본 내용을 담을 태그------*/
const Post = styled.View`
  margin: 20px 20px 0px 20px;
`;

/**--게시물의 제목을 담는 태그--*/
const PostTitle = styled.Text`
  font-size: 20px;
`;

/**--게시물의 내용을 담을 태그--*/
const PostContent = styled.Text`
  font-size: 15px;
  margin-bottom: 10px;
`;

/**게시물 사진의 위치를 조정하는 태그 */
const PostImgContainer = styled.View`
  align-items: 'center';
  justify-content: 'center';
`

/**--게시물에 등록된 사진을 담을 태그--*/
const PostImg = styled.Image`
  border: 1px solid #78787850;
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
