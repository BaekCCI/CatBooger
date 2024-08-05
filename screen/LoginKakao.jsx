import React, { useState, useEffect, useContext } from 'react';
import { Button, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
// import * as AuthSession from 'expo-auth-session';
// import * as SecureStore from 'expo-secure-store';
import {WebView} from 'react-native-webview'
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../UseContext';

import { CLIENT_ID, REDIRECT_URI } from '@env';

import * as SecureStore from 'expo-secure-store';

// WebBrowser.maybeCompleteAuthSession();

// const id = CLIENT_ID;
// const reu = REDIRECT_URI;

// const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${id}&redirect_uri=${reu}&response_type=code`;

async function saveToken(token, uid) {
  await SecureStore.setItemAsync('authToken', token);
  await SecureStore.setItemAsync('uid', uid);
  const save = await SecureStore.getItemAsync('authToken');
  console.log("saved: ", save);
} 

export default function Login({ navigation }) {

  const id = CLIENT_ID;
  const reu = REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${id}&redirect_uri=${reu}&response_type=code`;

  console.log(REDIRECT_URI);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{
          uri: KAKAO_AUTH_URL, 
        }}
        onNavigationStateChange={(e) => {
          // if (e.navigationType === "formsubmit") {
          //   navigation.navigate("KakaoLoginRedirect", {
          //     code: e.url.split("code=")[1], 
          //   });
          // }

          // console.log(e)

          if (e.url.startsWith(REDIRECT_URI)) {
            // const code = new URL(e.url).searchParams.get('code');
            const code = e.url.split("code=")[1];
            if(code) {
              console.log(e)
              navigation.navigate("KakaoLoginRedirect", { code });
            }
          }
        }}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    </SafeAreaView>
  );
}

export function KakaoLoginRedirect() {
  const navigation = useNavigation();
  const route = useRoute();
  // params로 인가 코드 넘어옴
  const { code } = route.params;
  // const code = route.params.code;
  const { setUserId } = useContext(UserContext);
  
  useEffect(() => {
    // 인가 코드가 정상적으로 넘어왔다면 백엔드 서버로 전달
    if (code) {
      // // CSRF 토큰 가져오기
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log(code);
      axios
        .get(`http://192.168.1.52:5000/oauth?code=${code}`)
        .then((getRes) => {
          // console.log("login successful: ", getRes.data.id);
          const { user, exists, token } = getRes.data;
          // setUserId(getRes.data.id);
          setUserId(user);
          saveToken(token, user);

          console.log(user + "  -----------  " + exists + "  -----------  " + token);
          if (exists == null){
            navigation.navigate('AddAnimal');
          }
          else {
            navigation.navigate('MyTabs');
          }
        })
        .catch((error) => {
          console.error("Failed to handle Kakao login:", error);
          // 에러 처리
        });

    } else {
      // 인가 코드가 없을 경우 에러 처리
      console.log("인가 코드 없어서 나왔음");
    }
  }, [code]);
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // // alignItems: 'center',
    // justifyContent: 'space-between'
  },
  webview: {
    flex: 1,
    width: '100%',
    // height: '100%'
  },
});