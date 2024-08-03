import React, { useContext, useRef, useState, useSyncExternalStore } from "react";
import { View, ScrollView, Touchable, TouchableOpacity, Image, Modal,Text,TextInput} from "react-native";
import { useRoute } from '@react-navigation/native';
import styled from "styled-components";
import { HorizontalLine} from "./CommunityCommonStyles.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import {initialPosts, originPosts, PostsContext, PostsProvider, setOriginPosts} from './CommunityCommonData.jsx'

/**이미지 데이터 */
const commentIcon = require('../../assets/community/comment_icon.png')
const sendCommentIcon = require('../../assets/community/send_comment_icon.png')
const adoptedCommentIcon = require('../../assets/community/adopted_comment_icon.png')
const profilePircure =  {uri : 'https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg'}

const CommunityPost = () => {
  /**커뮤니티 공용 데이터 */
  const {Posts, AddPost, UpdatePost, DeletePost, AddComment} = useContext(PostsContext)

  const route = useRoute();
  const { postDataId } = route.params;
  const postData = Posts[postDataId]

  const inputCommentRef = useRef("");

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

  /**댓글 등록할 때의 기능을 담은 함수 (매개변수 : 게시물 ID, 댓글 쓴 사람 닉네임, 댓글 내용, 댓글 등록 시간*/
  const RegisterComment = (postId, NickName, content, date) => {
    AddComment(postId, NickName, content, date);
    setIsWriteCommentOpened(false);
  }

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
                <TextInput 
                onChangeText={(newText) => {inputCommentRef.current = newText}}
                multiline={true} autoFocus={true} placeholder="댓글 작성" 
                style={{height:40}} />
              </ScrollView>

              <CommentSendButton 
              onPress={() => {RegisterComment(postDataId, "대충 닉네임", inputCommentRef.current, Date())}}>
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
      <TouchableOpacity onPress={() => {UpdatePost(postDataId, {...postData, likeNumber : likeNumber + 1})}}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Image source={require('../../assets/community/like_logo.png')} style = {{width : 23, height : 23}}/>
          <Text style={{fontSize : 16}}>
            {" " + likeNumber + "     "}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**스크랩의 개수를 표시할 태그 */
  const ScrapeTag = ({ scrapeNumber }) => {
    return (
      <TouchableOpacity onPress={() => {UpdatePost(postDataId, {...postData, scrapeNumber : scrapeNumber + 1})}}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Image source={require('../../assets/community/scrape_logo.png')} style = {{width : 23, height : 23}}/>
          <Text style={{fontSize : 16}}>
            {"" + scrapeNumber + " "}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const PostTitleContainer = () => {
    return(
      <View style={{flexDirection:'row', justifyContent : 'space-between', alignItems : 'baseline'}}>
        <PostTitle>{postData.title}</PostTitle>
        {postData.isQuestion ? 
          postData.isQuestionSolved ?
            <View>
              <Text style={{color : 'white', fontWeight : '600', fontSize : 13, backgroundColor : '#23C6B3', 
                paddingLeft : '2%', paddingRight : '2%', paddingBottom : '1%', marginBottom : '1%', paddingTop : '1%',
                 borderRadius : 5, lineHeight : 17  }}>채택 완료</Text>
            </View>
          : null
        :
        null  
      }
      </View>
    )
  }

  const Comments = () => {
    return(
      <CommentsContainer>
      <CommentsContainerTitle>{'댓글 ' + postData.comments.length}</CommentsContainerTitle>
      <HorizontalLine/>
      {postData.comments.map((comment, index) => (
        <View key={index}>
            <Comment>
              { 
                comment.isDoctor ? 
                  <View>
                    <TouchableOpacity 
                    style={{backgroundColor : '#5cc4b849', padding : '5%', borderRadius : 10, 
                          gap : 15, flexDirection : 'row', alignItems : 'center'}}>
                      <Image source={profilePircure}  style={{ width: 60, height: 60}}/>
                      <View>
                        <Text style={{fontSize : 18, fontWeight : 'bold'}}>{comment.profileNickName + " 선생님"}</Text>
                        <Text style={{color : '#595959'}}>{comment.doctorProfile.hospitalName}</Text>
                      </View>
                    </TouchableOpacity>
                    <CommentText >{comment.content}</CommentText>
                  </View>
                :
                  <View>
                    <TouchableOpacity style={{flexDirection : 'row', gap : 5}}>
                      <Image source={profilePircure}  style={{ width: 20, height: 20, borderRadius : 50 }}/>
                      <ProfileNickName style={{lineHeight : 21}}>{comment.profileNickName}</ProfileNickName>
                    </TouchableOpacity>
                    <CommentText>{comment.content}</CommentText>
                  </View>
              }

              {comment.isAdopted && 
                <View style={{flexDirection : 'row', gap : 5}}>
                  <Image source={adoptedCommentIcon} style={{width : 15, height : 15}}/>
                  <Text style={{lineHeight : 16, color : '#595959'}}>채택된 답변</Text>
                </View>
              }

              <CommentPostedTime>{comment.postTime}</CommentPostedTime>
            </Comment>
          <HorizontalLine />
        </View>
      ))}
    </CommentsContainer>
    )
  }
  /**--------------------Post창의 메인 화면--------------------*/
  return (
    <View style={{flex : 1}}> 
      <ScrollView backgroundColor='white' style={{flex : 1}}>
        <Post>
          <PostTitleContainer/>
          <HorizontalLine/>
          <PostContent>{postData.content}</PostContent>

          <PostImgContainer/>
          <TagsContainer>
            {postData.tags.map((tag, index) => (
              <Tag key={index}>{'#' + tag}</Tag>
            ))}
          </TagsContainer>
          
          <PostUnderContainer>
            <PostUnderLeftContainer>
              <TouchableOpacity style={{flexDirection:'row', gap : 5, alignItems : 'center'}}>
                <Image source={profilePircure}  style={{ width: 15, height: 15, borderRadius : 50 }}/>
                <ProfileNickName>{postData.profileNickName}</ProfileNickName>
              </TouchableOpacity>
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
          backgroundColor: '#96d3cb'
        }} />

        <Comments/>
      </ScrollView>

      <WriteCommentButton/>
    </View>
  );
};

const CommunityPostWithPostProvider = () => (
  <PostsProvider>
    <CommunityPost/>
  </PostsProvider>
)


export default CommunityPostWithPostProvider;

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