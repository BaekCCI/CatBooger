import { createContext, useState } from "react";

// 태그 데이터
export const initialAnimalTags = [
  { name: "강아지", isSelected: false },
  { name: "고양이", isSelected: false },
];
export const initialCategoryTags = [
  { name: "QnA", isSelected: false },
  { name: "간식", isSelected: false },
  { name: "건강", isSelected: false },
  { name: "일상", isSelected: false },
  { name: "정보", isSelected: false },
];

// 게시물 데이터
const initialPosts = [
  { 
    id : 0,
    title: "게시물 제목",
    content: "게시물 내용",
    img: "",
    tags: ["강아지", "간식", "일상"],
    profileNickName: "글쓴이 닉네임",
    postTime: "게시 시간",
    likeNumber: 0,
    scrapeNumber: 0,
    comments : [
      {
        profileNickName: '닉네임',
        content: '댓글내용',
        postTime: '2024-07-26'
      }
    ]
  },
  { 
    id : 1,
    title: "게시물 제목",
    content: "게시물 내용",
    img: {uri : "https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg?rnd=20230712163021"},
    tags: ["강아지", "간식", "일상", "QnA"],
    profileNickName: "글쓴이 닉네임",
    postTime: "게시 시간",
    likeNumber: 0,
    scrapeNumber: 0,
    comments : [
      {
        profileNickName: '닉네임',
        content: '댓글내용',
        postTime: '2024-07-26'
      }
    ]
  },
  { 
    id : 2,
    title: "사실 우리집 고양이 킬러임",
    content: "레옹이 아니라 냐옹이라는 유명한 킬러임 지금도 황태밀수 사업에서 손때고 짜져있으라고 권총으로 협박받고이써 ㅠㅠ",
    img: { uri: "https://ac-p1.namu.la/20240528sac/48a02548e24db4bade8089a58d4b34244c48cfd0436b894097ec670bdcfd9bac.jpg?expires=1722017549&key=ZnAk61LlLLP9Qb30HFTLhA&type=orig" },
    tags: ["고양이", "일상"],
    profileNickName: "괴문서맵게하는집",
    postTime: "2024-05-28 19:17:11",
    likeNumber: 15,
    scrapeNumber: 10,
    comments : [
      {
        profileNickName: '개냥이',
        content: '저 킬러 이름이 야옹 이군요.',
        postTime: '2024-05-29 14:18:19'
      },
      {
        profileNickName: '얼죽패딩',
        content: '킬러군',
        postTime: '2024-05-30 17:17:43'
      },
    ]
  },
  { 
    id : 3,
    title: "강아지 우울증인가요?",
    content:
    `남자친구랑 같이 2박3일로 놀러가게되서 지인집에 맡겼는데 지인집에는 친한 강아지 2마리가 있어서 너무 재밌게 놀고 지인이랑도 너무 잘지내고 사진이랑 영상을 봤을때 너무 행복해보였습니다.​

오늘 집에 돌아왔는데 너무 우울해하고 있어서 산책도 나갔다 온 후에도 슬픈눈을 하면서 계속 누워만 있고 밥도 평소보다 잘 안먹고있어요​

혹시 우울증인걸까요?

저희집 강아지는 진도믹스/11개월 입니다`,
    img: {uri : "https://bff-images.bemypet.kr/media/medias/all/650-KakaoTalk_20240730_004108127.jpg"},
    tags: ["강아지", "QnA"],
    profileNickName: "min",
    postTime: "2023-07-18 11:00:00",
    likeNumber: 0,
    scrapeNumber: 0,
    comments : [
      {
        profileNickName: '나물이네',
        content: '떨어져있어서 조금 ..삐진거 아닐까용... ?!! 👉🏻👈🏻  맛있는 간식으로  보상을🫶🏻',
        postTime: '2024-07-30'
      },
    ]
  },
  { 
    id : 4,
    title: "아파도 티 안 내는 고양이… 질병 ‘조기 진단’하려면?",
    content: 
    `고양이는 아파도 아픈 티를 안 낸다. 고양이의 조상은 사막에서 살던 야생동물이었다. 조금이라도 아파 보이면 자신보다 강한 포식자에 공격당할 위험이 커진다. 이에 아픔을 숨기던 본능이 여태 남아있다.

건강 이상을 조기 진단하려면 정기 검진을 받아야 한다. 그러나 반려묘 정기 검진을 챙기는 가구는 전체 반려묘 가구 수의 절반에 불과하다. 펫푸드 브랜드 로얄캐닌코리아 조사 결과, 한국 반려묘 보호자 10명 중 5명은 반려묘의 정기 건강검진을 진행하지 않고 있었다. 10명 중 2명은 동물병원을 방문한 적이 없었는데, 이 중 80%가 ‘특별한 증상이 없기 때문’이라 답했다.

◇증상 나타나면 늦어… 1년에 한 번 정기검진 필요
증상이 나타난 후에 병원을 방문하면 늦다. 25년간 고양이를 진료해온 한국고양이수의사회 이기쁨 부회장(수의사)은 “많은 보호자가 반려묘 체중이 급감했거나, 잠만 자거나, 구토·설사 등 알아차릴 수밖에 없을 정도의 이상 증상이 나타날 때 병원에 데려온다”며 “그러나 이 상태라면 병이 이미 50~70% 이상 진행됐을 가능성이 크고, 치료 골든타임이 지나간 경우도 많다”고 말했다. 대표적인 게 ‘과호흡’과 입으로 숨 쉬는 ‘개구호흡’이다. 스트레스 탓에 일시적으로 발생하는 것일 수도 있지만, 심장병이 상당히 진행돼 나타나는 증상일 수도 있다. 후자라면 응급 내원해도 당일 사망할 수 있다. 
예방접종을 마친 후, 중성화 수술 전에 신체검사를 할 겸 반려묘의 생애 첫 건강검진을 하는 게 좋다. 이후에도 1년에 한 번은 가까운 동물병원에서 기본적인 건강검진을 하는 게 바람직하다. 이기쁨 수의사는 “성묘를 새로 입양했다면 사람 나이로 40대에 해당하는 7살엔 꼭 건강검진을 하길 권한다”며 “나이가 들며 여러가지 퇴행성 변화가 생길 수 있기 때문”이라고 말했다. 고양이는 연령과 품종에 따라 잘 발생하는 질환과 유전병 등이 다르므로 건강검진 항목도 조금씩 다를 수 있다.

◇'식사량' '음수량' '체중' '배변·배뇨량' 수시로 점검해야
고양이는 아픈 티를 안 내니 보호자가 고양이 상태를 주의깊게 살펴야 한다. 고양이의 평소 생활 습관을 낱낱이 기록하고, 이상이 관찰되면 즉시 내원한다. 이기쁨 수의사는 ▲식사량 ▲음수량 ▲체형·체중 ▲배변·배뇨량을 꼭 파악하길 권한다. 고양이를 여럿 기른다면 어떤 고양이가 사료를 어느 정도 먹었는지, 물은 어느 정도 마셨는지 지켜본다. 물은 고양이 체중 1kg당 40~60cc 정도 섭취하는 게 적당하다. 자동급수기·정수기를 설치하거나, 건사료와 함께 습식 사료를 급여하거나, 건사료에 물을 섞어서 수분 섭취를 돕는다.


몸무게와 근육량은 건강할 때 미리 파악해두고, 이를 기준 삼아 변화를 관찰한다. 건강 이상과 직접적으로 관련 있는 배변·배뇨량은 매일 확인해야 한다. 고양이마다 조금씩 다를 수 있지만, 보통은 하루 1~2회 배변, 하루 2~4회 배뇨하는 것이 적당하다. 초콜릿 같은 갈색에 적당히 촉촉하고 단단한 변이 가장 이상적이다. 변이 지나치게 검거나, 혈액이 묻어 있거나, 회색이라면 병원에 방문해야 한다.

◇고양이 생활 기록한 ‘데이터’가 진료·진단에 도움돼
음수량과 배뇨량은 방광염 예방을 위해서라도 신경 써서 관찰해야 한다. 고양이는 스트레스에 민감하고, 물을 잘 먹지 않는 습성 탓에 방광염에 취약하다. 고양이에게 생긴 하부요로계질환의 65%가 방광염일 정도다. 배뇨 횟수가 늘거나 혈뇨를 누는 등 방광염 증상이 나타나지 않는지 수시로 확인한다. 밥그릇과 물그릇은 고양이 한 마리당 1개씩, 화장실은 전체 고양이 수보다 1개 더 많이 마련해 생활 환경 스트레스도 줄여야 한다. 처방식 사료를 먹이는 방법도 있다. 이기쁨 수의사는 “가수분해 유단백(알파-카소제핀)과 L-트립토판이 든 처방식 사료는 소변을 희석하고 스트레스 민감도를 낮추는 데 도움된다”며 “단, 수의사와의 상담·진료를 통해 반려묘에게 맞는 제품을 급여해야 한다”고 말했다.

고양이의 ▲식사량 ▲음수량 ▲체형·체중 ▲배변·배뇨량이 적힌 기록은 병원에 갈 때 꼭 지참한다. 이 수의사는 “보호자에게 고양이가 밥은 얼마나 먹는지, 배변·배뇨량은 얼마나 되는지 등을 물었을 때 정확한 답이 돌아오면 진료·진단에 큰 도움이 된다”며 “건강 상태와 생활 습관의 변화를 오랫동안 기록한 데이터가 있으면 더 좋다”고 말했다. 고양이의 몸 상태를 기록하는 습관이 잡혀있지 않은 보호자는 한국고양이수의사회가 로얄캐닌코리아와 개발한 ‘마이 캣 다이어리’를 사용해볼 수 있다. 반려묘 보호자가 반드시 알아야 할 육묘 상식과 ▲배변·배뇨량 ▲음수량 ▲활력도 기록란이 수록된 육묘수첩이다. 오는 9월 30일까지 동물병원을 통해 반려묘 보호자들에게 배포된다.`,
    img: {uri : "https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg"},
    tags: ["고양이", "정보"],
    profileNickName: "해리미",
    postTime: "2023-07-18 11:00:00",
    likeNumber: 241,
    scrapeNumber: 64,
    comments : [
      {
        profileNickName: '고양이가 좋아',
        content: '정보글 아주 좋아요!',
        postTime: '2024-05-29 14:18:19'
      },
    ]
  }
];

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [Posts, setPosts] = useState(initialPosts);

  const AddPost = (newPost) => {
    setPosts(prevPosts => [...prevPosts, { ...newPost, id: prevPosts.length }]);
  };

  const UpdatePost = (id, updatedPost) => {
    setPosts(prevPosts => prevPosts.map(post => post.id === id ? { ...post, ...updatedPost } : post));
  };

  const DeletePost = (id) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  const AddComment = (id, profileNickName, content, postTime) => {
    setPosts(prevPosts => prevPosts.map(post => post.id === id ?
      {...post, comments : [{profileNickName : profileNickName, content : content, postTime : postTime}, ...post.comments]}
      :
      post
    ))
  }

  return (
    <PostsContext.Provider value={{ Posts, AddPost, UpdatePost, DeletePost, AddComment }}>
      {children}
    </PostsContext.Provider>
  );
};
