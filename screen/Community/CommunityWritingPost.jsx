import React, { useState, useContext, useRef } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';
import { HorizontalLine } from './CommunityCommonStyles';
import { currentUserId, initialAnimalTags, initialCategoryTags, PostsContext, PostsProvider } from './CommunityCommonData';
import * as ImagePicker from 'expo-image-picker'

const CommunityWritingPost = () => {
  const cameraIcon = require("../../assets/community/camera_icon.png");
  const galleryIcon = require("../../assets/community/gallery_icon.png")

  const {Posts, AddPost, UpdatePost, DeletePost} = useContext(PostsContext)

  const [animalTags, setAnimalTags] = useState(initialAnimalTags);
  const [categoryTags, setCategoryTags] = useState(initialCategoryTags);

  const titleInputRef = useRef('');
  const contentInputRef = useRef('');

  const SelectTag = (tags, setTags, index) => {
    const updatedTags = tags.map((tag, i) =>
      i === index ? { ...tag, isSelected: !tag.isSelected } : tag
    );
    setTags(updatedTags);
  };

  const Tags = () => {
    return(
      <View>
        <View style={{flexDirection:'row', gap : 5, marginBottom : 5}}>
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
        

        <View style={{flexDirection:'row', gap : 5}}>
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

  /**제목 쓰기란에 해당하는 태그*/
  const TitleInputContainerTag = () => {
    return(
      <View>
        <TitleInputContainer>
          <TitleInput 
          multiline={true}
          placeholder="제목 입력"
          onChangeText={(newText) => {titleInputRef.current = newText}}
          />
          <HorizontalLine style={{marginTop : 0, marginBottom : 0}}/>
        </TitleInputContainer>
      </View>
    )
  }

  /**이미지 등록란에 해당하는 태그*/
  const ImageInputContainerTag = () => {
    return(
      <ContentsImageInputContainer>
        {imageUrl ? (
          <View>
              <Image
                source={{uri: imageUrl}} 
                style={{width: '100%', height: 300, resizeMode: 'contain', alignSelf: 'center'}}>
              </Image>

                <CancelImage onPress={() => setImageUrl("")}>
                  <Text style={{fontWeight : '600', fontSize : 20}}>
                    X
                  </Text>
                </CancelImage>
          </View>
        ) : (
          <Text style={{textAlign: 'center', fontWeight : 'bold', fontSize : 16}}>이미지 등록</Text>
        )}

      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
        <TouchableOpacity onPress={() => getImage(false)} style={buttonStyle}>
          <Image source={galleryIcon} style={{resizeMode:'contain', width : 50, height : 50}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getImage(true)} style={buttonStyle}>
          <Image source={cameraIcon} style={{resizeMode:'contain', width : 50, height : 50}}/>
        </TouchableOpacity>
      </View>
      
    </ContentsImageInputContainer>
    )
  }

  /**글 내용 작성란에 해당하는 태그 */
  const ContentsInputContainerTag = () => {
    return(
      <ContentsInputContainer>
        <ContentsInput 
        onChangeText = {(newText) => {contentInputRef.current = newText}}
        multiline={true}
        placeholder={"글내용 작성"}/>
      </ContentsInputContainer>
    )
  }

  /**서버 상에 게시물을 등록하는 기능 */
  const RegisterPost = () => {
    const selectedAnimalTags = (animalTags.filter((tag) => tag.isSelected)).map((selectedTag) => selectedTag.name);
    const selectedCategoryTags = (categoryTags.filter((tag) => tag.isSelected)).map((selectedTag) => selectedTag.name);
    const selectedTags = selectedAnimalTags.concat(selectedCategoryTags);
    const isQuestion = selectedCategoryTags.includes("QnA");

    AddPost({
      writerID : currentUserId,
      isQuestion : isQuestion,
      isQuestionSolved : isQuestion ? false : null,
      title : titleInputRef.current,
      content : contentInputRef.current,
      img : {uri : imageUrl},
      tags : selectedTags,
      postTime: Date(),
      likeNumber: 0,
      scrapeNumber: 0,
      comments : []
    })

    titleInputRef.current = "";
    contentInputRef.current = "";
    setImageUrl("")
    
    const resetAnimalTags = animalTags.map((tag) => ({ ...tag, isSelected: false }));
    setAnimalTags(resetAnimalTags);
    
    const resetCategoryTags = categoryTags.map((tag) => ({ ...tag, isSelected: false }));
    setCategoryTags(resetCategoryTags);
  }
  
  return (
    <View style={{flex : 1}}>
      <WritingPostContainer>
          <SelectTagsContainer>
            <Tags/>
          </SelectTagsContainer>

          <TitleInputContainerTag/>

          <ImageInputContainerTag/>

          <HorizontalLine style={{marginTop : 0, marginBottom : 0}}/>

          <ContentsInputContainerTag/>

      </WritingPostContainer>

      <PostSendButton 
        onPress={() => {RegisterPost()}}>
        <Text style={{fontSize : 14, fontWeight : 'bold'}}>
          등록
        </Text>
      </PostSendButton>

    </View>
  );
};

const CommunityWritingPostsWithPostsProvider = () => (
    <PostsProvider>
      <CommunityWritingPost/>
    </PostsProvider>
)

export default CommunityWritingPostsWithPostsProvider;

/** 글쓰기 창의 모든 내용을 담는 태그*/
const WritingPostContainer = styled.ScrollView`
  margin : 20px;
`;


/**제목창에 해당하는 부분을 담는 태그 */
const TitleInputContainer = styled.View`
  /* border : 1px solid #787878; */
  border-radius : 7px;
  `;

/**제목 입력창에 해당하는 태그 */
const TitleInput = styled.TextInput`
font-size : 18px;
`
  
/**글 태그 선택창을 담는 태그 */
const SelectTagsContainer = styled.View`
  /* border : 1px solid #787878; */
  margin-bottom : 2%;
  border-radius : 7px;
`

/**글 내용 작성창에 해당하는 부분을 담는 태그 */
const ContentsInputContainer = styled.View`
  /* border : 1px solid #787878; */
  border-radius : 7px;
  padding : 5px;
  margin : 10px 0;
  `


/**글 내용 작성창에 이미지 등록 부분을 담는 태그 */
const ContentsImageInputContainer = styled.View`
  /* border : 1px solid #787878; */
  border-radius : 7px;
  padding : 5px;
`
/**글 내용 작성하는 부분에 해당하는 태그 */
const ContentsInput = styled.TextInput`
`

/**게시물 작성 완료 버튼에 해당하는 태그 */
const PostSendButton = styled.TouchableOpacity`
    background-color: #1399895f; 
    border-radius: 10px; 
    border-width:1px;
    padding : 5px 10px;
    padding-bottom : 7px;
    justify-content:center;
    align-items:center;
    position : absolute;
    bottom : 2%;
    right : 4%;
`

const buttonStyle = {
  // backgroundColor: '#6495ED90',
  padding: 10,
  borderRadius: 5,
  borderWidth : 1
};

const CancelImage  = styled.TouchableOpacity`
  height : 30px; 
  width : 30px; 
  align-items : center;
  justify-content : center;
  background-color : #dbdbdb75;
  position : absolute;
  border-width : 1px;
  border-radius : 5px;
`
