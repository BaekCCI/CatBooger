import React, { useState, useSyncExternalStore } from "react";
import { View, ScrollView, Touchable, TouchableOpacity, Image, Modal,Text,TextInput} from "react-native";
import { useRoute } from '@react-navigation/native';
import styled from "styled-components";
import { HorizontalLine} from "./CommunityCommonStyles.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import {Posts, originPosts, setOriginPosts} from './CommunityCommonData.jsx'

/**이미지 데이터 */
commentIcon = require('../../assets/community/comment_icon.png')
sendCommentIcon = require('../../assets/community/send_comment_icon.png')

const CommunityPost = () => {
  const route = useRoute();
  const { postData } = route.params;

  /**게시글 사진을 담는 태그 */
  const PostImgContainer = () => {  
    return(
      postData.img === "" ?  null : 
      <View style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}>
          <PostImg source={postData.img} style={{resizeMode : 'contain'}}/>
      </View>
    )
  }

  /**댓글 쓰기 창의 열고 닫힘을 확인하는 state */
  const [isWriteCommentOpened, setIsWriteCommentOpened] = useState(false);
  const OpenWriteComment = () => setIsWriteCommentOpened(true);
  const CloseWriteComment = () => setIsWriteCommentOpened(false);

  /**댓글 쓰기 버튼에 해당하는 태그 */
  const WriteCommentButton = () => {
    return(
      isWriteCommentOpened 
      ? 
      <CommentWritingContainer>
        <CommentWritingButton
        onPress={CloseWriteComment}
        style={{
          backgroundColor:'#6495ED90',
          right : 10,
          bottom : 5
          }}
          >
            <Image source={commentIcon} style={{width:40,height:40}}/>
        </CommentWritingButton>
        
        <View style={{width : '100%', borderTopWidth : 3, backgroundColor : '#ffffff', borderColor : '#c2c2c25c'}}>
          <CommentWritingBox
              flexDirection="row"
              style = {{width : '95%', alignSelf : 'center'}}>
              <ScrollView >
                <TextInput multiline={true} autoFocus={true} placeholder="댓글 작성" style={{height:40}} />
              </ScrollView>

              <CommentSendButton 
              onPress={() => alert("댓글 등록!")}>
              <Text style={{fontWeight:'bold'}}>
                등록
              </Text>
              </CommentSendButton>
          </CommentWritingBox>
        </View>

      </CommentWritingContainer>
      :
        <CommentWritingButton
        onPress={OpenWriteComment}
        style={{
          position:'absolute', 
          bottom:10, right:10, 
          backgroundColor:'#ffffffdc'}}>

          
          <Image source={commentIcon} style={{width:40,height:40}} />
        </CommentWritingButton>
    )
  }
    /**좋아요의 개수를 표시할 태그*/
  const LikeTag = ({ likeNumber }) => {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Image source={require('../../assets/community/like_logo.png')} style = {{width : 23, height : 23}}/>
        <Text style={{fontSize : 16}}>
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
      }}>
        <Image source={require('../../assets/community/scrape_logo.png')} style = {{width : 23, height : 23}}/>
        <Text style={{fontSize : 16}}>
          {"" + scrapeNumber + " "}
        </Text>
      </View>
    );
  };

  /**--------------------Post창의 메인 화면--------------------*/
  return (
    <View style={{flex : 1}}>
      <ScrollView backgroundColor='white'>
        <Post>
          <PostTitle>{postData.title}</PostTitle>
          <HorizontalLine />

          <PostContent>{postData.content}</PostContent>

          <PostImgContainer/>

          <TagsContainer>
            {postData.tags.map((tag, index) => (
              <Tag key={index}>{'#' + tag}</Tag>
            ))}
          </TagsContainer>
          
          <PostUnderContainer>
            <PostUnderLeftContainer>
              <ProfileNickName>{postData.profileNickName}</ProfileNickName>
              <PostedTime>{postData.postTime}</PostedTime>
            </PostUnderLeftContainer>
            <PostUnderRightContainer>
              <LikeTag likeNumber={postData.likeNumber}/>
              <ScrapeTag scrapeNumber={postData.scrapeNumber}/>
            </PostUnderRightContainer>
          </PostUnderContainer>
        </Post>

        <HorizontalLine style={{
          height: 10,
          backgroundColor: '#a6cbc6'
        }} />

        <CommentsContainer>
          <CommentsContainerTitle>{'댓글 ' + postData.comments.length}</CommentsContainerTitle>
          <HorizontalLine />
          {postData.comments.map((comment, index) => (
            <View key={index}>
              <Comment>
                <ProfileNickName>{comment.profileNickName}</ProfileNickName>
                <CommentText>{comment.content}</CommentText>
                <CommentPostedTime>{comment.postTime}</CommentPostedTime>
              </Comment>
              <HorizontalLine />
            </View>
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
  font-size: 23px;
  font-weight: bold;
`;

/**--게시물의 내용을 담을 태그--*/
const PostContent = styled.Text`
  font-size: 16px;
`;

/**--게시물에 등록된 사진을 담을 태그--*/
const PostImg = styled.Image`
  width : 100%;
  height : 200px;
  margin-top : 10px;
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
  font-size: 14px;
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
  font-size: 15px;
`;

/**게시물이 등록된 시간을 담을 태그 */
const PostedTime = styled.Text`
  font-size: 15px;
  color: grey;
`;

/**게시물에 등록된 댓글의 게시시간을 담는 태그 */
const CommentPostedTime = styled.Text`
  font-size: 10px;
  color: grey;
`

/**--게시물 아랫쪽 태그의 오른쪽 내용을 담을 태그--*/
const PostUnderRightContainer = styled.View`
  align-items: flex-end;
  flex-direction: row;
`;

/**------게시물의 댓글을 담을 태그------*/
const CommentsContainer = styled.View`
`;

/**--게시물의 댓글 수를 표시할 태그--*/
const CommentsContainerTitle = styled.Text`
  margin: 5px 20px;
  font-size: 20px;
  font-weight : bold;
`;

/**----게시물의 댓글의 정보를 담을 태그----*/
const Comment = styled.View`
  margin : 0 5%;
`;

/**--게시물의 댓글 내용을 담을 태그--*/
const CommentText = styled.Text`
  margin: 10px 0px;
  font-size: 14px;
`;

/**게시물 댓글 쓰기 창의 내용들을 담을 태그 */
const CommentWritingContainer = styled.View`
  position : absolute;
  bottom : 0;
  width : 100%;
`
/**게시물 댓글 쓰기 버튼에 해당하는 태그 */
const CommentWritingButton = styled.TouchableOpacity`
    align-self : flex-end;
    border-width: 1px;
    border-radius: 5px; 
    padding : 1px;
`;

/**게시물 댓글 쓰기를 활성화 시켰을 때 나오는 댓글 쓰기창에 해당하는 태그*/
const CommentWritingBox = styled.View`
    margin : 10px;
    flex: 1px; 
    border-width : 2px; 
    border-radius: 10px; 
    background-color: #fafafaeb; 
    padding-left: 5px;
`;

/**게시물 댓글 쓰기 완료 버튼에 해당하는 태그 */
const CommentSendButton = styled.TouchableOpacity`
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