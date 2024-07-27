/**커뮤니티 창에 해당하는 파 */
import React from "react";
import { Modal, View, Text, ScrollView} from "react-native";
import styled from "styled-components";
import { HorizontalLine, LikeTag, ScrapeTag } from "./CommunityCommonStyles.jsx";

Posts = [
  {
    title : "사실 우리집 고양이 킬러임",
    content : "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ",
    img : {uri : "https://ac-p1.namu.la/20240528sac/48a02548e24db4bade8089a58d4b34244c48cfd0436b894097ec670bdcfd9bac.jpg?expires=1722017549&key=ZnAk61LlLLP9Qb30HFTLhA&type=orig"},
    tags : ["고양이", "일상"],
    profileNickName : "괴문서맵게하는집",
    postTime : "2024-05-28 19:17:11",
    likeNumber : 13,
    scrapeNumber : 8
  },
  {
    title : "사실 우리집 고양이 킬러임",
    content : "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ",
    img : {uri : "https://ac-p1.namu.la/20240528sac/48a02548e24db4bade8089a58d4b34244c48cfd0436b894097ec670bdcfd9bac.jpg?expires=1722017549&key=ZnAk61LlLLP9Qb30HFTLhA&type=orig"},
    tags : ["고양이", "일상"],
    profileNickName : "괴문서맵게하는집",
    postTime : "2024-05-28 19:17:11",
    likeNumber : 13,
    scrapeNumber : 8
  },
  {},
  {},
  {}
]

const Comunity = ({ navigation }) =>{
  
  const onPress = () => navigation.navigate('CommunityContentWindow');
  return (
    <ScrollView style = {{backgroundColor : 'white'}}>

      <Community>
        <CommunityTitle>
          커뮤니티
        </CommunityTitle>

        <HorizontalLine/>
        
        {Posts.map((PostData, index) => (
          <Post>
            <StyledButton key = {index} onPress={onPress}>
              <PostTitle>
                {PostData.title}
              </PostTitle>
              <PostContent>
                {PostData.content}
              </PostContent>
              <PostUnderContent>
                <LickNameText>
                  {PostData.profileNickName}
                </LickNameText>
                <LikeTag likeNumber={PostData.likeNumber}/>
                <ScrapeTag scrapeNumber={PostData.scrapeNumber}/>
              </PostUnderContent>
            </StyledButton>
            

            <HorizontalLine/>
          </Post>
        ))}
      </Community>

    </ScrollView>
  );
}

export default Comunity;

const Community = styled.View`
  border-radius: 5px;
  margin : 15px;
`;

const StyledButton = styled.TouchableOpacity`
  height : 200px;
  font-color : blue;
`;

/**----커뮤니티의 상단 부분에 해당하는 태그들---- */
/**커뮤니티 타이틀에 해당하는 태그*/
const CommunityTitle = styled.Text`
  font-size : 25px
`;

/**------게시물 하나의 정보를 담을 태그------*/
const Post = styled.View`
  margin : 0px 10px
`;
/**--게시물의 제목을 담는 태그--*/
const PostTitle = styled.Text`
  font-size : 20px;
  margin-bottom : 3px;
`;
/**--게시물의 내용을 담을 태그--*/
const PostContent = styled.Text`
  font-size : 13px;
  color : #787878;
  margin : 5px 0px;
`;
/**--게시물에 등록된 사진을 담을 태그--*/
const PostImg = styled.Image`
    border : 2px solid black;
    resizeMode : 'contain';
    height : 300px;
    width : 150px;
`;
/**----게시물의 하단 내용을 담을 태그----*/
const PostUnderContent = styled.View`
  background-color : red;
  flex-direction: row;
  align-items : center;
  gap : 10px;
`;

const LickNameText = styled.Text`
  text-align : center;
  font-size : 13px;
`