import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';
import { HorizontalLine } from './CommunityCommonStyles';
import { initialAnimalTags, initialCategoryTags, PostsContext, PostsProvider } from './CommunityCommonData';
import * as ImagePicker from 'expo-image-picker'

const CommunityWritingPost = () => {
  const {Posts, AddPost, UpdatePost, DeletePost} = useContext(PostsContext)

  const [animalTags, setAnimalTags] = useState(initialAnimalTags);
  const [categoryTags, setCategoryTags] = useState(initialCategoryTags);

  const SelectTag = (tags, setTags, index) => {
    const updatedTags = tags.map((tag, i) =>
      i === index ? { ...tag, isSelected: !tag.isSelected } : tag
    );
    setTags(updatedTags);
  };

  const Tags = () => {
    return(
      <View>
        <View style={{flexDirection:'row', gap : 5, margin : 10}}>
          <Text style={{fontSize : 15, fontWeight:'bold'}}>
            동물 :
          </Text>
          {animalTags.map((tag, index) => (
            <TouchableOpacity  
              key={index}
              onPress={() => SelectTag(animalTags, setAnimalTags, index)}
              style=
              {{borderWidth : 1, borderRadius:5, width : 50, height : 25,
                backgroundColor : tag.isSelected ? '#c5e8ff' : null
              }}>
              
              <Text style={{textAlign : 'center'}}>
                {tag.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <HorizontalLine style={{marginBottom : 0, marginTop : 0}}/>

        <View style={{flexDirection:'row', gap : 5, margin : 10}}>
          <Text style={{fontSize : 15, fontWeight:'bold'}}>
            카테고리 :
          </Text>
          <ScrollView horizontal = {true}>
            {categoryTags.map((tag, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => SelectTag(categoryTags, setCategoryTags, index)}
                style=
                {{borderWidth : 1, borderRadius:5, width : 50, height : 25,
                  backgroundColor : tag.isSelected ? '#c5e8ff' : null,
                  marginRight : 5
                }}>
                
                <Text style={{textAlign : 'center'}}>
                  {tag.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }

  /**
   * 이미지 등록에 관한 코드들
   */
  const [imageUrl, setImageUrl] = useState('');
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();

  /**
   * 이미지를 선택하거나 촬영하는 함수
   * @param {boolean} useCamera - true이면 카메라 사용, false이면 갤러리 사용
   */
  const getImage = async (useCamera = false) => {
    // 권한 확인 및 요청
    if (useCamera) {
      if (!cameraStatus?.granted) {
        const permission = await requestCameraPermission();
        if (!permission.granted) {
          Alert.alert('권한 필요', '카메라 접근 권한이 필요합니다.');
          return;
        }
      }
    } else {
      if (!status?.granted) {
        const permission = await requestPermission();
        if (!permission.granted) {
          Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
          return;
        }
      }
    }

    try {
      let result;
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect : undefined,
        quality: 1,
      };

      if (useCamera) {
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUrl(result.assets[0].uri);
      }
    } catch (error) {
      console.error('이미지 선택/촬영 중 오류 발생:', error);
      Alert.alert('오류', '이미지를 가져오는 중 오류가 발생했습니다.');
    }
  }

  return (
    <View style={{flex : 1}}>
      <WritingPostContainer>
          <View>
            <TitleInputContainer>
              <TitleInput 
              multiline={true}
              placeholder="제목 입력"
              />
              <HorizontalLine style={{marginTop : 0, marginBottom : 0}}/>
            </TitleInputContainer>
          </View>
          
          <SelectTagsContainer>
              <Tags/>
          </SelectTagsContainer>

          <ScrollView>
            {/* 이미지 등록 컨테이너 */}
            <ContentsImageInputContainer>
                {imageUrl ? (
                  <View>
                      <Image
                        source={{uri: imageUrl}} 
                        style={{width: '100%', height: 300, resizeMode: 'contain', alignSelf: 'center'}}>

                      </Image>
                        <TouchableOpacity onPress={() => setImageUrl("")} 
                        style=
                        {{
                        height : 30, width : 30, 
                        backgroundColor : '#dbdbdb75', position : 'absolute',
                        alignItems : 'center', justifyContent : 'center',
                        borderWidth : 1, borderRadius : 5
                        }}>
                        <Text style={{fontWeight : '600', fontSize : 20}}>
                          X
                        </Text>

                        </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={{textAlign: 'center', fontWeight : 'bold', fontSize : 16}}>이미지 등록</Text>
                )}

              <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
                <TouchableOpacity onPress={() => getImage(false)} style={buttonStyle}>
                  <Text>갤러리에서 선택</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getImage(true)} style={buttonStyle}>
                  <Text>카메라로 촬영</Text>
                </TouchableOpacity>
              </View>
            </ContentsImageInputContainer>

            <ContentsInputContainer>
              <ContentsInput 
              multiline={true}
              placeholder="글내용 작성"/>
            </ContentsInputContainer>

          </ScrollView>

      </WritingPostContainer>
      <PostSendButton 
        onPress={() => {
          alert("게시물 등록!")
          }}>
        <Text style={{lineHeight : 18}}>
          등록
        </Text>
      </PostSendButton>
    </View>
  );
};

/** 글쓰기 창의 모든 내용을 담는 태그*/
const WritingPostContainer = styled.ScrollView`
  margin : 20px;
`;

const CommunityWritingPostsWithPostsProvider = () => (
    <PostsProvider>
      <CommunityWritingPost/>
    </PostsProvider>
)

export default CommunityWritingPostsWithPostsProvider;

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
  margin : 10px 0;
`

/**글 내용 작성창에 해당하는 부분을 담는 태그 */
const ContentsInputContainer = styled.View`
  border : 1px solid #787878;
  border-radius : 7px;
  padding : 5px;
  margin : 10px 0;
  `


/**글 내용 작성창에 이미지 등록 부분을 담는 태그 */
const ContentsImageInputContainer = styled.View`
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
    background-color: #6495ED90; 
    border-radius:5px; 
    border-width:1px;
    margin:5px;
    justify-content:center;
    align-items:center;
    position : absolute;
    bottom : 5px;
    right : 20px;
`

const buttonStyle = {
  backgroundColor: '#6495ED90',
  padding: 10,
  borderRadius: 5,
};
