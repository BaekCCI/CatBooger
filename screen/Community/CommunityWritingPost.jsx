import React, { useState, useContext, useRef, useMemo, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';
import { HorizontalLine } from './CommunityCommonStyles';
import { currentUserId, GetDate, initialAnimalTags, initialCategoryTags, PostsContext, PostsProvider } from './CommunityCommonData';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { UserContext, UserProvider } from '../../UseContext';

const OptimizedTextInput = React.memo(({ value, onChangeText, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setNativeProps({ text: value });
    }
  }, [value]);

  return (
    <TextInput
      ref={inputRef}
      onChangeText={onChangeText}
      {...props}
    />
  );
});

const CommunityWritingPost = () => {
  const { userId } = useContext(UserContext);

  const cameraIcon = require("../../assets/community/camera_icon.png");
  const galleryIcon = require("../../assets/community/gallery_icon.png");

  const { Posts, AddPost, GetPostFromServer, UpdatePost, DeletePost } = useContext(PostsContext);

  const [animalTags, setAnimalTags] = useState(initialAnimalTags);
  const [categoryTags, setCategoryTags] = useState(initialCategoryTags);
  const titleRef = useRef('');
  const contentRef = useRef('');
  const [imageUrl, setImageUrl] = useState('');

  const SelectTag = useCallback((tags, setTags, index) => {
    const updatedTags = tags.map((tag, i) =>
      i === index ? { ...tag, isSelected: !tag.isSelected } : tag
    );
    setTags(updatedTags);
  }, []);

  const Tags = useMemo(() => {
    return () => (
      <View style={{paddingTop: 10, paddingBottom: 10}}>
        <View style={{flexDirection:'row', gap: 5, marginBottom: 5}}>
          <Text style={{fontSize: 15, fontWeight:'bold'}}>
            동물 :
          </Text>
          {animalTags.map((tag, index) => (
            <TouchableOpacity  
              key={index}
              onPress={() => SelectTag(animalTags, setAnimalTags, index)}
              style={{
                borderWidth: 1, 
                borderRadius: 5, 
                width: 50, 
                height: 25,
                backgroundColor: tag.isSelected ? '#c5e8ff' : null, 
                justifyContent: 'center'
              }}>
              <Text style={{textAlign: 'center'}}>
                {tag.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={{flexDirection:'row', gap: 5}}>
          <Text style={{fontSize: 15, fontWeight:'bold'}}>
            카테고리 :
          </Text>
          <ScrollView horizontal={true}>
            {categoryTags.map((tag, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => SelectTag(categoryTags, setCategoryTags, index)}
                style={{
                  borderWidth: 1, 
                  borderRadius: 5, 
                  width: 50, 
                  height: 25,
                  backgroundColor: tag.isSelected ? '#c5e8ff' : null, 
                  justifyContent: 'center',
                  marginRight: 5
                }}>
                <Text style={{textAlign: 'center'}}>
                  {tag.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }, [animalTags, categoryTags, SelectTag]);

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();

  const getImage = useCallback(async (useCamera = false) => {
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
        aspect: undefined,
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
  }, [status, cameraStatus, requestPermission, requestCameraPermission]);

  const TitleInputContainerTag = useMemo(() => {
    return () => (
      <View>
        <TitleInputContainer>
          <OptimizedTextInput 
            multiline={true}
            placeholder="제목 입력"
            onChangeText={(text) => { titleRef.current = text; }}
          />
          <HorizontalLine style={{marginTop: 0, marginBottom: 0}}/>
        </TitleInputContainer>
      </View>
    );
  }, []);

  const ImageInputContainerTag = useMemo(() => {
    return () => (
      <ContentsImageInputContainer>
        {imageUrl ? (
          <View>
            <Image
              source={{uri: imageUrl}} 
              style={{width: '100%', height: 300, resizeMode: 'contain', alignSelf: 'center'}}
            />
            <CancelImage onPress={() => setImageUrl("")}>
              <Text style={{fontWeight: '600', fontSize: 20}}>
                X
              </Text>
            </CancelImage>
          </View>
        ) : (
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>이미지 등록</Text>
        )}

        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
          <TouchableOpacity onPress={() => getImage(false)} style={buttonStyle}>
            <Image source={galleryIcon} style={{resizeMode:'contain', width: 50, height: 50}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => getImage(true)} style={buttonStyle}>
            <Image source={cameraIcon} style={{resizeMode:'contain', width: 50, height: 50}}/>
          </TouchableOpacity>
        </View>
      </ContentsImageInputContainer>
    );
  }, [imageUrl, getImage]);

  const ContentsInputContainerTag = useMemo(() => {
    return () => (
      <ContentsInputContainer>
        <OptimizedTextInput 
          onChangeText={(text) => { contentRef.current = text; }}
          multiline={true}
          placeholder={"글내용 작성"}
        />
      </ContentsInputContainer>
    );
  }, []);

  const RegisterPost = useCallback(async () => {
    const selectedAnimalTags = animalTags.filter(tag => tag.isSelected).map(selectedTag => selectedTag.name);
    const selectedCategoryTags = categoryTags.filter(tag => tag.isSelected).map(selectedTag => selectedTag.name);
    const selectedTags = selectedAnimalTags.concat(selectedCategoryTags);
    const createdDate = GetDate();
    const Uip = "192.168.193.176";
    const postId = "postId" + Date.now();

    if (titleRef.current === "") {
      alert("제목을 입력해주세요!");
      return;
    } else if (selectedTags.length === 0) {
      alert("한 개 이상의 태그를 선택해주세요!");
      return;
    } else if (contentRef.current === "") {
      alert("게시물 내용을 입력해주세요!");
      return;
    }

    try {
      const response = await axios.put(`http://${Uip}:3000/posts/${postId}`, {
        author: userId,
        content: contentRef.current,
        createdDate: createdDate,
        imgUri: imageUrl,
        likeNumber: 0,
        mark: false,
        modifiedDate: null,
        replies: null,
        star: null,
        tags: selectedTags,
        title: titleRef.current
      });
      console.log('Response:', response.data);
      if (response.status === 200) {
        alert('게시물을 추가하였습니다!');
        // 성공 시에만 입력 필드를 초기화합니다
        titleRef.current = '';
        contentRef.current = '';
        setImageUrl('');
        setAnimalTags(animalTags.map(tag => ({ ...tag, isSelected: false })));
        setCategoryTags(categoryTags.map(tag => ({ ...tag, isSelected: false })));
      } else {
        alert('게시물 추가를 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding feeding event:', error.response ? error.response.data : error.message);
      alert('게시물을 추가하는 과정에서 문제가 발생했습니다.');
    }
  }, [animalTags, categoryTags, imageUrl, userId]);
  
  return (
    <View style={{flex: 1}}>
      <WritingPostContainer>
        <TitleInputContainerTag/>
        <SelectTagsContainer>
          <Tags/>
          <HorizontalLine style={{marginBottom: 0, marginTop: 0}}/>
        </SelectTagsContainer>
        <ImageInputContainerTag/>
        <HorizontalLine style={{marginTop: 0, marginBottom: 0}}/>
        <ContentsInputContainerTag/>
      </WritingPostContainer>
      <PostSendButton onPress={RegisterPost}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
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
);

export default CommunityWritingPostsWithPostsProvider;

const WritingPostContainer = styled.ScrollView`
  margin: 20px;
`;

const TitleInputContainer = styled.View`
  border-radius: 7px;
`;

const TitleInput = styled.TextInput`
  font-size: 18px;
`;
  
const SelectTagsContainer = styled.View`
  border-radius: 7px;
`;

const ContentsInputContainer = styled.View`
  border-radius: 7px;
  padding: 5px;
  margin: 10px 0;
`;

const ContentsImageInputContainer = styled.View`
  border-radius: 7px;
  padding: 5px;
`;

const ContentsInput = styled.TextInput`
`;

const PostSendButton = styled.TouchableOpacity`
  background-color: #1399895f; 
  border-radius: 10px; 
  border-width: 1px;
  padding: 5px 10px;
  padding-bottom: 7px;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 60px;
  bottom: 2%;
  right: 4%;
`;

const buttonStyle = {
  padding: 10,
  borderRadius: 5,
  borderWidth: 1
};

const CancelImage = styled.TouchableOpacity`
  height: 30px; 
  width: 30px; 
  align-items: center;
  justify-content: center;
  background-color: #dbdbdb75;
  position: absolute;
  border-width: 1px;
  border-radius: 5px;
`;