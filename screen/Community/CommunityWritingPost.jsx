import React from 'react';
import { View, Text, ScrollView, TextInput} from 'react-native';
import styled from 'styled-components';
import { HorizontalLine } from './CommunityCommonStyles';

const CommunityWritingPost = () => {
  return (
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
  );
};

export default CommunityWritingPost;

/** 글쓰기 창의 모든 내용을 담는 태그*/
const WritingPostContainer = styled.View`
  margin : 20px;
  gap : 10
`;

/**제목창에 해당하는 부분을 담는 태그 */
const TitleInputContainer = styled.View`
  border : 1px solid #787878;
  border-radius : 7px;
  padding : 5px;
  `;
  /**제목 입력창에 해당하는 태그 */
  const TitleInput = styled.TextInput`
  font-size : 18;
  `
  
/**글 태그 선택창을 담는 태그 */
const SelectTagsContainer = styled.View`
  border : 1px solid #787878;
  border-radius : 7px;
  padding : 5px;
`

/**글 내용 작성창에 해당하는 부분을 담는 태그 */
const ContentsInputContainer = styled.ScrollView`
  border : 1px solid #787878;
  border-radius : 7px;
  padding : 5px;
`
const ContentsInput = styled.TextInput`
`