import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';
// import * as AuthSession from 'expo-auth-session';
// import * as SecureStore from 'expo-secure-store';
import {WebView} from 'react-native-webview'
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CLIENT_ID, REDIRECT_URI } from '@env';

// WebBrowser.maybeCompleteAuthSession();

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default function Login({ navigation }) {

  return (
    <SafeAreaView style={StyleSheet.container}>
      <WebView
        style={StyleSheet.webview}
        source={{
          uri: KAKAO_AUTH_URL, 
        }}
        onNavigationStateChange={(e) => {
          if (e.navigationType === "formsubmit") {
            navigation.navigate("KakaoLoginRedirect", {
              code: e.url.split("code=")[1], 
            });
          }

          // if (e.url.startsWith(REDIRECT_URI)) {
          //   const code = new URL(e.url).searchParams.get('code');
          //   if(code) {
          //     navigation.navigate("KakaoLoginRedirect", {token:code});
          //   }
          // }
        }}
      />
    </SafeAreaView>
  );
}

function KakaoLoginRedirect({ navigation, route }) {
  // params로 인가 코드 넘어옴
  // const code = route.params.token;
  // const { token } = route.params;
  const code = route.params.code;
  
  useEffect(() => {
    // 인가 코드가 정상적으로 넘어왔다면 백엔드 서버로 전달
    if (code) {
      // // CSRF 토큰 가져오기
      axios
        // .get(`http://localhost:5000/v1/auth/kakao/idtoken?code=${code}`)
        .get(`http://localhost:5000/oauth?code=${code}`)
        // .then((getRes) => {
        //   axios.post(`http://localhost:5000/?idtoken=${getRes.data.data.idToken}`)
        // .then((postRes) => {
        //     // 로그인 성공 후 처리 로직
        //     console.log("login successful", response.data);
        //     navigation.navigate('Home');
        //   });
        // })
        .then((getRes) => {
          console.log("login successful: ", getRes.data);
          //getRes.data를 넘겨주고 싶어요.... 이게 userid인데....
          // navigation.navigate('Home', {
          //   userId: getRes.data, 
          // });
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.error("Failed to handle Kakao login:", error);
          // 에러 처리
        });

      // axios.post('http://localhost:5000/oauth', { code: token })
      //   .then(response => {
      //     // 로그인 성공 후 처리 로직
      //     console.log('Login successful:', response.data);
      //   })
      //   .catch(error => {
      //     console.error('Failed to handle Kakao login:', error);
      //   });

    } else {
      // 인가 코드가 없을 경우 에러 처리
      console.log("인가 코드 없어서 나왔음");
    }
  }, [code]);
  return (
    <SafeAreaView style={styles.container}>
      <Typography>Loading...</Typography>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    width: '100%',
  },
});