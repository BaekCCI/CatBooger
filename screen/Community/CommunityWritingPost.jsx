import React from 'react';
import { View, Text, ScrollView, TextInput, Image} from 'react-native';
import styled from 'styled-components';
import { HorizontalLine } from './CommunityCommonStyles';

const CommunityWritingPost = () => {
  return (
    <View style={{flex : 1}}>
      <WritingPostContainer>
          <TitleInputContainer>
            <TitleInput 
            multiline={true}
            placeholder="제목 입력"
            />
            <HorizontalLine style={{margin:0}}/>
          </TitleInputContainer>
          
          <SelectTagsContainer>
            <Text>
              카테고리 선택창
            </Text>
          </SelectTagsContainer>

          <ContentsInputContainer>
            <ContentsInput 
            multiline={true}
            placeholder="글내용 작성"/>
          </ContentsInputContainer>

      </WritingPostContainer>
      <PostSendButton 
        onPress={() => alert("게시물 등록!")}>
          <Image source={sendCommentIcon} resizeMode="contain" style={{width:25, height:25}}/>
      </PostSendButton>
    </View>
  );
};

export default CommunityWritingPost;

/** 글쓰기 창의 모든 내용을 담는 태그*/
const WritingPostContainer = styled.ScrollView`
  margin : 20px;
`;

/**제목창에 해당하는 부분을 담는 태그 */
const TitleInputContainer = styled.View`
  border : 1px solid #787878;
  border-radius : 7px;
  padding : 5px;
  `;

/**제목 입력창에 해당하는 태그 */
const TitleInput = styled.TextInput`
font-size : 18px;
`
  
/**글 태그 선택창을 담는 태그 */
const SelectTagsContainer = styled.View`
  border : 1px solid #787878;
  border-radius : 7px;
  padding : 5px;
  margin : 10px 0;
`

/**글 내용 작성창에 해당하는 부분을 담는 태그 */
const ContentsInputContainer = styled.View`
  border : 1px solid #787878;
  border-radius : 7px;
  padding : 5px;
`

/**글 내용 작성하는 부분에 해당하는 태그 */
const ContentsInput = styled.TextInput`
`

/**게시물 작성 완료 버튼에 해당하는 태그 */
const PostSendButton = styled.TouchableOpacity`
    width:50px;
    height:30px; 
    background-color: #0004ff90; 
    border-radius:5px; 
    border-width:1px;
    margin:5px;
    justify-content:center;
    align-items:center;
    position : absolute;
    bottom : 20px;
    right : 2px;
`