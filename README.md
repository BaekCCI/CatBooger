# 검은콩
**반려동물 건강 케어 및 관련 정보 제공 플랫폼**

>*반려동물 관련 건강 체크리스트 및 일정 관리, 커뮤니티, 채팅 상담, 병원 지도*
<br/>

본 프로젝트는 반려동물 건강 체크리스트 및 소통 공간을 제공함으로써 효율적인 사용자의 반려동물 케어를 가능케 하는 안드로이드 및 IOS 모바일 어플리케이션의 제공을 목표로 한다.

<br/>

## 🛠실행
다음 내용을 순차적으로 수행한다.

<br/>

**Node.js 설치(18버전 이상)** <https://nodejs.org/>

**VS Code 설치** <https://code.visualstudio.com/>

**Python(3.4버전 이상) 설치** <https://www.python.org/downloads/>

<br/>

**cmd창에 ipconfig 입력(window 기준) 후 무선 LAN 어댑터 Wi-Fi의 IPv4주소 복사해두기(이후 [ip]라 칭함)**

* FrontApp의 ChatStart.jsx에서 107번째 줄의 fetch경로를 자신의 [ip]를 포함한 uri로 바꾼다. (ex: http://***[ip]***:5000/chat-api)
* greaApp의 App.js에서 43번째 줄의 uri를 자신의 [ip]를 포함한 uri로 바꾼다.  (ex: http://***[ip]***:3000/)


<br/>

git clone 후 vscode에서 폴더 오픈

>Key 파일 다운로드
* **.env**
  
  루트 디렉토리에 삽입

* **serviceAccountKey.json**

  Back 폴더에 삽입

* **kakao_config.py**

  Back 폴더에 삽입

<br/>

vscode 터미널 4개 생성
> *터미널1*

```
    cd Back
   
    python app.py

```

<br/>

> *터미널2*

```
    cd Back
    
    python homeDb.py
    
```

<br/>

> *터미널3*

```
    cd Back

    cd post
    
    python app.py
    
```

<br/>

> *터미널4*

```
    npm install -g expo-cli
    
    npm install expo

    npm start --clear
    
```

<br/>

## 💻프로젝트 소개
* 메인 화면
   * 접속마다 다른 인물 생성
   * 인물 프로필 이동 가능
     
     ![main](https://github.com/PSangYun/graegrae/blob/master/main.png)

* 위인 프로필
  * 인물별 카드 뉴스

    ![profile](https://github.com/PSangYun/graegrae/blob/master/profile.png)    
    ![card](https://github.com/PSangYun/graegrae/blob/master/card.png)
    ![news](https://github.com/PSangYun/graegrae/blob/master/news.png)

* 채팅
  * 위인 챗봇
    
    ![chat](https://github.com/PSangYun/graegrae/blob/master/chat.png)

<br/>

* [Notion](https://axiomatic-jelly-b5c.notion.site/Oss-Team-Space-c85bd6a5b7804ecd9d1e06ee71ccca44?pvs=4)

  

* *swagger documentation*
  * http://localhost:3000/api-docs
 
    ![swagger](https://github.com/PSangYun/graegrae/blob/master/swagger.png)

<br/>

## ⚙개발환경
* Visual Studio Code
* React
* React Native
* Node.js
* 언어 : Javascript. Python
* 프레임워크 : Flask
* 데이터베이스 : Firebase

<br/>

## 👨‍💻사용 오픈소스
* 인물 프로필 Carousel
  
  <https://codesandbox.io/p/sandbox/1v96j74484?file=%2Fsrc%2Fexample.js%3A8%2C26&view=preview>
  
* 오픈AI API 호출
  
  <https://github.com/minji337/jjinchin>

* 홈 화면 인물 카드

  <https://uiverse.io/eslam-hany/selfish-bobcat-73>

<br/><br/>

This project is licensed under the terms of the MIT license.
