/* 커뮤니티에서 공통으로 사용할 태그를 담는 파일 */
import React from "react";
import { View, Image, Text } from "react-native";
import styled from "styled-components/native";

/**가로선 태그*/
export const HorizontalLine = styled.View`
  background-color : #d9d9d9;
  height : 2px;
  margin : 10px 0px;
`;

/**좋아요의 개수를 표시할 태그*/
export const LikeTag = ({ likeNumber }) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <Image source={require('../assets/community/like_logo.png')} style = {{width : 17, height : 17, backgroundColor : 'pink'}}/>
      <Text>
        {likeNumber}
      </Text>
    </View>
  );
};

/**스크랩의 개수를 표시할 태그 */
export const ScrapeTag = ({ scrapeNumber }) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <Image source={require('../assets/community/scrape_logo.png')} style = {{width : 15, height : 15}}/>
      <Text>
        {scrapeNumber}
      </Text>
    </View>
  );
};
