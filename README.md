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
* 홈 화면
   * 반려동물 건강 체크리스트 기록
   * 관련 일정 등록 및 관리
     
     ![main](https://github.com/PSangYun/graegrae/blob/master/main.png)

* 상담 화면
  * 의사에게 채팅 상담 요청 가능
  * 의사마다 상담권 구매 후 채팅 진행

    ![profile](https://github.com/PSangYun/graegrae/blob/master/profile.png)    
    ![card](https://github.com/PSangYun/graegrae/blob/master/card.png)
    ![news](https://github.com/PSangYun/graegrae/blob/master/news.png)

* 커뮤니티 화면
  * 앱 사용자들과 자유롭게 소통 가능
  * 포스트 등록 및 댓글 기능
    
    ![chat](https://github.com/PSangYun/graegrae/blob/master/chat.png)

* 병원 화면
  * 병원 위치 지도에 표시 및 리스트 나열
    
    ![chat](https://github.com/PSangYun/graegrae/blob/master/chat.png)

<br/>

## ⚙개발환경
* Visual Studio Code
* React Native
* Node.js
* 언어 : Javascript, Python
* 프레임워크 : Flask
* 데이터베이스 : Firebase

<br/><br/>

